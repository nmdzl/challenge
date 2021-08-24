import React from 'react';
import './App.css';
import Table from './components/Table';

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
    return (
        <>
            <section className="outline" id="users">
                <h1>All Users</h1>
                <h4>Users and their age</h4>
                <Table cols={['username', 'age']} fetchData={getFetchMethod('/users')}></Table>
            </section>
            <section className="outline" id="agedem">
                <h1>Age Demographic of Users With ___</h1>
            </section>
        </>
    );
}

export default App;