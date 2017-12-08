declare interface ICompany {
  id: string
  kpis?: IKpi[]
  logo?: string
  name: string
}

declare interface IKpi {
  id: string
  name: string
  unit: string
}

declare interface IKpiData {
  companyId: string
  kpiId: string
  value: number
  quarter: string | number
  year: number
}

declare interface IReport {
  createdAt: Date
  companies: ICompany[]
  graphs: IGraph[]
  id: string
  name: string
  updatedAt?: Date
  user: IUser
}

declare interface IGraph {
  id: string
  position: number
  kpis: IKpi[]
  relative: boolean
  report: IReport
}

declare interface IUser {
  createdAt: Date
  createdBy: IUser
  email: string
  employer: IEmployer
  id: string
  fullname: string
  isAdmin: boolean
  isEnabled: boolean
  lastReport: IReport
  notificationCompanies: ICompany[]
}

declare interface IEmployer {
  company: ICompany
  id: string
  name: string
}

declare interface ICompaniesStoreState {
  data: ICompany[]
  loading: boolean
  selected: ICompany[]
  suggestCompanyInput: string
}

declare interface IReportsStoreState {
  active: IReport
  data: IReport[]
  loading: boolean
  saving: boolean
}

declare interface ISign {
  token?: string
  userId?: string
}

declare interface ISnackbar {
  actions?: { [key: string]: () => any }
  autoHide?: boolean
  autoHideDuration?: number
  dismissOnClickAway?: boolean
  error?: any
  intent?: string
  message?: string
}

declare interface INotification {
  changedCompanies: ICompany[]
  createdAt: Date
  emailSent: boolean
  id: string
  user: IUser
}

// tslint:disable-next-line: no-empty-interface
declare interface ISnackbarsStoreState extends ISnackbar {}

declare interface IRootState {
  // TODO: Find if Apollo exports more exact type.
  apollo: any
  companies: ICompaniesStoreState
  form: any
  reports: IReportsStoreState
  sign: ISign
  snackbars: ISnackbarsStoreState
}
