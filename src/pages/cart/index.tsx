import  { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { Link } from "react-router-dom";

const Cart = () => {

  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);


  return (

    <div className="w-full max-w-7xl px-4 mx-auto ">
      <h1 className="font-medium text-2xl text-center my-4">Meu Carrinho</h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium">Ops seu carrinho está vazio...</p>
          <Link className="bg-slate-600 my-3 p-1 px-3 text-white rounded" to='/'>
            Acessar produtos
          </Link>
        </div>
      )}

      {cart && cart.map((product) => (

        <section key={product.id} className="flex items-center justify-between border-b-2 border-gray-300">

          <Link to={`/product/${product.id}`}>
            <img src={product.cover} alt={product.title} className="w-28"/>
          </Link>


          <strong>Preço:{product.price}</strong>


          <div className="flex items-center justify-center gap-3">

            <button 
              className="bg-slate-600 hover:bg-slate-800 w-6 rounded text-white font-medium flex items-center justify-center cursor-pointer"
              onClick={()=> removeItemCart(product)}
            >
              -
            </button>
              {product.amount}
            <button 
              className="bg-slate-600 hover:bg-slate-800 w-6  rounded text-white font-medium flex items-center justify-center cursor-pointer"
              onClick={()=> addItemCart(product)}
            >
              +
            </button>
          </div>

          <strong className="float-right">
            SubTotal: {product.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </strong>
        </section>

      ))}


      {cart.length > 0 && (
        <p className="font-bold mt-4">Total:{total}</p>
      )}


    </div>
  )
}

export default Cart