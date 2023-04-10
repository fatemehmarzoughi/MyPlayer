import {
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_FAILED
} from "assets/constants/ActionsTypes";

const inisialState = {
  loadingMovies: true,
  recommendedMovies: [],
  trendingNowMovies: [],
  newReleasesMovies: [],
  mostWatchedMovies: []
};

export const movies = (state = inisialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        loadingMovies: false,
        recommendedMovies: action.recommendedMovies,
        trendingNowMovies: action.trendingNowMovies,
        mostWatchedMovies: action.mostWatchedMovies,
        newReleasesMovies: action.newReleasesMovies
      };

    case GET_ALL_MOVIES_FAILED :
      return {
        ...state,
        loadingMovies: false,
        recommendedMovies: action.error,
        trendingNowMovies: action.error,
        mostWatchedMovies: action.error,
        newReleasesMovies: action.error
      };

    default:
      return state;
  }
};
