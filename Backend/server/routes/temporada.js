const express = require('express');
const router = express.Router();
//query para todos
router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM temporada', (err, rows) => {
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
                    detail: "No hay temporadas"
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
        conn.query('SELECT * FROM temporada WHERE temporadaId = ?', [req.params.id], (err, row) => {
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
                    detail: "No se encontro la temporada"
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
        conn.query('INSERT INTO temporada SET ?', [req.body], (err, row) => {
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
                    detail: "No se pudo agregar la temporada"
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
        conn.query('UPDATE temporada SET ? WHERE temporadaId = ?', [req.body, req.params.id], (err, row) => {
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
                    detail: "No se pudo actualizar la temporada"
                });
            }
        });
    });
});
// query para eliminar
router.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('DELETE FROM temporada WHERE temporadaId = ?', [req.params.id], (err, row) => {
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
                    detail: "Ha ocurrido un error al eliminar la temporada"
                });
            }
        });
    });
});
router.get('/episodios/:id', (req, res) => {
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