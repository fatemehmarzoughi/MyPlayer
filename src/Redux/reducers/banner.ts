import {
  GET_BANNER,
  GET_BANNER_FAILED
} from "~/assets/constants/ActionsTypes";

const initialState = {
  banner: [{ largImageUrl: "https://afternoon-ravine-26647.herokuapp.com/images/makeURLs/41300/jpeg" }],
  loadingBanner: true
};

export type IBannerAction = {
  type: string,
  error?: string,
  banner?: [{ largImageUrl: string }],
  loadingBanner?: boolean,
}

export const banner = (state = initialState, action: IBannerAction) => {
  switch (action.type) {
    case GET_BANNER:
      return {
        ...state,
        loadingBanner: false,
        banner: action.banner
      };

    case GET_BANNER_FAILED :
      return {
        ...state,
        loadingBanner: false,
        banner: action.error
      };

    default:
      return { ...state };
  }
};
