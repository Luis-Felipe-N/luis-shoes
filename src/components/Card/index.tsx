import { formatPrice } from '../../utils/formatPrice';
import { IProduct } from '../types/Products'

import { ShoppingCartSimple } from 'phosphor-react'

import style from './style.module.scss'
import { useCart } from '../hooks/useCart';

interface ICardProps {
    product: IProduct;
}

export function Card({product}: ICardProps) {

    const { addProduct } = useCart()

    return (
        <div className={style.card}>
            <img src={product.image} alt="" />
            <div className={style.card__content}>
                <p>{product.title}</p>
                <h3>{formatPrice(product.price)}</h3>
                <div className={style.card__button}>
                    <span>
                        <ShoppingCartSimple />
                        0
                    </span>
                <button
                    onClick={() => addProduct(product.id)}
                >
                        ADICIONAR AO CARRINHO
                </button>
                </div>
            </div>
        </div>
    )
}