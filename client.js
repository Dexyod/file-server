const net = require("net");
const port = 8000;
const client = net.createConnection({
  port: port,
  host: "localhost",
});

client.setEncoding("utf8");

process.stdin.on("data", function (fileName) {
  client.write(fileName);
});

// Events: connect, message, error, end
client.on("connect", function () {
  console.log("client is connected to server");
});
// event handle for receiving incoming message from server
client.on("data", function (message) {
  console.log(message);
});
// event handler for error
client.on("error", function (err) {
  console.log(`Error: ${err.message}`);
});
// event handler for disconnection
client.on("end", function () {
  console.log("client disconnected from server");
});
