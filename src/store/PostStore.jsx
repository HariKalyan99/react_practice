import React, { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const postStore = createContext({
  postList: [],
  sideBarTagActive: "",
  sideBarFn: () => {},
  postNewBlog: () => {},
  deleteFn: () => {},
  editPostFn: () => {},
});

function pureReducerFunction(currentState, action){
    let newPostList = currentState;
    switch(action.type){
        case 'INITIAL_POSTS':
            return newPostList = action.payload.data;
        case 'ADD_POSTS':
            return newPostList = [action.payload.data, ...currentState];
        case 'DEL_POSTS':
            const filterBlogs = currentState.filter((x) => x.id !== action.payload.id);
            return newPostList = filterBlogs;
        case 'EDIT_POSTS':
            const filteredPostList = currentState.filter((x) => x.id !== action.payload.id);
            return newPostList = [action.payload.data, ...filteredPostList]
        default:
            return newPostList;
    }
}

const PostStoreContextProvider = ({ children }) => {
  const [sideBarTagActive, setSideBarTagActive] = useState("home");

//   const [postList, setPostList] = useState("");
  const [getNewBlog, setNewBlog] = useState("");
  const [getDelBlog, setDelBlog] = useState(0);
  const [getEditBlog, setEditBlog] = useState("");

  const navigate = useNavigate();
  const [postList, dispatchReducerFunction] = useReducer(pureReducerFunction, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8081/posts", signal);
        // setPostList(data);
        dispatchReducerFunction({
            type: "INITIAL_POSTS",
            payload: {
                data
            }
        })
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const newBlog = async (blog) => {
      try {
        const { data } = await axios.post("http://localhost:8081/posts", {
          ...blog,
        });
        // setPostList([data, ...postList]);
        dispatchReducerFunction({
            type: "ADD_POSTS",
            payload: {
                data
            }
        })
        sideBarFn("dashboard");
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    if (Array.isArray(getNewBlog.tags)) {
      newBlog(getNewBlog);
    }
  }, [getNewBlog]);

  useEffect(() => {
    const delBlog = async (id) => {
      try {
        await axios.delete(`http://localhost:8081/posts/${id}`);
        // setPostList(filterBlogs);
        dispatchReducerFunction({
            type: "DEL_POSTS",
            payload: {
                id
            }
        })
      } catch (error) {
        console.log("error", error);
      }
    };

    if (getDelBlog > 0 || typeof getDelBlog === "string") {
      delBlog(getDelBlog);
    }
  }, [getDelBlog]);

  useEffect(() => {
    const editBlog = async ({
      userId,
      title,
      body,
      tags,
      reactions,
      views,
      id,
    }) => {
      try {
        const { data } = await axios.put(`http://localhost:8081/posts/${id}`, {
          userId,
          title,
          body,
          tags,
          reactions,
          views,
        });
        // const filteredPostList = postList.filter((x) => x.id !== id);
        // setPostList([data, ...filteredPostList]);
        dispatchReducerFunction({
            type: "EDIT_POSTS",
            payload: {
                data,
                id
            }  
        })
      } catch (error) {
        console.log(error);
      }
    };

    if (Object.keys(getEditBlog).length === 7) {
      editBlog(getEditBlog);
    }
  }, [getEditBlog]);

  const sideBarFn = (val) => {
    setSideBarTagActive(val);
  };

  const postNewBlog = (blog) => {
    setNewBlog(blog);
  };

  const deleteFn = (id) => {
    setDelBlog(id);
  };
  const editPostFn = (post) => {
    setEditBlog(post);
  };

  return (
    <postStore.Provider
      value={{
        postList,
        sideBarTagActive,
        sideBarFn,
        postNewBlog,
        deleteFn,
        editPostFn,
      }}
    >
      {children}
    </postStore.Provider>
  );
};

export default PostStoreContextProvider;
