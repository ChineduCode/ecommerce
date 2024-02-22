import { FaStar, FaStarHalf, FaStarHalfStroke } from 'react-icons/fa6'


export default function Rating({ value, text, color }){
    return(
        <div className="rating">
            <span style={{color}}>
                { value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfStroke /> : <FaStarHalf />  }
            </span>
            <span style={{color}}>
                { value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfStroke /> : <FaStarHalf />  }
            </span>
            <span style={{color}}>
                { value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfStroke /> : <FaStarHalf />  }
            </span>
            <span style={{color}}>
                { value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfStroke /> : <FaStarHalf />  }
            </span>
            <span style={{color}}>
                { value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfStroke /> : <FaStarHalf />  }
            </span>
            <span className='num-reviews'>{text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: 'hsl(26, 100%, 55%)'
}
