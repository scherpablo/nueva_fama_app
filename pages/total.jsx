import { useEffect, useCallback } from "react";
import Layout from "../layout//client/Layout";
import { formatearDinero } from "../helpers/precio";
import useKiosco from "../hooks/useKiosco";
import Pasos from "../components/Pasos/Pasos";
import styles from "./total.module.css";

export default function Total() {
  const {
    pedido,
    nombre,
    setNombre,
    telefono,
    setTelefono,
    confirmarPedido,
    total,
  } = useKiosco();

  const comprobarPedido = useCallback(() => {
    return (
      pedido.length === 0 ||
      nombre === "" ||
      nombre.length < 3 ||
      telefono === "" ||
      telefono.length < 10
    );
  }, [pedido, nombre, telefono]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Datos y Total">
      <div className={styles.containerLayout}>
        <div className={styles.divLayout}>
          <Pasos />
          <h2 className={styles.h2}>Total y Confirmar Pedido</h2>
          <p className={styles.p}>Confirma tu pedido a continuación...</p>
        </div>

        <div className={styles.divProductoIndex}>
          <form className={styles.form} onSubmit={confirmarPedido}>
            <div className={styles.divForm}>
              <label htmlFor="nombre" className={styles.label}>
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className={styles.input}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <label htmlFor="telefono" className={styles.label}>
                Telefono
              </label>
              <input
                type="text"
                id="telefono"
                className={styles.input}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className={styles.total}>
              <p className={styles.pTotal}>
                Total a Pagar:{" "}
                <span className={styles.spanTotal}>
                  {formatearDinero(total)}
                </span>
              </p>
            </div>
            <div className={styles.confirmar}>
              <input
                type="submit"
                value="Confirmar Pedido"
                // className={styles.inputConfirmar}
                className={`${
                  comprobarPedido() ? styles.bgDisable : styles.bgActivate
                }`}
                disabled={comprobarPedido()}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
