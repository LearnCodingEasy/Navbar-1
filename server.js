var StaticServer = require("static-server");
var server = new StaticServer({
  rootPath: "./dist/",
  port: 1055,
});
server.start(function () {
  console.log("Server Started At Port ", server.port);
});
