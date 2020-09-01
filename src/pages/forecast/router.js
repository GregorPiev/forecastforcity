import React from 'react';
import { Route } from 'react-router';
import Forecast from './index';

export default(
        <Route>
            <Route component={Forecast} path={Forecast.path} />
        </Route>
        );
