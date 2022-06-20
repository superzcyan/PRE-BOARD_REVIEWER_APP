import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switcher,
  Route,
} from "react-router-dom";
import Main from "../containers/Main";
import PageNotFound from "../containers/PageNotFound";
import { PrivateRoutes } from "../config/PrivateRoutes";
import NavBar from "../containers/NavBar";
const Routes = () => {
  return (
    <Router>
      <Switcher>
        <Route path="/" element={<Main />} />
        {PrivateRoutes.map((p, i) => (
          <Route
            path={p.path}
            element={
              <>
                <NavBar />
                {p.element}
              </>
            }
            key={i}
          />
        ))}
        <Route path="*" element={<PageNotFound />}></Route>
      </Switcher>
    </Router>
  );
};

export default Routes;
