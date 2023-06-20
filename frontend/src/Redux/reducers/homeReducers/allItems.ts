import {GetItemsResponseBody} from 'src/API';
import {GET_ALL_ITEMS, GET_ALL_ITEMS_FAILED} from 'src/assets';

const initialState = {
  type: GET_ALL_ITEMS,
  loadingAllItems: true,
};

export type IAllItemsAction = {
  type: string;
  loadingAllItems: boolean;

  error?: string;
  allItems?: GetItemsResponseBody;
};

export const allItems = (
  state: IAllItemsAction = initialState,
  action: IAllItemsAction,
) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        loadingAllItems: false,
        allItems: action.allItems,
      };

    case GET_ALL_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
