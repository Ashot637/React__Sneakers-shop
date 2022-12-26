import { useState } from 'react';
import './searchPanel.scss';

const SearchPanel = (props) => {
    const [term, setTerm] = useState('');

    const onUpdateSearch = (e) => {
        const term = e.target.value;
        setTerm(e.target.value)
        props.onUpdateSearch(term);
    }

    return(
        <form>
            <span className='material-symbols-outlined'>
                Search
            </span>
            <input
            type="text" 
            value={term}
            onChange={(e) => onUpdateSearch(e)}
            className="search"
            placeholder='Поиск...'/>
        </form>
    )
}

export default SearchPanel;