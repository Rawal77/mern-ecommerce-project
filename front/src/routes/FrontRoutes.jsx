import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";

export const FrontRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route
            path="category/:id"
            element={<Pages.Front.Category></Pages.Front.Category>}></Route>
          <Route
            path="brand/:id"
            element={<Pages.Front.Brand></Pages.Front.Brand>}></Route>
          <Route
            path="search"
            element={<Pages.Front.Search></Pages.Front.Search>}></Route>
          <Route index element={<Pages.Front.Home></Pages.Front.Home>}></Route>
        </Route>
        <Route path="*" element={<Pages.Error404></Pages.Error404>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
