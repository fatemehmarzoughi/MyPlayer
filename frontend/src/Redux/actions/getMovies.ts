import { store } from "App";

import {
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_FAILED,
} from "src/assets";
import { GetNoToken } from "src/API";

export const getAllMovies = () => {
  return async (dispatch: typeof store.dispatch) => {
    const recommendedRES = await GetNoToken(
      "/items/status/0/category/2/subCategory/1"
    );
    const trendingNowRES = await GetNoToken(
      "/items/status/1/category/2/subCategory/1"
    );
    const mostWatchedRES = await GetNoToken(
      "/items/status/2/category/2/subCategory/1"
    );
    const newReleasesRES = await GetNoToken(
      "/items/status/3/category/2/subCategory/1"
    );

    if (
      (recommendedRES as { status: number }).status === 200 &&
      (trendingNowRES as { status: number }).status === 200 &&
      (mostWatchedRES as { status: number }).status === 200 &&
      (newReleasesRES as { status: number }).status === 200
    ) {
      const recommended = await (recommendedRES as any).json();
      const trendingNow = await (trendingNowRES as any).json();
      const mostWatched = await (mostWatchedRES as any).json();
      const newReleases = await (newReleasesRES as any).json();
      dispatch({
        type: GET_ALL_MOVIES,
        recommendedMovies: recommended,
        trendingNowMovies: trendingNow,
        mostWatchedMovies: mostWatched,
        newReleasesMovies: newReleases,
      });
    } else
      dispatch({ type: GET_ALL_MOVIES_FAILED, error: "Something went wrong" });
  };
};
