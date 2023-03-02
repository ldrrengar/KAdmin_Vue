/**
 *  封装axios
 */

import { user } from '@/store/user'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
const https = (hasToken: Boolean = true) => {
  const config: HttpClientConfig = {
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
      token: hasToken ? user().token : ''
    }
  }
  return new HttpClient(config)
}

export default https