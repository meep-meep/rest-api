middleware that provides a REST API to control the meep-meep test runner.


available endpoints :

GET /api/assessments

get available assessments


POST /api/assessments

creates a new test assessment
takes the following parameters :

* name

string
name of the assessment

* constraints

string
json data about the assessment definition with the following syntax :

    [
        [
            ['test-tag1', 'test-tag2', ...],
            ['platform-tag1', 'platform-tag2', ...]
        ],

        ...
    ]

## example

If you want to create an assessment from the command line, you can use cUrl for instance as so :

    curl -X POST -H "application/json" -d "name=my-assessment&constraints=[[[\"test-tag1\", \"test-tag2\"],[\"platform-tag1\"]],[[\"test-tagA\"],[\"platform-tagA\"]]]" <your test server's URL>/api/assessments

Here we create the assessment 'my-assessment' which has a set of tests matching the tags "test-tag1" and "test-tag2" that must run on platforms matching tag 'platform-tag1' and another set of tests matching the tag "test-tagA" that must run on platforms matching tag "platform-tagA."