import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import style from './style.module.scss'

interface ICartItemsAmount {
    id: number;
    amount: number;
}

export function Header() {
    const [totalItemsAmount, setTotalItemsAmount] = useState(0)
    const { cartItemsAmount } = useCart()

    useEffect(() => {
        if (cartItemsAmount) {
            const total = cartItemsAmount.reduce((previous, current) => previous + current.amount, 0)
            setTotalItemsAmount(total)
        }
    }, [cartItemsAmount])

    useEffect(() => {
        const itemOfStorage = localStorage.getItem('@luisshoes:cart')
        console.log(itemOfStorage)
        if (itemOfStorage) {
            const itemOfStorageParsed: ICartItemsAmount[] = JSON.parse(itemOfStorage)
            const total = itemOfStorageParsed.reduce((previous, current) => previous + current.amount, 0)
            setTotalItemsAmount(total)
        }
    }, [])
    return (
        <header className={"wrapper " + style.header}>
            <h1>LuisShoes</h1>
            <div>
                <div>
                    <p>Meu carrinho</p>
                    <span>{totalItemsAmount} itens</span>
                </div>

            </div>
        </header>
    )
}