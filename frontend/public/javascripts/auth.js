function onSignIn(CredentialResponse) {
  var jwt = CredentialResponse.credential;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    console.log('Signed in as: ' + xhr.responseText);
    if (xhr.responseText == "success") {
      location.assign('/');
    }
  };
  xhr.send(JSON.stringify({ token: jwt }));
}
