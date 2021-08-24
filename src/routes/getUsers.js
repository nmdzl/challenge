'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    try {
        const data = await mockDBCalls.getUsers();
        if (data.success) {
            return response.status(200).send(JSON.stringify(data.data));
        }
        throw Error(data.data);
    } catch (error) {
        return response.status(500).send(error.message);
    }
};

module.exports = (app) => {
    app.get('/users', getUsersHandler);
};
