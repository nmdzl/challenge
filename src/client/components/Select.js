import React, { useEffect, useState } from 'react';
import '../css/Select.css';

function Select (props) {
    const fetchMethod = props.fetchMethod;
    const onChangeHandler = props.onChangeHandler;
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetchMethod().then(data => setItems(data));
    }, []);
    return (
        <select onChange={onChangeHandler}>
            <option disabled selected value="">Item</option>
            {items.map(item => (
                <option key={item}>{item}</option>
            ))}
        </select>
    );
}

export default Select;