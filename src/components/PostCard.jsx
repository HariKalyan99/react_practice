import React, { useState } from "react";
import EditPost from "./EditPost";

const PostCard = ({ post }) => {
  const [getEdit, setEdit] = useState(false);

  const editFn = () => {
    setEdit(!getEdit);
  };
  return (
    <div className="postCard col">
      {getEdit ? (
        <EditPost editFn={editFn} post={post}/>
      ) : (
        <div className="card shadow-sm h-100">
          <img
            src="https://mwpt.com.br/wp-content/uploads/2020/02/ilustracao-site-pessoas.jpg"
            alt="blog_img"
          />
          <div className="card-body">
            <h1 className="fw-bold">{post.title}</h1>
            <p className="card-text">{post.body}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                {post.tags.map((tag, ind) => (
                  <button
                    key={ind}
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <small className="text-body-secondary">{post.userId}</small>
              <small className="text-body-secondary">VIEWS-{post.views}</small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => editFn()}
          >
            EDIT
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
