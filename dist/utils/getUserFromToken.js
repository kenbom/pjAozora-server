"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var keys_1 = require("../keys");
require('dotenv').config();
var env = process.env;
var getUserFromToken = function (token) {
    console.log("aferReceiveFromIndex:".concat(token));
    console.log("checkEnv:".concat(env.DATABASE_URL));
    console.log("checkEnv:".concat(env.JSON_SIGNATURE));
    try {
        return jsonwebtoken_1.default.verify(token, keys_1.JSON_SIGNATURE);
    }
    catch (error) {
        return null;
    }
};
exports.getUserFromToken = getUserFromToken;
