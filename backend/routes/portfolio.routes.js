const express = require('express');
const { listProjects, listFilterOptions, listIssues, listReviews, listDepartments } = require('../controllers/portfolio.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);
router.get('/projects', listProjects);
router.get('/departments', listDepartments);
router.get('/filters', listFilterOptions);
router.get('/issues', listIssues);
router.get('/reviews', listReviews);

module.exports = router;
