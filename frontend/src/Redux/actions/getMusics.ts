import { store } from "App";

import {
  GET_ALL_MUSICS,
  GET_ALL_MUSICS_FAILED,
} from "src/assets";
import { GET } from "src/API";

export const getAllMusics = () => {
  return async (dispatch: typeof store.dispatch) => {
    const recommendedRES = await GET(
      "/items/status/0/category/1/subCategory/1"
    );
    const mostWatchedRES = await GET(
      "/items/status/2/category/1/subCategory/1"
    );
    const trendingNowRES = await GET(
      "/items/status/1/category/1/subCategory/1"
    );
    const newReleasesRES = await GET(
      "/items/status/3/category/1/subCategory/1"
    );

    if ((recommendedRES as { status: number }).status === 200) {
      const recommended = await (recommendedRES as any).json();
      const mostWatched = await (mostWatchedRES as any).json();
      const trendingNow = await (trendingNowRES as any).json();
      const newReleases = await (newReleasesRES as any).json();

      dispatch({
        type: GET_ALL_MUSICS,
        recommendedMusics: recommended,
        mostWatchedMusics: mostWatched,
        trendingNowMusics: trendingNow,
        newReleasesMusics: newReleases,
      });
    } else
      dispatch({ type: GET_ALL_MUSICS_FAILED, error: "Something went wrong" });
  };
};
