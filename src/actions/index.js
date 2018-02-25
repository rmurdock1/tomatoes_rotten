import * as types from './types';
import axios from 'axios';

export function performSearch(searchText) {
  return {
    type: types.PERFORM_SEARCH,
    searchText,
  };
}

export function updateText(event) {
  return {
    type: types.UPDATE_TEXT,
    text: event.target.value,
  };
}

export function loadSingle(imdbId) {
  return {
    type: types.LOAD_SINGLE,
    imdbId,
  };
}

export const submitComment = (user, movie_id) => {
	return dispatch => {
			// fetch happens inside load request action creator!
			console.log(user);
			console.log(movie_id);


			axios.get(`/api/comments/`)
          .then(
						res => {
							console.log(res);
							if(res.data !== ''){
								console.log(res.data);
								axios.post(`/api/comments/create/comment`, {
									userId: res.data.id,
                  userName: user.userName,
									comment: user.comment,
									movieId: movie_id
								}).then(
									res => {
										console.log(res);
										axios.get(`/api/comments/${movie_id}`)
													.then(res => {
                            console.log(res.data ,'!!');
                            dispatch(getComments(res.data))
                          })
													.catch(err => dispatch(handleFailure(err)))
									}
								)
							}
							else{
								console.log(res.data);
								axios.post(`/api/users/create/user`, {
							    user: user
							  }).then(
									res => {
										console.log(res);
										axios.post(`/api/comments/create/comment`, {
									    userId: res.data.id,
                      userName: user.userName,
											comment: user.comment,
											movieId: movie_id
									  }).then(
											res => {
												console.log(res);
												axios.get(`/api/comments/${movie_id}`)
									            .then(res => dispatch(getComments(res.data)))
									            .catch(err => dispatch(handleFailure(err)))
											}
										)
									}
								)
								// TO DO: better error handling
								.catch(err => dispatch(handleFailure(err)))
							}
						}
					)
          .catch(err => dispatch(handleFailure(err)))
    }
};

export const handleFailure = (err) => {
	return {
		type: types.OMDB_API_FAILURE,
		errorMessage: err.Error
	};
};


   export const getComments = (jsonData) => {
   	console.log(jsonData);
     return {
       type: types.COMMENT_SUCCESS,
       // anything else you want!!
       // include movies coming from the data
       comments: jsonData
       // TODO: handle edge cases: null response, no search results
     }
   };
