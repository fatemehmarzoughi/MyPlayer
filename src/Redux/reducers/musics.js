import {
    GET_ALL_MUSICS,
    GET_ALL_MUSICS_FAILED,
    GET_HAPPY_MUSICS,
    GET_HAPPY_MUSICS_FAILED,
    GET_SAD_MUSICS,
    GET_SAD_MUSICS_FAILED,
    GET_JAZZ_MUSICS,
    GET_JAZZ_MUSICS_FAILED
} from '/assets/constants/ActionsTypes';

const inisialState = {
    loadingMusics : true,
    recommendedMusic : [],
    mostWatchedMusics : [],
    trendingNowMusics : [],
    newReleasesMusics : [],
}

export const musics = (state = inisialState , action) => {
    switch (action.type) {
        case GET_ALL_MUSICS:
          return{
            ...state,
            recommendedMusics : action.recommendedMusics,
            mostWatchedMusics : action.mostWatchedMusics,
            trendingNowMusics : action.trendingNowMusics,
            newReleasesMusics : action.newReleasesMusics,
            loadingMusics : false,
          }    
        break;

        case GET_ALL_MUSICS_FAILED : 
        return{
            ...state,
            recommendedMusic : action.error,
            mostWatchedMusics : action.error,
            trendingNowMusics : action.error,
            newReleasesMusics : action.error,
            loadingMusics : false
        }
        break;
    
        default:
          return state
        break;
    }
}