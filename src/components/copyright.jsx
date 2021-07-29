import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Copyright() {
  return (
    <Box className="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link style={{ textDecoration: "none" }} color="inherit" to="/">
          TRITCH
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
