import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { setDialogOpen, setRestauranInfo, setRecordUpdated } from '../utils/restaurantSlice';

const RestaurantCard = ({ restaurantDetail }) => {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(store => store.resReducer.isDialogOpen);

    if (!restaurantDetail) {
        return <div className="restuarant">Restaurant details are not available.</div>;
    }

    const { name, description, location, id } = restaurantDetail;

    const editRestaurantInfo = () => {
        if (!isDialogOpen) {
            dispatch(setRestauranInfo({ id, name, description, location }));
            dispatch(setDialogOpen(true));
        }
    }

    const deleteRestaurantInfo = (e) => {
        deleteRecord(Number(e.currentTarget.getAttribute('data-id')));
    }

    const deleteRecord = async (restaurantId) => {
        const response = await fetch(`http://localhost:5111/restaurants/${restaurantId}`, { method: "DELETE" });

        if (response.ok) {
            dispatch(setRecordUpdated(true));
        } else {
        }
    }

    return (
        <div className="restuarant">
            <h3 style={{ textAlign: 'center' }}>{name}</h3>
            <div className="icon-container">
                <DeleteIcon data-id={id} onClick={deleteRestaurantInfo} />
                <EditIcon data-id={id} onClick={editRestaurantInfo} />
            </div>
            <hr />
            <p>{description}</p>
            <p>{location}</p>
        </div>
    )
}

export default RestaurantCard;
