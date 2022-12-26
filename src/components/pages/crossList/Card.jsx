import { Link } from 'react-router-dom';
import { useCallback, useState, useContext, useEffect } from 'react';

import btnChecked from '../../../img/btn-checked.png';
import btnAdd from '../../../img/btn-add.png';
import unLiked from '../../../img/unLiked.png'
import liked from '../../../img/Liked.png';

import DataContext from '../../context';

import { DB } from '../../../DB/DB';

const Card = (props) => {
    const [isAddedToCart, setisAddedToCart] = useState(false);
    const [isAddedToFav, setIsAddedToFav] = useState(false)
    const {cart, setCart, favs, setFavs} = useContext(DataContext);

    useEffect(() => {
        if (cart.findIndex(item => item.id == props.id) === -1) {
            setisAddedToCart(false)
        } else {
            setisAddedToCart(true)
        }
        if (favs.findIndex(item => item.id == props.id) === -1) {
            setIsAddedToFav(false)
        } else {
            setIsAddedToFav(true)
        }
    }, [cart, favs])

    const onAddToCart = useCallback((id) => {
        if (cart.find(item => item.id === id)) {
            setisAddedToCart(false)
            setCart(cart => cart.filter(item => item.id !== id))
        } else {
            setisAddedToCart(true)
            setCart(cart => [...cart, DB[id]])
        };

        
    }, [cart])

    const onAddToFavs = useCallback((id) => {
        if (favs.find(item => item.id === id)) {
            setIsAddedToFav(false);
            setFavs(favs => favs.filter(item => item.id !== id))
        } else {
            setIsAddedToFav(true);
            setFavs(favs => [...favs, DB[id]])
        }
    }, [favs])

    return (
        <div className="cross" key={props.id}>
            {
                !props.order && 
                <img 
                src={isAddedToFav ? liked : unLiked} alt="" 
                style={isAddedToFav ? {border: 'none'} : null}
                className="favorite__img" 
                onClick={() => onAddToFavs(props.id)}/>
            }
            <Link to={`/${props.id}`}>
                <img src={props.thumbnail} alt="cross" className="cross__thumbnail"/>
                <div className="cross__title">
                    {props.title}
                </div>
            </Link>
            <div className="cross__down">
                <div className="cross__price">
                    <p>Цена:</p>
                    {props.price} руб.
                </div>
                {
                    !props.order && <div 
                    className="cross__add" 
                    style={isAddedToCart ? {border: 'none'} : null}
                    onClick={() => onAddToCart(props.id)}>
                        <img
                        src={isAddedToCart ? btnChecked : btnAdd} 
                        alt="btn" />
                    </div>
                }
            </div>
        </div>
    )   
}

export default Card;