import { useContext, useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api"
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export interface IProducts {
  id: number, 
  title: string;
  description:string; 
  price: number;
  cover: string;
}



const Home = () => {

  const [products, setProducts] = useState<IProducts[]>([])

  const { addItemCart } = useContext(CartContext)

  useEffect(()=>{

    const getProducts = async () => {
      const response = await api.get('/products')
      setProducts(response.data)
    }
    getProducts();

  },[])


  const handleAddCartItem = (product: IProducts) => {
    
    addItemCart(product)
    toast.success('Produto adicionado no carrinho.', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#fff'
      }
    })

  }







  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">

          {products && products.map((product)=> (
            <section key={product.id} className="w-full">
              <Link to={`/product/${product.id}`}>
                <img className="w-full rounded-lg max-h-70 mb-2" src={product.cover} alt={product.title} />        
              </Link>
              <p className="font-medium mt-1 m-b">{product.title}</p>

              <div className="flex gap-3 items-center">
                <strong className="text-zinc-900 p-1 rounded">
                  {product.price.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </strong>
                <button className="bg-zinc-900 p-1 rounded cursor-pointer hover:bg-zinc-600" onClick={()=>handleAddCartItem(product)}>
                  <BsCartPlus size={20} color="#fff"/>
                </button>
              </div>
            </section>
          ))}

        </div>
      </main>
    </div>
  )
}

export default Home