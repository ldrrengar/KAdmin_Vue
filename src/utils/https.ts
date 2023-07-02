/**
 *  封装axios
 */

// import { user } from '@/store/user'
// import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { axiosInterceports } from './interceptors'

interface RequestParam {
  url: string;
  method?: Method;
  data?: any;
  axiosConfig?: AxiosRequestConfig;
}


export function createRequest(axiosConfig: AxiosRequestConfig) {
  const customInstance = new axiosInterceports(axiosConfig);

  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function asyncRequest<T>(param: RequestParam): Promise<Service.RequestResult<T>> {
    const { url } = param;
    const method = param.method || 'get';
    const { instance } = customInstance;
    const res = (await getRequestResponse({
      instance,
      method,
      url,
      data: param.data,
      config: param.axiosConfig
    })) as Service.RequestResult<T>;

    return res;
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }
  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(url: string, config?: AxiosRequestConfig) {
    return asyncRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}

async function getRequestResponse(params: {
  instance: AxiosInstance;
  method: Method;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}) {
  const { instance, method, url, data, config } = params;

  let res: any;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }
  return res;
}

console.log(import.meta.env)
const isHttpProxy: boolean = import.meta.env.VITE_HTTP_PROXY === 'Y';
const url: any = import.meta.env.VITE_BASE_API

const https = createRequest({ baseURL: isHttpProxy ? '/api' : url, timeout: 10000 });
export default https