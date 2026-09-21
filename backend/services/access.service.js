const { pool } = require('../config/db');

const GLOBAL_ROLES = ['PLATFORM_ADMIN', 'GLOBAL_PROGRAMME_LEADER'];
const APPROVER_ROLES = ['PLATFORM_ADMIN', 'GLOBAL_PROGRAMME_LEADER', 'INSTITUTE_ADMIN', 'DEAN_PRINCIPAL', 'DEPARTMENT_HEAD', 'REVIEWER'];
const ADMIN_OR_HEAD_ROLES = ['PLATFORM_ADMIN', 'GLOBAL_PROGRAMME_LEADER', 'INSTITUTE_ADMIN', 'DEAN_PRINCIPAL', 'DEPARTMENT_HEAD', 'REVIEWER'];

function isGlobalUser(user) {
    return (user?.roles || []).some((r) => GLOBAL_ROLES.includes(r));
}

// Whether the user is allowed to approve a RED -> GREEN evidence-backed recovery.
function isAuthorizedApprover(user) {
    return (user?.roles || []).some((r) => APPROVER_ROLES.includes(r));
}

// Faculty mentors with no administrative or reviewer roles see ONLY projects they mentor.
function isFacultyOnly(user) {
    const roles = user?.roles || [];
    return roles.includes('FACULTY_MENTOR') && !roles.some((r) => ADMIN_OR_HEAD_ROLES.includes(r));
}

function isStudentOnly(user) {
    const roles = user?.roles || [];
    return roles.length > 0 && roles.every((r) => r === 'STUDENT');
}

// Determines whether a user can view or interact with a project.
function canAccessProject(user, project) {
    if (!user || !project) return false;
    if (isGlobalUser(user)) return true;

    // Synthetic project check (used when verifying permissions before project creation)
    if (!project.id) {
        if ((user.instituteIds || []).includes(project.institute_id)) return true;
        if ((user.departmentIds || []).includes(project.department_id)) return true;
        return false;
    }

    // A faculty mentor can ONLY access projects that they are assigned to mentor.
    if (isFacultyOnly(user)) {
        if (project.mentor_user_id && project.mentor_user_id === user.id) return true;
        if (user.fullName && project.faculty_mentor_name &&
            project.faculty_mentor_name.trim().toLowerCase() === user.fullName.trim().toLowerCase()) return true;
        if ((user.projectIds || []).includes(project.id)) return true;
        return false;
    }

    // A student sees only the project(s) whose team lists their SRN.
    if (isStudentOnly(user)) {
        return (user.projectIds || []).includes(project.id);
    }

    // Institutional / departmental oversight roles (Platform Admin, GPL, Inst Admin, Dean, HOD, Reviewer)
    if ((user.instituteIds || []).includes(project.institute_id)) return true;
    if ((user.departmentIds || []).includes(project.department_id)) return true;
    if ((user.projectIds || []).includes(project.id)) return true;
    return false;
}

async function loadProject(projectId) {
    const { rows } = await pool.query(`SELECT * FROM projects WHERE id = $1`, [projectId]);
    return rows[0] || null;
}

// Arrays for SQL filters. An empty list becomes one value that matches nothing
// (a nil UUID / department id 0), so ANY() never matches by accident.
const NIL_UUID = '00000000-0000-0000-0000-000000000000';
function scopeArrays(user) {
    return {
        instituteIds: (user.instituteIds || []).length ? user.instituteIds : [NIL_UUID],
        departmentIds: (user.departmentIds || []).length ? user.departmentIds : [0],
        projectIds: (user.projectIds || []).length ? user.projectIds : [NIL_UUID],
        // every college the user may open: full grants plus colleges of their departments
        viewInstituteIds: [...new Set([...(user.instituteIds || []), ...(user.viewInstituteIds || [])])].length
            ? [...new Set([...(user.instituteIds || []), ...(user.viewInstituteIds || [])])] : [NIL_UUID],
    };
}

module.exports = {
    scopeArrays,
    isGlobalUser,
    isAuthorizedApprover,
    isFacultyOnly,
    isStudentOnly,
    canAccessProject,
    loadProject,
    GLOBAL_ROLES,
    APPROVER_ROLES,
    ADMIN_OR_HEAD_ROLES,
};
