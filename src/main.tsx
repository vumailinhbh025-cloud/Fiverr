import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeTemplates from './Templates/HomeTemplates'
import Home from './pages/Home'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplates />}>
            <Route index element={<Home/>}></Route>
        </Route>
      </Routes>
  </BrowserRouter>
)
