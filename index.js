const express = require('express');
const handlebars = require('express-handlebars');
const multer = require('multer');
const Multer = require('multer');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const upload = new Multer({
  dest: './public/uploads',
  limits: {
    fileSize: 10
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/uploadform', (req, res) => {
  res.render('uploadform');
});

app.post('/uploadform', (req, res) => {
  // upload.single('datei)(req, res, err => ...) geht auch
  const uploadfile = upload.single('datei');
  uploadfile(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.render('upload-ergebnis', {
        fehler: 'multer Fehler'
      });
    } else if (err) {
      res.render('upload-ergebnis', {
        fehler: 'anderer Fehler als multer'
      });
    } else {
    res.render('upload-ergebnis', {
      body: req.body,
      file: req.file
    });
  }
  })
});


const port = 3000;

app.listen(port, () => console.log(`Server läuft auf ${port}`));