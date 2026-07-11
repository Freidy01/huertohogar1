import { Link } from 'react-router-dom'

const categorias = [
    { valor: 'frutas', label: 'Frutas', imagen: '/assets/manzanas.jpg', desc: 'Frescas y de temporada, directo del huerto.' },
    { valor: 'verduras', label: 'Verduras', imagen: '/assets/zanahorias.jpg', desc: 'Cultivadas sin pesticidas por productores locales.' },
    { valor: 'organicos', label: 'Orgánicos', imagen: '/assets/miel.png', desc: 'Productos naturales, libres de químicos.' },
    { valor: 'lacteos', label: 'Lácteos', imagen: '/assets/leche.jpg', desc: 'Directo de granjas chilenas a tu mesa.' }
]

function Categorias() {
    return (
        <div>
            <section className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">Categorías</h1>
                    <p className="lead">Explora nuestros productos organizados por categoría</p>
                </div>
            </section>

            <section className="container py-5">
                <div className="row g-4">
                    {categorias.map(c => (
                        <div className="col-sm-6 col-lg-3" key={c.valor}>
                            <Link to={`/productos?categoria=${c.valor}`} className="text-decoration-none text-dark">
                                <div className="card h-100 shadow-sm">
                                    <img src={c.imagen} alt={c.label} className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} />
                                    <div className="card-body text-center">
                                        <h5 className="fw-bold">{c.label}</h5>
                                        <p className="small text-muted mb-0">{c.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Categorias
