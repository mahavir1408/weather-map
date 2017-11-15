module.exports = function () {
  var data = {};
  
  //Log error message
  const logError = function (error) {
    const message = error.message;
    console.log(message);
  }

  data.index = function (req, res) {
    const http = require('http');
    const querystring = require('querystring');
    const conf = require(`../config/${req.app.get('env')}.json`);
    const template = "forecast";
    const city = 'London, uk';
    const qs = querystring.stringify({q: city, appid: conf.api_key});
    const api = conf.api + '?' + qs;
  
    const request = http.request(api, function (response) {
      var body = "";
    
      // Read the data
      response.on('data', function (chunk) {
        body += chunk;
      });
    
      response.on('end', function () {
        if (response.statusCode === 200) {
          try {
            // Parse the data
            const forecast = JSON.parse(body);
            params = {
              content: forecast,
              city: city
            };
            res.render(template, params);
          } catch (error) {
            logError(error);
          }
        } else {
          logError({ message: "There is an error" });
        }
      });
    });
    
    request.end();
    
    // Connection Error
    request.on('error', logError);
  }
  return data;
};
