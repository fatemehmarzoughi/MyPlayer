import {POST} from '../API';
import {CreateAccountRequestBody, CreateAccountResponseBody} from 'src/API';

export type CreateAccount = {
  reqBody: CreateAccountRequestBody;
  onSuccess?: (data: CreateAccountResponseBody) => void;
  onError?: (err: Error) => void;
};

export const createAccount = async ({
  reqBody,
  onError,
  onSuccess,
}: CreateAccount) => {
  try {
    const res = await POST<CreateAccountRequestBody>({
      endpoint: '/api/auth/local/register',
      reqBody,
    });
    if (res.status === 200) onSuccess?.(res.data);
    else throw Error;
  } catch (error) {
    onError?.(error as Error);
    throw new Error(String(error));
  }
};
