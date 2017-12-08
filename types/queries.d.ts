declare interface IAllCompanies {
  allCompanies: ICompany[]
}

declare interface IAllUsers {
  allUsers: IUser[]
}

declare interface IAllKpiData {
  allKpiDatas: IKpiData[]
}

declare interface IReportResponse {
  Report: IReport
}

declare interface IAllReports {
  allReports: IReport[]
}

declare interface IAllNotifications {
  allNotifications: INotification[]
}

declare type ID = String

declare interface IUserData {
  User: IUser
}
