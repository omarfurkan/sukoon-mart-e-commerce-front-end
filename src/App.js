import React, { useEffect } from 'react';
import Home from './pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';



const router = createBrowserRouter([
  {
    path: '/',
    element:
      // <Protected>
      <Home />
    // </Protected>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/cart',
    element:
      // <Protected>
      <CartPage />
    // </Protected>
  },
  {
    path: '/checkout',
    element:
      //  <Protected>
      <Checkout />
    // </Protected>
  },
  {
    path: '/product-detail/:id',
    element:
      //  <Protected>
      <ProductDetailPage />
    // </Protected>
  },
])

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
