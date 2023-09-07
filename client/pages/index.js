import httpClient from "../api/http-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await httpClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
