import {store} from 'AppProvider';

import {GET_ALL_MUSICS, GET_ALL_MUSICS_FAILED} from 'src/assets';
import {GET, GetItemsResponseBody, ItemCategory, useFilter} from 'src/API';

export const getAllMusics = () => {
  const {filter} = useFilter({category: ItemCategory.Music});
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({endpoint: `/api/items${filter}`});
      if (res.status === 200) {
        dispatch({
          type: GET_ALL_MUSICS,
          musics: res.data as GetItemsResponseBody,
          loadingMusics: false,
        });
      } else throw Error;
    } catch (error) {
      dispatch({
        type: GET_ALL_MUSICS_FAILED,
        error: 'Something went wrong',
        loadingMusics: false,
      });
    }
  };
};
