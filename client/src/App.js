import './App.css';
import Navbar from './Components/Navbar';
import Sidepane from './Components/Sidepane';
import Homepage from './Pages/Homepage';
import Items from './Pages/Items';
import Profile from './Pages/Profile';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Sell from './Pages/Sell';
import Item from './Pages/Item';
import SidepaneMob from './Components/SidepaneMob';
import { useEffect, useState } from 'react';
import Footer from './Components/Footer';

function App() {
  const [isSidepane,setIsSidepane] = useState(window.innerWidth<=800);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const { REACT_APP_CORS_ORIGIN } = process.env;

if (REACT_APP_CORS_ORIGIN) {
// Set the Cross-Origin-Opener-Policy header to the value of the REACT_APP_CORS_ORIGIN environment variable
const corsHeaders = {
"Cross-Origin-Opener-Policy": REACT_APP_CORS_ORIGIN,
};

// Set the headers on the window object
window.addEventListener("load", () => {
window.headers = corsHeaders;
});
}

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      setIsSidepane(window.innerWidth<=800);
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
        <Navbar/>
        {isSidepane && <SidepaneMob/>}
        {!isSidepane && <Sidepane/>}
        <main className='ml-[80px] css-width-no'>
          <Routes>
            <Route exact path='/' element={<Homepage/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/items' element={<Items/>}/>
            <Route path='items/item/:id' element={<Item/>}/>
            <Route exact path='/sell' element={<Sell/>}/>
            <Route path="item">
              <Route path=":id" element={<Item />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
