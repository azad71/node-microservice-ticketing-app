import "bootstrap/dist/css/bootstrap.css";
import httpClient from "../api/http-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = httpClient(appContext.ctx);

  const { data } = await client.get("/api/users/currentuser");
  const pageProps =
    (await appContext?.Component?.getInitialProps?.(appContext.ctx)) ?? {};

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
