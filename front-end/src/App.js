import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './components/navigation/Navigation';
import { AppStyles } from './App.styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './View/HomePage/Home';
import CataloguePage from './View/CatalogPage/CatalogPage.js';
import Dashboard from './View/NewAnalyticPlots/Dashboard';
import VolcanoDetailPage from './View/VolcanoDetailPage/VolcanoDetailPage';
import ContributePage from './View/ContributePage/ContributePage.js';
function App() {
  const classes = AppStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Navigation />
        <main className={classes.main}>
          <Routes>
            <Route path="/volcano/:volc_name" element={<VolcanoDetailPage/>}/>
            <Route path={'/catalogue'} element={<CataloguePage/>}/>
            <Route path={'/analytic'} element={<Dashboard/>}/>
            {/* <Route path={'/contribute'} element={<ContributePage/>}/> */}
            <Route path={'/'} element={<Home/>}/>
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
 