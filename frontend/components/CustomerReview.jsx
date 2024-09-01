import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function CustomerReview({reviews}){
    const { rating, name, review } = reviews
    return(
        <div className='review-content'>
            <div className="rating">
                {}
            </div>
            <div className="review"> {review} </div>
            <div className="name"> {name} </div>
        </div>
    )
}
