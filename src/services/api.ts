import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let isRefreshing = false
let faildRequestQuere = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })
  
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx)
  
        const { 'nextauth.refreshToken': refreshToken } = cookies
        const originalConfig = error.config
  
        if (!isRefreshing) {
          isRefreshing = true
  
          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data
    
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 25 * 30, // 1 30 days
              path: '/'
            })
    
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 25 * 30, // 1 30 days
              path: '/'
            })
    
            api.defaults.headers['Authorization'] = `Bearer ${token}`
  
            faildRequestQuere.forEach(request => request.onSuccess(token))
            faildRequestQuere = []
          }).catch(err => {
            faildRequestQuere.forEach(request => request.onFaild(err))
            faildRequestQuere = []
  
            if (process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }
  
        return new Promise((resolve, reject) => {
          faildRequestQuere?.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
  
              resolve(api(originalConfig))
            },
            onFaild: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if (process.browser) {
          signOut()
        }
        signOut()
      }
    }
  
    return Promise.reject(error)
  })
  return api
}