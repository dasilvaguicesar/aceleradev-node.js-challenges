const { app } = require('./server')

app.listen(8080, function () {
  console.info('%s listening at port %s', 'Students API', 8080)
})
