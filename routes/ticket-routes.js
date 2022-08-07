const express = require('express');
const router = express.Router();

const tickets_service = require("../service/ticket-service")

/* GET users listing. */
router.post('/new', function(req, res, next) {
    tickets_service.createTicket(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});
router.get('/:param', function(req, res, next) {
    tickets_service.getTicket(req.params, req.query)
        .then(() => res.json({}))
        .catch(err => next(err));
});
router.get('/markAsClosed', function(req, res, next) {
    tickets_service.closeTicket(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});
router.get('/delete',function(req, res, next) {
    tickets_service.deleteTicket(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});

module.exports = router;

