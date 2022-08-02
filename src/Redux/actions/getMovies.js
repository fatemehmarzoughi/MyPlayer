import {
  GET_ALL_MOVIES,
  GET_ALL_MOVIES_FAILED
} from "assets/constants/ActionsTypes";
import { GetNoToken } from "API/index";

export const getAllMovies = () => {
  return async (dispatch) => {
    const recommendedRES = await GetNoToken("/items/status/0/category/2/subCategory/1");
    const trendingNowRES = await GetNoToken("/items/status/1/category/2/subCategory/1");
    const mostWatchedRES = await GetNoToken("/items/status/2/category/2/subCategory/1");
    const newReleasesRES = await GetNoToken("/items/status/3/category/2/subCategory/1");

    if (
      recommendedRES.status === 200 &&
            trendingNowRES.status === 200 &&
            mostWatchedRES.status === 200 &&
            newReleasesRES.status === 200
    ) {
      const recommended = await recommendedRES.json();
      const trendingNow = await trendingNowRES.json();
      const mostWatched = await mostWatchedRES.json();
      const newReleases = await newReleasesRES.json();
      dispatch({
        type: GET_ALL_MOVIES,
        recommendedMovies: recommended,
        trendingNowMovies: trendingNow,
        mostWatchedMovies: mostWatched,
        newReleasesMovies: newReleases
      });
    } else dispatch({ type: GET_ALL_MOVIES_FAILED, error: "Something went wrong" });
  };
};
