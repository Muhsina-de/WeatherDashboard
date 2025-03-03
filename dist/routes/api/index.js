"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherRoutes_1 = __importDefault(require("./weatherRoutes"));
const router = (0, express_1.Router)();
router.use('/weather', weatherRoutes_1.default);
exports.default = router;
