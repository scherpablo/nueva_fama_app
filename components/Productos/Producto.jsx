import Image from "next/image";
import { formatearDinero } from "../../helpers/precio";
import useKiosco from "../../hooks/useKiosco";
import styles from "./Producto.module.css";

const Producto = ({ producto }) => {
  const { handleSetProdcuto, handleChangeModal } = useKiosco();
  const { nombre, imagen, precio } = producto;

  return (
    <>
      <div className={styles.divProducto}>
        <div className={styles.divImagen}>
          <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen Producto ${nombre}`}
            width={215}
            height={240}
            className={styles.imagen}
            priority="true"
          />
        </div>
        <div className={styles.divDescripcion}>
          <h3 className={styles.h3}>{nombre}</h3>
          <p className={styles.p}>{formatearDinero(precio)}</p>
          {/* <h2 className={styles.h2}>Elavoración Artesanal</h2> */}
          <button
            className={styles.botonProducto}
            type="button"
            onClick={() => {
              handleChangeModal();
              handleSetProdcuto(producto);
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default Producto;
