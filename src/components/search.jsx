import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, InputGroup, Glyphicon} from 'react-bootstrap';
import {Button, Icon} from 'react-materialize'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import './../style.css';
import * as Actions from './../actions';
import Textbox from './textbox';

const renderMovie = (movie, index) => (
  <div key={index} className="moviebox">
    <Link to={`/movies/${movie.imdbID}`}>
      {`${movie.Title} (${movie.Year})`}
    </Link>
  </div>
);

const Search = (props) => {
  const { performSearch, movies, searchText } = props;
  const renderMovies = () => movies.map(renderMovie);

  return(


//     <div>
//     <div className="searchBar">
//     <FormGroup>
//       <InputGroup>
//         <Textbox />
//         <InputGroup.Addon onClick={() => performSearch(searchText)}>
//           <Glyphicon glyph='search'></Glyphicon>
//         </InputGroup.Addon>
//       </InputGroup>
//     </FormGroup>
//     <div className="searchResults">
//       {renderMovies()}
//     </div>
//   </div>
// </div>

    // </div>
<div className="searchPage">

    <div className="wrap">
      <div className="search">
      <Textbox />
      </div>
      <div className="searchResults">
        {renderMovies()}
      </div>
    </div>

</div>
    // <div>
    //   <div className="searchBar">
    //     <Textbox />
    //     <button className="SearchIcon" onClick={() => performSearch(searchText)}>
    //       Search for movie titles
    //     </button>
    //   </div>
    //   <div className="searchResults">
    //     {renderMovies()}
    //   </div>
    // </div>

  );
};

Search.propTypes = {
  performSearch: PropTypes.func,
  movies: PropTypes.instanceOf(Immutable.List),
  searchText: PropTypes.string

};

function mapStateToProps(state) {
  return {
    searchText: state.get('searchText', ''),
    movies: state.get('movies', new Immutable.List()),
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Search);
