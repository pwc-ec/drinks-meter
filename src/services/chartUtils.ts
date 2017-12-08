export const getKeysForLines = kpiData =>
  kpiData.reduce((keys: any, dataPerTime: IKpiData) => {
    Object.keys(dataPerTime).forEach(key => {
      if (key !== 'quarter' && key !== 'year' && !keys.includes(key)) {
        keys.push(key)
      }
    })
    return keys
  }, [])
