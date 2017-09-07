//
//
// https://www.npmjs.com/package/connect
// https://github.com/napcs/node-livereload
//

var connect = require('connect');
var ServeStatic = require('serve-static');
var OpenUrl = require('openurl');


var server = connect();
var app = {
  root: 'app',
  port: 8808,
  host: 'localhost'
};

server.use(ServeStatic(__dirname + '/' + app.root));

server.listen(app.port);


server.use(function(req, res){
  server.end('Hello from Connect!\n');
});


server.use(function (req, res, next) {
  var filename = path.basename(req.url);
  var extension = path.extname(filename);
  if (extension === '.css')
    console.log("The file " + filename + " was requested.");
  next();
});

/*

server.on(function () {
  console.log('server started on: ' + 'http://'+app.host+':'+app.port+'/');

});
*/


var livereload = require('livereload');
var reloadServer = livereload.createServer();

var watchdir = __dirname + '/' + app.root;
console.log(watchdir);
reloadServer.watch(watchdir, { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
});


var url = 'http://' + app.host + ':' + app.port + '/';
OpenUrl.open(url);

