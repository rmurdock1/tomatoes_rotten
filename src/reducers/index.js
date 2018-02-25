import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { createForms } from 'react-redux-form';
import MovieDisplay from './../components/movie_display'
import moviereducer from './moviereducer';

const initialUserState = {
  firstName: '',
  lastName: ''
};

const Reducers = combineReducers({
    moviereducer,
    routing: routerReducer,
    ...createForms({
      user: initialUserState,
    })
});

export default Reducers;
