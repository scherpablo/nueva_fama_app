import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalProducto from "../../components/Modal/ModalProducto";
import useKiosco from "../../hooks/useKiosco";
import styles from "./Layout.module.css";


import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  const { modal } = useKiosco();

  return (
    <>
      <Head>
        <title>Nueva Fama - {pagina}</title>
        <meta name="description" content="La Fama - Restó" />
      </Head>
      <div className={styles.containerAsaide}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          {children}
        </main>
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
