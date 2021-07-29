// zhenghan - overall skeleton
// kharthik - follow components
import React from "react";

import { Grid } from "@material-ui/core";

import UserDisplayCard from "../user_display";

function UserProfile() {
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={{ minHeight: "90vh" }}
    >
      <UserDisplayCard />
    </Grid>
  );
}

export default UserProfile;
