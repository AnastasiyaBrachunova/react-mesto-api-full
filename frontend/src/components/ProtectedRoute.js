// ProtectedRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./Main";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = (props) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Main {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;