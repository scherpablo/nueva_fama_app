import Layout from "../layout/client/Layout";
import ResumenProducto from "../components/ResumenProducto/ResumenProducto";
import Pasos from "../components/Pasos/Pasos";
import useKiosco from "../hooks/useKiosco";
import styles from "./resumen.module.css";

export default function Resumen() {
  const { pedido } = useKiosco();

  return (
    <Layout pagina="Resumen">
      <div className={styles.containerLayout}>
        <div className={styles.divLayout}>
          <Pasos />
          <h2 className={styles.h2}>Resumen Pedido</h2>
          <p className={styles.p}>Revisa que tu pedido sea correcto...</p>
        </div>

        <div className={styles.divProductoIndex}>
          {pedido.length === 0 ? (
            <p className={styles.p}>No has agregado productos a tu pedido.</p>
          ) : (
            pedido.map((producto) => (
              <ResumenProducto
                key={producto.id}
                producto={producto}
                className={styles.producto}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
