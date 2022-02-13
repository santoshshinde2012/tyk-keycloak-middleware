// Create your middleware object
var auth = new TykJS.TykMiddleware.NewMiddleware({});

// Initialise it with your functionality by passing a closure that accepts two objects
// into the NewProcessRequest() function:
auth.NewProcessRequest(function(request, session, spec) {

    console.log("This middleware does nothing, but will print this to your terminal.")

    var requestObj = {
      "Method": "POST",
      "Headers": {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      "Domain": spec.config_data.KC_SERVER,
      "Resource": "/auth/realms/" + spec.config_data.KC_REALM + "/protocol/openid-connect/token",
      "FormData": {
          "grant_type": spec.config_data.KC_GRANT_TYPE,
          "client_id": spec.config_data.KC_CLIENT_ID,
          "client_secret": spec.config_data.KC_CLIENT_SECRET
      }
  };

  var encodedResponse = TykMakeHttpRequest(JSON.stringify(requestObj));
  var decodedResponse = JSON.parse(encodedResponse);
  var decodedBody = {}

  try {
      decodedBody = JSON.parse(decodedResponse.Body);
  } catch (err) {
      decodedBody = {}
  }

  log(JSON.stringify(decodedBody));
  log(decodedBody.access_token);

  // request.headers.authorization = 'test';
  request.SetHeaders["authorization"] = "Bearer " + decodedBody.access_token;

  // You MUST return both the request and session metadata
  return auth.ReturnData(request, session.meta_data);
});