import React from 'react';
import { useEffect, useState } from "react";

function Table (props) {
    const cols = props.cols;
    const fetchData = props.fetchData;
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData().then(data => setData(data));
    }, []);
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
                        {cols.map(col => <th key={`${ind}_${col}`}>{row[col]}</th>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;