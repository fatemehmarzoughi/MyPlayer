import {GET} from '../API';
import {GetUserInfoResponseBody} from '../types';

export type GetUserInfo = {
  onSuccess?: (data: GetUserInfoResponseBody) => void;
  onError?: (err: Error) => void;
};

export const getUserInfo = async ({
  onError,
  onSuccess,
}: GetUserInfo) => {
  try {
    const res = await GET({
      endpoint: "api/users/me?populate=*",
    });
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else throw Error();
  } catch (error) {
    console.log(error);
    onError?.(error as Error);
  }
};
