import './singleCross.scss'

import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react';
import { DB } from '../../DB/DB';
import { useEffect } from 'react';
import ErrorPage from '../pages/errorPage/ErrorPage';

const SingleCross = () => {
    const {crossId} = useParams();
    const [cross, setCross] = useState(null);
    
    useEffect(() => {
        onCrossLoaded();
    }, [crossId])

    const onCrossLoaded = () => {
        setCross(DB[crossId]);
    }
    
    return (
        <>
            {
                !cross ? <ErrorPage/> : <View cross={cross}/>
            }
        </>
    )
}

const View = ({cross}) => {
    const {title, thumbnail, price, size} = cross;


    useEffect(() => {
        itemRefs.current[0].classList.add('size__active');
    }, [])

    const itemRefs = useRef([]);

    const onSelectSize = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('size__active'));
        itemRefs.current[id].classList.add('size__active');
    }

    return (
        <div className="single__cross">
            <div className="container">
                <div className="single__cross__inner">
                    <img src={thumbnail} alt="" className="single__cross__img" />
                    <div className="single__cross__info">
                        <div className="single__cross__title">{title}</div>
                        <div className="single__cross__price">Цена: {price} руб.</div>
                        <div className="single__cross__size">Размер</div>
                        <div className="single__cross__sizes">
                            {
                                size.map((size, i) => {
                                    return (
                                        <div key={i} ref={el => itemRefs.current[i] = el} onClick={() => onSelectSize(i)} className="size">
                                            {size}
                                        </div>
                                    )
                                    
                                })
                            }
                        </div>
                        <button className='btn btn__favorite'>В Закладки</button>
                        <button className='btn btn__cart'>В Корзину</button>
                    </div>
                </div>
                <div className="back">
                <span className="material-symbols-outlined" style={{marginRight: 2}}>keyboard_backspace</span>
                    <Link to='/' className='link'>Назад ко всем предметам</Link>
                </div>
            </div>
        </div>
    )
}

export default SingleCross;