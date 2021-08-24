'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try {
        var itemToLookup = request.params.item;
    } catch (error) {
        return response.status(400).send(error.message);
    }
    try {
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        if (data.success) {
            return response.status(200).send(JSON.stringify(data.data));
        }
        throw Error(data.data);
    } catch (error) {
        return response.status(500).send(error.message);
    }
};

module.exports = (app) => {
    app.get('/users/age/:item', getListOfAgesOfUsersWithHandler);
};
