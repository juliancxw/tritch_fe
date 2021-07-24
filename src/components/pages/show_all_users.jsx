import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Contexts/auth_context";

export default function AllUsers(props) {
  // allow authenticated user to see the profiles of all users
  // picture, firstName lastName, link that brings them to a dashboard view of the user

  const { isAuth } = useContext(AuthContext);

  return;
}
