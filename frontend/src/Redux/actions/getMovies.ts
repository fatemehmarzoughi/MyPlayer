import {store} from 'AppProvider';

import {GET_ALL_MOVIES, GET_ALL_MOVIES_FAILED} from 'src/assets';
import {GET, GetItemsResponseBody, ItemCategory, useFilter} from 'src/API';

export const getAllMovies = () => {
  const {filter} = useFilter({category: ItemCategory.Movie});

  return async (dispatch: typeof store.dispatch) => {
    const allMoviesRes = await GET({endpoint: `/api/items${filter}`});

    try {
      if (allMoviesRes.status === 200) {
        dispatch({
          type: GET_ALL_MOVIES,
          movies: allMoviesRes.data as GetItemsResponseBody,
          loadingMovies: false,
        });
      } else throw Error;
    } catch (error) {
      dispatch({
        type: GET_ALL_MOVIES_FAILED,
        error: 'Something went wrong',
        loadingMovies: false,
      });
    }
  };
};
