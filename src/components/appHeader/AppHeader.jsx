import './appHeader.scss';
import logo from '../../img/logo.png'
import { Link } from 'react-router-dom';
import DataContext from '../context';
import { useContext } from 'react';

const AppHeader = ({onOpenCart}) => {
    const {cart} = useContext(DataContext);

    return (
        <div className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to={'/'} className="header__left">
                        <div className="header__logo">
                            <img src={logo} alt={logo} className="logo__icon"/>
                        </div>
                            <div className="header__info">
                                <h2>REACT SNEAKERS</h2>
                                <p>Магазин лучших кроссовок</p>
                        </div>
                    </Link>
                    <div className="header__right">
                        <div className="cart__items" onClick={(e) => onOpenCart(e)}>
                            <span className="material-symbols-outlined header__icon cart">
                                shopping_cart
                            </span>
                            <div className="cart__number" style={{display : cart.length ? 'block': 'none'}}>
                                {cart.length}
                            </div>
                            <div className="header__cost">{
                                cart.length > 0 ? 
                                cart.map(item => +item.price.replace(/\s/g, '')).reduce((acc, sum) => acc + sum) : 0
                            } руб.</div>
                        </div>
                        <Link to={'/favorites'} style={{color: 'black'}} className='icon__link'>
                            <span className="material-symbols-outlined header__icon account">
                                favorite
                            </span>
                        </Link>
                        <Link to={'/orders'} style={{color: 'black'}}>
                            <span className="material-symbols-outlined header__icon account">
                                person
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;