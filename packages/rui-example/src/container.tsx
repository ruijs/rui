import { memo } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import routes from "./routes";

const Container = memo(() => {
  const params = useParams<{ pkgName: string; funcName: string }>();

  const currentRoute = routes.find((r) => r.name === params.pkgName);
  if (!currentRoute) {
    const firstRoute = routes[0];
    return <Navigate to={`/${firstRoute.name}/${firstRoute.examples[0]?.name}`} />;
  }

  const currentExample = currentRoute.examples.find((e) => e.name === params.funcName);
  if (!currentExample) {
    return <Navigate to={`/${currentRoute.name}/${currentRoute.examples[0]?.name}`} />;
  }

  return <Outlet />;
});

export default Container;
