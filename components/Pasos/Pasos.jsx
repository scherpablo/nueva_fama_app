import { useRouter } from "next/router";
import styles from "./Pasos.module.css";

const pasos = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];

const Pasos = () => {
  const router = useRouter();

  const barraProgreso = () => {
    let valor;
    if (router.pathname === "/") {
      valor = 7;
    } else if (router.pathname === "/resumen") {
      valor = 52;
    } else {
      valor = 100;
    }
    return valor;
  };

  return (
    <>
      <div className={styles.divPasos}>
        {pasos.map((paso) => (
          <button
            key={paso.paso}
            className={styles.botonPasos}
            onClick={() => {
              router.push(paso.url);
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className={styles.containerBarra}>
        <div
          className={styles.barra}
          style={{ width: `${barraProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
