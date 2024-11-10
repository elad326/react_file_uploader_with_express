const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');  // Import cors

// init express
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000'
})); // Allow all origins

// init fileUpload
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {

    console.log('Received request to /upload'); // Check if the request reaches the backend


    // check if no file uploaded 
    if(req.files === null){
        return res.status(400).json({ msg: "No File Uploaded.."});
    }

    // if there is a file - get the file 
    const file = req.files.file;

    console.log('Uploaded file:', file); // Log the file object

    // upload file 
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {

        if(err){
            console.error(err);
            return res.status(500).send(err); 
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

    });

});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});