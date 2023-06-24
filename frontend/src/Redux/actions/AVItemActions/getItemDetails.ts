import {store} from 'AppProvider';
import {GET, GETItemDetailsResponseBody} from 'src/API';
import {ItemDetailEnum} from 'src/Redux/reducers/AVItemReducer';

export type IGetItemDetails = {
  id: number;
};

export const getItemDetails = ({id}: IGetItemDetails) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const res = await GET({
        endpoint: `/api/items/${id}?populate=*`,
      });

      if (res.status === 200) {
        dispatch({
          type: ItemDetailEnum.GET_ITEM_DETAILS,
          itemDetails: res.data as GETItemDetailsResponseBody,
          loadingItemDetail: false,
        });
      } else {
        throw Error;
      }
    } catch (error) {
      dispatch({
        type: ItemDetailEnum.GET_ITEM_DETAILS_FAILED,
        error: Error(String(error)),
        loadingItemDetail: false,
      });
    }
  };
};
