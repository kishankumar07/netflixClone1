import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect, useRef, useState } from 'react'

const TitleCards = ({title,category}) => {
    // console.log('this is the category',category)
    const cardsRef = useRef();
    const [apiResponse,setApiResponse] = useState([]);

    const handleWheel = (event)=>{
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };


    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiResponse(response.results))
        .catch(err => console.error('error while fetching:',err));


        cardsRef.current.addEventListener('wheel',handleWheel);
    },[])


      

  return (
    <div className="title-cards">
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className='card-list' ref={cardsRef}>
            {
                apiResponse.map((card,index)=>{
                    return <div className='card' key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                                <p>{card.original_title}</p>
                           </div>
                })
            }
        </div>
    </div>
  )
}

export default TitleCards
