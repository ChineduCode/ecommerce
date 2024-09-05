import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function Rating({ rating }){
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
    
        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoMdStar key={i} size={22}/>);
        }
    
        if (hasHalfStar) {
            stars.push(<IoMdStarHalf key="half" size={22}/>);
        }
    
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars.push(<IoMdStarOutline key={i} size={22}/>);
        }
    
        return stars;
    };

    return(
        <div className="rating"> {renderStars(rating)} </div>
    )
}
