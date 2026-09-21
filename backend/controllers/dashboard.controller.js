const { pool } = require('../config/db');
const { isFacultyOnly, isStudentOnly, scopeArrays } = require('../services/access.service');

const GLOBAL_ROLES = ['PLATFORM_ADMIN', 'GLOBAL_PROGRAMME_LEADER'];

function isGlobalUser(req) {
    return (req.user.roles || []).some((r) => GLOBAL_ROLES.includes(r));
}

// GET /api/dashboard/programme - authorized cross-institute summary.
async function programmeDashboard(req, res, next) {
    try {
        const global = isGlobalUser(req);
        const arrays = scopeArrays(req.user);
        const faculty = isFacultyOnly(req.user);
        const student = isStudentOnly(req.user);

        let scopeSql = '(p.institute_id = ANY($1::uuid[]) OR p.department_id = ANY($2::int[]))';
        let params = [arrays.instituteIds, arrays.departmentIds];

        if (faculty) {
            scopeSql = '(p.mentor_user_id = $1 OR lower(trim(p.faculty_mentor_name)) = lower(trim($2)) OR p.id = ANY($3::uuid[]))';
            params = [req.user.id, req.user.fullName || '', arrays.projectIds];
        } else if (student) {
            scopeSql = 'p.id = ANY($1::uuid[])';
            params = [arrays.projectIds];
        }

        const scopeFilter = global ? '' : `WHERE ${scopeSql}`;
        const summaryParams = global ? [] : [...params, arrays.viewInstituteIds];
        const instIdParamIndex = params.length + 1;

        const { rows: totals } = await pool.query(
            `SELECT
                COUNT(*) FILTER (WHERE p.is_active) AS total_projects,
                COUNT(*) FILTER (WHERE p.rag_status = 'GREEN' AND p.is_active) AS green_count,
                COUNT(*) FILTER (WHERE p.rag_status = 'YELLOW' AND p.is_active) AS yellow_count,
                COUNT(*) FILTER (WHERE p.rag_status = 'RED' AND p.is_active) AS red_count,
                COUNT(*) FILTER (WHERE p.next_review_at < now() AND p.is_active) AS overdue_review_count,
                COUNT(*) FILTER (WHERE p.next_review_at BETWEEN now() AND now() + interval '14 days' AND p.is_active) AS upcoming_review_count
             FROM projects p
             ${scopeFilter}`,
            global ? [] : params
        );

        const { rows: byInstitute } = await pool.query(
            `SELECT i.id, i.code, i.name,
                    COUNT(p.id) FILTER (WHERE p.is_active) AS total_projects,
                    COUNT(p.id) FILTER (WHERE p.rag_status = 'GREEN' AND p.is_active) AS green_count,
                    COUNT(p.id) FILTER (WHERE p.rag_status = 'YELLOW' AND p.is_active) AS yellow_count,
                    COUNT(p.id) FILTER (WHERE p.rag_status = 'RED' AND p.is_active) AS red_count
             FROM institutes i
             LEFT JOIN projects p ON p.institute_id = i.id ${global ? '' : `AND ${scopeSql}`}
             ${global ? '' : `WHERE i.id = ANY($${instIdParamIndex}::uuid[])`}
             GROUP BY i.id
             ORDER BY i.display_order, i.name`,
            summaryParams
        );

        res.json({
            totals: totals[0],
            institutes: byInstitute,
            generatedAt: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
}

// GET /api/dashboard/institute/:instituteId
async function instituteDashboard(req, res, next) {
    try {
        const instituteId = req.params.instituteId;
        const global = isGlobalUser(req);
        const arrays = scopeArrays(req.user);
        const faculty = isFacultyOnly(req.user);

        let deptRestriction = '';
        let projRestriction = '';
        let params = [instituteId];

        if (faculty) {
            params.push(req.user.id);
            const uidIdx = params.length;
            params.push(req.user.fullName || '');
            const nameIdx = params.length;
            params.push(arrays.projectIds);
            const pidsIdx = params.length;
            projRestriction = `AND (p.mentor_user_id = $${uidIdx} OR lower(trim(p.faculty_mentor_name)) = lower(trim($${nameIdx})) OR p.id = ANY($${pidsIdx}::uuid[]))`;
        } else {
            const restricted = !global && !(req.user.instituteIds || []).includes(instituteId);
            if (restricted) {
                params.push(arrays.departmentIds);
                deptRestriction = `AND d.id = ANY($${params.length}::int[])`;
            }
        }

        const { rows: totals } = await pool.query(
            `SELECT
                COUNT(DISTINCT d.id) AS total_departments,
                COUNT(p.id) FILTER (WHERE p.is_active) AS total_projects,
                COUNT(p.id) FILTER (WHERE p.rag_status = 'GREEN' AND p.is_active) AS green_count,
                COUNT(p.id) FILTER (WHERE p.rag_status = 'YELLOW' AND p.is_active) AS yellow_count,
                COUNT(p.id) FILTER (WHERE p.rag_status = 'RED' AND p.is_active) AS red_count
             FROM departments d
             LEFT JOIN projects p ON p.department_id = d.id ${projRestriction}
             WHERE d.institute_id = $1 AND d.is_active = TRUE ${deptRestriction}`,
            params
        );

        res.json({ totals: totals[0] });
    } catch (err) {
        next(err);
    }
}

module.exports = { programmeDashboard, instituteDashboard };
