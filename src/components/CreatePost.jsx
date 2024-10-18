import React, { useRef } from "react";

const CreatePost = ({ height }) => {
  const userIdRef = useRef("");
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const tagsRef = useRef("");
  const reactionsRef = useRef("");
  const viewsRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = userIdRef.current.value;
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const tags = tagsRef.current.value;
    const reactions = reactionsRef.current.value;
    const views = viewsRef.current.value;
  };
  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{ height: `${height}` }}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="userId">UserID</label>
      <input type="number" className="formInp" ref={userIdRef} />

      <label htmlFor="Title">Title</label>
      <input type="text" className="formInp" ref={titleRef} />

      <label htmlFor="Body">Body</label>
      <textarea type="text" rows={4} cols={50} ref={bodyRef} />

      <label htmlFor="Tags">Tags</label>
      <input type="text" className="formInp" ref={tagsRef} />

      <label htmlFor="Reactions">Reactions</label>
      <input type="number" className="formInp" ref={reactionsRef} />

      <label htmlFor="views">views</label>
      <input type="number" className="formInp" ref={viewsRef} />

      <button type="submit" className="btn btn-dark my-4 px-5">
        POST
      </button>
    </form>
  );
};

export default CreatePost;
