'use strict';

var _ = require('lodash');
var async = require('async');
var superagent = require('superagent');

var services = require(process.env.CONFIG_FILE_PATH || '../config.sample.json');

function isUp(appData) {
    return function(results, callback) {
        var _appData = appData;
        superagent
        .get(appData.url)
        .withCredentials()
        .timeout({
            response: 2000,
            deadline: 5000
        })
        .end((err, response) => {
            if (err.timeout) {
                _appData.response = "TIMEOUT";
                results.push(_appData);
                callback(null, results);
            } else if (err) {
                if (err.code === 'ENOTFOUND' || response == null) {
                    _appData.response = "NOTFOUND";
                    _appData.error = JSON.stringify(err);
                } else if (response && response.status != 200) {
                    _appData.response = "ERROR";
                    _appData.error = JSON.stringify(err);
                } else {
                    _appData.response = "OK";
                }
                results.push(_appData);
                callback(null, results);
            } else {
                _appData.response = "OK";
                results.push(_appData);
                callback(null, results);
            }
        });
    }
}


exports.getItems = function(req, res) {
    var fns = [
        function(callback) {
            callback(null, []);
        }
    ];

    for (let service of services) {
        fns.push(isUp(service));
    }

    async.waterfall(
        fns,
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                res.send(results);
            }
        }
    )
}