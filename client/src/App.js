import './App.css';
import Navbar from './Components/Navbar';
import Sidepane from './Components/Sidepane';
import Homepage from './Pages/Homepage';
import Items from './Pages/Items';
import Profile from './Pages/Profile';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Sell from './Pages/Sell';


function App() {
  return (
    <div className="min-h-screen max-h-fit min-w-full max-w-fit bg-gray-300">
      <BrowserRouter>
        <Navbar/>
        <Sidepane/>
        <main className='ml-[80px]'>
          <Routes>
            <Route exact path='/' element={<Homepage/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/items' element={<Items/>}/>
            <Route exact path='/sell' element={<Sell/>}/>
          </Routes>
        </main>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
