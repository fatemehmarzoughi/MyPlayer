import {
  GET_ALL_RADIO,
  GET_ALL_RADIO_FAILED
} from "~/assets/constants/ActionsTypes";

const initialState = {
  loadingRadio: true,
  recommendedRadio: [],
  mostWatchedRadio: [],
  trendingNowRadio: [],
  newReleasesRadio: []
};

export type IRadioAction = {
  type: string,
  error?: string,
  loadingRadio?: true,
  recommendedRadio?: [],
  mostWatchedRadio?: [],
  trendingNowRadio?: [],
  newReleasesRadio?: []
}

export const radio = (state = initialState, action: IRadioAction) => {
  switch (action.type) {
    case GET_ALL_RADIO:
      return {
        loadingRadio: false,
        recommendedRadio: action.recommendedRadio,
        newReleasesRadio: action.newReleasesRadio,
        mostWatchedRadio: action.mostWatchedRadio,
        trendingNowRadio: action.trendingNowRadio
      };

    case GET_ALL_RADIO_FAILED :
      return {
        loadingRadio: false,
        recommendedRadio: action.error,
        newReleasesRadio: action.error,
        mostWatchedRadio: action.error,
        trendingNowRadio: action.error
      };

    default:
      return state;
  }
};
