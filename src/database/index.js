'use strict';
const { reject } = require('lodash');
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(({
                success: true,
                data: dataAccessMethod()
            }));
        }, 500);
    }).catch(error => {
        Promise.resolve(({
            success: false,
            data: error
        }));
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo);
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        const usernames = [];
        const dataItemsOfUserByUsername = db.itemsOfUserByUsername;
        for (const [username, items] of Object.entries(dataItemsOfUserByUsername)) {
            if (items.includes(item)) usernames.push(username);
        }
        const demographic = {};
        const dataUsersInfo = Object.values(db.usersById);
        usernames.forEach(username => {
            for (let userinfo of dataUsersInfo) {
                if (userinfo.username === username) {
                    demographic[userinfo.age] = (demographic[userinfo.age] || 0) + 1;
                }
            }
        });
        const response = [];
        for (const [age, count] of Object.entries(demographic)) {
            response.push({ age: age, count: count});
        }
        return response;
    }
    return mockDBCall(dataAccessMethod);
}

const getItems = () => {
    const dataAccessMethod = () => {
        const itemSet = new Set();
        const dataItemsOfUserByUsername = db.itemsOfUserByUsername;
        Object.values(dataItemsOfUserByUsername).forEach(items => {
            items.forEach(item => itemSet.add(item));
        });
        return Array.from(itemSet);
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getItems
};
