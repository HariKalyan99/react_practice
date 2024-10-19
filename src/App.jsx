import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Dashboard from "./components/Dashboard";
import axios from "axios";

function App() {
  const [sideBarTagActive, setSideBarTagActive] = useState("home");

  const [postList, setPostList] = useState("");
  const [getNewBlog, setNewBlog] = useState("");
  const [getDelBlog, setDelBlog] = useState(0);


  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;
    const getAllPosts = async() => {
      try {
        const {data} = await axios.get("http://localhost:8081/posts", signal)
      setPostList(data);
      } catch (error) {
        console.log(error)
      }
    }
    
    getAllPosts();

    return () => {
      controller.abort();
    }
  }, [])
  
  useEffect(() => {
    const newBlog = async(blog) => {
      try {
        const {data} = await axios.post('http://localhost:8081/posts', {
          ...blog
        })
        setPostList([data, ...postList]);
    sideBarFn("dashboard")

      } catch (error) {
        console.log(error)
      }
    }

    if(Array.isArray(getNewBlog.tags)){
      newBlog(getNewBlog);
    }
  }, [getNewBlog])

  useEffect(() => {
    const delBlog = async(id) => {
      try {
        await axios.delete(`http://localhost:8081/posts/${id}`);
        const filterBlogs = postList.filter(x => x.id !== id);
        setPostList(filterBlogs);
      } catch (error) {
        console.log("error", error)
      }
    }

    
    if(getDelBlog > 0){
      delBlog(getDelBlog);
    }
  }, [getDelBlog])

  const sideBarFn = (val) => {
    setSideBarTagActive(val);
  };

  const postNewBlog = (blog) => {
    setNewBlog(blog);
  }
  
  const deleteFn = (id) => {
    setDelBlog(id);
  }

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar sideBarFn={sideBarFn} sideBarTagActive={sideBarTagActive} />
        {sideBarTagActive === "home" ? <CreatePost postNewBlog={postNewBlog} height={"100vh"}/> :
        <Dashboard postList={postList} deleteFn={deleteFn}/>} 
      </div>
    </div>
  );
}

export default App;
