import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        localStorage.setItem('@luisshoes:cart', JSON.stringify(cartItemsAmount))
    }, [cartItemsAmount])

    function addProduct(productId: number) {
        const hasItemAmount = cartItemsAmount.filter(item => productId === item.id).length
        if (hasItemAmount) {
            const newCartItemsAmount = cartItemsAmount.map(item => {
                if (item.id === productId) {
                    return {...item, amount: item.amount += 1}
                } else {
                    return item
                }
            })
            setCartItemsAmount(newCartItemsAmount)
            console.log('Entrou aqui')
        } else {
            const item = {id: productId, amount: 1}
            setCartItemsAmount([...cartItemsAmount, item])
            console.log('Entrou aquiaaa')
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