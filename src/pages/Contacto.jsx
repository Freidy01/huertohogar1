import { useState } from 'react'

function Contacto() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [comentario, setComentario] = useState('')
    const [errores, setErrores] = useState({})
    const [enviado, setEnviado] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const nuevosErrores = {}

        if (!nombre.trim()) nuevosErrores.nombre = 'Ingresa tu nombre.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nuevosErrores.email = 'Ingresa un correo válido.'
        if (!comentario.trim()) nuevosErrores.comentario = 'Escribe tu mensaje.'
        else if (comentario.length > 500) nuevosErrores.comentario = 'Máximo 500 caracteres.'

        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return

        setEnviado(true)
        setNombre('')
        setEmail('')
        setComentario('')
    }

    return (
        <div>
            <section className="bg-success bg-opacity-10 py-5 text-center">
                <div className="container">
                    <h1 className="fw-bold">Contáctanos</h1>
                    <p className="lead">Estamos aquí para ayudarte. Escríbenos y te respondemos en menos de 24 horas.</p>
                </div>
            </section>

            <section className="container py-5">
                <div className="row g-5">
                    <div className="col-md-5">
                        <h3 className="fw-bold">¿Cómo podemos ayudarte?</h3>
                        <p className="text-muted">Ya sea una consulta sobre un pedido, quieres unirte como agricultor, o tienes sugerencias para mejorar nuestro servicio, nos encanta escucharte.</p>

                        <div className="d-flex gap-3 mb-3">
                            <span className="fs-4">📍</span>
                            <div><strong>Dirección</strong><p className="mb-0 text-muted">Av. Providencia 1234, Santiago, Chile</p></div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <span className="fs-4">📞</span>
                            <div><strong>Teléfono</strong><p className="mb-0 text-muted">+56 2 2345 6789</p></div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <span className="fs-4">✉️</span>
                            <div><strong>Correo</strong><p className="mb-0 text-muted">hola@huertohogar.cl</p></div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <span className="fs-4">🕐</span>
                            <div><strong>Horario de atención</strong><p className="mb-0 text-muted">Lunes a Viernes: 9:00 - 18:00 hrs</p></div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h3 className="fw-bold">Envíanos un Mensaje</h3>
                        {enviado && <p className="alert alert-success">¡Mensaje enviado! Te contactaremos pronto.</p>}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo</label>
                                <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                                {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Correo Electrónico</label>
                                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                {errores.email && <div className="text-danger small">{errores.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comentario o Consulta</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    maxLength={500}
                                    value={comentario}
                                    onChange={e => setComentario(e.target.value)}
                                ></textarea>
                                <div className="text-muted small text-end">{comentario.length}/500</div>
                                {errores.comentario && <div className="text-danger small">{errores.comentario}</div>}
                            </div>
                            <button type="submit" className="btn btn-success">Enviar Mensaje</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contacto
