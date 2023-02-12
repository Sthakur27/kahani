"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3201;
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../build/frontend')));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Handle GET requests to /api route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});
app.get('/api/greeting', (req, res) => {
    const name = 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../build/frontend', 'index.html'));
});
app.listen(port, () => {
    console.log('Ayy lmao2');
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map