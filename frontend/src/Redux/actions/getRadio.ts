import {store} from 'AppProvider';

import {GET_ALL_RADIO, GET_ALL_RADIO_FAILED} from 'src/assets';
import {GET, GetItemsResponseBody, ItemCategory, useFilter} from 'src/API';

export const getAllRadio = () => {
  const {filter} = useFilter({category: ItemCategory.Radio});
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({endpoint: `/api/items${filter}`});

      if (res.status === 200) {
        dispatch({
          type: GET_ALL_RADIO,
          radio: res.data as GetItemsResponseBody,
          loadingRadio: false,
        });
      } else throw Error;
    } catch (error) {
      dispatch({
        type: GET_ALL_RADIO_FAILED,
        error: 'Something went wrong',
        loadingRadio: false,
      });
    }
  };
};
