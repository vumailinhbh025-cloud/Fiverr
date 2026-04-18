import { createRoot } from 'react-dom/client'
import { Route, Routes, unstable_HistoryRouter as HistoryBrowser, Navigate } from 'react-router-dom'
import HomeTemplates from './Templates/HomeTemplates'
import Home from './pages/Home'
import JobList from './pages/JobList'
import JobTemplates from './Templates/JobTemplates'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createBrowserHistory } from 'history'
import Profile from './pages/Profile'
import Search from './pages/Search'
export const history: any = createBrowserHistory()


createRoot(document.getElementById('root')!).render(
  <HistoryBrowser history={history}>
    <Provider store={store}>
      <Routes>
        <Route path='' element={<HomeTemplates />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='profile' element={<Profile/>}></Route>


          
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Route>

        <Route path='danhSachCongViec' element={<JobTemplates />}>
          <Route index element={<JobList />}></Route>
          <Route path='search' element={<Search/>}></Route>
        </Route>


      </Routes>
    </Provider>
  </HistoryBrowser>
)
