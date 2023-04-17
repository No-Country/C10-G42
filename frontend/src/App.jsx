import Home from './pages/home/Home';
import Paciente from './pages/turnos/paciente/Paciente';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRouteDoctor from './routing/PrivateRouteDoctor';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import HomePatient from './pages/dashboard/Patient/HomePatient';
import MainLayout from './layouts/MainLayout';
import PrivateRoutePatient from './routing/PrivateRoutePatient';
import Doctors from './components/contact-form/doctors/Doctors';
import Register from './pages/Register';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import NotFound from './pages/NotFound';
import ProfilePatient from './pages/dashboard/Patient/ProfilePatient';
import AppointmentPatient from './pages/dashboard/Patient/AppointmentPatient';
import ProfileDoctor from './pages/dashboard/Doctor/ProfileDoctor';
import HomeDoctor from './pages/dashboard/Doctor/HomeDoctor';
 import ServicesSection from './pages/services/ServicesSection';
 import About from './pages/about-us/About';
//  import Contact from './pages/contact/Contact';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={<MainLayout />}>
              <Route
                index
                element={<Home />}
              />
              <Route
                path='/turnos'
                element={<Paciente />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/registro'
                element={<Register />}
              />
              <Route
                path='/confirmar/:code'
                element={<ConfirmarCuenta />}
              />
              <Route
                path='olvide-password'
                element={<OlvidePassword />}
              />
              <Route
                path='olvide-password/:code'
                element={<NuevoPassword />}
              />

              <Route
                path='*'
                element={<NotFound />}
              />
              <Route
                path='/services'
                element={<ServicesSection/>}
              />
              <Route
                path='/nosotros'
                element={<About/>}
              />
{/*       
              <Route
                path='/contact'
                element={<Contact/>}
              /> */}
      
            </Route>
            <Route
              path='/dashboard/paciente'
              element={<PrivateRoutePatient />}>
              <Route
                index
                element={<HomePatient />}
              />
              <Route
                path='perfil'
                element={<ProfilePatient />}
              />
              <Route
                path='turnos'
                element={<AppointmentPatient />}
              />
            </Route>
            <Route
              path='/dashboard/doctor'
              element={<PrivateRouteDoctor />}>
              <Route
                index
                element={<HomeDoctor />}
              />
              <Route
                path='perfil'
                element={<ProfileDoctor />}
              />
              <Route
                path='turnos'
                element={<div>Turnos asociados al doctor</div>}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
