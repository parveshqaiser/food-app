
import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data , open , setShowIndex})=>{

    function handleToggle()
    {
        setShowIndex();
    }

    return(
        <>
            <div className="m-4 p-2 w-6/12 mx-auto shadow-md bg-gray-100">
                <div className="flex justify-between cursor-pointer" onClick={handleToggle}>
                    <span className="font-semibold text-md">{data.title} ({data.itemCards.length})</span>
                    <span>⬇️</span>
                </div>
                {open && <ItemList  list={data.itemCards}/>}
            </div>
        </>
    )
}

export default RestaurantCategory;