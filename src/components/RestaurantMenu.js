
import React , {useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { LOADING_FOOD_GIF } from "../utils/constants";

// 425, 229 , 234

// the purpose of writing custom hook is that this component is only doing the job of displaying the data to the UI.

const RestaurantMenu = ()=>{

    const [showIndex , setShowIndex] = useState(0);
    const {id} = useParams(); //  in curly braces , it is called de- structuring on the fly{}s

    let {menuList,list , isLoading } = useRestaurantMenu(id);

    let category =  list?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(val => val.card.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    if(isLoading == true)
    {
        // return<h2 className="text-center text-xl">Please Wait.. Preparing Restaurant Items</h2>
        return <div className="w-[280px] mx-auto my-4"><img src={LOADING_FOOD_GIF} /></div>
            
    }

    return(
        <React.Fragment>
            <div className="menu text-center">
                <h3 className="font-black mx-2">{menuList.name}</h3>
                <p className="font-semibold">{menuList.cuisines.join(", ")}</p>
                <p>{menuList.costForTwoMessage}</p>
                {
                    category && category.map((cat, index) => (
                        <RestaurantCategory 
                            key={index} 
                            data={cat?.card?.card} 
                            open={showIndex == index ? true : false}
                            setShowIndex={()=>setShowIndex(index)}
                        />
                    ))
                }
            </div>
        </React.Fragment>
    )
};

export default RestaurantMenu;
