"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = __importDefault(require("./api"));
const htmlRoutes_1 = __importDefault(require("./htmlRoutes"));
const router = (0, express_1.Router)();
// API routes
router.use('/api', api_1.default);
// HTML routes should come last
router.use('/', htmlRoutes_1.default);
exports.default = router;
