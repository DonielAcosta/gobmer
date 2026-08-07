import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Home } from './pages/Home.jsx'
import { NoticiasPage } from './pages/NoticiasPage.jsx'
import { PostDetail } from './pages/PostDetail.jsx'
import { SecretariaDetail } from './pages/SecretariaDetail.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="layout-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/noticias/:id" element={<PostDetail />} />
          <Route path="/secretarias/:slug" element={<SecretariaDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
