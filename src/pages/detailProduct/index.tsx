import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import type { IProducts } from "../home";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";


const DetailProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<IProducts>();


    const {addItemCart} = useContext(CartContext);


    useEffect(()=>{
  
      const getProduct = async () => {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      }
      getProduct();
  
    },[id])


    const handleAddCartItem = (product: IProducts) => {

      toast.success('Produto adicionado no carrinho.', {
        style: {
          borderRadius: 10,
          backgroundColor: '#121212',
          color: '#fff'
        }
      })

      addItemCart(product);
      navigate('/cart')

    }



  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto my-6">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Detalhes do produto</h1>

        {product && (

          <section className="w-full">

            <div className="flex flex-col lg:flex-row">

              <img src={product?.cover} alt={product?.title} className="flex-1 w-full rounded-lg max-h-72 object-contain"/>

              <div className="flex-1">

                <p className="text-2xl font-medium mt-1 mb-4">smarth watch 500</p>
                <p className="mb-2">{product?.description}</p>

                <strong className="text-zinc-900 p-1 rounded">
                  {product?.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </strong>
                <button className="bg-zinc-900 p-1 rounded cursor-pointer hover:bg-zinc-600 ml-2" onClick={()=>handleAddCartItem(product)}>
                  <BsCartPlus size={20} color="#fff"/>
                </button>
           
              </div>

            </div>

          </section>

        )}
        

      </main>
    </div>
  )
}

export default DetailProduct