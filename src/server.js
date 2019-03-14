const app = require("./app"); //import the initialized express application
const http = require("http"); //import the HTTP module
const server = http.createServer(app); //creates our server

server.listen(3000); //sets port the app will listen for request to 3000

server.on("listening", () => {
  console.log("server is listening for requests on port 3000");
}); //logs this to console when we start the server
