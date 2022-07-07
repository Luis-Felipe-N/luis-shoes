import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import style from './style.module.scss'

export function Header() {
    const [totalItemsAmount, setTotalItemsAmount] = useState(0)
    const { cartItemsAmount } = useCart()

    useEffect(() => {
        if (cartItemsAmount) {
            const total = cartItemsAmount.reduce((previous, current) => previous + current.amount, 0)
            setTotalItemsAmount(total)
            console.log('aaaaaaaaaaaa')
        }
    }, [cartItemsAmount])
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