
import { useDispatch } from "react-redux";
import { REST_IMAGE_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemList = ({list})=>{

    let dispatch  = useDispatch();
   
    function handleAdd(item , name)
    {
       dispatch(addItem(item));
       toast.success(`${name} Added to Cart` )
    }

    return(
        <>
        <ToastContainer 
            position="top-right"
            autoClose={2300}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
        />
        {
            list.map((item)=>(
                <div className="text-left flex justify-between border-gray-200 border-b-4 p-2 m-2 hover:bg-gray-300 min-h-56" key={item.card.info.id}>
                    <div className="w-9/12">
                        <span>{item.card.info.name} </span>
                        <span>&nbsp;&#8377; {item.card.info.price/100 || item.card.info.defaultPrice/100}</span>
                        {/* {console.log(item.card)} */}
                        <p className="text-sm">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 px-2">
                        <img className="max-h-40" src={REST_IMAGE_URL+"/"+item?.card?.info?.imageId} />
                        <div className="my-1">
                            <button onClick={()=>handleAdd(item, item.card.info.name)} className="text-white bg-black rounded-md p-1">Add +</button>
                        </div>                        
                    </div>
                </div>
            ))
        }
        </>
    )
}

export default ItemList;

/*
<>
<p className="text-left">{val.card.info.name}</p>
<p className="text-left py-1">&#8377; {val.card.info.price/100 || val.card.info.defaultPrice/100}</p>
</>

*/