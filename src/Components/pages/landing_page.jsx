import React from "react";
import WhereNextCard from "../where_next.jsx";

import Container from "@material-ui/core/Container";

export default function LandingPage() {
  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundImage: "url(/provence_france.jpeg)",
        backgroundSize: "cover",
        minHeight: "90vh",
        minWidth: "100vw",
      }}
    >
      <WhereNextCard />
    </Container>
  );
}
