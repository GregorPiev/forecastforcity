import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Home from './pages/home/index';
import HomeRoute from './pages/home/router';
import AboutRoute from './pages/about/router';
import ForecastRoute from './pages/forecast/router';
import ContactRoute from './pages/contact/router';

export default (
        <Route component={App} path={App.path} >
            <IndexRoute component={Home} />
            { HomeRoute }
            { AboutRoute }
            {ForecastRoute }
            {ContactRoute}
            <Route path='*' component={ Home } />
        </Route>

        );
