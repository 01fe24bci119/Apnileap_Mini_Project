const express = require('express');
const { getTheme, listThemeProjects, listThemeMentors } = require('../controllers/theme.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/:themeId', getTheme);
router.get('/:themeId/projects', listThemeProjects);
router.get('/:themeId/mentors', listThemeMentors);

module.exports = router;
