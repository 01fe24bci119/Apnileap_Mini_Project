const { pool } = require('../config/db');
const { cleanName } = require('../validators/academic.validator');
const { isFacultyOnly, isStudentOnly } = require('../services/access.service');

// GET /api/departments/:departmentId/themes
async function listDepartmentThemes(req, res, next) {
    try {
        const { departmentId } = req.params;

        const { rows: deptRows } = await pool.query(
            `SELECT d.id, d.code, d.name, d.institute_id,
                    i.name AS institute_name, i.code AS institute_code,
                    COALESCE(hu.full_name, d.head_display_name) AS head_name
             FROM departments d
             JOIN institutes i ON i.id = d.institute_id
             LEFT JOIN users hu ON hu.id = d.head_user_id
             WHERE d.id = $1`,
            [departmentId]
        );
        if (!deptRows[0]) return res.status(404).json({ error: 'Department not found.' });

        let mentorProjectFilter = '';
        const themeParams = [departmentId];
        if (isFacultyOnly(req.user)) {
            themeParams.push(req.user.id);
            const uidIdx = themeParams.length;
            themeParams.push(req.user.fullName || '');
            const nameIdx = themeParams.length;
            themeParams.push((req.user.projectIds && req.user.projectIds.length) ? req.user.projectIds : ['00000000-0000-0000-0000-000000000000']);
            const pidsIdx = themeParams.length;
            mentorProjectFilter = `AND (p.mentor_user_id = $${uidIdx} OR lower(trim(p.faculty_mentor_name)) = lower(trim($${nameIdx})) OR p.id = ANY($${pidsIdx}::uuid[]))`;
        } else if (isStudentOnly(req.user)) {
            themeParams.push((req.user.projectIds && req.user.projectIds.length) ? req.user.projectIds : ['00000000-0000-0000-0000-000000000000']);
            mentorProjectFilter = `AND p.id = ANY($${themeParams.length}::uuid[])`;
        }

        const { rows: themes } = await pool.query(
            `SELECT t.id, t.name, t.description, t.created_at,
                    COUNT(p.id)::int AS project_count
             FROM themes t
             LEFT JOIN projects p ON (p.theme_id = t.id OR (p.department_id = t.department_id AND lower(p.theme_name) = lower(t.name))) AND p.is_active = TRUE ${mentorProjectFilter}
             WHERE t.department_id = $1
             GROUP BY t.id, t.name, t.description, t.created_at
             ORDER BY t.name ASC`,
            themeParams
        );

        res.json({ department: deptRows[0], themes });
    } catch (err) {
        next(err);
    }
}

// POST /api/departments/:departmentId/themes
async function createTheme(req, res, next) {
    try {
        const { departmentId } = req.params;
        const name = cleanName(req.body.name);
        const description = typeof req.body.description === 'string' ? req.body.description.trim() : null;

        if (!name) {
            return res.status(400).json({ error: 'Theme name is required.' });
        }

        const { rows: deptRows } = await pool.query(
            `SELECT id FROM departments WHERE id = $1`,
            [departmentId]
        );
        if (!deptRows[0]) return res.status(404).json({ error: 'Department not found.' });

        const { rows } = await pool.query(
            `INSERT INTO themes (department_id, name, description)
             VALUES ($1, $2, $3)
             ON CONFLICT (department_id, name) DO UPDATE SET description = COALESCE(EXCLUDED.description, themes.description)
             RETURNING id, department_id, name, description, created_at`,
            [departmentId, name, description]
        );

        res.status(201).json({ theme: rows[0] });
    } catch (err) {
        next(err);
    }
}

// GET /api/themes/:themeId
async function getTheme(req, res, next) {
    try {
        const { themeId } = req.params;

        const { rows } = await pool.query(
            `SELECT t.id, t.name, t.description, t.created_at,
                    d.id AS department_id, d.name AS department_name, d.code AS department_code,
                    i.id AS institute_id, i.name AS institute_name, i.code AS institute_code,
                    COALESCE(hu.full_name, d.head_display_name) AS head_name
             FROM themes t
             JOIN departments d ON d.id = t.department_id
             JOIN institutes i ON i.id = d.institute_id
             LEFT JOIN users hu ON hu.id = d.head_user_id
             WHERE t.id = $1`,
            [themeId]
        );
        if (!rows[0]) return res.status(404).json({ error: 'Theme not found.' });

        res.json({ theme: rows[0] });
    } catch (err) {
        next(err);
    }
}

