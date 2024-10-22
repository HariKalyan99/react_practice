import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreatePost from './components/CreatePost.jsx';
import Dashboard from './components/Dashboard.jsx';

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {path: "/", element: <CreatePost />},
    {path: "/dashboard", element: <Dashboard />}
  ]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
