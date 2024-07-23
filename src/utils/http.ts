import axios, { AxiosResponse, Method } from "axios";

export interface RequestOptions {
  url: string;
  method: Method;
  params?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, any>;
  token?: string;
}

const HTTP = () => {
  const TIMEOUT = 10000;
  const request = async (options: RequestOptions) => {
    try {
      const { url, method, params, body, headers, token } = options;
      const axiosParams = {
        method,
        url,
        params,
        data: body,
        headers: {
          ...(headers || {}),
        },
        timeout: TIMEOUT,
      };
      if (headers != null) {
        axiosParams.headers = headers;

        if (token != null) {
          const bearerToken = `Bearer ${token}`;
          axiosParams.headers.Authorization = bearerToken;
        }
      }

      const response: AxiosResponse = await axios(axiosParams);

      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  const get = async (
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, any>,
    token?: string
  ) => {
    return request({ url, method: "GET", params, headers, token });
  };

  const post = async (
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, any>,
    token?: string
  ) => {
    return request({ url, method: "POST", body, headers, token });
  };

  const del = async (
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, any>,
    token?: string
  ) => {
    return request({ url, method: "DELETE", body, headers, token });
  };

  return { get, post, del };
};

export default HTTP;
