import {BannerResponseBody} from 'src/API';
import {GET_BANNER, GET_BANNER_FAILED} from 'src/assets';

const initialState = {
  type: GET_BANNER,
  loadingBanner: true,
};

export type IBannerAction = {
  type: string;
  loadingBanner: boolean;

  error?: string;
  banner?: BannerResponseBody;
};

export const banner = (
  state: IBannerAction = initialState,
  action: IBannerAction,
) => {
  switch (action.type) {
    case GET_BANNER:
      return {
        ...state,
        loadingBanner: false,
        banner: action.banner,
      };

    case GET_BANNER_FAILED:
      return {
        ...state,
        loadingBanner: false,
        error: action.error,
      };

    default:
      return {...state};
  }
};
