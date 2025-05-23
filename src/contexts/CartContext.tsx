import { createContext, useState, type ReactNode } from "react";
import type { IProducts } from "../pages/home";


interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: IProducts) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}






export const CartContext = createContext({} as CartContextData)


const CartProvider = ({ children }: CartProviderProps) => {

  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState('');




  const addItemCart = (newItem: IProducts) => {

    const indexItem = cart.findIndex(item => item.id === newItem.id)
    
    if(indexItem !== -1){

      const cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      totalResultCart(cartList)

      return;
    }

    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data])
    totalResultCart([...cart, data])

  }

  const removeItemCart = (product: CartProps) => {
    const indexItem = cart.findIndex(item => item.id === product.id)

    if(cart[indexItem]?.amount > 1) {
      const cartList = cart;
      
      cartList[indexItem].amount = cartList[indexItem].amount -1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList)
      return;

    }

    const removeItem = cart.filter(item => item.id !== product.id)
    setCart(removeItem)
    totalResultCart(removeItem)

  }

  const totalResultCart = (items: CartProps[]) => {

    const myCart = items;

    const result = myCart.reduce((acc, obj) => { 
      return acc + obj.total;
    },0)

    const resultFormat = result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    setTotal(resultFormat);

  }


  return(
    <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total}}>
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider