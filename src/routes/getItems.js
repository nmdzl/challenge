'use strict';
const mockDBCalls = require('../database/index.js');

const getItemsHandler = async (request, response) => {
    try {
        const data = await mockDBCalls.getItems();
        return response.status(200).send(JSON.stringify(data.data));
    } catch (error) {
        return response.status(500).send(error.message);
    }
};

module.exports = (app) => {
    app.get('/items', getItemsHandler);
};