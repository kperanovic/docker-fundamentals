import express from 'express';
import fs from 'fs';

const port = 3000;
const app = express();

const checkFileMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const filename = "files/" + req.params.filename as string
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`file ${filename} doesn't exist`)
      fs.writeFile("files/" + req.params.filename as string, "Hello, File!", (err) => {
        if (err) {
          res.status(500).send("error creating file");
        } else {
          next();
        }
      });
    } else {
      console.log(`${filename} exists`)
      next();
    }
  });
};

// Route to check if the file exists and create it if necessary
app.get('/file/:filename', checkFileMiddleware, (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
