import {
  GET_ALL_MUSICS,
  GET_ALL_MUSICS_FAILED
} from "@/assets/constants/ActionsTypes";

const initialState = {
  loadingMusics: true,
  recommendedMusics: [],
  mostWatchedMusics: [],
  trendingNowMusics: [],
  newReleasesMusics: []
};

export type IMusicsAction = {
  type: string,
  error?: string,
  loadingMusics?: boolean,
  recommendedMusics?: [],
  mostWatchedMusics?: [],
  trendingNowMusics?: [],
  newReleasesMusics?: []
}

export const musics = (state = initialState, action: IMusicsAction) => {
  switch (action.type) {
    case GET_ALL_MUSICS:
      return {
        ...state,
        recommendedMusics: action.recommendedMusics,
        mostWatchedMusics: action.mostWatchedMusics,
        trendingNowMusics: action.trendingNowMusics,
        newReleasesMusics: action.newReleasesMusics,
        loadingMusics: false
      };

    case GET_ALL_MUSICS_FAILED :
      return {
        ...state,
        recommendedMusic: action.error,
        mostWatchedMusics: action.error,
        trendingNowMusics: action.error,
        newReleasesMusics: action.error,
        loadingMusics: false
      };

    default:
      return state;
  }
};
