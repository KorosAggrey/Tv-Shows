const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require('node-fetch');
const { json } = require('sequelize');

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://videos.chrystals.co.ke/";
    }

    async signup({ name, email, password }) {
        //{ "request": { "request_id": "1", "data": { "full_name": "Aggrey Koros", "email": "aggreykoros04@gmail.com", "phone": 703656970, "password": "ZW5lcmdvbjEyMw%3D%3D" } } }
        const data = { request:{request_id:{ data:{ full_name: name, email: email, password: password }}}}
        var response = null
        await fetch(this.baseURL + "api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => response = json);;
        return response;
    }
}

module.exports = UserAPI;