import User from "../models/Users.js"

//update user cartData: /api/cart/update
export const updateCart = async (req,res)=>{
    try {
        const {userId,cartItems} = req.body
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({succes:true, message:"cart updated "})


    } catch (error) {
        console.log(error.message);
        res.json({succes:faalse,message:error.message})
    }
}