// GET /api/themes/:themeId/projects
async function listThemeProjects(req, res, next) {
    try {
        const { themeId } = req.params;
        const { search, status, mentor, semester, phase, overdue, sort } = req.query;

        const { rows: themeRows } = await pool.query(
            `SELECT t.id, t.name, t.description,
                    d.id AS department_id, d.name AS department_name, d.code AS department_code,
                    i.id AS institute_id, i.name AS institute_name, i.code AS institute_code
             FROM themes t
             JOIN departments d ON d.id = t.department_id
             JOIN institutes i ON i.id = d.institute_id
             WHERE t.id = $1`,
            [themeId]
        );
        if (!themeRows[0]) return res.status(404).json({ error: 'Theme not found.' });
        const theme = themeRows[0];

        const conditions = [
            `(p.theme_id = $1 OR (p.department_id = ${theme.department_id} AND lower(p.theme_name) = lower($2)))`,
            `p.is_active = TRUE`
        ];
        const params = [themeId, theme.name];

        if (isFacultyOnly(req.user)) {
            params.push(req.user.id);
            const uidIdx = params.length;
            params.push(req.user.fullName || '');
            const nameIdx = params.length;
            params.push((req.user.projectIds && req.user.projectIds.length) ? req.user.projectIds : ['00000000-0000-0000-0000-000000000000']);
            const pidsIdx = params.length;
            conditions.push(`(p.mentor_user_id = $${uidIdx} OR lower(trim(p.faculty_mentor_name)) = lower(trim($${nameIdx})) OR p.id = ANY($${pidsIdx}::uuid[]))`);
        } else if (isStudentOnly(req.user)) {
            params.push((req.user.projectIds && req.user.projectIds.length) ? req.user.projectIds : ['00000000-0000-0000-0000-000000000000']);
            conditions.push(`p.id = ANY($${params.length}::uuid[])`);
        }

        if (search) {
            params.push(`%${search}%`);
            conditions.push(`(p.title ILIKE $${params.length} OR p.project_code ILIKE $${params.length} OR p.team_id ILIKE $${params.length}
                    OR p.artefact_id ILIKE $${params.length} OR p.artefact_title ILIKE $${params.length})`);
        }
        if (status && ['GREEN', 'YELLOW', 'RED'].includes(status)) {
            params.push(status);
            conditions.push(`p.rag_status = $${params.length}`);
        }
        if (mentor) {
            params.push(mentor);
            conditions.push(`COALESCE(p.faculty_mentor_name, mu.full_name) = $${params.length}`);
        }
        if (semester) {
            params.push(semester);
            conditions.push(`p.semester = $${params.length}`);
        }
        if (phase) {
            params.push(phase);
            conditions.push(`p.project_phase = $${params.length}`);
        }
        if (overdue === 'true') {
            conditions.push(`p.next_review_at < now()`);
        }

        const sortMap = {
            severity: `CASE p.rag_status WHEN 'RED' THEN 0 WHEN 'YELLOW' THEN 1 ELSE 2 END`,
            oldest_update: `p.last_update_at ASC`,
            nearest_milestone: `p.next_review_at ASC NULLS LAST`,
            mentor: `mentor_name ASC NULLS LAST`,
            name: `p.title ASC`,
        };
        const orderBy = sortMap[sort] || sortMap.severity;

        const { rows: projects } = await pool.query(
            `SELECT p.id, p.project_code, p.title, p.rag_status, p.completion_pct,
                    p.last_update_at, p.next_review_at, p.semester, p.project_phase,
                    COALESCE(p.faculty_mentor_name, mu.full_name) AS mentor_name, p.academic_year,
                    p.team_id, p.artefact_id, p.theme_name, p.artefact_title,
                    p.coordinator_name, p.reviewer_name,
                    COUNT(iss.id) FILTER (WHERE iss.status IN ('OPEN','IN_PROGRESS')) AS open_issue_count
             FROM projects p
             LEFT JOIN users mu ON mu.id = p.mentor_user_id
             LEFT JOIN issues iss ON iss.project_id = p.id
             WHERE ${conditions.join(' AND ')}
             GROUP BY p.id, mu.id
             ORDER BY ${orderBy}`,
            params
        );

        res.json({ theme, projects });
    } catch (err) {
        next(err);
    }
}

// GET /api/themes/:themeId/mentors
async function listThemeMentors(req, res, next) {
    try {
        const { themeId } = req.params;
        const conditions = [
            't.id = $1',
            'COALESCE(p.faculty_mentor_name, u.full_name) IS NOT NULL'
        ];
        const params = [themeId];

        if (isFacultyOnly(req.user)) {
            params.push(req.user.id);
            const uidIdx = params.length;
            params.push(req.user.fullName || '');
            const nameIdx = params.length;
            params.push((req.user.projectIds && req.user.projectIds.length) ? req.user.projectIds : ['00000000-0000-0000-0000-000000000000']);
            const pidsIdx = params.length;
            conditions.push(`(p.mentor_user_id = $${uidIdx} OR lower(trim(p.faculty_mentor_name)) = lower(trim($${nameIdx})) OR p.id = ANY($${pidsIdx}::uuid[]))`);
        }

        const { rows } = await pool.query(
            `SELECT DISTINCT COALESCE(p.faculty_mentor_name, u.full_name) AS full_name
             FROM projects p
             JOIN themes t ON (p.theme_id = t.id OR (p.department_id = t.department_id AND lower(p.theme_name) = lower(t.name)))
             LEFT JOIN users u ON u.id = p.mentor_user_id
             WHERE ${conditions.join(' AND ')}
             ORDER BY 1`,
            params
        );
        res.json({ mentors: rows });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listDepartmentThemes,
    createTheme,
    getTheme,
    listThemeProjects,
    listThemeMentors
};
