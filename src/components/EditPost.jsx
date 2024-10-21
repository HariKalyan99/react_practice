import React, { useState } from "react";

const EditPost = ({ editFn, post, editPostFn }) => {
  const [getuserId, setuserId] = useState(post.userId);
  const [gettitle, settitle] = useState(post.title);
  const [getbody, setbody] = useState(post.body);
  const [gettags, settags] = useState(post.tags);
  const [getlikes, setlikes] = useState(post.reactions.likes);
  const [getdislikes, setdislikes] = useState(post.reactions.dislikes);
  const [getviews, setviews] = useState(post.views);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = getuserId;
    const title = gettitle;
    const body = getbody;
    const tags = gettags.split(",");
    const likes = getlikes;
    const dislikes = getdislikes;
    const views = getviews;

    editPostFn({userId, title, body, tags, reactions: {likes, dislikes}, views, id:  post.id})
    editFn();
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

      <label htmlFor="likes">Likes</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setlikes(e.target.value)}
        value={getlikes}
      />
      <label htmlFor="dislikes">Dislikes</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setdislikes(e.target.value)}
        value={getdislikes}
      />

      <label htmlFor="views">views</label>
      <input
        type="number"
        className="formInp"
        onChange={(e) => setviews(e.target.value)}
        value={getviews}
      />

      <button type="submit" className="btn btn-dark my-4 p-3">
        EDIT POST
      </button>
      <button
        type="button"
        className="btn btn-warning p-3"
        onClick={() => editFn()}
      >
        DON'T EDIT
      </button>
    </form>
  );
};

export default EditPost;
