import React, { useContext } from 'react'
import PostCard from './PostCard'
import {v4 as uuidv4} from 'uuid';
import { postStore } from '../store/PostStore';


const Dashboard = () => {

  const {postList, deleteFn, editPostFn, sideBarTagActive} = useContext(postStore);
  
  if(sideBarTagActive === "dashboard"){
    return (
      <div className="album py-5 bg-body-tertiary">
      <div className="container-fluid">``
  
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        
          {postList?.map((post) => <PostCard editPostFn={editPostFn} key={uuidv4()} post={post} deleteFn={deleteFn}/>)}
        </div>
      </div>
    </div>
    )
  }
}

export default Dashboard
