import {GetItemsResponseBody} from 'src/API';
import {GET_ALL_SPORTS, GET_ALL_SPORTS_FAILED} from 'src/assets';

const initialState = {
  loadingSports: true,
  type: GET_ALL_SPORTS,
};

export type ISportActions = {
  type: string;
  loadingSports: boolean;

  error?: string;
  sports?: GetItemsResponseBody;
};

export const sports = (
  state: ISportActions = initialState,
  action: ISportActions,
) => {
  switch (action.type) {
    case GET_ALL_SPORTS:
      return {
        ...state,
        loadingSports: false,
        sports: action.sports,
      };

    case GET_ALL_SPORTS_FAILED:
      return {
        ...state,
        loadingSports: false,
        error: action.error,
      };

    default:
      return state;
  }
};
