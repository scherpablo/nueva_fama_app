import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient(); 

    //obtener pedidos
    const pedidos = await prisma.orden.findMany({
        where: {
            estado: false
        }
    });
    res.status(200).json(pedidos);

    //crear pedidos
    if (req.method === "POST") {
        const pedido = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                fecha: req.body.fecha,
                total: req.body.total,
                pedido: req.body.pedido,
            }
        })
        res.status(200).json(pedido); 
    }
}

