import {
  GET_ALL_SPORTS,
  GET_ALL_SPORTS_FAILED
} from "assets/constants/ActionsTypes";
import { GETNoToken } from "API/index";

export const getAllSports = () => {
  return async (dispatch) => {
    const recommendedRES = await GETNoToken("/items/status/0/category/3/subCategory/0");
    const trendingNowRES = await GETNoToken("/items/status/1/category/3/subCategory/0");
    const mostWatchedRES = await GETNoToken("/items/status/2/category/3/subCategory/0");
    const newReleasesRES = await GETNoToken("/items/status/3/category/3/subCategory/0");

    if (
      recommendedRES.status === 200 &&
            trendingNowRES.status === 200 &&
            mostWatchedRES.status === 200 &&
            newReleasesRES.status === 200
    ) {
      const recommended = await recommendedRES.json();
      const trendingNow = await trendingNowRES.json();
      const newReleases = await newReleasesRES.json();
      const mostWatched = await mostWatchedRES.json();

      dispatch({
        type: GET_ALL_SPORTS,
        recommendedSports: recommended,
        mostWatchedSports: mostWatched,
        trendingNowSports: trendingNow,
        newReleasesSports: newReleases
      });
    } else dispatch({ type: GET_ALL_SPORTS_FAILED, error: "Something went wrong" });
  };
};
