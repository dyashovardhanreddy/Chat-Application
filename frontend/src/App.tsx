import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { UnauthenticatedLayout } from './layouts/UnauthenticationLayout';
import './App.css'
import { LoginPage } from './pages/LoginPages';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  
  const isAuthenticated = !!localStorage.getItem('jwtToken');

  const router = createBrowserRouter(
    createRoutesFromElements(
      isAuthenticated? (
      <Route path='/chat-app/' element={<AuthenticatedLayout />}>
        <Route index element={<Home />} />
      </Route>
      ) : (
        <Route path='/chat-app/auth/' element={<UnauthenticatedLayout />}>
          <Route path='login' element={<LoginPage />}/>
          <Route path='register' element={<RegisterPage />} />
        </Route>
      )
    )
  )


  return (
    <RouterProvider router={router} />
  )
}

export default App
