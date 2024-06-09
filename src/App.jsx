import { useState, useEffect } from "react";
import { format } from "date-fns";
import "./App.css"; // Make sure to import the CSS file

const App = () => {
    const [horaActual, setHoraActual] = useState("");
    const [fechaActual] = useState(format(new Date(), "dd/MM/yyyy"));
    const [textoInput, setTextoInput] = useState("");
    const [arrayFavoritos, setArrayFavoritos] = useState([]);

    const obtenerHoraActual = () => {
        const ahora = new Date();
        let hora = ahora.getHours();
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();

        const amPm = hora >= 12 ? "PM" : "AM";
        hora = hora % 12 || 12;

        setHoraActual(`${hora}:${minutos}:${segundos} ${amPm}`);
    };

    useEffect(() => {
        obtenerHoraActual();
        const interval = setInterval(obtenerHoraActual, 1000);
        return () => clearInterval(interval);
    }, []);

    const add = () => {
        if (textoInput.trim() !== "") {
            setArrayFavoritos([...arrayFavoritos, { texto: textoInput, clickeado: false }]);
            setTextoInput("");
        }
    };

    const resetear = (index, event) => {
        event.stopPropagation();
        const nuevosFavoritos = arrayFavoritos.filter((_, i) => i !== index);
        setArrayFavoritos(nuevosFavoritos);
    };

    const toggleUnderline = (index) => {
        const nuevosFavoritos = arrayFavoritos.map((item, i) =>
            i === index ? { ...item, clickeado: !item.clickeado } : item
        );
        setArrayFavoritos(nuevosFavoritos);
    };

    return (
        <>
            <div className="contenedor">
                <h1>Practica TO-DO</h1>
                <div className="cardO">
                    <div className="card1">
                        <div className="fecha">{fechaActual}</div>
                        <div className="hora">{horaActual}</div>

                        <div className="input-group mb-3">
                            <input
                                value={textoInput}
                                onChange={(e) => setTextoInput(e.target.value)}
                                type="text"
                                className="form-control input"
                                placeholder="Nueva tarea"
                            />
                            <button
                                onClick={add}
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-addon2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                            </button>
                        </div>

                        {arrayFavoritos.map((texto, index) => (
                            <div
                                key={index}
                                className={`resul ${texto.clickeado ? "subrayado" : ""}`}
                                onClick={() => toggleUnderline(index)}>
                                <span>{texto.texto}</span>
                                <button onClick={(event) => resetear(index, event)} className="borrar">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="footer pt-3">
                <div className="container-fluid">
                    <div className="row  justify-content-center">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted">
                                © creado por{" "}
                                <a
                                    href="https://www.instagram.com/carlosmariotirado/"
                                    className="text-sm text-decoration-none">
                                    Carlos Tirado
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default App;
