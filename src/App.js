import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";

import Layout from "./layouts";

function App() {
  return (
    <Router history={history}>
      <Layout />
    </Router>
  );
}

export default App;
