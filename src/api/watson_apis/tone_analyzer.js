var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '4465d93b-14a5-4340-a2cd-67cb939899f3',
  password: 'gXcd0JWgXvsR',
  version_date: '2016-05-19'
});

var params = require('./../../../test/resources/tone-example.json');

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);
