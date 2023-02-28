import {useState, useEffect} from 'react'
import Myimage from '../components/Myimage'
import {db, auth} from '../config/firebase'
import {getDocs, collection, addDoc, deleteDoc, doc} from 'firebase/firestore'
import Header from '../components/Header'



const Library = () => {

  const [images, setImages] = useState([])
  const [test, setTest] = useState([])
  const [check, setCheck] = useState(false)
  const user = auth.currentUser

  const userImageCollection = collection(db, 'myimages')


  const getUserImage = async()=>{
    //  Get data from firestore
    try{
      const data = await getDocs(userImageCollection)
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(),
           id:doc.id
      }))

   const theImages = filteredData.filter(doc =>{
    return doc.userid == user.uid
   })
      setImages(theImages)

     
      
    }catch(err){
    console.log(err)
    }
     }

  useEffect(()=>{
    getUserImage()
  },[])

 


  return (
    <>
      <div className="container mx-auto px-5 2xl:px-0 bg-gray-100 min-h-screen">
       <Header />

{!images ? (
          <div>
            <h2 className='text-center text-5xl font-bold mt-10'>No Saved Image...</h2>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            {images.map((image) => (
              <Myimage key={image.image} {...image} />
            ))}
          </section>
        )}
        </div>
    </>
  )
}

export default Library