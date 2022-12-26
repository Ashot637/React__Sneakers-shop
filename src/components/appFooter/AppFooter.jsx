import { Link } from "react-router-dom"
import './appFooter.scss'
import logo from '../../img/logo.png'

const AppFooter = () => {
    return (
        <footer className="footer">
                    <Link to={'/'} className="footer__inner">
                        <div className="footer__logo">
                            <img src={logo} alt={logo} className="logo__icon"/>
                        </div>
                            <div className="footer__info">
                                <h2>REACT SNEAKERS</h2>
                                <p>Магазин лучших кроссовок</p>
                        </div>
                    </Link>
        </footer>
    )
}
    
export default AppFooter;