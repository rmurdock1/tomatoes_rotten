import Immutable from 'immutable';
import * as types from './../actions/types';

const initialState = new Immutable.Map({
  searchText: '',
  movies: new Immutable.List(),
  comments: []
});


const moviereducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TEXT:
      return state.set('searchText', action.text);
    case types.SEARCH_COMPLETE:
      return state.set('movies', new Immutable.List(action.movies));
    case types.LOAD_SINGLE_COMPLETE:
      return state.set('selectedMovie', action.movie);
      case types.COMMENT_SUCCESS:
        return state.set('selectedMovieComments', action.comments);
    case types.PERFORM_SEARCH:
      // Clear the search while a new one is running.
      return state.delete('selectedMovie').set('movies', new Immutable.List());
    default:
      return state;
  }
}

export default moviereducer;
