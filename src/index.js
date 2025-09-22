"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 4000;
app.get('/', function (req, res) {
    res.json({ message: "Server is running" });
});
app.listen(PORT, function () { return console.log("Server started at: ".concat(PORT)); });
