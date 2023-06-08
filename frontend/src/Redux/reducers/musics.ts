import {GetItemsResponseBody} from 'src/API';
import {GET_ALL_MUSICS, GET_ALL_MUSICS_FAILED} from 'src/assets';

const initialState = {
  loadingMusics: true,
  type: GET_ALL_MUSICS,
};

export type IMusicsAction = {
  type: string;
  loadingMusics: boolean;

  error?: string;
  musics?: GetItemsResponseBody;
};

export const musics = (
  state: IMusicsAction = initialState,
  action: IMusicsAction,
) => {
  switch (action.type) {
    case GET_ALL_MUSICS:
      return {
        ...state,
        loadingMusics: false,
        musics: action.musics,
      };

    case GET_ALL_MUSICS_FAILED:
      return {
        ...state,
        loadingMusics: false,
        error: action.error,
      };

    default:
      return state;
  }
};
