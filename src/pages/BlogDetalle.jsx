import { useParams, Link } from 'react-router-dom'
import { articulos } from './Blog'

const contenidos = {
    '1': [
        'En HuertoHogar creemos que comer bien empieza por elegir bien. Y una de las mejores decisiones que puedes tomar es optar por verduras de temporada, cultivadas cerca de tu hogar.',
        '1. Son más nutritivas. Los nutrientes se degradan con el tiempo. Una zanahoria cosechada ayer tiene hasta un 45% más de vitaminas que una que lleva semanas en tránsito internacional.',
        '2. Son más económicas. Cuando un producto está en plena temporada, la oferta sube y el precio baja. Sin intermediarios como los nuestros, el ahorro es aún mayor.',
        '3. Apoyas al agricultor local. Cada compra de producto nacional genera empleo y mantiene viva la tradición agrícola chilena que data de siglos.',
        "4. Tienen mejor sabor. No hay química que reemplace el sabor de una manzana recién cosechada del Maule o un tomate que maduró bajo el sol de O'Higgins.",
        '5. Reduces tu huella de carbono. Menos kilómetros recorridos significa menos emisiones. Un producto local puede recorrer 50 km versus 12.000 km de un producto importado.'
    ],
    '2': [
        'La alimentación representa entre el 20% y el 30% de la huella de carbono de un hogar promedio. La buena noticia: pequeños cambios tienen un impacto gigante.',
        'Compra local. Elegir productos cultivados en Chile en vez de importados reduce drásticamente las emisiones asociadas al transporte. En HuertoHogar, el 95% de nuestros productos recorre menos de 500 km hasta tu puerta.',
        'Elige productos de temporada. Los cultivos fuera de temporada requieren invernaderos con calefacción artificial o vuelos expresos. La lechuga de temporada puede tener una huella 10 veces menor que la de importación.',
        'Reduce el desperdicio. Un tercio de los alimentos producidos en el mundo se desperdicia. Planifica tus compras, congela lo que sobre y usa las cáscaras para hacer caldos o compost.',
        'Consume más plantas. No es necesario dejar de comer carne, pero reducir su consumo incluso un 20% puede marcar una diferencia real. Las legumbres chilenas como las lentejas y los porotos son una proteína con huella mínima.',
        'En HuertoHogar estamos comprometidos con un modelo de distribución de bajo impacto. Trabajamos con rutas optimizadas y empaques biodegradables porque creemos que el futuro se construye con cada decisión de compra.'
    ],
    '3': [
        'Visitamos la Región del Maule para conocer a las familias que cultivan las manzanas y verduras que llegan a tu mesa cada semana.',
        'Detrás de cada caja de HuertoHogar hay agricultores que llevan generaciones trabajando la misma tierra, adaptándose al clima y cuidando cada cosecha con dedicación.',
        'Conocerlos de cerca nos recuerda por qué eliminamos los intermediarios: para que ese esfuerzo se traduzca en un precio justo para ellos y un producto más fresco para ti.'
    ]
}

function BlogDetalle() {
    const { id } = useParams()
    const articulo = articulos.find(a => a.id === id)
    const parrafos = contenidos[id]

    if (!articulo) {
        return (
            <div className="container py-5 text-center">
                <p>Artículo no encontrado.</p>
                <Link to="/blog" className="btn btn-success">Volver al Blog</Link>
            </div>
        )
    }

    return (
        <div className="container py-5" style={{ maxWidth: '720px' }}>
            <span className="badge bg-light text-dark mb-2">{articulo.tag}</span>
            <h1 className="fw-bold">{articulo.titulo}</h1>
            <p className="text-muted mb-4">📅 {articulo.fecha} · Por equipo HuertoHogar</p>
            <img src={articulo.imagen} alt={articulo.titulo} className="img-fluid rounded mb-4" />
            {parrafos.map((p, i) => <p key={i}>{p}</p>)}
            <div className="mt-4 d-flex gap-2">
                <Link to="/blog" className="btn btn-outline-secondary">← Volver al Blog</Link>
                <Link to="/productos" className="btn btn-success">Ver Productos</Link>
            </div>
        </div>
    )
}

export default BlogDetalle
