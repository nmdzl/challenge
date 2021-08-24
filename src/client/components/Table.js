import React from 'react';
import { useEffect, useState } from "react";
import '../css/Table.css';

function Table (props) {
    const cols = props.cols;
    const fetchMethod = props.fetchMethod;
    const [data, setData] = useState([]);
    useEffect(() => {
        if (fetchMethod) {
            fetchMethod().then(data => setData(data));
        }
    }, [fetchMethod]);
    const makeInitialCapital = word => {
        return word[0].toUpperCase() + word.substring(1);
    }
    return (
        <table className="walmex-table">
            <thead>
                <tr>
                    {cols.map(col => <th key={col}>{makeInitialCapital(col)}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, ind) => (
                    <tr key={ind}>
                        {cols.map(col => <td key={`${ind}_${col}`}>{row[col]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;