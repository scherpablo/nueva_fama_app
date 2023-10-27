import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { formatearDinero } from "../../helpers/precio";
import styles from "./Pedido.module.css";

const Orden = ({ orden }) => {
  const { id, nombre, telefono, total, pedido } = orden;

  const completarPedido = async () => {
    try {
      await axios.post(`/api/pedidos/${id}`);
      toast.success("Pedido Finalizado", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Hubo un Error", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.divContainer}>
      <div className={styles.divTituloPedido}>
        <h2 className={styles.h2Orden}>Pedido: {id}</h2>
        <p className={styles.pCliente}>
          Cliente: <span>{nombre}</span>
        </p>
        <p className={styles.pCliente}>
          Telefono: <span>{telefono}</span>
        </p>
      </div>

      <div className={styles.divPedido}>
        {pedido.map((plato) => (
          <div className={styles.divPlato} key={plato.id}>
            <div className={styles.divImagen}>
              <Image
                src={`/assets/img/${plato.imagen}.jpg`}
                width={200}
                height={250}
                alt={`Imagen Plato: ${plato.nombre}`}
                priority="true"
              />
            </div>
            <div className={styles.divInfoPlato}>
              <h3 className={styles.h3Plato}>{plato.nombre}</h3>
              <p className={styles.pPlato}>
                Cantidad: <span>{plato.cantidad}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.divTotalButton}>
        <div className={styles.divTotal}>
          <p className={styles.pTotal}>
            Total a pagar: {formatearDinero(total)}
          </p>
        </div>
        <div
          className={styles.divButton}
          type="button"
          onClick={completarPedido}
        >
          <button className={styles.button}>Completar Pedido</button>
        </div>
      </div>
    </div>
  );
};

export default Orden;
