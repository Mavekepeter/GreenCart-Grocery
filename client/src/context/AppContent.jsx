import { createContext, useContext ,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setshowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    //fetch all products
    const fetchProducts =async()=>{
        setProducts(dummyProducts)
    }

    //fetch product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }
    //update cart itme quantity
    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove item from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId]-= 1;
            if(cartData[itemId]===0){
                delete cartData[itemId];

            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }
    //Get cart item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];

        }
        return totalCount;
    }
    //Get cart total amount
    const getCartAmount = ()=>{
        let totalAmount = 0 ;
        for (const items in cartItems){
            let itemInfor = products.find((product)=>product._id === items);
            if (cartItems[items] >0) {
                totalAmount += itemInfor.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount *100)/100
    }
    useEffect(()=>{
        fetchProducts()
    },[])



    const value = {navigate,user,setUser,isSeller,setIsSeller,
        showUserLogin,setshowUserLogin,products,currency,addToCart,
        updateCartItem,removeFromCart,cartItems,searchQuery,setSearchQuery,
        getCartCount,getCartAmount}


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}