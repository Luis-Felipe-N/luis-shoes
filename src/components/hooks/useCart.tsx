import { createContext, ReactNode, useContext, useState } from "react";
import { IProduct } from "../types/Products";

interface ICartProviderProps {
    children: ReactNode
}

interface ICartItemsAmount {
    id: number;
    amount: number;
}

interface ICartContext {
    addProduct: (productId: number) => void;
    cart: IProduct[];
    cartItemsAmount: ICartItemsAmount[] | undefined
}

export const CartContext = createContext({} as ICartContext)

export function CartProvider({children}: ICartProviderProps) {
    const [cart, setCart] = useState<IProduct[]>([])
    const [cartItemsAmount, setCartItemsAmount] = useState<ICartItemsAmount[]>([])

    async function addProduct(productId: number) {
        try {
            const response = await fetch('http://localhost:3000/products')  
            const responseJson = await response.json()
            const product = responseJson.filter((product: IProduct) => product.id === productId)[0]
            console.log(product)

            // setCart([...cart, product])

            if (cartItemsAmount.length) {
                const itemAmount = cartItemsAmount.filter(item => productId === item.id)[0]
                if (itemAmount) {
                    const item = {id: itemAmount.id, amount: itemAmount.amount++}
                    setCartItemsAmount([...cartItemsAmount, item])
                } else {
                    const item = {id: product.id, amount: 1}
                    setCartItemsAmount([item])
                }
            } else {
                const item = {id: product.id, amount: 1}
                setCartItemsAmount([...cartItemsAmount, item])
            }
            console.log(cartItemsAmount)
            // localStorage.setItem('@luisshoes:cart', JSON.stringify(cart))
            

        } catch (error){
            console.log('Error em adicionar produto: ' + error)
        }
        
    }

    return (
        <CartContext.Provider value={{addProduct, cart, cartItemsAmount}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): ICartContext {
    const ctx = useContext(CartContext)
    return ctx
}