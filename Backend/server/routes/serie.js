const express = require('express');
const router = express.Router();
//query para todos
router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM serie', (err, rows) => {
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
                    detail: "No hay series"
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
        conn.query(`SELECT * FROM serie s 
        JOIN imagen i on s.imagenId = i.imagenId
        WHERE s.serieId = ?;`, [req.params.id], (err, row) => {
            if (err) {
                return res.send(err);
            }
            if (row[0]) {
                res.json({
                    res: "ok",
                    data: row[0]
                });
            } else {
                res.json({
                    res: "error",
                    detail: "No se encontro la serie"
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
        conn.query('INSERT INTO serie SET ?', [req.body], (err, row) => {
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
                    detail: "No se pudo agregar la serie"
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
        conn.query('UPDATE serie SET ? WHERE serieId = ?', [req.body, req.params.id], (err, row) => {
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
                    detail: "No se pudo actualizar la serie"
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
        conn.query('DELETE FROM serie WHERE serieId = ?', [req.params.id], (err, row) => {
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
                    detail: "Ha ocurrido un error al eliminar la serie"
                });
            }
        });
    });
});
router.get('/temporadas/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query(`SELECT t.* FROM serie s 
        JOIN temporada t on s.serieId = t.serieId
        WHERE s.serieId = ?;`, [req.params.id], (err, rows) => {
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
                    detail: "No se encontro la serie"
                });
            }
        });
    });
});
module.exports = router;