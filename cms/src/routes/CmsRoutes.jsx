import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";

export const CmsRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Pages.Dashboard></Pages.Dashboard>}></Route>
          <Route path="login" element={<Pages.Login></Pages.Login>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
