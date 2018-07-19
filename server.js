
var fs = require('fs')
var http = require('http')
var url = require('url')
var port = process.argv[2]

if(!port) {
  console.log('请输入端口号')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query

  console.log('方方说：不含查询字符串的路径为\n' + pathNoQuery)

  if (pathNoQuery === '/') {
    response.setHeader('Content-Type', 'text/html;charset=utf-8')  
    response.end('<!DOCTYPE>\n<html>'  + 
      '<head><link rel="stylesheet" href="/style.css">' +
      '</head><body>'  +
      '<h1>你好</h1>' +
      '<script src="/main.js"></script>' +
      '</body></html>')
  } else if (pathNoQuery === '/style.css') {
    response.setHeader('Content-Type', 'text/css; charset = utf-8')
    response.end('body{background-color:blue;}h1{color:red;}')
  } else if (pathNoQuery === '/main.js') {
    response.setHeader('Content-Type', 'text/javascript; charset = utf-8')
    response.end('alert(123)')
  } else {
    response.statusCode = 404
    response.end()
  }

})

server.listen(port)
console.log('监听' + port + '成功')