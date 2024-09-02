import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function CustomerReview({reviews}){
    const { rating, name, review } = reviews

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
        <div className='review-content'>
            <div className="rating">
                {renderStars(rating)}
            </div>
            <div className="review"> {review} </div>
            <div className="name"> {name} </div>
        </div>
    )
}
