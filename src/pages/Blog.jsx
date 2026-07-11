import { Link } from 'react-router-dom'

export const articulos = [
    {
        id: '1',
        tag: 'Nutrición',
        titulo: '5 Razones para Comer Más Verduras de Temporada',
        resumen: 'Descubre por qué los productos de temporada son más nutritivos, económicos y sostenibles que los que vienen de otros países.',
        fecha: '15 de mayo, 2026',
        imagen: '/assets/blog1.jpg'
    },
    {
        id: '2',
        tag: 'Sostenibilidad',
        titulo: 'Cómo Reducir tu Huella de Carbono con tu Dieta',
        resumen: 'Pequeños cambios en tus hábitos alimentarios pueden tener un gran impacto en el medioambiente. Te contamos cómo empezar hoy.',
        fecha: '28 de abril, 2026',
        imagen: '/assets/blog2.jpg'
    },
    {
        id: '3',
        tag: 'Agricultores',
        titulo: 'Conoce a los Agricultores Detrás de tu Comida',
        resumen: 'Visitamos la Región del Maule para conocer a las familias que cultivan las manzanas y verduras que llegan a tu mesa cada semana.',
        fecha: '10 de abril, 2026',
        imagen: '/assets/campo.jpg'
    }
]

function Blog() {
    return (
        <div>
            <section className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">Blog HuertoHogar</h1>
                    <p className="lead">Consejos, recetas y noticias del campo chileno</p>
                </div>
            </section>

            <section className="container py-5">
                <h2 className="text-center fw-bold">Últimas Publicaciones</h2>
                <p className="text-center text-muted mb-4">Aprende, cocina y conecta con el origen de tus alimentos</p>
                <div className="row g-4">
                    {articulos.map(a => (
                        <div className="col-md-4" key={a.id}>
                            <div className="card h-100 shadow-sm">
                                <img src={a.imagen} alt={a.titulo} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <span className="badge bg-light text-dark mb-2 align-self-start">{a.tag}</span>
                                    <h5 className="fw-bold">{a.titulo}</h5>
                                    <p className="small text-muted flex-grow-1">{a.resumen}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="small text-muted">📅 {a.fecha}</span>
                                        <Link to={`/blog/${a.id}`} className="btn btn-success btn-sm">Leer más →</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Blog
