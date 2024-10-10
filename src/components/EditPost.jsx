import React, { useRef, useState } from 'react'

const EditPost = () => {
    const [getuserId, setuserId] = useState("");
    const [gettitle, settitle] = useState("");
    const [getbody, setbody] = useState("");
    const [gettags, settags] = useState("");
    const [getreactions, setreactions] = useState("");
    const [getviews, setviews] = useState("");


    const handleSubmit =(e) => {
        e.preventDefault();

const userId =  getuserId;
const title =  gettitle;
const body =  getbody;
const tags =  gettags;
const reactions =  getreactions;
const views =  getviews;



    }
  return (
    <form  className='d-flex flex-column justify-content-center align-items-center w-100' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="userId">UserID</label>
        <input type="number" className='formInp' onChange={(e) => setuserId(e.target.value)}/>

        <label htmlFor="Title">Title</label>
        <input type="text" className='formInp' onChange={(e) => settitle(e.target.value)}/>

        <label htmlFor="Body">Body</label>
        <textarea type="text" rows={4} cols={50} onChange={(e) => setbody(e.target.value)}/>

        <label htmlFor="Tags">Tags</label>
        <input type="text" className='formInp' onChange={(e) => settags(e.target.value)}/>

        <label htmlFor="Reactions">Reactions</label>
        <input type="number" className='formInp' onChange={(e) => setreactions(e.target.value)}/>


        <label htmlFor="views">views</label>
        <input type="number" className='formInp' onChange={(e) => setviews(e.target.value)}/>


        <button type='submit' className='btn btn-dark my-4 px-5'>EDIT POST</button>
        <button type='button' className='btn btn-danger px-5'>DON'T EDIT</button>

    </form>
  )
}

export default EditPost
