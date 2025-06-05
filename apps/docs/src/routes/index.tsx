import AppLayout from "@/components/AppLayout";
import Introduction from "@/features/introduction";
import { Route, Routes } from "react-router-dom";
import { RoutesDefinition } from "./routeDefinition";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Introduction />}></Route>
        {RoutesDefinition.map((route) => (
          <Route path={route.path} element={route.component}></Route>
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
