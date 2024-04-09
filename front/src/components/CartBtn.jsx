import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store";
import { toast } from "react-toastify";
import { useState } from "react";

export const CartBtn = ({ product, qty = 1 }) => {
  const cart = useSelector(state => state.cart.value);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(cart);
  const handleCart = () => {
    setLoading(true);
    let id = product._id;
    let qt = qty;
    let price =
      product.discounted_price > 0 ? product.discounted_price : product.price;
    let total = price * qty;
    if (id in cart) {
      qt += cart[id]["qty"];
      total += price * qt;
    }
    dispatch(
      setCart({
        ...cart,
        [id]: {
          product,
          qty: qt,
          total,
          price,
        },
      })
    );
    setLoading(false);
    toast.success("Product added to cart");
  };
  return (
    <button className="btn btn-outline-dark" type="button" onClick={handleCart}>
      <i
        className={`fas ${
          loading ? "fa-spinner fa-spin" : "fa-cart-plus"
        } me-2`}></i>
      Add To Cart
    </button>
  );
};
