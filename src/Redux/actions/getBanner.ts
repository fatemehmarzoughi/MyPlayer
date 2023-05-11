import { store } from "App";

import { GetNoToken } from "~/API/index";
import { GET_BANNER, GET_BANNER_FAILED } from "~/assets/constants/ActionsTypes";

export const getBanner = () => {
  return async (dispatch: typeof store.dispatch) => {
    const res = await GetNoToken("/items/banner");
    if ((res as { status: number }).status === 200) {
      const result = await (res as any).json();
      dispatch({ type: GET_BANNER, banner: result });
    } else dispatch({ type: GET_BANNER_FAILED, error: "Something went wrong" });
  };
};
