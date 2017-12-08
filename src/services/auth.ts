export const getUserId = (def = null) => {
  const userId = localStorage.getItem('userId')
  return userId ? userId : def
}

export const getToken = () => localStorage.getItem('token')

export const setUserId = userId => localStorage.setItem('userId', userId)

export const setToken = token => localStorage.setItem('token', token)

export const clear = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}
