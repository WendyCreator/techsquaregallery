// import { format } from "date-fns"
import {db, auth} from '../config/firebase'
import {collection, addDoc} from 'firebase/firestore'
import { useState } from 'react';


export default function Description({ id, urls, user, created_at, likes }) {

  const userImageCollection = collection(db, 'myimages')
  const [msg, setMsg] = useState(false)

  const addToGallery = async(e)=>{
    try{
      await addDoc(userImageCollection, {
        image:e,
        userid: auth?.currentUser?.uid
      })
      setMsg(true)
    }catch(err){
      console.log(err)
    }
  }

  // allow write, update, delete: if request.auth != null && request.auth.uid == request.resource.data.userId;
  // allow read: if true;

  return (
    <>
    {msg && <p className='text-green-700 bg-green-200 p-5'>Image Saved</p> }
      <div className="p-5 rounded-3xl shadow-md bg-white">
        <article key={id} className="rounded-3xl">
          <img
            src={urls.regular}
            alt={user.username}
            className="h-52 object-fit object-cover w-full lg:h-80 rounded-3xl"
          />

          <div className="p-5 pb-0 flex flex-col md:flex-row items-start md:items-center justify-between">
            <article className="flex items-center justify-start">
              <img
                src={user.profile_image.medium}
                alt={user.username}
                className="rounded-full mr-2 w-10 md:w-auto"
              />
              <ul>
                <li className="text-slate-800 font-bold">{user.name}</li>
                <li className="text-sm text-slate-800 opacity-75">
                  {/* {format(new Date(created_at), "dd MMMM yyyy")} */}
                  <button className="bg-black text-white py-2 px-5 m-4 rounded-sm hover:bg-white hover:text-black hover:border hover:border-black" onClick={()=>{addToGallery(urls.regular)}}>Add to Gallery</button>
                </li>
              </ul>
            </article>

            <article className="mt-5 md:mt-0">
              <a
                href={`https://instagram.com/${user.instagram_username}`}
                className="text-sm text-slate-800 opacity-75 underline"
                target="_blank"
                rel="noreferrer"
              >
                {user.instagram_username}
              </a>
              <small className="text-slate-800 opacity-75 block">
                {likes} Likes
              </small>
            </article>
          </div>
        </article>
      </div>
    </>
  )
}
