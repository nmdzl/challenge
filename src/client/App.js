import React, { useCallback, useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';

const serverUrl = 'http://localhost:3000';
const getFetchMethod = (route) => {
    return () => fetch(serverUrl + route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

function App () {
    const [item, setItem] = useState(undefined);
    const itemSelectOnChangeHandler = (event) => {
        setItem(event.target.value);
    }
    const fetchMethodUsers = useCallback(getFetchMethod('/users'), []);
    return (
        <>
            <section className="outline" id="users">
                <h1>All Users</h1>
                <p>Users and their age</p>
                <Table cols={['username', 'age']} fetchMethod={fetchMethodUsers}></Table>
            </section>
            <section className="outline" id="agedem">
                <h1>Age Demographic of Users With</h1>
                <Select fetchMethod={getFetchMethod('/items')} onChangeHandler={itemSelectOnChangeHandler}></Select>
                <Table cols={['age', 'count']} fetchMethod={item ? getFetchMethod('/users/age/' + item) : null}></Table>
            </section>
        </>
    );
}

export default App;