const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let users = []; // 임시로 사용자 정보를 저장하는 배열 (데이터베이스 대신 사용)

app.post('/login', (req, res) => {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (user) {
        res.json({ status: 'success', message: 'Successfully logged in!' });
    } else {
        res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
    }
});

app.post('/signup', (req, res) => {
    const existingUser = users.find(u => u.username === req.body.username || u.email === req.body.email);
    if (existingUser) {
        res.status(409).json({ status: 'error', message: 'Username or email already exists.' });
    } else {
        users.push(req.body);
        res.json({ status: 'success', message: 'Successfully registered!' });
    }
});

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imagePath = path.join(__dirname, req.file.path);
        const outputPath = path.join(__dirname, 'processed', req.file.filename);

        await sharp(imagePath).resize(200, 200).toFile(outputPath);

        res.json({ message: 'Image processed!', url: `/processed/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ message: 'Error processing image.' });
    }
});

app.get('/processed/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'processed', req.params.filename));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

