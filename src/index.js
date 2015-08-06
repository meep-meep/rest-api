var path = require('path');

var RSVP = require('rsvp');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var Assessments = require('mm-assessments');
var _assessments = null;
var TestsInterface = require('mm-tests-interface');
var platformMatcher = require('mm-platform-matcher');


var app = express();


app.get(
    '/api/assessments',
    function(request, response, next) {
        _assessments.getAssessments()
            .then(function(assessments) {
                response.send(assessments);
            });
    });

app.post(
    '/api/assessments',
    function(request, response, next) {
        var requestData = JSON.parse(request.body);

        _assessments.createAssessment(
            requestData.name,
            requestData.constraints,
            +(new Date())
        )
            .then(function() {
                response.redirect('/back-office/assessments');
            })
            .catch(function(error) {
                console.error(error);
            });
    });

function retrieveAdminData() {
    return _assessments.getAssessments()
        .then(function(hash) {
            return {
                assessments: hash.assessments
            };
        });
}


module.exports = function(assessments) {
    _assessments = assessments;
    _testsInterface = new TestsInterface(assessments.getDataAdapter());
    return app;
};
