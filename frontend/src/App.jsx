import Home from './pages/home/Home';
import Paciente from './pages/turnos/paciente/Paciente';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRouteDoctor from './routing/PrivateRouteDoctor';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthProvider';
import Patient from './pages/dashboard/Patient';
import MainLayout from './layouts/MainLayout';
import PrivateRoutePatient from './routing/PrivateRoutePatient';
import Doctors from './components/contact-form/doctors/Doctors';
import DoctorDashboard from './pages/dashboard/Doctor';
import Register from './pages/Register';
 import ServicesSection from './pages/services/ServicesSection';



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
                path='/services'
                element={<ServicesSection/>}
              />
      
            </Route>
            <Route
              path='/dashboard/paciente'
              element={<PrivateRoutePatient />}>
              <Route
                index
                element={<Patient />}
              />
            </Route>
            <Route
              path='/dashboard/doctor'
              element={<PrivateRouteDoctor />}>
              <Route
                index
                element={<DoctorDashboard />}
              />
            </Route>
            <Route
              path='*'
              element={<>Not found</>}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
