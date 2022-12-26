import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import CrossCart from "../crossCart/CrossCart";
import SingleCross from "../singleCross/SingleCross";
import AppFooter from "../appFooter/AppFooter";
import { memo, useState, useEffect } from "react";


import {CrossList, FavoritesList, OrdersList, ErrorPage} from '../pages';

import DataContext from "../context";

const App = memo(() => {
    const [open, setOpen] = useState(false);

    const [cart, setCart] = useState([])
    const [favs, setFavs] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setCart(JSON.parse(window.localStorage.getItem('cart')))
        setFavs(JSON.parse(window.localStorage.getItem('favs')))
        setOrders(JSON.parse(window.localStorage.getItem('orders')))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        window.localStorage.setItem('favs', JSON.stringify(favs))
    }, [favs])

    useEffect(() => {
        window.localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])

    useEffect(() => {
        let body = document.body;
        if(open) {
            body.classList.add('disable-scroll');
        } else {
            body.classList.remove('disable-scroll');
        }
    }, [open])

    const onOpenCart = () => {
        setOpen(true)
    }

    const onCloseCart = (e) => {
        if (e.target === document.querySelector('.overlay')) {
            setOpen(false)
        }
    }

    return (
            <DataContext.Provider value={{cart, setCart, orders, setOrders, favs, setFavs}} >
                <div className="my-app">
                    {
                        open ? <CrossCart 
                        open={open}
                        setOpen={setOpen}
                        onCloseCart={onCloseCart}/>: null
                    }
                    <AppHeader
                    onOpenCart={onOpenCart}/>
                    <main>
                        <Routes>
                            <Route path="/" element={<CrossList/>} />
                            <Route path="/:crossId" element={<SingleCross/>} />
                            <Route path="/orders" element={<OrdersList/>} />
                            <Route path="/favorites" element={<FavoritesList/>} />
                            <Route path="*" element={<ErrorPage/>} />
                        </Routes>
                    </main>
                </div>
                <AppFooter/>
            </DataContext.Provider>           
    )
})

export default App;