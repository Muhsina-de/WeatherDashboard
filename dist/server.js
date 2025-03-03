"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// Load environment variables
dotenv_1.default.config({ path: (0, path_1.resolve)(process.cwd(), '.env') });
// Add detailed environment checks
if (!process.env.OPENWEATHER_API_KEY) {
    console.error('ERROR: OpenWeather API key is not configured');
    process.exit(1);
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files first
app.use(express_1.default.static('public'));
// Then routes
app.use(routes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start the server on the port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
