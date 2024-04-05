import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
          <Route
            path="profile/edit"
            element={
              <PrivateRoutes
                element={
                  <Pages.Profile.Edit></Pages.Profile.Edit>
                }></PrivateRoutes>
            }></Route>

          <Route
            path="profile/password"
            element={
              <PrivateRoutes
                element={
                  <Pages.Profile.Password></Pages.Profile.Password>
                }></PrivateRoutes>
            }></Route>

          <Route
            path="staffs"
            element={
              <PrivateRoutes element={<Outlet></Outlet>}></PrivateRoutes>
            }>
            <Route
              index
              element={<Pages.Staffs.List></Pages.Staffs.List>}></Route>

            <Route
              path="create"
              element={<Pages.Staffs.Create></Pages.Staffs.Create>}></Route>

            <Route
              path=":id/edit"
              element={<Pages.Staffs.Edit></Pages.Staffs.Edit>}></Route>
          </Route>
          <Route path="login" element={<Pages.Login></Pages.Login>}></Route>
        </Route>
        <Route path="*" element={<Pages.Error404></Pages.Error404>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
