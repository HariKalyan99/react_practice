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

  const sideBarFn = (val) => {
    setSideBarTagActive(val);
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar sideBarFn={sideBarFn} sideBarTagActive={sideBarTagActive} />
        {sideBarTagActive === "home" ? <CreatePost height={"100vh"}/> :
        <Dashboard postList={postList}/>}
      </div>
    </div>
  );
}

export default App;
