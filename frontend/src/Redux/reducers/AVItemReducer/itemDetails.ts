import {GETItemDetailsResponseBody} from 'src/API';

export enum ItemDetailEnum {
  GET_ITEM_DETAILS = 'GET_ITEM_DETAILS',
  GET_ITEM_DETAILS_FAILED = 'GET_ITEM_DETAILS_FAILED',
}

export type ItemDetailsActions = {
  type: ItemDetailEnum;
  loadingItemDetail: boolean;

  itemDetails?: GETItemDetailsResponseBody;
  error?: Error;
};

const initialState = {
  type: ItemDetailEnum.GET_ITEM_DETAILS,
  loadingItemDetail: true,
};

export const itemDetails = (
  state: ItemDetailsActions = initialState,
  action: ItemDetailsActions,
) => {
  switch (action.type) {
    case ItemDetailEnum.GET_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: action.itemDetails,
        loadingItemDetail: action.loadingItemDetail,
      };
    case ItemDetailEnum.GET_ITEM_DETAILS_FAILED:
      return {
        ...state,
        error: action.error,
        loadingItemDetail: action.loadingItemDetail,
      };

    default:
      return state;
  }
};
