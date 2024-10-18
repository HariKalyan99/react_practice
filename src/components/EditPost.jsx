import React, { useRef, useState } from "react";

const EditPost = ({ editFn, post }) => {
  const [getuserId, setuserId] = useState(post.userId);
  const [gettitle, settitle] = useState(post.title);
  const [getbody, setbody] = useState(post.body);
  const [gettags, settags] = useState(post.tags);
  const [getreactions, setreactions] = useState(post.reactions);
  const [getviews, setviews] = useState(post.views);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = getuserId;
    const title = gettitle;
    const body = getbody;
    const tags = gettags;
    const reactions = getreactions;
    const views = getviews;
  };
  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center w-100"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="userId">UserID</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setuserId(e.target.value)}
        value={getuserId}
      />

      <label htmlFor="Title">Title</label>
      <input
        type="text"
        className="formInp"
        onChange={(e) => settitle(e.target.value)}
        value={gettitle}
      />

      <label htmlFor="Body">Body</label>
      <textarea
        type="text"
        rows={4}
        cols={50}
        onChange={(e) => setbody(e.target.value)}
        value={getbody}
      />

      <label htmlFor="Tags">Tags</label>
      <input
        type="text"
        className="formInp"
        onChange={(e) => settags(e.target.value)}
        value={gettags}
      />

      <label htmlFor="Reactions">Reactions</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setreactions(e.target.value)}
        value={getreactions}
      />

      <label htmlFor="views">views</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setviews(e.target.value)}
        value={getviews}
      />

      <button type="submit" className="btn btn-dark my-4 px-5">
        EDIT POST
      </button>
      <button
        type="button"
        className="btn btn-danger px-5"
        onClick={() => editFn()}
      >
        DON'T EDIT
      </button>
    </form>
  );
};

export default EditPost;
