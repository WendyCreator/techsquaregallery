import { useState, useEffect, useContext } from "react"
import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
import Description from './../components/Description';
import {auth} from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import {LoginAuth} from '../config/Context';


export default function Home() {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [searchData, setSearchData] = useState('')
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('Search For Any Image of Choice...')
  const {loggedin, setLoggedin} = useContext(LoginAuth)

  const user = auth.currentUser;

  useEffect(()=>{
    if(!user){
      navigate('/', {replace:true, state:'Please Login to dashboard'})
      return
    }
  }, [])

  

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${searchData}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`
        
      )
      const data = await response.json()
      setImages(data.results)
    }
    fetchImages()
  }, [searchData, page])


 

  const handleSubmit = (e) =>{
   e.preventDefault()
   const formData = new FormData(e.target);
   const search = formData.get('search')
   setSearchData(search)
   setMessage('Here are Your Search Results')


  }

  const handlePageNext = ()=>{
    setPage(prev=>prev + 1)
  }
  const handlePagePrev = ()=>{
    if(page <= 0) return;
    setPage(prev=>prev - 1)
  }

  return (
    <>
      <div className="container mx-auto px-5 2xl:px-0 bg-gray-100 min-h-screen">
       <Header />
        <div className=" w-full">
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="search" className="block my-3 text-gray-700 text-xl">Search Image</label>
                <input type="search" className="w-3/4 mx-auto p-3 focus:outline-none focus:shadow-sm rounded" name="search" id="search" placeholder="Search Images Here..."/>
                <button className="bg-gray-800 text-white p-3 px-5">Search</button>
            </form>
            <h3 className="my-5 bg-black p-5 text-white text-center text-2xl ml-1">{message}</h3>
        </div>
         
        {!images.length ? (
          
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            <Skeleton item={10}/>
           </section>

        ) : (
          <>
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            {images.map((image) => (
              <Description key={image.id} {...image} />
            ))}
        <div className="containe">
          <button className="bg-black text-white py-4 px-12 ml-14 mt-24 rounded-xl hover:bg-white hover:text-black hover:border hover:border-black" onClick={handlePagePrev}>&larr; Prev</button>
          <button className="bg-black text-white py-4 px-12 ml-14 mt-24 rounded-xl hover:bg-white hover:text-black hover:border hover:border-black" onClick={handlePageNext}>Next &rarr;</button>
        </div>

          </section>

         
          </>
        )} 

      </div>
    </>
  )
}
