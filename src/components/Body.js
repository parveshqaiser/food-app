
import React, {useEffect, useState } from "react";
import { NEW_REST_LIST, OLD_LIST} from "../utils/constants";
import RestaurantsCard, { withPromotedRestaurantCard } from "./RestaurantsCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { LOADING_REST_LIST } from "../utils/constants";

// https://corsproxy.io/?

const Body = ()=>{

    // let arr = useState([]);
    // let [filterData , setFilterData] = arr;
    // filterDta is a container to store data , second is function to update the store.

    const [apiData , setApiData] = useState([]);
    const [restaurantsList , setRestaurantsList] = useState([]);
    const [findText, setTFindText] = useState("");
    const [isLoading , setIsLoading] = useState(true);

    const isOnline = useOnlineStatus();
    const RestaurantsCardPromoted = withPromotedRestaurantCard(RestaurantsCard);


    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData()
    {
        try{
            let res = await fetch(NEW_REST_LIST);
            let data = await res.json();
            setApiData(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants); // to keep for searching & filtering
            setRestaurantsList(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setIsLoading(false);
        }
        catch(err){
            console.log(err);
        }
       
    }

    function handleSearch()
    {
        let filterByName = apiData.filter(val => val.info.name.toLowerCase().includes(findText.toLowerCase()));
        setRestaurantsList(filterByName);
    }

    function handleFilterByRating(e)
    {
        let value = e.target.value;
        console.log(value); 
        if(value !=="")
        {
            let filterByRating = apiData.filter(val => val.info.avgRating >= value);
            setRestaurantsList(filterByRating);
        }
       
    }

    if(isOnline == false)
    {
        return<h2 className="text-center text-2xl">You're Offline. Please Check your network connection.</h2>
    }

    if(isLoading)
    {
        // return<h2 className="text-center">Please Wait. Your Favorite...</h2>
        return <div className="w-[280px] text-center mx-auto"><img src={LOADING_REST_LIST} /></div>
    }

    // if(apiData.length === 0)
    // {
    //     return <Shimmer val={123} cat="meow" />
    // }


    return(
        <div className="body">
            <div className="flex w-full">
                <div className="search m-1 p-1 w-3/12 ">
                    <input type="text" 
                        className="border border-gray-300 focus:border-purple-500 focus:outline-none p-1 rounded" 
                        placeholder="Search Restaurant" 
                        onChange={(e)=>setTFindText(e.target.value)}
                    />
                    <button className="btn-search px-2 py-1 mx-2 bg-green-200 rounded-md" onClick={handleSearch}>Search</button>
                    <h3 className="mt-4 font-light">Filter By Rating</h3>
                    <div>
                        <select onChange={handleFilterByRating} 
                            className="text-sm mt-2 rounded-lg block w-full p-2.5 bg-gray-100 hover:bg-gray-200 outline-none">
                            <option value="">Select Rating</option>
                            <option value="4.5">Above 4.5 ⭐</option>
                            <option value="4.0">4.0 & Above ⭐</option>
                            <option value="3.5">3.5 & Above ⭐</option>
                        </select>
                    </div>
                   
                </div>
                <div className="rest-container w-9/12 flex flex-wrap"> 
                    {
                        restaurantsList.length ? restaurantsList.map((val)=>{
                            return <Link id="body-link" to={"/rest/"+ val.info.id} key={val.info.id}> 
                                {val.info.isOpen ? <RestaurantsCardPromoted data={val} /> :<RestaurantsCard  data={val} />}
                            </Link>
                        }) : <p className="p-2 m-2 font-semibold">Search Result Not found.</p>
                    }
                </div>
            </div>
        </div>
    )
};

export default Body;

 // arr.map(val => <RestaurantsCard data={val}/>)
 //<button className="btn-filter px-2 py-1 mx-2 bg-gray-200 rounded-md" onClick={handleFilterByRating}>Top Restaurant</button>
