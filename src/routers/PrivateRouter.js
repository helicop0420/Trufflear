import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isLogged() === 'true' ?
                    (
                        <Component {...props} />
                    )
                    :
                    (
                        <Redirect
                            to={{
                                pathname: '/home',
                            }}
                        />
                    )
            }
        />
    );
}

const isLogged = () => {
    const token = localStorage.getItem('trufflear-token');
    if (!token || token.length == 0) {
        return 'false';
    }
    return 'true';
};
