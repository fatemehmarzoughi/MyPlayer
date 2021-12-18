import { 
  GET_ALL_ITEMS_RECOMMENDED,
  GET_ALL_ITEMS_RECOMMENDED_FAILED,
  GET_ALL_ITEMS_TRENDINGNOW,
  GET_ALL_ITEMS_TRENDINGNOW_FAILED,
  GET_ALL_ITEMS_MOSTWATCHED,
  GET_ALL_ITEMS_MOSTWATCHED_FAILED,
  GET_ALL_ITEMS_NEWRELEASES,
  GET_ALL_ITEMS_NEWRELEASES_FAILED,
  GET_BANNER,
  GET_BANNER_FAILED
} from 'assets/constants/ActionsTypes';

const inisialState = {
  loading : true,
  recommended : [],
  trendingNow : [],
  mostWatched : [],
  newReleases : [],
}

export const allItems = (state = inisialState , action) => {
  switch (action.type) {
    case GET_ALL_ITEMS_RECOMMENDED:
      return{
        ...state,
        loading : false,
        recommended : action.recommended,
      }
    break;

    case GET_ALL_ITEMS_RECOMMENDED_FAILED : 
      return{
        ...state,
        loading : false,
        recommended : action.error,
      }
    break;

    case GET_ALL_ITEMS_MOSTWATCHED : 
      return{
        ...state,
        loading : false,
        mostWatched : action.mostWatched,
      }
    break;

    case GET_ALL_ITEMS_MOSTWATCHED_FAILED : 
      return{
        ...state,
        loading : false,
        mostWatched : action.error,
      }
    break;

    case GET_ALL_ITEMS_TRENDINGNOW : 
    return{
      ...state,
      loading : false,
      trendingNow : action.trendingNow,
    }
    break;

    case GET_ALL_ITEMS_TRENDINGNOW_FAILED : 
    return{
      ...state,
      loading : false,
      trendingNow : action.error,
    }
    break;

    case GET_ALL_ITEMS_NEWRELEASES : 
    return{
      ...state, 
      loading : false,
      newReleases : action.newReleases,
    }
    break;

    case GET_ALL_ITEMS_NEWRELEASES_FAILED : 
    return{
      ...state,
      loading : false,
      newReleases : action.error
    }
    break;

    default:
      return state;
    break;
  }
}