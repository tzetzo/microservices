import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/Header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// Next.js specific; executed during the server side rendering or from Browser; for fetching data with Next.js
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx); // different from a page
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  // not all of our pages have getInitialProps defined
  // manually invoke it here for all the pages that have it defined
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;
