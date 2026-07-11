import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RutaProtegida from './components/RutaProtegida'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Categorias from './pages/Categorias'
import Ofertas from './pages/Ofertas'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import BlogDetalle from './pages/BlogDetalle'
import Contacto from './pages/Contacto'
import AdminHome from './pages/AdminHome'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:codigo" element={<Detalle />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/compra-exitosa" element={<CompraExitosa />} />
                <Route path="/compra-fallida" element={<CompraFallida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetalle />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/admin" element={<RutaProtegida><AdminHome /></RutaProtegida>} />
                <Route path="/admin/productos" element={<RutaProtegida><AdminProductos /></RutaProtegida>} />
                <Route path="/admin/usuarios" element={<RutaProtegida><AdminUsuarios /></RutaProtegida>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
