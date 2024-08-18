import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} =useParams()
  const navigate = useNavigate()

  const [apiResponse,setApiResponse] = useState({
    name:'',
    key:'',
    published_at:'',
    type:'',
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2Q2ZTQ4Y2ZiM2FjODcxNjg4ZDU0YWU5YWFmN2JhNCIsIm5iZiI6MTcyMzk1Nzc0NC4yNDI4NTEsInN1YiI6IjY2YzE4MGRlNjY3ZTFjYTY1MGQ1NDI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YaWzNOeAJqs576qaaWmPQtcL1XxvjgG-_cKcXlZcGFs'
    }
  };


  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiResponse(response.results[0]))
    .catch(err => console.error(err));  
  },[])
  



  return (
    <div className='player'>
       <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
       <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiResponse.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
       <div className="player-info">
          <p>{apiResponse.published_at.slice(0,10)}</p>
          <p>{apiResponse.name}</p>
          <p>{apiResponse.type}</p>
       </div>
    </div>
  )
}

export default Player
