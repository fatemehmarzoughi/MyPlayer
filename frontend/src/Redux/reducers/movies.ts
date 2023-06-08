import {GetItemsResponseBody} from 'src/API';
import {GET_ALL_MOVIES, GET_ALL_MOVIES_FAILED} from 'src/assets';

const initialState = {
  type: GET_ALL_MOVIES,
  loadingMovies: true,
};

export type IMoviesAction = {
  type: string;
  loadingMovies: boolean;

  error?: string;
  movies?: GetItemsResponseBody;
};

export const movies = (
  state: IMoviesAction = initialState,
  action: IMoviesAction,
) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      return {
        ...state,
        loadingMovies: false,
        movies: action.movies,
      };

    case GET_ALL_MOVIES_FAILED:
      return {
        ...state,
        loadingMovies: false,
        error: action.error,
      };

    default:
      return state;
  }
};
