import {PUT} from '../API';
import {getData} from 'src/LocalStorage';
import {UserUpdatedRequestBody, UserUpdatedResponseBody} from '../types';

export type IUpdateUser = {
  reqBody: UserUpdatedRequestBody;
  onSuccess?: (data: UserUpdatedResponseBody) => void;
  onError?: (err: Error) => void;
};

export const updateUser = async ({
  onSuccess,
  onError,
  reqBody,
}: IUpdateUser) => {
  const userId = await getData('userId');

  try {
    const res = await PUT<UserUpdatedRequestBody>({
      endpoint: `/api/users/${userId}`,
      reqBody,
    });
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else {
      throw Error();
    }
  } catch (error) {
    onError?.(error as Error);
  }
};
