import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "@utils/localStorage";
import { BASE_URL } from "@config";

axios.defaults.headers.common["Content-Type"] = "application/json";
const debug = process.env.NODE_ENV !== "production";

const onSuccess = async <T = any>(data: AxiosResponse<T>) => {
  if (debug) console.log("onSuccess << data", data);
  return Promise.resolve<AxiosResponse<T>>(data);
};
const onSuccessAll = async <T = any>(data: AxiosResponse<T>[]) => {
  if (debug) console.log("onSuccess << data", data);
  return Promise.resolve<AxiosResponse<T>[]>(data);
};
const onError = async (error: AxiosError) => {
  if (debug) console.log("onError << error", error);
  return Promise.reject(error);
};

/**
 * AxiosRequestConfigをデフォルト値以外に書き換え
 * 対応パラメータ(必要に応じて追加)：headers,responseType
 * @param params
 */
const margeParam = (params: AxiosRequestConfig): AxiosRequestConfig => {
  const defaultRequestConfig = {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    responseType: "json"
  };
  return {
    headers: {
      ...defaultRequestConfig.headers,
      ...params.headers
    },
    responseType: params.responseType || defaultRequestConfig.responseType
  };
};

export default {
  get: async <T = any>(url: string, params?: AxiosRequestConfig) => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) console.log(`GET ${targetUrl} >> ${JSON.stringify(params)}`);
    return axios
      .get<T>(targetUrl, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  post: async <T = any, D = any>(
    url: string,
    data?: D,
    params?: AxiosRequestConfig
  ) => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) {
      console.log(
        `POST ${targetUrl} >> ${JSON.stringify({ params, data: data || {} })}`
      );
    }
    return axios
      .post<T>(targetUrl, data || {}, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  postAll: async <T = any, D = any>(
    posts: {
      url: string;
      data?: D;
      params?: AxiosRequestConfig;
    }[]
  ) => {
    return axios
      .all(
        posts.map(({ url, data, params }) => {
          const targetUrl = `${BASE_URL}${url}`;
          if (debug) {
            console.log(
              `POST ALL ${targetUrl} >> ${JSON.stringify({
                params,
                data: data || {}
              })}`
            );
          }
          return axios.post<T>(targetUrl, data || {}, margeParam(params || {}));
        })
      )
      .then(onSuccessAll)
      .catch(onError);
  },
  put: async <T = any, D = any>(
    url: string,
    data?: D,
    params?: AxiosRequestConfig
  ) => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) {
      console.log(
        `PUT ${targetUrl} >> ${JSON.stringify({ params, data: data || {} })}`
      );
    }
    return axios
      .put<T>(targetUrl, data || {}, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  delete: async (url: string, params?: AxiosRequestConfig) => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) console.log(`DELETE ${targetUrl} >> ${JSON.stringify(params)}`);
    return axios
      .delete(targetUrl, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  }
};
