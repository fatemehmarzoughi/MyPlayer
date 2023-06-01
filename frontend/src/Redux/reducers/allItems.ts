import {
  GET_ALL_ITEMS_RECOMMENDED,
  GET_ALL_ITEMS_RECOMMENDED_FAILED,
  GET_ALL_ITEMS_TRENDINGNOW,
  GET_ALL_ITEMS_TRENDINGNOW_FAILED,
  GET_ALL_ITEMS_MOSTWATCHED,
  GET_ALL_ITEMS_MOSTWATCHED_FAILED,
  GET_ALL_ITEMS_NEWRELEASES,
  GET_ALL_ITEMS_NEWRELEASES_FAILED
} from "src/assets";

const initialState = {
  loading: true,
  recommended: [],
  trendingNow: [],
  mostWatched: [],
  newReleases: []
};

export type IAllItemsAction = {
  type: string,
  error?: string,
  loading?: boolean,
  recommended?: [],
  trendingNow?: [],
  mostWatched?: [],
  newReleases?: []
}

export const allItems = (state = initialState, action: IAllItemsAction) => {
  switch (action.type) {
    case GET_ALL_ITEMS_RECOMMENDED:
      return {
        ...state,
        loading: false,
        recommended: action.recommended
      };

    case GET_ALL_ITEMS_RECOMMENDED_FAILED :
      return {
        ...state,
        loading: false,
        recommended: action.error
      };

    case GET_ALL_ITEMS_MOSTWATCHED :
      return {
        ...state,
        loading: false,
        mostWatched: action.mostWatched
      };

    case GET_ALL_ITEMS_MOSTWATCHED_FAILED :
      return {
        ...state,
        loading: false,
        mostWatched: action.error
      };

    case GET_ALL_ITEMS_TRENDINGNOW :
      return {
        ...state,
        loading: false,
        trendingNow: action.trendingNow
      };

    case GET_ALL_ITEMS_TRENDINGNOW_FAILED :
      return {
        ...state,
        loading: false,
        trendingNow: action.error
      };

    case GET_ALL_ITEMS_NEWRELEASES :
      return {
        ...state,
        loading: false,
        newReleases: action.newReleases
      };

    case GET_ALL_ITEMS_NEWRELEASES_FAILED :
      return {
        ...state,
        loading: false,
        newReleases: action.error
      };

    default:
      return state;
  }
};
