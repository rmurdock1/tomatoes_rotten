import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { LocalForm, Control, actions } from 'react-redux-form';

//import { Control, Form, actions } from 'react-redux-form';
import * as Actions from './../actions';

import './../style.css';

//container imports
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {Button, Icon} from 'react-materialize'



const nonTitleFields = ['Rated', 'Plot', 'Released', 'Runtime', 'Genre',
  'Director', 'Writer', 'Language', 'Awards'];

const renderNonTitleFields = (movie) => (
  nonTitleFields.map(field => (
    <div key={field} className="movieField">{field}: {movie[field]}</div>
  ))
);



class MovieDisplay extends Component {

  constructor(props) {
  super(props);
  this.state = {
    comments: []
  };
}

  componentDidMount() {
    this.props.loadSingle(this.props.match.params.movieId);

    axios.get(`/api/comments/`).then(res => {
     this.setState({comments: res.data});
   });

}

	handleSubmit(user) {
		this.props.submitComment(user, this.props.match.params.movieId);
    console.log( this.props.match.params.id);
  }


  render() {
    console.log(this.props);
    const { movie } = this.props;
    const exitButton = <div className="closeButton"><Link to="/"><Icon medium>close</Icon></Link></div>

    if (movie == null) {
      return (
        <div>
          <div>Loading...</div>
          {exitButton}
        </div>
      );
    }
    function Comments({ comments }) {
      return (
    <div>
    {comments.map(comment =>
      <div key={comment.id}>
        <h6 className= 'user'>{comment.user_name}</h6>
        <div className= 'text'>{comment.comment_text}</div>
      </div>
    )}
  </div>
  );
}

    return (
      // TODO: Error handling for nonexistent imdbIds
      <div className = "display">
      <div className="movieDisplay">
        <img src={movie.Poster} alt="Movie Poster" />
        <div className="movieDescription">
          <div><h2>Title: {movie.Title}</h2></div>
          {renderNonTitleFields(movie)}
          <div className="movieField">IMDb Rating: {movie.imdbRating}</div>

        <div></div>
        </div>
        {exitButton}
      </div>
      <div>

      {this.props.comments.length > 0 &&
					<div>
						<h4 className ='commentField'> Comments </h4>
						<ul className='commentList'>
							{Comments(this.props)}
						</ul>
					</div>
			 	}

					<div className = 'commentForm'>
						<h5>Add Comment</h5>
						<LocalForm
		        model="user"
		        onSubmit={(user) => this.handleSubmit(user)}

		      >
		        <label className= 'userName' htmlFor="user.userName">User Name:</label>
		        <Control.text model="user.userName" id="user.userName" />
            <br></br>
		        <label className= 'comment'htmlFor="user.comment">Comment:</label>
		        <Control.text model="user.comment" id="user.comment" />
            <br></br>
		        <Button type="submit">Submit</Button>
		      </LocalForm>
				</div>
      </div>

</div>
    )
  }
}

//Container
MovieDisplay.PropTypes = {
  loadSingle: PropTypes.func,
  params: PropTypes.object,
  movie: PropTypes.object,
  comments: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    movie: state.get('selectedMovie', null),
    comments: state.get('selectedMovieComments', [])
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MovieDisplay);
