import useSWR from "swr";
import axios from "axios";
import AdminLayout from "../layout/admin/AdminLayout";
import Pedido from "../components/Pedido/Pedido";
import styles from "./donluis.module.css";

export default function Admin() {
  const fetcher = () => axios("/api/pedidos").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/pedidos", fetcher, {refreshInterval: 100});

  return (
    <div className={styles.containerLayout}>
      <AdminLayout pagina={"Admin"}>
        <h2 className={styles.h2}>Panel de Administración</h2>
        <p className={styles.p}>Administra los peidos a continuación...</p>

        {data && data.length ? (
          data.map((orden) => <Pedido key={orden.id} orden={orden} />)
        ) : (
          <p className={styles.p}>No hay ordenes pendientes de procesar...</p>
        )}
      </AdminLayout>
    </div>
  );
}
