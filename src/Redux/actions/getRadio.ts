import { store } from "App";

import {
  GET_ALL_RADIO,
  GET_ALL_RADIO_FAILED,
} from "src/assets";
import { GetNoToken } from "src/API";

export const getAllRadio = () => {
  return async (dispatch: typeof store.dispatch) => {
    const recommendedRES = await GetNoToken(
      "/items/status/0/category/4/subCategory/0"
    );
    const trendingNowRES = await GetNoToken(
      "/items/status/1/category/4/subCategory/0"
    );
    const mostWatchedRES = await GetNoToken(
      "/items/status/2/category/4/subCategory/0"
    );
    const newReleasesRES = await GetNoToken(
      "/items/status/3/category/4/subCategory/0"
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
        type: GET_ALL_RADIO,
        recommendedRadio: recommended,
        trendingNowRadio: trendingNow,
        mostWatchedRadio: mostWatched,
        newReleasesRadio: newReleases,
      });
    } else
      dispatch({ type: GET_ALL_RADIO_FAILED, error: "Something went wrong" });
  };
};
