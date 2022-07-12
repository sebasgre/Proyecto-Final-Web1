const express = require('express');
const router = express.Router();
//query para todos los usuarios --> GET
router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                return res.send(err);
            }
            if (rows.length > 0) {
                res.json({
                    res: "ok",
                    usuario: rows
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No hay usuarios"
                });
            }
        });
    });
});
//query de forma especifica para un usuario --> GET
router.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM usuario WHERE usuarioId = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row) {
                res.json({
                    res: "ok",
                    usuario : row
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No se encontro el usuario"
                });
            }
        });
    });
});
//query para agregar un usuario --> POST
router.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('INSERT INTO usuario SET ?', [req.body], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row) {
                delete row.password;
                res.json({
                    res: "ok"
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No se pudo agregar el usuario"
                });
            }
        });
    });
});
//query para actualizar un usuario --> PUT
router.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('UPDATE usuario SET ? WHERE usuarioId = ?', [req.body, req.params.id], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row) {
                res.json({
                    res: "ok"
                });
            } else {
                res.json({
                    res: "error",
                    detail: "Ha ocurrido un error al actualizar el usuario"
                });
            }
        });
    });
});
//query para eliminar un usuario --> DELETE
router.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('DELETE FROM usuario WHERE usuarioId = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row) {
                res.json({
                    res: "ok"
                });
            } else {
                res.json({
                    res: "error",
                    detail: "Ha ocurrido un error al eliminar el usuario"
                });
            }
        });
    });
});
router.post('/login', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM usuario where username = ? and password = ?', [req.body.username, req.body.password], (err, rows) => {
            if (err) {
                return res.send(err);
            }
            if (rows.length > 0) {
                delete rows[0].password;
                res.json({
                    res: "ok",
                    usuario: rows[0]
                });
            } else {
                res.json({
                    res: "error",
                    detail: "Usuario o contraseña incorrectos"
                });
            }
        });
    });
});
module.exports = router;