import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route
            index
            element={
              <PrivateRoutes
                element={<Pages.Dashboard></Pages.Dashboard>}></PrivateRoutes>
            }></Route>
          <Route path="login" element={<Pages.Login></Pages.Login>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
