// import the net library -> TCP protocal
const net = require("net");
const port = 8000;
const server = net.createServer();
const fs = require("fs");

// Event: when a client connect => on connection
server.on("connection", function (client) {
  console.log("Client is connected.");

  // set the encoding to utf8
  client.setEncoding("utf8");

  client.write(
    "Welcome to my awesome server!\n Please enter a file path to be read."
  );

  client.on("data", function (fileName) {
    fileName = fileName.replace(/\n/, "");
    fs.readFile(fileName, (error, content) => {
      if (error) {
        console.log(error);
      } else {
        client.write(content);
      }
    });
  });

  // error event handler
  client.on("error", function (err) {
    console.log(`Error: ${err.message}`);
  });
  // on close event handler -> whenever a client disconnect
  client.on("close", function () {
    console.log("client is disconected.");
  });
});
// have the server listen for incoming client connection
server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
