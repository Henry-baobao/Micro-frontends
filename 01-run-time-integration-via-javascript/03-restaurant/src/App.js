import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import styled from "styled-components/macro";
import Restaurant from "./Restaurant";

const defaultHostory = createBrowserHistory();

const MainColumn = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px;
`;

function App({ history = defaultHostory }) {
  return (
    <Router history={history}>
      <MainColumn>
        <Route exact path="/restaurant/:id" component={Restaurant} />
      </MainColumn>
    </Router>
  );
}

export default App;
