import { useState } from 'react'
import './App.css'
import { Footer } from './layouts/NavbarAndFooter/Footer'
import { HomePage } from './layouts/HomePage/HomePage'
import { Navbar } from './layouts/NavbarAndFooter/Navbar'
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage'
import { Navigate, replace, Route, Routes, useNavigate } from 'react-router-dom'
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage'
import { oktaConfig } from './lib/oktaConfig'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react'
import LoginWidget from './Auth2/LoginWidget'
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage'
import { ProtectedRoute } from './layouts/ShelfPage/ProtectedRoute'
import { ShelfPage } from './layouts/ShelfPage/ShelfPage'

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  // const [count, setCount] = useState(0)

  const navigate = useNavigate();
  //custom auth handler
  const customAuthHandler = () => {
    navigate('/login');
  }
  // const customAuthHandler = () => {
  //   // Instead of always pushing '/login' with no info, 
  //   // you can read the "from" location from React Router’s state or location
  //   // and pass it along.
  //   navigate('/login' + '?from=' + encodeURIComponent(window.location.pathname));
  // };
  


  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    console.log(originalUri);
    navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} 
                restoreOriginalUri={restoreOriginalUri} 
                onAuthRequired={customAuthHandler} 
      >
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route index element={<Navigate to="/home" />} />

            <Route path='/home' element={<HomePage />} />
            {/* or alternatively   */}
            {/* <Route path='/' element={<HomePage/>} /> */}
            <Route path='/reviewlist/:bookId' element={<ReviewListPage />} />
            <Route path='/search' element={<SearchBooksPage />} />
            <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
            <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
            <Route path="/login/callback" Component={LoginCallback} />
            <Route element={<ProtectedRoute />}>
              <Route path="/shelf" element={<ShelfPage />} />
            </Route>
            {/* <SecureRoute path="/shelf" element = {<ShelfPage/>}/> */}
          </Routes>

        </div>
        <Footer />
      </Security>
    </div>

  )
}
