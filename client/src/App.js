import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Posts } from "./pages/Posts";
import { Navbar } from "./components/Navbar";
import { NewPost } from "./pages/NewPost";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "./actions/posts";
import { EditPost } from "./pages/EditPost";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostDetails } from "./pages/PostDetails";
const App = () => {

  const [currentId,setCurrentId] = useState(null);
  // const [userId,setUserId] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userId = user?.result?._id;

  // console.log(userId);



  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch,user]);


  return (
    <div className="bg-black">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Posts currentId={currentId} setCurrentId={setCurrentId} />}></Route>
          <Route path="/" element={<Posts currentId={currentId} setCurrentId={setCurrentId} />}></Route>
          <Route path="/posts" element={<Posts currentId={currentId} setCurrentId={setCurrentId} />}></Route>
          <Route path="/posts/search" element={<Posts currentId={currentId} setCurrentId={setCurrentId} />}></Route>
          <Route path="/newpost" currentId={currentId} element={<NewPost />}></Route>
          <Route path="/editpost" element={<EditPost currentId={currentId} setCurrentId={setCurrentId} />}></Route>
          <Route path="/login" element={<AuthenticationPage />}></Route>
          <Route path="/user" element={<ProfilePage user={user} />}></Route>
          <Route path="/posts/:id" element={<PostDetails currentId={currentId} setCurrentId={setCurrentId} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
