const express = require('express');
const router = express.Router();
//query para todos
router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }
        conn.query('SELECT * FROM episodio', (err, rows) => {
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
                    detail: "No hay episodios"
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
        conn.query('SELECT * FROM episodio WHERE episodioId = ?', [req.params.id], (err, row) => {
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
                    detail: "No se encontro el episodio"
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
        conn.query('INSERT INTO episodio SET ?', [req.body], (err, row) => {
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
                    detail: "No se pudo agregar el episodio"
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
        conn.query('UPDATE episodio SET ? WHERE episodioId = ?', [req.body, req.params.id], (err, row) => {
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
                    detail: "No se pudo actualizar el episodio"
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
        conn.query('DELETE FROM episodio WHERE episodioId = ?', [req.params.id], (err, row) => {
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
                    detail: "Ha ocurrido un error al eliminar el episodio"
                });
            }
        });
    });
});
module.exports = router;
