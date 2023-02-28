// import { format } from "date-fns"
import {db} from '../config/firebase'
import {deleteDoc, doc} from 'firebase/firestore'
import { useState } from 'react';



export default function Myimage({ id, image }) {
  const [msg, setMsg] = useState(false)

  const deleteImage = async(id)=>{
    try{
     const imageDoc =  await doc(db,'myimages', id)
      await deleteDoc(imageDoc)
      setMsg(true)
    }catch(err){
      console.log(err)
    }
  }

    return (
      <>
        <div className="p-5 rounded-3xl shadow-md bg-white m-4">
          {msg &&  <p className='text-blue-500 bg-blue-300 m-3 p-2 rounded-md'>Deleted !</p> }
         
          <article key={id} className="rounded-3xl">
            <img
              src={image}
              alt={id}
              className="h-52 object-fit object-cover w-full lg:h-80 rounded-3xl"
            />
            <button className='text-white bg-red-600 px-8 py-2 inline-block m-5 rounded-md hover:text-red-600 hover:bg-white border-red-600 border-2' onClick={()=>deleteImage(id)}>Delete</button>
  
          </article>
        </div>
      </>
    )
  }
  