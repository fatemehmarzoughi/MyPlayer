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
import { GET_noToken } from '/API/index';

export const getAllMusics = () => {
    return async (dispatch) => {
        const recommendedRES = await GET_noToken('/items/status/0/category/1/subCategory/1');
        const mostWatchedRES = await GET_noToken('/items/status/2/category/1/subCategory/1');
        const trendingNowRES = await GET_noToken('/items/status/1/category/1/subCategory/1');
        const newReleasesRES = await GET_noToken('/items/status/3/category/1/subCategory/1');

        if(recommendedRES.status === 200)
        {
            const recommended = await recommendedRES.json();
            const mostWatched = await mostWatchedRES.json();
            const trendingNow = await trendingNowRES.json();
            const newReleases = await newReleasesRES.json();

            dispatch({ 
                type : GET_ALL_MUSICS, 
                recommendedMusics : recommended,
                mostWatchedMusics : mostWatched,
                trendingNowMusics : trendingNow,
                newReleasesMusics : newReleases
            })
        }
        else dispatch({ type : GET_ALL_MUSICS_FAILED , error : 'Something went wrong' })
    }
}