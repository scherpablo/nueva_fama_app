import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const url = "/api/categorias";
    try {
      const { data } = await axios(url);
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProdcuto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      // toast.success("Producto actualizado");
      toast.success("Producto actualizado", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setPedido([...pedido, producto]);
      // toast.success("Agregado al pedido");
      toast.success("Agregado al pedido", {
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
    setModal(false);
  };

  const handleEliminarProducto = (id) => {
    const productoActualizado = pedido.filter(
      (productoState) => productoState.id !== id
    );
    setPedido(productoActualizado);
  };

  const confirmarPedido = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/pedidos", {
        pedido,
        nombre,
        telefono,
        total,
        fecha: Date.now().toString(),
      });

      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTelefono("");
      setTotal(0);
      toast.success("Pedido realizado correctamente", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProdcuto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEliminarProducto,
        nombre,
        setNombre,
        telefono,
        setTelefono,
        confirmarPedido,
        total,
      }}
    >
      {children}
    </KioscoContext.Provider>
  );
};

export { KioscoProvider };

export default KioscoContext;
