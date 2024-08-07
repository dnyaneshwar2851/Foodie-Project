import { useEffect, useState } from "react";
import '../App.css';
import RestaurantCard from "./ResturantCard"
import { useSelector, useDispatch } from "react-redux";
import { setRecordUpdated } from "../utils/restaurantSlice";

const RestaurantInfo = () => {
    const [restaurants, setRestaurants] = useState([]);
    const isRecordUpdated = useSelector(store => store.resReducer.isRecordUpdated);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRestaurantInfo();
    }, []);

    useEffect(() => {
        if (isRecordUpdated) {
            fetchRestaurantInfo();
        }
    }, [isRecordUpdated]);

    const fetchRestaurantInfo = async () => {
        const response = await fetch('http://localhost:5111/restaurants');
        const json = await response.json();
        setRestaurants(json);
        dispatch(setRecordUpdated(false));
    }

    return (
        <div className="container my-4">
            <div className="row">
                {restaurants.length ? restaurants.map(restaurant => (
                    <div className="col-md-4 mb-4" key={restaurant.id}>
                        <RestaurantCard restaurantDetail={restaurant} />
                    </div>
                )) : <h1 className="text-center">No Restaurants Found at the moment</h1>}
            </div>
        </div>
    );
}

export default RestaurantInfo;
