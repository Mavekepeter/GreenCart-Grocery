import Order from "../models/Order";
import Product from "../models/product";

//place order cod :/api/order/cod
export const placeOrderCod = async(req,res)=>{
    try {
        const{userId,items,address} = req.body;
        if(!address || items.length === 0){
            return res.json({success:false, message:"Invalid data"})
        }
        //calculate amount using items
        let amount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity;

        },0)
        //Add Tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'COD'

        })
        return res.json({success:true,message:"Order placed successfully"})


    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})
        
    }
}

//Get Orders by UserId: /api/order/user
export const getUserOrders = async(req,res)=>{
    try {
        const {userId} = req.body
    const orders = await Order.find({
        userId,
        $or:[{paymentType:"COD"},{isPaid:true}]
    }).populate("items.product address").sort({createdAt: -1});
    res.json({success:true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}
//Get all orders (for seller/admin) :/api/order/seller

export const getAllOrders = async(req,res)=>{
    try {
    const orders = await Order.find({

        $or:[{paymentType:"COD"},{isPaid:true}]
    }).populate("items.product address");
    res.json({success:true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}