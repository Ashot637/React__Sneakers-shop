import { useState, useEffect } from 'react'

import { DB } from '../../../DB/DB';
import './crossList.scss';
import img from '../../../img/emojiNotFound.jpg'

import Card from './Card';
import SearchPanel from '../../searchPanel/SearchPanel'
import Skeleton from '../../skeleton/Skeleton';

const CrossList = () => {
    const [crosses, setCrosses] = useState([]);
    const [term, setTerm] = useState('');
    const [offset, setOffset] = useState(12);
    const [loading, setLoading] = useState(true);
    const [newItemloading, setNewItemLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1400);
    }, [])

    useEffect(() => {
        setCrosses(onSearch(term, DB.slice(0, offset)))
    }, [term])

    const onCrossLoaded = () => {
        setNewItemLoading(true)
        setTimeout(() => {
            setCrosses(crosses => [...crosses, ...DB.slice(offset, offset + 8)])
            setOffset(offset + 8);
            setNewItemLoading(false);
        }, 800)
    }

    const onUpdateSearch = (term) => {
        setTerm(term);
    }

    const onSearch = (term, items) => {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => item.title.toLowerCase().includes(term.toLowerCase()))
    }


    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <Card
                key={item.id}
                id={item.id}
                thumbnail={item.thumbnail}
                price={item.price}
                title={item.title}
                />
            )
        })

        return (
            <div className="cross__grid">
                {items}
            </div>
        )
    }

    const items = renderItems(crosses);

    return (
        <div className="cross__list">
            <div className="container">
                <div className="cross__list__inner">
                    <div className="cross__list__header">
                        <h1>Все кроссовки</h1>
                        <SearchPanel onUpdateSearch={onUpdateSearch}/>
                    </div>
                    <div className="cross__list__items">
                        {
                            loading ? <Skeleton/> : items
                        }
                    </div>
                    {
                        offset > DB.length || loading ? null
                        : <button
                        onClick={onCrossLoaded} 
                        disabled={newItemloading}
                        className="btn"
                        style={crosses.length === 0 || !term.length == 0 ? {display: 'none'} : {display: 'block'}}>Посмотреть ещё</button>  
                    }
                    {
                        crosses.length === 0 ?
                        <div className="message" style={{paddingTop: '50px'}}>
                            <img src={img} alt="" />
                            <div className="message__title">Ничего не найдно</div>
                            <div className="message__subtitle">Нам очень жаль</div>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default CrossList;