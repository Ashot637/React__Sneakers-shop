import './crossCart.scss';
import icon from '../../img/delete.jpg'
import emptyCart from '../../img/emptyCart.jpg'
import orderImg from '../../img/ordered.jpg'
import { useContext, memo, useState} from 'react';
import DataContext from '../context';

const CrossCart = memo(({onCloseCart, setOpen}) => {
    const {cart, setCart, setOrders} = useContext(DataContext);
    const [ordered, setOrdered] = useState(false);
    const [loading, setLoading] = useState(false)

    const onDeleteItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const onOrder = () => {
        setLoading(true)
        setTimeout(() => {
            setOrders(orders => [...orders, ...cart]);
            setCart([]);
            setOrdered(true);
            setLoading(false);
        }, 1200);
    }

    const totalCost = cart.length > 0 ? cart.map(item => +item.price.replace(/\s/g, '')).reduce((acc, sum) => acc + sum) : 0;

    return (
        <div className={`overlay`} onClick={(e) => onCloseCart(e)}>
            <div className={`cross__cart `}>
                <div className="cross__cart__inner">
                    <div className="cross__cart__header">
                        <p className='cross__cart__title'>Корзина</p>
                        <button className="close__cart" onClick={() => setOpen(false)}>
                            <img src={icon} alt="" />
                        </button>
                    </div>
                    { cart.length !== 0 ?
                    <>
                        <div className="items">
                            {cart.map((cross, i) => {
                                return (
                                    <div className="added__cross" key={i}>
                                        <div className="added__cross__inner">
                                            <img src={cross.thumbnail} alt={cross.thumbnail} className='added__cross__img'/>
                                            <div className="added__cross__info">
                                                <div className="added__cross__title">{cross.title}</div>
                                                <div className="added__cross__price">{cross.price} руб.</div>
                                            </div>
                                            <button className="delete" onClick={() => onDeleteItem(cross.id)}>
                                                <img src={icon} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })} 
                        </div>
                        <ul className='cart__total'>
                            <li>
                                <span>Итого: </span>
                                <div></div>
                                <p>{totalCost} руб.</p>
                            </li>
                            <li>
                                <span>Налог 5%: </span>
                                <div></div>
                                <p>{Math.floor(totalCost * 0.02)} руб.</p>
                            </li>
                        </ul>
                        <button 
                        className='btn order'
                        onClick={onOrder}
                        disabled={loading}>
                            <p>Оформить заказ</p><span className="material-symbols-outlined">arrow_right_alt</span>             
                        </button>
                    </> 
                    :
                    !ordered ? 
                    <div className="empty__cart">
                        <img src={emptyCart} className='empty__cart-img' alt="" />
                        <h3 className='empty__cart__title'>Корзина пустая</h3>
                        <span className='empty__cart__subtitle'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</span>
                        <button onClick={() => setOpen(false)} className='btn btn__back'><span className="material-symbols-outlined">keyboard_backspace</span><p>Вернуться назад</p></button>
                    </div> 
                    :
                    <div className="empty__cart">
                        <img src={orderImg} className='empty__cart-img' alt="" />
                        <h3 className='empty__cart__title ordered-title'>Заказ оформлен!</h3>
                        <span className='empty__cart__subtitle'>Ваш заказ скоро будет передан курьерской доставке</span>
                    <button onClick={() => setOpen(false)} className='btn btn__back'><span className="material-symbols-outlined">keyboard_backspace</span><p>Вернуться назад</p></button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
})

export default CrossCart;