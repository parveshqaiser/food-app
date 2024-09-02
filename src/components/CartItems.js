
import { useDispatch , useSelector} from "react-redux";
import { REST_IMAGE_URL } from "../utils/constants";
import { clearCart , removeItem } from "../utils/cartSlice";
import { ToastContainer, toast } from "react-toastify";
// import {TrashIcon} from "@heroicons/react/outline/TrashIcon"
import TrashIcon from "@heroicons/react/outline/TrashIcon";
import { EMPTY_CART_IMAGE } from "../utils/constants";

const CartItems = ()=>{

    let cartList = useSelector(store => store.cart.items);

    let dispatch = useDispatch();
    let day = new Date().getDay();
    let days = ["Sunday","Monday", "Tuesday" ,"Wednesday", "Thursday","Friday","Saturday",];
    let discountDays = ["5%", "10%", "15%", "20%","25%","30%" ,"50%"];


    function handleRemoveAll()
    {
        dispatch(clearCart());
        toast.success("Your Cart Items has been Removed");
    }

    function handleRemoveItem(index,name)
    {
        dispatch(removeItem(index));
        toast.success(name +" "+ "Removed");
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
    {/* <h2 className="bg-blue-200 text-center text-md">Welcome to Cart Items</h2> */}
    <div className="flex justify-around mt-4">
        <div className="w-3/5">
        {
            cartList.length ? cartList.map((item,index)=>(
                <div className="text-left flex justify-between border-gray-200 hover:bg-gray-300 border-b-4" key={item.card.info.id}>
                    <div className="w-9/12 px-2">
                        <span className="font-semibold">{item.card.info.name} </span>
                        {console.log(item.card)}
                        <span>&nbsp;&#8377; {item.card.info.price/100 || item.card.info.defaultPrice/100}</span>
                        <p className="text-sm">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 pt-2 px-2">
                        <img className="border rounded-md" src={REST_IMAGE_URL+"/"+item?.card?.info?.imageId} /> 
                        <div className="my-1">
                            <TrashIcon onClick={()=>handleRemoveItem(index,item.card.info.name)} className="h-6 w-6 text-red-800 cursor-pointer outline outline-1"/>
                        </div>             
                    </div>
                </div>
            )) : <div className="w-[300px] mx-auto my-2">
                <p className="text-gray-600 font-semibold text-xl text-center mb-2">Your Cart is Empty !</p>
                <img src={EMPTY_CART_IMAGE} />
            </div>
        }
        </div>
        <div className={`w-3/12 sticky top-0 ${cartList.length == 0 ? "h-0" : "h-1/3"}`}>
            <button 
                disabled={cartList.length ==0 ? true : false} 
                className="cursor-pointer w-full bg-red-500 text-white hover:bg-red-700 p-2 m-1 disabled:cursor-not-allowed"
                onClick={handleRemoveAll}
                >
                    Remove All Cart Items
            </button>
            <div class="cart-summary">
            {cartList.length!=0 && (
                <>
                <p className="text-lg">Total Items : {cartList.length}</p>
                <p className="text-lg">Total Bill : &#8377; {cartList.reduce((cur,next)=> cur + (next.card.info.price || next.card.info.defaultPrice),cur=0)/100} </p>
                <p className="text-lg font-semibold text-green-900"> Discount : {discountDays[day]} Enjoy {days[day]} Discount </p>
                <p className="font-bold">Pay Amount : {Math.floor((cartList.reduce((cur,next)=> cur + (next.card.info.price || next.card.info.defaultPrice),cur=0)/100)- (cartList.reduce((cur,next)=> cur + (next.card.info.price || next.card.info.defaultPrice),cur=0)/100) * (parseFloat(discountDays[day])/100))}</p>
                <p className="mt-2">
                    <button className="w-full bg-orange-300 p-2">Proceed To Payment</button>
                </p>
                </>
            )}              
            </div>
        </div>
    </div>
    </>
    )
}

export default CartItems;
//let f = r.reduce((cur, next) => cur + ((next.info.price || next.info.dPrice || 0)), 0);
// console.log(f);

// https://course.greatstack.dev/learn/JavaScript-Complete-Course
// https://docs.google.com/forms/d/e/1FAIpQLSdkg_h3JMA7aaUZYnpflwWjEXlVWzo0Z26MRQNEyORg3yiZ9g/viewform