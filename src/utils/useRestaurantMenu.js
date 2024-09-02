
import { useEffect ,useState} from "react";
import { MENU_URL} from "./constants";

// please refer bottom code for reference

// the purpose of writing custom hook is that this hook is only fetching data.
const useRestaurantMenu =(id)=>{

    const [menuList , setMenuList] = useState(null);
    const [list , setList] = useState(null);
    const [isLoading , setIsLoading] = useState(true)

    useEffect(()=>{
        fetchData();
    },[id]);

    async function fetchData()
    {
        try{
            let data = await fetch(`${MENU_URL}${id}`);
            let jsonData = await data.json();
            setMenuList(jsonData?.data?.cards[2].card?.card?.info);
            setList(jsonData.data);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
       
    }
    return {
        menuList,
        list,
        isLoading
    };
}

export default useRestaurantMenu;

// setList(jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);

/* 
jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards , cards is an array.

    now cards[2] contains recommend items
    cards [3] contains Rice and Noddles half, this is after recommend

    note title name will change every day.

*/
 
