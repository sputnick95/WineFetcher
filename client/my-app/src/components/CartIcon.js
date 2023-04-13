import React from "react";

function CartIcon({userCart, userStatus, cart_num}) {

  console.log(userCart.length)

  return (
    <>
        <span className="number-of-orders">{userCart.length}</span>
        
        <svg    
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-shopping-cart"
        >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.1 12.9a2 2 0 0 0 2 1.7h10a2 2 0 0 0 2-1.7L23 6H6" />
        </svg>
    </>
  );
}

export default CartIcon;
