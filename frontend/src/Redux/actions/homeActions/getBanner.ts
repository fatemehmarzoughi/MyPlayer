import {store} from 'AppProvider';

import {BannerResponseBody, GET} from 'src/API';
import {GET_BANNER, GET_BANNER_FAILED} from 'src/assets';

export const getBanner = () => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({
        endpoint: 'api/banner?populate=*',
      });
      if (res.status === 200)
        dispatch({
          type: GET_BANNER,
          banner: res.data as BannerResponseBody,
          loadingBanner: false,
        });
      else throw Error;
    } catch (error) {
      dispatch({
        type: GET_BANNER_FAILED,
        error: 'Something went wrong',
        loadingBanner: false,
      });
    }
  };
};
