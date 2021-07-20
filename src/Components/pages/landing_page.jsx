import React from "react";
import WhereNextCard from "../where_next.jsx";

import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

function LandingPage() {
  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundImage: "url(/provence_france.jpeg)",
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <WhereNextCard />
    </Container>
  );
}

export default withRouter(LandingPage);
