import React from "react";
import { REST_IMAGE_URL } from "../utils/constants";

// if we want to give our own specific width we can give by w-[250px]


const RestaurantsCard = (props)=>{
    let {name , locality, avgRating, cuisines, cloudinaryImageId} = props?.data?.info;

    return(
        <div className="rest-card w-[215px] p-2 m-2 bg-gray-100 hover:bg-gray-200 rounded-md">
            <img className="food-img rounded-md" src={REST_IMAGE_URL+"/"+cloudinaryImageId} alt="" />
            <h4 className="font-semibold text-red-500">{name}</h4>
            <p>{cuisines.join(", ")}</p>
            <p> Loc :{locality}</p>
            <p>Avg Rating : {avgRating} ⭐</p>
        </div>
    )
};

export const withPromotedRestaurantCard =(RestaurantsCard)=>{
    return (props)=>{
        return(
            <div>
                <label className="absolute text-white bg-black p-1 m-0 rounded-md">Promoted</label>
                <RestaurantsCard {...props} />
            </div>
        )
    }

    // return((props)=>{
    //     return(
    //         <div>
    //         <label className="absolute text-white bg-black p-1 m-0 rounded-md">Promoted</label>
    //         <RestaurantsCard {...props} />
    //     </div>
    //     )
    // })
}

export default RestaurantsCard;