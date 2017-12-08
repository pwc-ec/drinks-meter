import * as React from 'react'

import Typography from 'material-ui/Typography'
import KpiChart from '../containers/KpiChart'
import KpiSimpleChart from './KpiSimpleChart'

export interface IGraphProps {
  count: number
  graph?: IGraph
  kpiData?: IKpiData[]
  loading: boolean
  name: string
  onDelete: () => void
  onImageDownload: () => void
  onDrop?: () => void
  simple: boolean
  unitMap?: { [key: string]: string }
  showPrintable: boolean
  onToggleRelative: () => void
  xlsxDownloadUrl: string
}

const Graph = ({
  count,
  name,
  kpiData,
  loading,
  onDelete,
  onDrop,
  simple,
  unitMap,
  onImageDownload,
  showPrintable,
  onToggleRelative,
  graph,
  xlsxDownloadUrl,
}: IGraphProps) => {
  if (!kpiData || !kpiData.length) {
    if (loading) {
      return (
        <Typography style={simple ? { paddingTop: '1rem', textAlign: 'center' } : { textAlign: 'center' }} type="title">
          Loading...
        </Typography>
      )
    }
    return (
      <Typography style={simple ? { paddingTop: '1rem' } : null} type="title">
        {simple ? 'Missing data for graph' : 'No data, try to add some KPI to the graph'}
      </Typography>
    )
  }

  if (simple) {
    return (
      <KpiSimpleChart
        kpiData={kpiData}
        unitMap={unitMap}
        count={count - 1}
        name={name}
        onDelete={onDelete}
        onDrop={onDrop}
      />
    )
  }

  return (
    <KpiChart
      kpiData={kpiData}
      unitMap={unitMap}
      name={name}
      onDelete={onDelete}
      onImageDownload={onImageDownload}
      showPrintable={showPrintable}
      relative={graph.relative}
      onToggleRelative={onToggleRelative}
      xlsxDownloadUrl={xlsxDownloadUrl}
    />
  )
}

export default Graph
