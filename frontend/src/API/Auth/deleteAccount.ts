import { getData } from 'src/LocalStorage';
import {DELETE} from '../API';
import {DeleteAccountResponseBody} from 'src/API';

export type DeleteAccount = {
  onSuccess?: (data: DeleteAccountResponseBody) => void;
  onError?: (err: Error) => void;
};

export const deleteAccount = async ({onError, onSuccess}: DeleteAccount) => {
  const userId = await getData('userId');
  try {
    const res = await DELETE({
      endpoint: `/api/users/${userId}`,
    });
    onSuccess?.(res.data);
  } catch (error) {
    onError?.(error as Error);
    throw new Error(String(error));
  }
};
