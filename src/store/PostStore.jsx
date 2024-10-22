import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const postStore = createContext({
  postList: [],
  sideBarTagActive: "",
  sideBarFn: () => {},
  postNewBlog: () => {},
  deleteFn: () => {},
  editPostFn: () => {},
});

const PostStoreContextProvider = ({ children }) => {
  const [sideBarTagActive, setSideBarTagActive] = useState("home");

  const [postList, setPostList] = useState("");
  const [getNewBlog, setNewBlog] = useState("");
  const [getDelBlog, setDelBlog] = useState(0);
  const [getEditBlog, setEditBlog] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getAllPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:8081/posts", signal);
        setPostList(data);
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
        setPostList([data, ...postList]);
        sideBarFn("dashboard");
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
        const filterBlogs = postList.filter((x) => x.id !== id);
        setPostList(filterBlogs);
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
        const filteredPostList = postList.filter((x) => x.id !== id);
        setPostList([data, ...filteredPostList]);
      } catch (error) {
        console.log(error);
      }
    };

    if (Object.keys(getEditBlog).length === 7) {
      console.log(getEditBlog);
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
