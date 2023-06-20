import {GET} from '../API';
import {GetPlansResponseBody} from '../types';

export type GetPlans = {
  onSuccess?: (data: GetPlansResponseBody) => void;
  onError?: (err: Error) => void;
};

export const getPlans = async ({
  onError,
  onSuccess,
}: GetPlans) => {

  try {
    const res = await GET({
      endpoint: "api/plans",
    });
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else throw Error();
  } catch (error) {
    onError?.(error as Error);
  }
};
