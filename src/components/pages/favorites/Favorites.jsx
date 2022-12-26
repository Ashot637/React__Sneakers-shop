import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DataContext from "../../context"
import Card from "../crossList/Card"
import Skeleton from "../../skeleton/Skeleton"

import img from '../../../img/emojiEmpty.jpg'

import '../crossList/crossList.scss'
const FavoritesList = () => {
    const {favs} = useContext(DataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1400);
    }, [])

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <Card
                key={Math.floor(Math.random() * (100000-1) + 1)}
                id={item.id}
                thumbnail={item.thumbnail}
                price={item.price}
                title={item.title}
                order={false}
                />
            )
        })

        return (
            <div className="cross__grid">
                {items}
            </div>
        )
    }

    const items = renderItems(favs);
    
    return (
        <>
            {
                favs.length !== 0 ? 
                <div className="cross__list">
                    <div className="container">
                        <div className="cross__list__inner">
                            <div className="cross__list__header">
                                <h1>Мои закладки</h1>
                            </div>
                            <div className="cross__list__items">
                            {
                                loading ? <Skeleton/> : items
                            }            
                            </div>
                        </div>
                    </div>
                </div> : 
                <div className="message">
                    <img src={img} alt="" className="message__img"/>
                    <div className="message__title">Закладок нет :(</div>
                    <div className="message__subtitle">Вы ничего не добавляли в закладки</div>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                    <button className="btn btn__back">
                        <span className="material-symbols-outlined">keyboard_backspace</span>
                        <p>Вернуться назад</p>
                    </button>
                    </Link>
                </div>
            }
        </>
    )
}

export default FavoritesList;