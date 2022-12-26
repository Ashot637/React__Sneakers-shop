import img from './Error.jpg'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <img style={{ display: 'block', width: "1000px", height: "400px",objectFit: 'contain', margin: "0 auto 50px"}} src={img} alt="" />
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <button className="btn btn__back" style={{margin: '-150px auto 0'}}>
                    <span className="material-symbols-outlined">keyboard_backspace</span>
                    <p>Вернуться назад</p>
                </button>
            </Link>
        </div>
    )
}

export default ErrorPage;