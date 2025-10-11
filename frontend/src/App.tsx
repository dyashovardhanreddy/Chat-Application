import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { UnauthenticatedLayout } from './layouts/UnauthenticationLayout';
import './App.css'
import { LoginPage } from './pages/LoginPages';
import { RegisterPage } from './pages/RegisterPage';
import { FriendsPage } from './pages/FriendsPage';
import { LogoutPage } from './pages/LogoutPage';
import { useAuth } from './context/AuthContext';

function App() {
  
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      isAuthenticated? (
      <Route path='/chat-app/' element={<AuthenticatedLayout />}>
        <Route index element={<Home />} />
        <Route path='friends' element={<FriendsPage />} />
        <Route path='logout' element={<LogoutPage />} />
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
