import jwt_decode from "jwt-decode";

function decodeToken(token) {
  if (!token) {
    console.log("lol no token");
    return;
  }

  const decodedToken = jwt_decode(token);

  const decodedUserId = decodedToken.userID;

  console.log(decodedUserId);
  return decodedUserId;
}

export default decodeToken;
