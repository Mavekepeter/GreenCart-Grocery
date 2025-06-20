import jwt from 'jsonwebtoken'
//seller login :/api/seller/

export const sellerLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL)  {
        
        const token = jwt.sign({email},process.env.JWT_SECTRET,{expiresIn:'7d'});
        res.cookie('sellerToken',token,{
            httpOnly:true, //prevent javascript to access cookies
            secure:process.env.NODE_ENV === 'production',//use secure cooies in production

            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge:7*24*60*1000,
        });
        return res.json({success:true,message:"Logged In"})
    }else{
        return res.json({success:false,message:"Invalid Credentials"});
    }
    } catch (error) {
        console.log(error.message);
        res.json({success:false,messsage:error.message})
    }
}
