import Rating from "./Rating";

export default function CustomerReview({reviews}){
    const { rating, name, review } = reviews

    return(
        <div className='review-content'> 
            <Rating rating={rating} />
            <div className="review"> {review} </div>
            <div className="name"> {name} </div>
        </div>
    )
}
