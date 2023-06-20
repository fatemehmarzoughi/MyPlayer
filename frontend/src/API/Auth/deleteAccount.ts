import {getData} from 'src/LocalStorage';
import {DELETE} from '../API';
import {DeleteAccountResponseBody} from 'src/API';

export type DeleteAccount = {
  onSuccess?: (data: DeleteAccountResponseBody) => void;
  onError?: (err: Error) => void;
};

export const deleteAccount = async ({onError, onSuccess}: DeleteAccount) => {
  try {
    const userId = await getData('userId');
    if (!userId) throw Error('There is no logged in user');
    const res = await DELETE({
      endpoint: `/api/users/${userId}`,
    });
    if (res.status === 200) onSuccess?.(res.data);
    else throw Error('Something went wrong');
  } catch (error) {
    onError?.(error as Error);
    throw Error(String(error));
  }
};
