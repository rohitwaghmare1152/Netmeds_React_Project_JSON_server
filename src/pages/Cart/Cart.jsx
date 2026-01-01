import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart, selectCartCount, selectCartTotal } from '../../redux/slices/cartSelectors'
import { getCart, deleteCart } from '../../redux/actions';

function Cart() {
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const total = useSelector(selectCartTotal);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch])
  return (
    <div>
      <h1>My Cart</h1>
      {cart.map((item) => (
        <div key={item.product_id}>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>₹{item.price}</p>
          <p>₹{item.totalPrice}</p>
          <button onClick={() => dispatch(deleteCart(item.id))}>
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  )
}

export default Cart;
