import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { HomePage } from './pages/HomePage.jsx'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <section className="main-layout app">
          <main>
            <Routes>
              <Route path="/toy/:toyId/edit" element={<ToyEdit />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/todo/:todoId" element={<TodoDetails />} /> */}
              {/* <Route element={<AboutUs />} path="/about" /> */}
              {/* <Route element={<CarIndex />} path="/car" /> */}
            </Routes>
          </main>
        </section>
        <UserMsg />
        {/* <AppFooter /> */}
      </Router>
    </Provider>
  )
}
