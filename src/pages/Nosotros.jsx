import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
})

const ciudades = [
    { nombre: 'Santiago', coords: [-33.4569, -70.6483] },
    { nombre: 'Puerto Montt', coords: [-41.4717, -72.9369] },
    { nombre: 'Villarrica', coords: [-39.2833, -72.2333] },
    { nombre: 'Nacimiento', coords: [-37.5000, -72.6667] },
    { nombre: 'Viña del Mar', coords: [-33.0245, -71.5518] },
    { nombre: 'Valparaíso', coords: [-33.0472, -71.6127] },
    { nombre: 'Concepción', coords: [-36.8270, -73.0498] }
]

const valores = [
    { icono: '🌱', titulo: 'Sostenibilidad', texto: 'Practicamos agricultura sustentable y minimizamos el impacto ambiental en toda nuestra cadena.' },
    { icono: '🤝', titulo: 'Comercio Justo', texto: 'Pagamos precios justos a nuestros agricultores, garantizando una remuneración digna.' },
    { icono: '🔬', titulo: 'Calidad Certificada', texto: 'Todos nuestros productos pasan controles de calidad antes de llegar a tu hogar.' },
    { icono: '🚀', titulo: 'Innovación', texto: 'Usamos tecnología para optimizar rutas y reducir tiempos de entrega.' }
]

function Nosotros() {
    const mapaRef = useRef(null)
    const mapaInstancia = useRef(null)

    useEffect(() => {
        if (mapaInstancia.current) return
        mapaInstancia.current = L.map(mapaRef.current).setView([-35.5, -71.5], 5)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(mapaInstancia.current)
        ciudades.forEach(c => {
            L.marker(c.coords).addTo(mapaInstancia.current).bindPopup(`<b>🌿 HuertoHogar</b><br>${c.nombre}`)
        })

        return () => {
            mapaInstancia.current?.remove()
            mapaInstancia.current = null
        }
    }, [])

    return (
        <div>
            <section className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">Nuestra Historia</h1>
                    <p className="lead">Conectamos el campo chileno con las familias, con respeto por la tierra y las personas.</p>
                </div>
            </section>

            <section className="container py-5">
                <div className="row g-4 align-items-center mb-5">
                    <div className="col-md-6">
                        <img src="/assets/campo.jpg" alt="Campo chileno" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h3 className="fw-bold">¿Quiénes Somos?</h3>
                        <p>HuertoHogar nació en 2020 con una misión clara: eliminar los intermediarios entre el agricultor y la familia chilena. Creemos que la comida fresca y de calidad no debería ser un privilegio.</p>
                        <p>Trabajamos directamente con más de 40 agricultores en 7 ciudades de Chile, garantizando que cada producto llegue a tu mesa con la frescura del día de cosecha.</p>
                        <p>Nuestro compromiso es triple: con el agricultor, con el consumidor y con el medioambiente. Operamos con empaques biodegradables y rutas de distribución optimizadas para reducir nuestra huella de carbono.</p>
                        <Link to="/productos" className="btn btn-success mt-2">Ver nuestros productos</Link>
                    </div>
                </div>

                <h2 className="text-center fw-bold">Nuestros Valores</h2>
                <p className="text-center text-muted mb-4">Los principios que guían cada decisión que tomamos</p>
                <div className="row g-4 mb-5">
                    {valores.map(v => (
                        <div className="col-sm-6 col-lg-3" key={v.titulo}>
                            <div className="card h-100 text-center p-3 shadow-sm">
                                <div className="fs-1">{v.icono}</div>
                                <h5 className="fw-bold mt-2">{v.titulo}</h5>
                                <p className="small text-muted">{v.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="fw-bold text-center">Dónde Operamos</h3>
                <p className="text-center text-muted mb-3">Presentes en 7 ciudades de Chile, llevando productos frescos a cada rincón del país.</p>
                <div ref={mapaRef} style={{ height: '400px', borderRadius: '8px' }}></div>

                <h2 className="text-center fw-bold mt-5">Nuestro Equipo</h2>
                <p className="text-center text-muted mb-4">Las personas detrás de HuertoHogar</p>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/assets/equipo.jpg" alt="Equipo de operaciones" className="card-img-top" />
                            <div className="card-body text-center">
                                <h5 className="fw-bold">Equipo de Operaciones</h5>
                                <p className="text-muted small mb-0">Logística y distribución</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/assets/agricultores.jpg" alt="Red de agricultores" className="card-img-top" />
                            <div className="card-body text-center">
                                <h5 className="fw-bold">Red de Agricultores</h5>
                                <p className="text-muted small mb-0">40+ productores locales</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <img src="/assets/equipo_tecnologico.jpg" alt="Equipo tecnológico" className="card-img-top" />
                            <div className="card-body text-center">
                                <h5 className="fw-bold">Equipo Tecnológico</h5>
                                <p className="text-muted small mb-0">Plataforma y experiencia digital</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Nosotros
