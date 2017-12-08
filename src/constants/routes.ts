export const routeHomepage = () => '/'
export const routeDashboard = () => '/dashboard'
export const routeCreateReport = () => '/reports/create'
export const routeWelcome = () => '/welcome'

export const routeAdminUsers = () => '/users'
export const routeAdminCreateEmployer = () => '/employers/create'

export const xlsxDownloadUrl = reportId => `${process.env.REPORTS_URL}${reportId}/xlsx`
