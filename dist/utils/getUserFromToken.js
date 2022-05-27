"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var env = process.env;
var JSON_SIGNATURE = env.JSON_SIGNATURE;
var getUserFromToken = function (token) {
    console.log("aferReceiveFromIndex:".concat(token));
    try {
        return jsonwebtoken_1.default.verify(token, JSON_SIGNATURE);
    }
    catch (error) {
        return null;
    }
};
exports.getUserFromToken = getUserFromToken;
