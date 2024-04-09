import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";

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
            path="product/:id"
            element={<Pages.Front.Product></Pages.Front.Product>}></Route>
          <Route
            path="search"
            element={<Pages.Front.Search></Pages.Front.Search>}></Route>
          <Route
            path="register"
            element={<Pages.Auth.Register></Pages.Auth.Register>}></Route>
          <Route
            path="cart"
            element={
              <PrivateRoutes
                element={<Pages.Front.Cart></Pages.Front.Cart>}></PrivateRoutes>
            }></Route>
          <Route
            path="checkout"
            element={
              <PrivateRoutes
                element={
                  <Pages.Front.Checkout></Pages.Front.Checkout>
                }></PrivateRoutes>
            }></Route>
          <Route
            path="login"
            element={<Pages.Auth.Login></Pages.Auth.Login>}></Route>

          <Route index element={<Pages.Front.Home></Pages.Front.Home>}></Route>
        </Route>
        <Route path="*" element={<Pages.Error404></Pages.Error404>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
