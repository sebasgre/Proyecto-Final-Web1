//CSR = Client Side Rendering
// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../images')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({ storage: storage });
const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');
// agrego la ruta a la app express
const apiRouter1 = require('./routes/usuario.js');
const apiRouter2 = require('./routes/episodio.js');
const apiRouter3 = require('./routes/serie.js');
const apiRouter4 = require('./routes/imagen.js');
const apiRouter5 = require('./routes/temporada.js');
const apiRouter6 = require('./routes/lista.js');
const app = express();
// app.get("/upload", (req, res) => {
//     res.render("upload");
// });
// app.get("/upload", upload.single('image'), (req, res) => {
//     res.send("Imagen subida");
// });
app.use(cors());
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'proyectoweb1'
}
// Middleware para parsear el body de los requests
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json());
app.use('/api/usuario', apiRouter1);
app.use('/api/episodio', apiRouter2);
app.use('/api/serie', apiRouter3);
app.use('/api/imagen', apiRouter4);
app.use('/api/temporada', apiRouter5);
app.use('/api/lista', apiRouter6);
// exporto la app

app.set('port', process.env.PORT || 3000);
// server escuchando en el puerto 3000
app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
});
