import {POST} from '../API';
import {ReportBugRequestBody, ReportBugResponseBody} from 'src/API';

export type ReportBug = {
  reqBody: ReportBugRequestBody;
  onSuccess?: (data: ReportBugResponseBody) => void;
  onError?: (err: Error) => void;
};

export const reportBug = async ({reqBody, onError, onSuccess}: ReportBug) => {
  try {
    const res = await POST<ReportBugRequestBody>({
      endpoint: '/api/bug-reports',
      reqBody,
    });
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res;
    } else throw Error();
  } catch (error) {
    onError?.(error as Error);
    throw Error(String(error));
  }
};
