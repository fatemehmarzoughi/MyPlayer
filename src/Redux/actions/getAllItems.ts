import { GetNoToken } from "API/index";
import {
  GET_ALL_ITEMS_RECOMMENDED,
  GET_ALL_ITEMS_RECOMMENDED_FAILED,
  GET_ALL_ITEMS_MOSTWATCHED,
  GET_ALL_ITEMS_MOSTWATCHED_FAILED,
  GET_ALL_ITEMS_TRENDINGNOW,
  GET_ALL_ITEMS_TRENDINGNOW_FAILED,
  GET_ALL_ITEMS_NEWRELEASES,
  GET_ALL_ITEMS_NEWRELEASES_FAILED
} from "assets/constants/ActionsTypes";

export const getAllRecommended = () => {
  return async (dispatch) => {
    try {
      const res = await GetNoToken("/items/status/0/category/0/subCategory/0");
      if (res.status === 200) {
        const result = await res.json();
        dispatch({ type: GET_ALL_ITEMS_RECOMMENDED, recommended: result });
      } else dispatch({ type: GET_ALL_ITEMS_RECOMMENDED_FAILED, error: "Something went wrong" });
    } catch (err) { throw new Error(err); };
  };
};

export const getAllMostWatched = () => {
  return async (dispatch) => {
    const res = await GetNoToken("/items/status/2/category/0/subCategory/0");
    if (res.status === 200) {
      const result = await res.json();
      dispatch({ type: GET_ALL_ITEMS_MOSTWATCHED, mostWatched: result });
    } else dispatch({ type: GET_ALL_ITEMS_MOSTWATCHED_FAILED, error: "something went wrong" });
  };
};

export const getAllTrendingNow = () => {
  return async (dispatch) => {
    const res = await GetNoToken("/items/status/1/category/0/subCategory/0");
    if (res.status === 200) {
      const result = await res.json();
      dispatch({ type: GET_ALL_ITEMS_TRENDINGNOW, trendingNow: result });
    } else dispatch({ type: GET_ALL_ITEMS_TRENDINGNOW_FAILED, error: "Something went wrong" });
  };
};

export const getAllNewReleases = () => {
  return async (dispatch) => {
    const res = await GetNoToken("/items/status/3/category/0/subCategory/0");
    if (res.status === 200) {
      const result = await res.json();
      dispatch({ type: GET_ALL_ITEMS_NEWRELEASES, newReleases: result });
    } else dispatch({ type: GET_ALL_ITEMS_NEWRELEASES_FAILED, error: "something went wrong" });
  };
};
