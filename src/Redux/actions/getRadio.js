import {
    GET_ALL_RADIO,
    GET_ALL_RADIO_FAILED,
} from '/assets/constants/ActionsTypes';
import { GET_noToken } from '/API/index';

export const getAllRadio = () => {
    return async (dispatch) => {
        const recommendedRES = await GET_noToken('/items/status/0/category/4/subCategory/0');
        const trendingNowRES = await GET_noToken('/items/status/1/category/4/subCategory/0');
        const mostWatchedRES = await GET_noToken('/items/status/2/category/4/subCategory/0');
        const newReleasesRES = await GET_noToken('/items/status/3/category/4/subCategory/0');

        if(
            recommendedRES.status === 200 &&
            trendingNowRES.status === 200 &&
            mostWatchedRES.status === 200 &&
            newReleasesRES.status === 200
        )
        {
            const recommended = await recommendedRES.json();
            const trendingNow = await trendingNowRES.json();
            const mostWatched = await mostWatchedRES.json();
            const newReleases = await newReleasesRES.json();
            dispatch({ 
                type : GET_ALL_RADIO,
                recommendedRadio : recommended,
                trendingNowRadio : trendingNow,
                mostWatchedRadio : mostWatched,
                newReleasesRadio : newReleases,
            })
        }
        else dispatch({ type : GET_ALL_RADIO_FAILED, error : 'Something went wrong' });
    }
}