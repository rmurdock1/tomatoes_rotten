import React from 'react';
import MovieDisplay from './components/movie_display';
import Search from './components/search';
import { BrowserRouter as Router, Route } from 'react-router-dom';



const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Search} />
        <Route exact path="/movies/:movieId" component={MovieDisplay} />
      </div>
    </Router>
  )
};

export default Routes;
