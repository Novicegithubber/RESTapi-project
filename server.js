const app = require("express")();
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const port = 3000;
const User = require("./models/User");
const bodyParser = require("body-parser");

const dbURI =
  "mongodb+srv://Mahmoudmagdy:qweasdzxc123@project.yngmc.mongodb.net/restapi?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("RESTapi project");
});

app.get("/users", (req, res) => {
  User.find({}, function (err, user) {
    res.send(user);
  });
});

app.post("/users", (req, res) => {
  User.create(req.body).then(function (user) {
    res.send(user);
  });
});

app.put("/users/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, user) {
    res.send(user);
  });
});

app.delete("/users/:id", (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    res.send(user);
  });
});
