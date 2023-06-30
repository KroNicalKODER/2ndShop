import './App.css';
import Navbar from './Components/Navbar';
import Sidepane from './Components/Sidepane';
import Homepage from './Pages/Homepage';
import Items from './Pages/Items';
import Profile from './Pages/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sell from './Pages/Sell';
import Item from './Pages/Item';
import SidepaneMob from './Components/SidepaneMob';
import { useEffect, useState } from 'react';
import Footer from './Components/Footer';
import { getAuth, getRedirectResult } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { loginStart,loginFailure,loginSuccess } from './Redux/userSlice';
import axios from 'axios';
import firebase from './Firebase';
import UploadSuccess from './Pages/UploadSuccess';
import SellError from './Pages/SellError';


function App() {
  const [isSidepane, setIsSidepane] = useState(window.innerWidth <= 800);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [googleUser, setGoogleUser] = useState(false)

  const dispatch = useDispatch();


  const auth = getAuth();
  getRedirectResult(auth)
    .then((result) => {
      dispatch(loginStart())
      try {
        axios.post("http://localhost:8800/api/auth/google", {
          name : result.user.displayName,
          email: result.user.email,
          avatarUrl: result.user.photoURL
        })
      } catch (error) {
        console.log(error)
      }
      console.log(result);
      dispatch(loginSuccess({
        name: result.user.displayName,
        email: result.user.email,
        avatarUrl: result.user.photoURL
      }))

    })
    .catch((error) => {
      dispatch(loginFailure())
      console.log("loginFailure")
    });


  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      setIsSidepane(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen max-h-fit min-w-full max-w-fit bg-gray-300 flex flex-col">
      <BrowserRouter>
        <Navbar />
        {isSidepane && <SidepaneMob />}
        {!isSidepane && <Sidepane />}
        <main className='ml-[80px] css-width-no'>
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/items' element={<Items />} />
            <Route path='items/item/:id' element={<Item />} />
            <Route exact path='/sell' element={<Sell />} />
            <Route path="item">
              <Route path=":id/:type" element={<Item />} />
            </Route>
            <Route exact path='/sell-success' element={<UploadSuccess/>}/>
            <Route exact path='/sell-error' element={<SellError/>}/>
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
