import {
  GET_ALL_SPORTS,
  GET_ALL_SPORTS_FAILED
} from "assets/constants/ActionsTypes";

const inisialState = {
  loadingSports: true,
  recommendedSports: [],
  trendingNowSports: [],
  newReleasesSports: [],
  mostWatchedSports: []
};

export const sports = (state = inisialState, action) => {
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
