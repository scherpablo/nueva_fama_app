import Layout from "../layout/client/Layout";
import Producto from "../components/Productos/Producto";
import Pasos from "../components/Pasos/Pasos";
import useKiosco from "../hooks/useKiosco";
import styles from "./index.module.css";

export default function Home() {
  const { categoriaActual } = useKiosco();

  return (
    <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
      <div className={styles.containerLayout} id="categoria">
        <div className={styles.divLayout}>
          <Pasos />
          <h2 className={styles.h2}>{categoriaActual?.nombre}</h2>
          <p className={styles.p}>
            Elegí y personalizá tu pedido a continuación...
          </p>
        </div>

        <div className={styles.divProductoIndex}>
          {categoriaActual?.productos?.map((producto) => (
            <Producto
              key={producto.id}
              producto={producto}
              className={styles.producto}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
