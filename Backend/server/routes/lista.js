const express = require('express');
const router = express.Router();
//query para todos
router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM lista', (err, rows) => {
            if (err) {
                return res.send(err);
            }
            if (rows.length > 0) {
                res.json({
                    res: "ok",
                    data: rows
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No hay listas"
                });
            }
        });
    });
});
//query de forma especifica
router.get('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM lista WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row) {
                res.json({
                    res: "ok",
                    data: row
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No se encontro la lista"
                });
            }
        });
    });
});
//query para agregar
router.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('INSERT INTO lista SET ?', [req.body], (err, row) => {
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
                    detail: "No se pudo agregar la lista"
                });
            }
        });
    });
});
//query para actualizar
router.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('UPDATE lista SET ? WHERE id = ?', [req.body, req.params.id], (err, row) => {
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
                    detail: "No se pudo actualizar la lista"
                });
            }
        });
    });
});
//query para eliminar
router.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('DELETE FROM lista WHERE id = ?', [req.params.id], (err, row) => {
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
                    detail: "Ha ocurrido un error al eliminar la lista"
                });
            }
        });
    });
});
module.exports = router;