import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  //props coming from getInitialProps below
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// Next.js specific; executed during the server side rendering or from Browser; for fetching data with Next.js
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
