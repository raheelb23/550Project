import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import LandingPage from './pages/LandingPage';
import BasicSearch from './pages/BasicSearch';
import WatchListPage from './pages/WatchListPage';
import AllShowsPage from './pages/AllShowsPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/basic" element={<BasicSearch />} />
      <Route exact path="/shows" element={<AllShowsPage />} />
      <Route exact path="/watchlist" element={<WatchListPage />} />
      <Route exact path="/advancedsearch" element={<AdvancedSearchPage />} />

    </Routes>
  </Router>
  ,
  document.getElementById('root')
);

