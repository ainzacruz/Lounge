const app = require("./app"); //import the initialized express application
const http = require("http"); //import the HTTP module
// const server = http.createServer(app); //creates our server

//allows environment to set the port that our application will use if given, otherwise select own
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const server = http.createServer(app);
server.listen(port); //sets port the app will listen for request to 3000

server.on("listening", () => {
  console.log(
    `server is listening for requests on port ${server.address().port}`
  );
});
