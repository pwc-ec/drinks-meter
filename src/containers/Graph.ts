import * as html2canvas from 'html2canvas'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { showErrorSnackbar, showInfoSnackbar, showSuccessSnackbar } from '../actions/snackbars'
import Graph, { IGraphProps } from '../components/Graph'
import { xlsxDownloadUrl } from '../constants/routes'
import * as deleteGraphMutation from '../graphql/mutations/deleteGraph.gql'
import * as updateGraphPosition from '../graphql/mutations/updateGraphPosition.gql'
import * as getKpis from '../graphql/queries/getKpis.gql'
import { mapById, pickIds } from '../services/data'

import * as updateGraphRelativeMutation from '../graphql/mutations/updateGraphRelative.gql'
import * as getReportQuery from '../graphql/queries/getReport.gql'

// ------------------------------------------------------------------------------------------------

interface IProps extends IGraphProps {
  bigGraphId?: number
  companies?: ICompany[]
  reportId: string
  relative: boolean
}

// ------------------------------------------------------------------------------------------------

const enhancers = [
  connect(null, {
    showErrorSnackbar,
    showInfoSnackbar,
    showSuccessSnackbar,
  }),

  // TODO: Add query error warning UI.
  graphql<IGraph, IProps>(deleteGraphMutation, {
    name: 'deleteGraph',
    options: ({ reportId }) => ({
      refetchQueries: [
        {
          query: getReportQuery,
          variables: { reportId },
        },
      ],
    }),
  }),
  graphql<IAllKpiData, IProps>(updateGraphPosition),
  graphql<IAllKpiData, IProps>(getKpis, {
    options: ({ graph: { kpis }, companies }) => ({
      variables: {
        companies: pickIds(companies),
        kpis: pickIds(kpis),
      },
    }),
    props: ({ data: { allKpiDatas: data, loading }, ownProps: { graph: { kpis }, companies } }) => {
      const kpiData: any[] = Object.values(
        (data || []).reduce((set, kpi) => {
          let timeStamp: any = Number.parseInt(kpi.year + (kpi.quarter as string).replace('Q', '0'))
          if (kpi.quarter === 'YE') {
            timeStamp = Number.parseInt(kpi.year - 1 + '04')
          } else if (kpi.quarter === 'Q4') {
            timeStamp = Number.parseInt(kpi.year + kpi.quarter.replace('Q', '0'))
          }
          if (!set[timeStamp]) {
            set[timeStamp] = { quarter: timeStamp }
            if (kpi.quarter === 'YE') {
              set[timeStamp].year = kpi.year
            } else if (kpi.quarter === 'Q4') {
              set[timeStamp].year = kpi.year + 1
            }
          }

          const kpisMap = mapById(kpis)
          const companiesMap = mapById(companies)
          if (kpisMap[kpi.kpiId] && companiesMap[kpi.companyId]) {
            let identifier = kpisMap[kpi.kpiId].name + '(' + companiesMap[kpi.companyId].name + ')'
            if (kpi.quarter === 'YE') {
              identifier += '[year]'
            }
            if (!set[timeStamp][identifier]) {
              set[timeStamp][identifier] = kpi.value
            }
          }
          return set
        }, {}),
      ).sort((a: any, b: any) => {
        const aPivot = a.quarter ? a.quarter : Number.parseInt(a.year - 1 + '04')
        const bPivot = b.quarter ? b.quarter : Number.parseInt(b.year - 1 + '04')
        return aPivot - bPivot
      })

      const unitMap = kpis.reduce((units, kpi) => {
        for (const company of companies) {
          units[kpi.name + '(' + company.name + ')'] = kpi.unit
          units[kpi.name + '(' + company.name + ')[year]'] = kpi.unit
        }
        return units
      }, {})

      return {
        kpiData,
        loading,
        unitMap,
      }
    },
  }),
  graphql<IGraph, IProps>(updateGraphRelativeMutation, {
    name: 'setRelative',
  }),

  withState('showPrintable', 'setShowPrintable', false),

  withHandlers({
    onDelete: ({
      deleteGraph,
      graph: { id: graphId, kpis },
      // tslint:disable-next-line: no-shadowed-variable
      showSuccessSnackbar,
      // tslint:disable-next-line: no-shadowed-variable
      showErrorSnackbar,
    }) => () => {
      const name = kpis.map(kpi => kpi.name).join(' | ')
      deleteGraph({ variables: { id: graphId } })
        .then(response => {
          showSuccessSnackbar(`Successfully deleted graph ${name}`)
        })
        .catch(err => {
          showErrorSnackbar(`Failed to delete graph ${name}`)
          console.error('onDelete: deleteGraph failed', err)
        })
    },

    onDrop: ({ bigGraphId, graph: { id, position }, mutate }) => done => {
      const pos = position
      mutate({ variables: { id, position: 0 } }).then(() => {
        mutate({ variables: { id: bigGraphId, position: pos } }).then(() => {
          if (typeof done === 'function') {
            done()
          }
        })
      })
    },

    onImageDownload: ({ name, setShowPrintable }) => () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      document.body.style.overflow = 'hidden'
      setShowPrintable(true)
      setTimeout(() => {
        Array.from(document.querySelectorAll('.recharts-legend-item-text')).forEach((element: HTMLElement) => {
          element.style.fontFamily = 'Arial'
        })
        const graph = document.getElementById('print_graph')
        graph.style.fontSize = '20pt'
        html2canvas(graph, {
          background: '#fff',
          height: 1800,
          onrendered: canvas => {
            setShowPrintable(false)
            document.body.style.overflow = 'auto'
            const data = canvas.toDataURL('image/jpeg')
            const link = document.createElement('a')
            link.setAttribute('href', data)
            link.setAttribute('download', name.replace(/ \| /g, '_and_').replace(/ /g, '_') + '.jpg')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          },
          width: 3200,
        })
      }, 500)
    },

    onToggleRelative: ({ setRelative, graph: { id, relative } }) => () => {
      setRelative({ variables: { id, relative: !relative } })
    },
  }),

  withProps(({ reportId }) => ({
    xlsxDownloadUrl: xlsxDownloadUrl(reportId),
  })),
]

export default compose(...enhancers)(Graph)
