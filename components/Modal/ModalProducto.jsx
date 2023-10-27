/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Image from "next/image";
import useKiosco from "../../hooks/useKiosco";
import styles from "./ModalProducto.module.css";
import { formatearDinero } from "../../helpers/precio";

const Modal = () => {
  const { producto, handleChangeModal, handleAgregarPedido, pedido } = useKiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(()=> {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id);
      setEdicion(true)
      setCantidad(productoEdicion.cantidad)
    }
  },[producto, pedido])

  return (
    <>
      <div className={styles.containerModal}>
        <div className={styles.divImagen}>
          <Image
            className={styles.imagen}
            src={`/assets/img/${producto.imagen}.jpg`}
            alt={`imagen producto ${producto.nombre}`}
            width={300}
            height={400}
            priority="true"
          />
        </div>
        <div className={styles.divDescripcion}>
          <div className={styles.divBoton}>
            <button className={styles.botonCerrar} onClick={handleChangeModal}>
              <img src="/assets/img/icono-close.png" alt="icono cerrar" />
            </button>
          </div>
          <h1 className={styles.h1}>{producto.nombre}</h1>
          <p className={styles.p}>{formatearDinero(producto.precio)}</p>
          <div className={styles.divCantidades}>
            <button
              className={styles.botonMenos}
              type="button"
              onClick={() => {
                if (cantidad <= 1) return;
                setCantidad(cantidad - 1);
              }}
            >
              <img src="/assets/img/boton-menos.png" alt="icono cerrar" />
            </button>
            <p className={styles.pCantidad}>{cantidad}</p>
            <button
              className={styles.botonMas}
              type="button"
              onClick={() => {
                if (cantidad >= 10) return;
                setCantidad(cantidad + 1);
              }}
            >
              <img src="/assets/img/boton-mas.png" alt="icono cerrar" />
            </button>
          </div>
          <div>
            <button
              className={styles.botonPedido}
              onClick={() => handleAgregarPedido({ ...producto, cantidad })}
            >
              {edicion ? "Guardar cambios" : "Añadir al pedido"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
