/* eslint-disable */
import axios, { AxiosRequestConfig, AxiosPromise, AxiosError } from 'axios';
import config from '../config';

export type methodTypesWithoutBody = 'get' | 'head' | 'options';
export type methodTypesWithBody = 'delete' | 'post' | 'put' | 'patch';

export type methodWithoutBody = <R>(
  url: string,
  config?: AxiosRequestConfig
) => Promise<R>;
export type methodWithBody = <T, R>(
  url: string,
  body: T,
  config?: AxiosRequestConfig
) => Promise<R>;

export type Facade = {
  [P in methodTypesWithoutBody]: methodWithoutBody;
} & {
  [P in methodTypesWithBody]: methodWithBody;
} & {
  request: (config: AxiosRequestConfig) => AxiosPromise;
  setBaseUrlFromConfig: () => void;
};

export interface ResponseError extends Error {
  response?: any;
}

const baseURL = config.activeConfig.apiUrl;
export default (function apiInstance(): Facade {
  const api = axios.create({
    baseURL: baseURL,
    headers: {
      'Referrer-Policy': 'no-referrer',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    validateStatus(status) {
      return status >= 200 && status < 400;
    },
  });

  api.defaults.timeout = 20000;

  const facade: Facade = {} as Facade;

  facade.request = (config) => {
    return api.request(config);
  };

  const processError = (
    err: AxiosError,
    request: { method?: string; url?: string }
  ) => {
    if (err.isAxiosError) {
      // console.log(`Axios error in api fetch`, err, request);
    } else {
      // Standard JS Error (Syntax, etc...)
      // console.log(`JS error in api fetch`, err, request);
    }
    throw err;
  };
  const checkError = (
    response: any,
    request: { method?: string; url?: string }
  ) => {
    if (response?.data?.code && response?.data?.code >= 400) {
      const err: ResponseError = new Error(
        `api failed with code ${response.data.code}`
      );
      err.response = response;
      // console.log(err, {
      //   ...request,
      //   responseStatusCode: response.data.code,
      // });
      throw err;
    }
  };
  const methodTypes: methodTypesWithoutBody[] = ['get', 'head', 'options'];
  methodTypes.forEach((method) => {
    facade[method] = (url, config) =>
      facade.request &&
      facade
        .request({ ...config, method, url })
        .then((response: any) => {
          checkError(response, { method, url });
          return response.data;
        })
        .catch((e) => processError(e, { method, url }));
  });
  const dataTypes: methodTypesWithBody[] = ['delete', 'post', 'put', 'patch'];
  dataTypes.forEach((method: methodTypesWithBody) => {
    facade[method] = <T, R>(
      url: string,
      data: T,
      config?: AxiosRequestConfig
    ) =>
      facade.request &&
      facade
        .request({ ...config, method, url, data })
        .then((response: any): R => {
          checkError(response, { method, url });
          return response.data;
        })
        .catch((e) => processError(e, { method, url }));
  });

  return facade;
})();
