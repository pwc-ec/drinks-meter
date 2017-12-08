import { set } from 'lodash'

export const ident = x => !!x
export const isDefined = x => x != null
export const isNotEmpty = x => x != null && x !== ''

export const formatJson = (value, name?: string) => {
  // console.debug(`json.${name || '?'}.format`, value, JSON.stringify(value == null ? null : value))
  return JSON.stringify(value == null ? null : value)
}

export const parseJson = (json, name?: string) => {
  // console.debug(`json.${name || '?'}.parse`, json, json ? JSON.parse(json) : null)
  return json ? JSON.parse(json) : null
}

export const mapKeysWithKeymap = (source, map) => {
  const target = {}
  for (const key in map) {
    if (key in source) {
      set(target, map[key], source[key])
    }
  }
  // console.debug('map.keys', source, target, map)
  return target
}

export const mapValuesToArray = (source, mapFunc: (value: any, key?: string, source?: any) => any) => {
  const target = []
  // tslint:disable-next-line: forin
  for (const key in source) {
    target.push(mapFunc(source[key], key, source))
  }
  // console.debug('map.values', source, target)
  return target
}

export const filterValues = (source, filter: (value: any, key?: string, source?: any) => boolean) => {
  const target = {}
  for (const key in source) {
    if (filter(source[key], key, source)) {
      target[key] = source[key]
    }
  }
  // console.debug('filter.values', source, target)
  return target
}

export const isEqualByKey = key => (item1, item2) => item1[key] === item2[key]
export const isEqualById = isEqualByKey('id')

export const mapByKey = key => items => {
  const map = {}
  for (const item of items) {
    map[item[key]] = item
  }
  return map
}
export const mapById = mapByKey('id')

export const pickValuesByKey = key => items => items.map(item => item[key])
export const pickIds = pickValuesByKey('id')

export const intersectMap = (map, intersectWith) => {
  // Intersect map in place.
  for (const key in map) {
    if (!(key in intersectWith)) {
      delete map[key]
    }
  }
  return map
}
