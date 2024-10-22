import React, { useContext, useRef } from "react";
import { postStore } from '../store/PostStore';


const CreatePost = () => {
  const { postNewBlog,sideBarTagActive  } = useContext(postStore)
  const userIdRef = useRef("");
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const tagsRef = useRef("");
  const likesRef = useRef("");
  const disLikesRef = useRef("");
  const viewsRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = Number(userIdRef.current.value);
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const tags = tagsRef.current.value.split("#");
    const likes = Number(likesRef.current.value);
    const dislikes = Number(disLikesRef.current.value);
    const views = Number(viewsRef.current.value);

    postNewBlog({
      userId,
      title,
      body,
      tags,
      reactions: { likes, dislikes },
      views,
    });

    userIdRef.current.value = "";
    titleRef.current.value = "";
    bodyRef.current.value = "";
    tagsRef.current.value = "";
    likesRef.current.value = "";
    disLikesRef.current.value = "";
    viewsRef.current.value = "";
  };
  if(sideBarTagActive === "home"){
    return (
      <form
        className="d-flex flex-column justify-content-center align-items-center w-100"
        style={{ height: `${"100vh"}` }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="userId">UserID</label>
        <input type="number" className="formInp" ref={userIdRef} />
  
        <label htmlFor="Title">Title</label>
        <input type="text" className="formInp" ref={titleRef} />
  
        <label htmlFor="Body">Body</label>
        <textarea type="text" rows={4} cols={50} ref={bodyRef} />
  
        <label htmlFor="Tags">Tags</label>
        <input
          type="text"
          className="formInp"
          ref={tagsRef}
          placeholder="put a #tag after every tag"
        />
  
        <label htmlFor="Reactions">Likes</label>
        <input type="number" className="formInp" ref={likesRef} />
  
        <label htmlFor="Reactions">Dislikes</label>
        <input type="number" className="formInp" ref={disLikesRef} />
  
        <label htmlFor="views">views</label>
        <input type="number" className="formInp" ref={viewsRef} />
  
        <button type="submit" className="btn btn-dark my-4 px-5">
          POST
        </button>
      </form>
    );
  }
};

export default CreatePost;
