import {
    GET_ALL_RADIO,
    GET_ALL_RADIO_FAILED,
} from '/assets/constants/ActionsTypes';


const inisialState = {
    loadingRadio : true,
    recommendedRadio : [],
    mostWatchedRadio : [],
    trendingNowRadio : [],
    newReleasesRadio : [],
}

export const radio = (state = inisialState, action) => {
    switch (action.type) {
        case GET_ALL_RADIO:
            return{
                loadingRadio : false,
                recommendedRadio : action.recommendedRadio,
                newReleasesRadio : action.newReleasesRadio,
                mostWatchedRadio : action.mostWatchedRadio,
                trendingNowRadio : action.trendingNowRadio,
            }
        break;

        case GET_ALL_RADIO_FAILED : 
            return{
                loadingRadio : false,
                recommendedRadio : action.error,
                newReleasesRadio : action.error,
                mostWatchedRadio : action.error,
                trendingNowRadio : action.error,
            }
        break;
    
        default:
           return state
        break;
    }
}