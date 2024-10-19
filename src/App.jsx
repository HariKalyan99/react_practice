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

  const sideBarFn = (val) => {
    setSideBarTagActive(val);
  };

  const postNewBlog = (blog) => {
    setNewBlog(blog);
  }

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar sideBarFn={sideBarFn} sideBarTagActive={sideBarTagActive} />
        {sideBarTagActive === "home" ? <CreatePost postNewBlog={postNewBlog} height={"100vh"}/> :
        <Dashboard postList={postList}/>} 
      </div>
    </div>
  );
}

export default App;
