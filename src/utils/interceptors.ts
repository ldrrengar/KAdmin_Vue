/**
 * 拦截器配置文件
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import {
    getTokenKey,
    getRefreshTokenkey,
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    removeToken
} from './cookies'
import { ElMessage } from 'element-plus';

/**
 * 封装axios请求类
 */
export class axiosInterceports {

    instance: AxiosInstance;


    /**
     * @param axiosConfig - axios配置
     */
    constructor(axiosConfig: AxiosRequestConfig) {
        this.instance = axios.create(axiosConfig);
        this.setInterceptor();
    }

    // 初始化拦截器
    setInterceptor() {
        // 请求接口拦截器
        this.instance.interceptors.request.use(
            (config: any) => {
                // 判断一下是否有cookie 如果有的话则把cookie放入请求头中
                if (getToken()) {
                    config.headers[getTokenKey()] = 'Bearer ' + getToken();
                    config.headers[getRefreshTokenkey()] = getRefreshToken();
                }
                return config;
            },
            (err: AxiosError) => {
                console.error(err);
            }
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                console.log(response)
                const res = response.data;
                if (!response.status.toString().startsWith("2") || res.code === -1) {
                    // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
                    console.error("系统错误，请检查API是否正常！");
                    return;
                }
                if (res.code !== 0) {
                    if (res.code === -3) {
                        console.error("登录过期");
                        //错误提示信息
                        ElMessage({
                            type: 'error',
                            message: '登录过期'
                        })
                        removeToken();
                    } else {
                        if (res.msg) {
                            console.error(res.msg);
                            ElMessage({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    }
                    return Promise.resolve(res);
                } else {
                    // 返回成功则把token存储一下
                    const headers = response.headers;
                    const token = headers.token;
                    const refresh_token = headers["refresh-token"];
                    if (token && refresh_token) {
                        setToken(token);
                        setRefreshToken(refresh_token);
                    }
                    return res;
                }
            },
            (error: AxiosError) => {
                if (error.message === "Request failed with status code 500") {
                    console.error("系统错误，请检查API是否正常！");
                    return;
                }
                let code = -110;
                console.log(error.message)
                console.log(error.config)
                console.log(error.config.headers)
                console.log(error.config.baseURL)
                console.log(error.isAxiosError)
                console.log(JSON.stringify(error))
                if (error.message == 'Network Error'){
                    removeToken();
                }
                if (error && error.response && error.response.status) {
                    code = error.response.status;
                    // 登陆过期
                    if (code === 401 || code === -3) {
                        removeToken();
                    }
                }  else {
                    console.error(error);
                }
                const err = { errCode: -110, errMsg: error.message || "Error" };
                return Promise.resolve(err);
            }
        );
    }

    // 返回一下
    getInterceptors() {
        return this.instance;
    }
}