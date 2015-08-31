var path = require('path');

var RSVP = require('rsvp');
var express = require('express');

var Assessments = require('mm-assessments');
var _assessments = null;
var TestsInterface = require('mm-tests-interface');


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
        var constraints = JSON.parse(request.body.constraints);

        _assessments.createAssessment(
            request.body.name,
            constraints,
            +(new Date())
        )
            .then(function() {
                response.redirect('/back-office/assessments');
            })
            .catch(function(error) {
                console.error(error);
            });
    });


module.exports = function(assessments) {
    _assessments = assessments;
    _testsInterface = new TestsInterface(assessments.getDataAdapter());
    return app;
};
