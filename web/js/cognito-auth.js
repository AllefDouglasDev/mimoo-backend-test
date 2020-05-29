(function scopeWrapper($) {
  $(function onDocReady() {
    $('#button').click(handleSignin)
  });

  function handleSignin() {
    const email = $('#email').val()
    const password = $('#password').val()

    function onSuccess(data) {
      $('#result').html(data.idToken.jwtToken)
    }
    
    function onFailure(data) {
      console.log('failure', data)
      $('#result').html('Error to validate user')
    }

    signin(email, password, onSuccess, onFailure)
  }
  
  const poolData = {
    UserPoolId: 'us-east-1_WOylGIQ2H',
    ClientId: '369svmf4flhd07s6rpfnih3li4'
  }

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

  if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = 'us-east-1'
  }

  function signin(email, password, onSuccess, onFailure) {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    })

    const cognitoUser = createCognitoUser(email)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure
    })
  }

  function createCognitoUser(email) {
    return new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    })
  }
}(jQuery))
