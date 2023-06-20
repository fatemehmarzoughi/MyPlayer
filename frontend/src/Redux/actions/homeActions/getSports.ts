import {store} from 'AppProvider';

import {GET_ALL_SPORTS, GET_ALL_SPORTS_FAILED} from 'src/assets';
import {GET, GetItemsResponseBody, ItemCategory, useFilter} from 'src/API';

export const getAllSports = () => {
  const {filter} = useFilter({category: ItemCategory.Sport});
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({endpoint: `/api/items${filter}`});
      if (res.status === 200) {
        dispatch({
          type: GET_ALL_SPORTS,
          radio: res.data as GetItemsResponseBody,
          loadingSports: false,
        });
      } else throw Error;
    } catch (error) {
      dispatch({
        type: GET_ALL_SPORTS_FAILED,
        error: 'Something went wrong',
        loadingSports: false,
      });
    }
  };
};
