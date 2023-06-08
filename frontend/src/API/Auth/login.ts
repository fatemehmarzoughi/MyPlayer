import {POST} from 'src';
import {LoginRequestBody, LoginResponseBody} from 'src/API';

export type Login = {
  reqBody: LoginRequestBody;
  onSuccess?: (data: LoginResponseBody) => void;
  onError?: (err: Error) => void;
};

export const login = async ({reqBody, onError, onSuccess}: Login) => {
  try {
    const res = await POST<LoginRequestBody>({
      endpoint: '/api/auth/local/',
      reqBody,
    });
    onSuccess?.(res.data);
    return res;
  } catch (error) {
    onError?.(error as Error);
    throw new Error(String(error));
  }
};
