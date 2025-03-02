import { useDispatch, useSelector } from "react-redux";
import { imgUrl } from "../../lib";
import { useEffect, useState } from "react";
import { clearCart, setCart } from "../../store";
import http from "../../http";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const cart = useSelector(state => state.cart.value);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(cart).length) {
      let tl = 0;
      for (let id in cart) {
        tl += cart[id].total;
      }

      setTotal(tl);
    }
  }, [cart]);

  const handleClear = () => {
    dispatch(clearCart());
  };
  const handleQty = (k, qty) => {
    let price =
      cart[k].product.discounted_price > 0
        ? cart[k].product.discounted_price
        : cart[k].product.price;
    let total = price * qty;
    dispatch(
      setCart({
        ...cart,
        [k]: {
          product: cart[k].product,
          qty,
          price,
          total,
        },
      })
    );
  };
  const handleRemove = k => {
    let temp = { ...cart };
    let newList = {};
    for (let i in temp) {
      if (i != k) {
        newList = {
          ...newList,
          [i]: temp[i],
        };
      }
    }
    dispatch(setCart(newList));
  };
  const handleCheckout = () => {
    setLoading(true);
    let data = [];
    for (let k in cart) {
      data.push({
        product_id: k,
        qty: cart[k].qty,
      });
    }
    http
      .post("checkout", data)
      .then(() => {
        dispatch(clearCart());
        navigate("/checkout");
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Shopping Cart</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          <div className="row">
            {Object.keys(cart).length ? (
              <div className="col-lg-8 col-md-10 col-sm-10 mx-auto table-responsive">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(cart).map(k => (
                          <tr key={k}>
                            <td>
                              <img
                                src={imgUrl(cart[k].product.images[0])}
                                className="img-fluid me-3"
                              />
                              {cart[k].product.name}
                            </td>
                            <td>Rs {cart[k].price}</td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                value={cart[k].qty}
                                onChange={ev => {
                                  handleQty(k, parseInt(ev.target.value));
                                }}
                              />
                            </td>
                            <td>Rs. {cart[k].total}</td>
                            <td>
                              <button
                                className="btn btn-link text-danger"
                                type="button"
                                onClick={ev => {
                                  handleRemove(k);
                                }}>
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="3" className="text-right">
                            Total
                          </th>
                          <th>Rs. {total}</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="col-12 text-right">
                    <button
                      className="btn btn-outline-secondary me-3 d-none"
                      type="submit"
                      onClick={handleClear}>
                      Clear Cart
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      disabled={loading}
                      onClick={handleCheckout}>
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin me-2"></i>
                      ) : null}
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <h4 className="text-center">Shopping cart is empty.</h4>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
