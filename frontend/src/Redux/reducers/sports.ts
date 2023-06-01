import {
  GET_ALL_SPORTS,
  GET_ALL_SPORTS_FAILED
} from "src/assets";

const initialState = {
  loadingSports: true,
  recommendedSports: [],
  trendingNowSports: [],
  newReleasesSports: [],
  mostWatchedSports: []
};

export type ISportActions = {
  type: string,
  error?: string,
  recommendedSports?: [],
  trendingNowSports?: [],
  newReleasesSports?: [],
  mostWatchedSports?: []
}

export const sports = (state = initialState, action: ISportActions) => {
  switch (action.type) {
    case GET_ALL_SPORTS:
      return {
        ...state,
        loadingSports: false,
        recommendedSports: action.recommendedSports,
        mostWatchedSports: action.mostWatchedSports,
        trendingNowSports: action.trendingNowSports,
        newReleasesSports: action.newReleasesSports
      };

    case GET_ALL_SPORTS_FAILED :
      return {
        ...state,
        loadingSports: false,
        recommendedSports: action.error,
        mostWatchedSports: action.error,
        trendingNowSports: action.error,
        newReleasesSports: action.error
      };

    default:
      return state;
  }
};
