import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import Public from './Public/Public';
import NotFound from './Public/NotFound';
import Home from './Public/Home';

export default function getRouter(history, store) {
    const ensureAuthenticated = (nextState, replace) => {
        if (store && !store.getState().auth.token) {
            replace('/login');
        }
    };

    const skipIfAuthenticated = (nextState, replace) => {
        if (store && store.getState().auth.token) {
            replace('/');
        }
    };

    const clearMessages = () => {
        store.dispatch({
            type: 'CLEAR_MESSAGES'
        });
    };

    return (
        <Router history={history}>
            <Route path="/" component={Public}>
                <IndexRoute component={Home} onLeave={clearMessages} />
            </Route>
            <Route path="*" component={NotFound} onLeave={clearMessages} />
        </Router>
    );
}
