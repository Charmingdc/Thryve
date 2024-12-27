import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PWABadge from './PWABadge.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add your routes here */}
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <PWABadge />
    </BrowserRouter>
  )
}
export default App
