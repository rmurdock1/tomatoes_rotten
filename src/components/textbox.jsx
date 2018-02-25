import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as Actions from './../actions';
import {Button, Icon, Input} from 'react-materialize'

import './../style.css';
import React from 'react';
//import { FormControl } from 'react-bootstrap';


const Textbox = (props) => {
  const { searchText, updateText, performSearch } = props;
  return (
    //<Input s={6} label="First Name" validate><Icon>account_circle</Icon></Input>
    <div>
    <Input
      s={15}
      type='text'
      className='search'
      placeholder="Search for a Movie Title"
      value={searchText}
      onChange={updateText}
      onKeyPress={event => {
        if (event.key === 'Enter'){
          performSearch(searchText)
        }
      }}
      validate
      ><Button floating className="searchButton" onClick={() => performSearch(searchText)}><Icon>search</Icon></Button>
  </Input>
  </div>

  // <Icon>search</Icon></Input><button floating large waves='dark' className="searchButton" onClick={() => performSearch(searchText)}>
  // <Icon right>theaters</Icon></button>

);
    // <input
    //   type="text"
    //   placeholder="The Matrix"
    //   value={searchText}
    //   onChange={updateText}
    // />);
};

Textbox.propTypes = {
  updateText: PropTypes.func,
  searchText: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    searchText: state.get('searchText', ''),
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Textbox);
