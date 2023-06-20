import {GetItemsResponseBody} from 'src/API';
import {GET_ALL_RADIO_FAILED, GET_ALL_RADIO} from 'src/assets';

const initialState = {
  loadingRadio: true,
  type: GET_ALL_RADIO,
};

export type IRadioActions = {
  type: string;
  loadingRadio: boolean;

  error?: string;
  radio?: GetItemsResponseBody;
};

export const radio = (
  state: IRadioActions = initialState,
  action: IRadioActions,
) => {
  switch (action.type) {
    case GET_ALL_RADIO:
      return {
        loadingRadio: false,
        radios: action.radio,
      };

    case GET_ALL_RADIO_FAILED:
      return {
        loadingRadio: false,
        error: action.error,
      };

    default:
      return state;
  }
};
