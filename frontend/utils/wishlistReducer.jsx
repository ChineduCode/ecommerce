import axios from "axios";

export default function WishlistReducer(wishlists, action){
    switch (action.type) {
        case 'added':{
            return [
                ...wishlists,
            ]
        }
    
        default:
            break;
    }
}
