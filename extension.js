var _ = require('lodash')

module.exports.extension = function(server, ops){

  var ops = ops || {}
  ops.key = ops.key || 'auth'

  server.router.methodProcessor('auth', 'postDispatch', function(auth){
    if(auth === null) throw new Error('Auth method required on routes')
    var type = false
    if(typeof auth === 'string') type = auth
    switch(type){
      case 'required':
        return {_eqauth: authRequired}
        break;
      case 'none':
        return null
        break;
      default:
        throw new Error('auth type undefined')
    }
  })

  function authRequired(request, remand){
    var session = request.getSession()
    console.log('sessdata', session.data[ops.key])
    if(session.data[ops.key]) remand(true)
    else
      request.error(403); remand.break();
  }
}
