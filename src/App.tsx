import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Layout from "./components/layout";
import DetailProduct from "./pages/detailProduct";



const routes = createBrowserRouter([

  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/product/:id',
        element: <DetailProduct/>
      },
    ]
  }
])


export { routes }