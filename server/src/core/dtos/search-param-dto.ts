interface ISearchParamDTO {
  field: string
  condition:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'in'
    | 'notIn'
    | 'not'
    | 'isNull'
    | 'isNotNull'
  value: string | number | Date
}

export type { ISearchParamDTO }
