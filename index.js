"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const port = 3000;
const app = (0, express_1.default)();
const checkFileMiddleware = (req, res, next) => {
    const filename = "files/" + req.params.filename;
    fs_1.default.access(filename, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            console.log(`file ${filename} doesn't exist`);
            fs_1.default.writeFile("files/" + req.params.filename, "Hello, File!", (err) => {
                if (err) {
                    res.status(500).send("error creating file");
                }
                else {
                    next();
                }
            });
        }
        else {
            console.log(`${filename} exists`);
            next();
        }
    });
};
// Route to check if the file exists and create it if necessary
app.get('/file/:filename', checkFileMiddleware, (req, res) => { });
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
