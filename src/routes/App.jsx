import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import Dashboard from "../components/Dashboard";
import PostStoreContextProvider from "../store/PostStore";

function App() {
  return (
    <PostStoreContextProvider>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <CreatePost />
        <Dashboard />
      </div>
    </PostStoreContextProvider>
  );
}

export default App;
