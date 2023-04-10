


import Navbar from './layout/navbar/Navbar'
import Footer from './layout/footer/Footer'
import Home from './pages/home/Home'
import Paciente from './pages/turnos/paciente/Paciente'
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {


  return (
    <div className="App">
     

     <BrowserRouter>
     <Navbar/>
     <Routes>
   
      <Route  path="/" element={<Home/>}></Route>
     <Route path="/turnos" element={<Paciente/>}></Route>

      </Routes>
      <Footer/> 
      </BrowserRouter>




    </div>
  )
}

export default App
