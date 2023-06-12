import {AxiosResponse} from 'axios';

export function responseBody<T>({
  data,
  status,
}: {
  data: T;
  status: 200 | number;
}): Partial<AxiosResponse<any, any>> {
  return {
    data,
    status,
    statusText: '',
  };
}
