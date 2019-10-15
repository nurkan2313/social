require('dotenv').config();
const axios = require('axios');

async function getIncludedTariffsCodeThree(req, res, next) {

    let msisdn = req.body.msisdn;

    axios.post(`http://builder.megacom.local:8585/MegaBuilder-war/process`, null, { params: {
        servid: 2895,
        msisdn: msisdn,
        code: 3
    }})
    .then(async response => {
        const d = await response.data;

        if(d.type === 1) {
            return res.status(200).json({"success": true, "data": d});
        } else {
            return res.status(200).json({"success": false, "error": d});
        }
    })
}

async function getIncludedTariffsCodeTwo(req, res, next) {

    let msisdn = req.body.msisdn;

    axios.post(`http://builder.megacom.local:8585/MegaBuilder-war/process`, null, { params: {
        servid: 2895,
        msisdn: msisdn,
        code: 2
    }})
    .then(async response => {
        const d = await response.data;
        return res.status(200).json({"success": true, "data": d});
    })
}

async function getIncludedTariffsCodeFour(req, res, next) {

    let msisdn = req.body.msisdn;

    axios.post(`http://builder.megacom.local:8585/MegaBuilder-war/process`, null, { params: {
        servid: 2895,
        msisdn: msisdn,
        code: 4
    }})
    .then(async response => {
        const d = await response.data;

        if(d.type === 1) {
            return res.status(200).json({"success": true, "data": d});
        } else {
            return res.status(200).json({"success": false, "error": d});
        }
    })
}


module.exports = {
    getIncludedTariffs,
    getIncludedTariffsCodeTwo,
    getIncludedTariffsCodeThree,
    getIncludedTariffsCodeFour
};
