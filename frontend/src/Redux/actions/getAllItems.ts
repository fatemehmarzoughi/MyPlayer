import {store} from 'App';
import {GET, GetItemsResponseBody} from 'src/API';
import { GET_ALL_ITEMS, GET_ALL_ITEMS_FAILED } from 'src/assets';

export const getAllItems = () => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({
        endpoint: `/api/items`,
      });
      if (res.status === 200)
        dispatch({
          type: GET_ALL_ITEMS,
          allItems: res.data as GetItemsResponseBody,
          loadingAllItems: false
        });
      else throw Error;
    } catch (err: any) {
      dispatch({
        type: GET_ALL_ITEMS_FAILED,
        error: 'Something went wrong',
        loadingAllItems: false
      });
      throw new Error(err);
    }
  };
};
