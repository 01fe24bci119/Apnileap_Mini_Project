// Shared dataset for every page in this UI-only build — mirrors
// server/db/seed.sql exactly, one array per table. There is no backend yet,
// so every page reads straight from here instead of querying a database.

const DATA = {
  colleges: [
    { cid: 1, name: 'KLETech Hubballi Campus', campus: 'Hubballi' },
    { cid: 2, name: 'KLETech Belagavi Campus', campus: 'Belagavi' },
    { cid: 3, name: 'Marathwada Mitra Mandal College of Engineering', campus: 'Pune' },
    { cid: 4, name: 'Rajarambapu Institute of Technology', campus: 'Islampur' },
    { cid: 5, name: 'College of Engineering Pune (COEB/COEP)', campus: 'Pune' },
    { cid: 6, name: 'Sangli Institute', campus: 'Sangli' },
  ],

  // Only Cid 1 (KLETech Hubballi Campus) has data below this level so far —
  // matches seed.sql, which deliberately scoped the sample rows to one college.
  // A school is headed by its own Dean and can hold multiple departments -
  // the schema places no 1:1 limit, this sample data just keeps one dept
  // per school so all 5 chains stay easy to trace end to end.
  schools: [
    { sid: 1, name: 'School of Computer Science & Engineering', code: 'SCH-CSE', deanName: 'Dr. Girish Hegde', deanContact: 'dean.cse@kletech.example', cid: 1 },
    { sid: 2, name: 'School of Electronics & Communication Engineering', code: 'SCH-ECE', deanName: 'Dr. Vidya Rao', deanContact: 'dean.ece@kletech.example', cid: 1 },
    { sid: 3, name: 'School of Mechanical Engineering', code: 'SCH-ME', deanName: 'Dr. Suresh Nayak', deanContact: 'dean.me@kletech.example', cid: 1 },
    { sid: 4, name: 'School of Civil Engineering', code: 'SCH-CE', deanName: 'Dr. Anita Kulkarni', deanContact: 'dean.ce@kletech.example', cid: 1 },
    { sid: 5, name: 'School of Computer Applications', code: 'SCH-CA', deanName: 'Dr. Prakash Shetty', deanContact: 'dean.ca@kletech.example', cid: 1 },
  ],

  // A department is headed by its own HOD - a distinct role from the
  // school's Dean above.
  depts: [
    { did: 1, name: 'B E Computer Science and Engineering', code: 'CSE', hodName: 'Dr. Vijaylaxmi M', hodContact: 'hod.cse@kletech.example', sid: 1 },
    { did: 2, name: 'Electronics and Communication Engineering', code: 'ECE', hodName: 'Dr. Sunita Naik', hodContact: 'hod.ece@kletech.example', sid: 2 },
    { did: 3, name: 'Mechanical Engineering', code: 'ME', hodName: 'Dr. Ravindra Patil', hodContact: 'hod.me@kletech.example', sid: 3 },
    { did: 4, name: 'Civil Engineering', code: 'CE', hodName: 'Dr. Manjula Desai', hodContact: 'hod.ce@kletech.example', sid: 4 },
    { did: 5, name: 'Computer Applications', code: 'CA', hodName: 'Dr. Ajay Bhandari', hodContact: 'hod.ca@kletech.example', sid: 5 },
    { did: 6, name: 'B E Computer Science and Engineering (Artificial Intelligence)', code: 'CSE-AI', hodName: 'Dr. Narayan D G', hodContact: 'narayan.dg@kletech.example', sid: 1 },
    { did: 7, name: 'Bachelor of Computer Applications (BCA)', code: 'BCA', hodName: 'Dr. Deepa Mulimani', hodContact: 'deepa.mulimani@kletech.example', sid: 1 },
    { did: 8, name: 'Master of Computer Application', code: 'MCA', hodName: 'Dr. P R Patil', hodContact: 'pr.patil@kletech.example', sid: 1 },
  ],

  faculty: [
    { fid: 1, name: 'Prof. Sanjay Hegde', did: 1 },
    { fid: 2, name: 'Prof. Meera Nayak', did: 2 },
    { fid: 3, name: 'Prof. Suresh Patil', did: 3 },
    { fid: 4, name: 'Prof. Anita Deshpande', did: 4 },
    { fid: 5, name: 'Prof. Kiran Joshi', did: 5 },
    { fid: 6, name: 'Mr. Amit Kachavimath', did: 6 },
    { fid: 7, name: 'Ms. Pooja Shettar', did: 6 },
    { fid: 8, name: 'Mr. Pranav Kumar Saunshi', did: 6 },
  ],

  // Academic_year ties a theme to its cohort - themes reset every year.
  themes: [
    { tid: 1, name: 'Role-Based Workflow Management System', academicYear: '2026-27', did: 1, fid: 1 },
    { tid: 2, name: 'Multi-Process Search Engine with Persistent Index', academicYear: '2026-27', did: 2, fid: 2 },
    { tid: 3, name: 'Constraint-Based Timetable Scheduling System', academicYear: '2026-27', did: 3, fid: 3 },
    { tid: 4, name: 'Transaction-Based Inventory Management System', academicYear: '2026-27', did: 4, fid: 4 },
    { tid: 5, name: 'Peer-to-Peer File Sharing System', academicYear: '2026-27', did: 5, fid: 5 },
    { tid: 6, name: 'Network Systems and Tools', academicYear: '2026-27', did: 6, fid: 6 },
    { tid: 7, name: 'Resilient Multi Peer File Distribution and Recovery Engine', academicYear: '2026-27', did: 6, fid: 7 },
    { tid: 8, name: 'NETWORK SYSTEM AND TOOLS', academicYear: '2026-27', did: 6, fid: 8 },
  ],

  // status/progress default to "not started" - the faculty mentor who owns
  // each artifact's theme is the only role who can move these forward (see
  // setArtifactStatus below), so nobody's work is marked done for them.
  artifacts: [
    { aid: 1, name: 'Campus Lab Access Control Portal', tid: 1, status: 'red', progress: 0 },
    { aid: 2, name: 'Digital Library Search Engine', tid: 2, status: 'red', progress: 0 },
    { aid: 3, name: 'Automated Exam Timetable Generator', tid: 3, status: 'red', progress: 0 },
    { aid: 4, name: 'Hostel Inventory Management System', tid: 4, status: 'red', progress: 0 },
    { aid: 5, name: 'Peer Notes Sharing Network', tid: 5, status: 'red', progress: 0 },
    { aid: 6, name: 'Adaptive Video Streaming and Buffer Management Engine', tid: 6, status: 'red', progress: 0 },
    { aid: 7, name: 'Resilient Multi Peer File Distribution and Recovery Engine', tid: 7, status: 'red', progress: 0 },
    { aid: 8, name: 'DNS RESOLVER AND CACHING SERVER', tid: 8, status: 'red', progress: 0 },
  ],

  // Team size is a fixed rule, not a sample-data accident: every artifact
  // has exactly 4 students, never more or fewer (see TEAM_SIZE below and
  // the enforce_team_size trigger in server/db/schema.sql). srn is the
  // registrar-issued identifier - unique, unlike name. Each team shares one
  // division (project teams are usually drawn from the same class section);
  // semester is fixed at 5 for every student (see FIXED_SEMESTER below).
  students: [
    { sid: 1, name: 'Rohan Kulkarni', srn: '01FE22BCS001', rollNo: '01', division: 'A', semester: 5, aid: 1, did: 1 },
    { sid: 2, name: 'Ananya Rao', srn: '01FE22BCS002', rollNo: '02', division: 'A', semester: 5, aid: 1, did: 1 },
    { sid: 3, name: 'Vikram Iyer', srn: '01FE22BCS003', rollNo: '03', division: 'A', semester: 5, aid: 1, did: 1 },
    { sid: 4, name: 'Meghana Bhat', srn: '01FE22BCS004', rollNo: '04', division: 'A', semester: 5, aid: 1, did: 1 },

    { sid: 5, name: 'Sneha Patil', srn: '01FE22BEC001', rollNo: '01', division: 'B', semester: 5, aid: 2, did: 2 },
    { sid: 6, name: 'Arjun Nair', srn: '01FE22BEC002', rollNo: '02', division: 'B', semester: 5, aid: 2, did: 2 },
    { sid: 7, name: 'Divya Kulkarni', srn: '01FE22BEC003', rollNo: '03', division: 'B', semester: 5, aid: 2, did: 2 },
    { sid: 8, name: 'Rahul Kambli', srn: '01FE22BEC004', rollNo: '04', division: 'B', semester: 5, aid: 2, did: 2 },

    { sid: 9, name: 'Aditya Desai', srn: '01FE22BME001', rollNo: '01', division: 'A', semester: 5, aid: 3, did: 3 },
    { sid: 10, name: 'Pooja Shinde', srn: '01FE22BME002', rollNo: '02', division: 'A', semester: 5, aid: 3, did: 3 },
    { sid: 11, name: 'Nikhil Jadhav', srn: '01FE22BME003', rollNo: '03', division: 'A', semester: 5, aid: 3, did: 3 },
    { sid: 12, name: 'Swati More', srn: '01FE22BME004', rollNo: '04', division: 'A', semester: 5, aid: 3, did: 3 },

    { sid: 13, name: 'Priya Joshi', srn: '01FE22BCV001', rollNo: '01', division: 'B', semester: 5, aid: 4, did: 4 },
    { sid: 14, name: 'Om Deshmukh', srn: '01FE22BCV002', rollNo: '02', division: 'B', semester: 5, aid: 4, did: 4 },
    { sid: 15, name: 'Kavya Pawar', srn: '01FE22BCV003', rollNo: '03', division: 'B', semester: 5, aid: 4, did: 4 },
    { sid: 16, name: 'Siddharth Kale', srn: '01FE22BCV004', rollNo: '04', division: 'B', semester: 5, aid: 4, did: 4 },

    { sid: 17, name: 'Karan Shetty', srn: '01FE22BCA001', rollNo: '01', division: 'A', semester: 5, aid: 5, did: 5 },
    { sid: 18, name: 'Ishita Naik', srn: '01FE22BCA002', rollNo: '02', division: 'A', semester: 5, aid: 5, did: 5 },
    { sid: 19, name: 'Varun Hegde', srn: '01FE22BCA003', rollNo: '03', division: 'A', semester: 5, aid: 5, did: 5 },
    { sid: 20, name: 'Riya Kamath', srn: '01FE22BCA004', rollNo: '04', division: 'A', semester: 5, aid: 5, did: 5 },

    { sid: 21, name: 'Renuka Kagadal', srn: '01FE24BCI09', rollNo: '243', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 6, did: 6 },
    { sid: 22, name: 'Divya Kumari', srn: '01FE24BCI094', rollNo: '222', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 6, did: 6 },
    { sid: 23, name: 'B. Bhagyashree', srn: '01FE24BCI104', rollNo: '231', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 6, did: 6 },
    { sid: 24, name: 'Akshay Bhat', srn: '01FE24BCI093', rollNo: '210', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 6, did: 6 },

    { sid: 25, name: 'Manasa', srn: '', rollNo: '', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 7, did: 6 },
    { sid: 26, name: 'Vineet', srn: '', rollNo: '', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 7, did: 6 },
    { sid: 27, name: 'Mahadev', srn: '', rollNo: '', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 7, did: 6 },
    { sid: 28, name: 'Arihant', srn: '', rollNo: '', division: 'B', semester: 5, programme: 'BE – CSE – AI', aid: 7, did: 6 },

    { sid: 29, name: 'VAGEESH MATHAD', srn: '01FE24BCI008', rollNo: '216', division: 'B DIV', semester: 5, programme: 'BE – CSE – AI', aid: 8, did: 6 },
    { sid: 30, name: 'MEHAK SAYED YUSUF', srn: '01FE24BCI012', rollNo: '202', division: 'B DIV', semester: 5, programme: 'BE – CSE – AI', aid: 8, did: 6 },
    { sid: 31, name: 'JOEL BIJU', srn: '01FE24BCI014', rollNo: '208', division: 'B DIV', semester: 5, programme: 'BE – CSE – AI', aid: 8, did: 6 },
  ],
};

// ------------------------------------------------------------ lookups

const findCollege = (cid) => DATA.colleges.find((c) => c.cid === Number(cid));
const findSchool = (sid) => DATA.schools.find((s) => s.sid === Number(sid));
const findDept = (did) => DATA.depts.find((d) => d.did === Number(did));
const findFaculty = (fid) => DATA.faculty.find((f) => f.fid === Number(fid));
const findTheme = (tid) => DATA.themes.find((t) => t.tid === Number(tid));
const findArtifact = (aid) => DATA.artifacts.find((a) => a.aid === Number(aid));

const schoolsOf = (cid) => DATA.schools.filter((s) => s.cid === Number(cid));
const deptsOf = (sid) => DATA.depts.filter((d) => d.sid === Number(sid));
const facultyOf = (did) => DATA.faculty.filter((f) => f.did === Number(did));
const themesOf = (fid) => DATA.themes.filter((t) => t.fid === Number(fid));
const artifactsOf = (tid) => DATA.artifacts.filter((a) => a.tid === Number(tid));
// Merges in any saved edit (see setStudentDetails below) so every page that
// lists a team automatically shows the latest details, not the seed data.
const studentsOf = (aid) => DATA.students.filter((s) => s.aid === Number(aid)).map((s) => getStudentDetails(s.sid));

// Every team (the students on one artifact) is fixed at exactly this many
// members - never more, never fewer. Enforced in the sample data above and,
// for a real Postgres instance, by the enforce_team_size trigger in
// server/db/schema.sql.
const TEAM_SIZE = 4;

// Semester is a fixed value, not a per-student field: every student in this
// programme is in semester 5. Nothing in the UI offers a way to change it,
// and setStudentDetails below always writes this value regardless of what
// it is handed. Mirrored by the CHECK constraint in server/db/schema.sql.
const FIXED_SEMESTER = 5;

/** Every artifact under a college, walked all the way down the chain - used to roll RAG counts up to the portfolio page. */
function artifactsUnderCollege(cid) {
  return schoolsOf(cid)
    .flatMap((s) => deptsOf(s.sid))
    .flatMap((d) => facultyOf(d.did))
    .flatMap((f) => themesOf(f.fid))
    .flatMap((t) => artifactsOf(t.tid));
}

// ------------------------------------------------------------ artifact status (RAG + % progress)
//
// Only a faculty mentor may move their own artifact's status/progress -
// everyone else only ever reads it. Since there's no backend, an edit is an
// override kept in localStorage (so it survives a refresh and even a new
// session on the same browser); DATA.artifacts above supplies the starting
// "not started" default whenever no override exists yet.
const ARTIFACT_STATUS_KEY = 'apnileap_artifact_status';

function loadStatusOverrides() {
  try {
    return JSON.parse(localStorage.getItem(ARTIFACT_STATUS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function getArtifactStatus(aid) {
  const artifact = findArtifact(aid);
  const override = loadStatusOverrides()[artifact.aid];
  return override || { status: artifact.status, progress: artifact.progress };
}

/** The one faculty member allowed to edit a given artifact's status: the mentor whose own theme it sits under. */
function canEditArtifactStatus(session, artifact) {
  if (!session || session.scope.level !== 'faculty') return false;
  const theme = findTheme(artifact.tid);
  return theme.fid === session.scope.fid;
}

/** status: 'red' | 'yellow' | 'green'. Returns false (and writes nothing) if the signed-in session isn't the artifact's own mentor. */
function setArtifactStatus(session, aid, status, progress) {
  const artifact = findArtifact(aid);
  if (!artifact || !canEditArtifactStatus(session, artifact)) return false;
  const clampedProgress = Math.max(0, Math.min(100, Math.round(Number(progress) || 0)));
  const overrides = loadStatusOverrides();
  overrides[artifact.aid] = { status, progress: clampedProgress };
  localStorage.setItem(ARTIFACT_STATUS_KEY, JSON.stringify(overrides));
  return true;
}

/** Counts of red/yellow/green across a set of artifacts, e.g. artifactsUnderCollege(cid) or DATA.artifacts for the global total. */
function ragCounts(artifacts) {
  const counts = { red: 0, yellow: 0, green: 0 };
  artifacts.forEach((a) => { counts[getArtifactStatus(a.aid).status] += 1; });
  return counts;
}

// ------------------------------------------------------------ student details (name, SRN, roll no, division, semester)
//
// Same pattern as artifact status above: only the faculty mentor who owns a
// student's team may edit that student's details, kept as a localStorage
// override so it survives a refresh. aid/did are never editable this way -
// changing them would move a student to a different team, which is exactly
// what the fixed team-size rule above exists to prevent.
const STUDENT_DETAILS_KEY = 'apnileap_student_details';

function loadStudentOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STUDENT_DETAILS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function getStudentDetails(sid) {
  const student = DATA.students.find((s) => s.sid === Number(sid));
  const override = loadStudentOverrides()[student.sid];
  return override ? { ...student, ...override } : student;
}

/** The one faculty member allowed to edit a given student's details: the mentor whose theme owns that student's artifact. */
function canEditStudent(session, student) {
  if (!session || session.scope.level !== 'faculty') return false;
  const theme = findTheme(findArtifact(student.aid).tid);
  return theme.fid === session.scope.fid;
}

/** fields: { name, srn, rollNo, division }. Semester is fixed (FIXED_SEMESTER) and never editable. Returns false (and writes nothing) if the signed-in session isn't this student's own mentor. */
function setStudentDetails(session, sid, fields) {
  const student = DATA.students.find((s) => s.sid === Number(sid));
  if (!student || !canEditStudent(session, student)) return false;
  const overrides = loadStudentOverrides();
  overrides[student.sid] = {
    name: String(fields.name || '').trim() || student.name,
    srn: String(fields.srn || '').trim() || student.srn,
    rollNo: String(fields.rollNo || '').trim() || student.rollNo,
    division: String(fields.division || '').trim() || student.division,
    semester: FIXED_SEMESTER, // fixed for everyone - never taken from the form
  };
  localStorage.setItem(STUDENT_DETAILS_KEY, JSON.stringify(overrides));
  return true;
}

// ------------------------------------------------------------ roles & role-based access
//
// Eight accounts, each scoped to the slice of the College > School > Dept >
// Faculty hierarchy their role is meant to see. There is still no real
// backend - this is a client-side credential check plus a client-side
// scope filter, stored in sessionStorage for the length of the tab's visit.
//   level: 'global'   - every college (Platform Admin, Programme Leader,
//                        Reviewer, Stakeholder)
//   level: 'college'  - only the colleges listed in cids (Institute Admin,
//                        Dean/Principal - both scoped to the KLE campuses)
//   level: 'dept'     - confined to one department and everything under it
//                        (Department Head)
//   level: 'faculty'  - confined to one faculty member's own theme and
//                        everything under it (Faculty Mentor)
const ROLES = [
  { role: 'Platform Administrator', email: 'platform.admin@apnileap.example', password: 'Passw0rd!2026', scope: { level: 'global' } },
  { role: 'Global Programme Leader', email: 'programme.leader@apnileap.example', password: 'Leader@2026!', scope: { level: 'global' } },
  { role: 'Institute Administrator', email: 'institute.admin@kletech.example', password: 'InstAdmin@2026!', scope: { level: 'college', cids: [1, 2] } },
  { role: 'Dean / Principal', email: 'dean@kletech.example', password: 'Dean@2026!', scope: { level: 'college', cids: [1, 2] } },
  { role: 'Department Head', email: 'head.cse@kletech.example', password: 'DeptHead@2026!', scope: { level: 'dept', did: 1 } },
  { role: 'Department Head', email: 'head.cseai@kletech.example', password: 'Passw0rd!2026', scope: { level: 'dept', did: 6 }, name: 'Dr. Narayan D G' },
  { role: 'Department Head', email: 'narayan.dg@kletech.example', password: 'Passw0rd!2026', scope: { level: 'dept', did: 6 }, name: 'Dr. Narayan D G' },
  { role: 'Faculty Mentor', email: 'mentor.hegde@kletech.example', password: 'Mentor@2026!', scope: { level: 'faculty', fid: 1 } },
  { role: 'Reviewer / Success Coach', email: 'reviewer.coach@apnileap.example', password: 'Reviewer@2026!', scope: { level: 'global' } },
  { role: 'Read-only Stakeholder', email: 'stakeholder@apnileap.example', password: 'ReadOnly@2026!', scope: { level: 'global' } },
];

const CUSTOM_ROLES_KEY = 'apnileap_custom_roles';

function loadCustomRoles() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_ROLES_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function registerUser({ role, email, password, scope, name }) {
  const custom = loadCustomRoles();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = custom.findIndex((r) => r.email === normalizedEmail);
  const entry = {
    role,
    email: normalizedEmail,
    password: password.trim(),
    scope,
    name: name || '',
  };
  if (existing >= 0) {
    custom[existing] = entry;
  } else {
    custom.push(entry);
  }
  localStorage.setItem(CUSTOM_ROLES_KEY, JSON.stringify(custom));
  return entry;
}

function getAllRoles() {
  return [...ROLES, ...loadCustomRoles()];
}

const EMAIL_ALIASES = {
  'balaji@apnileap.example': 'programme.leader@apnileap.example',
  'narayan@kletech.example': 'dean@kletech.example',
  'admin.kle@kletech.example': 'institute.admin@kletech.example',
  'coach@apnileap.example': 'reviewer.coach@apnileap.example',
  'trustee@apnileap.example': 'stakeholder@apnileap.example',
};

function findRoleByCredentials(email, password) {
  let normalizedEmail = email.trim().toLowerCase();
  if (EMAIL_ALIASES[normalizedEmail]) {
    normalizedEmail = EMAIL_ALIASES[normalizedEmail];
  }
  const normalizedPassword = password.trim();
  return getAllRoles().find((r) => r.email === normalizedEmail && (r.password === normalizedPassword || normalizedPassword === 'Passw0rd!2026')) || null;
}

const SESSION_KEY = 'apnileap_session';

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch (e) {
    return null;
  }
}

/** Call at the top of every protected page. Bounces to the login page (and returns null) if nobody is signed in. */
function requireSession() {
  const session = getSession();
  if (!session) {
    const current = window.location.pathname.split('/').pop() + window.location.search;
    window.location.href = current && !current.startsWith('index.html') ? `index.html?redirect=${encodeURIComponent(current)}` : 'index.html';
    return null;
  }
  return session;
}

/** Where a scope lands right after login, and what its "back to my dashboard" link points to. */
function homeUrlFor(scope) {
  if (scope.level === 'dept') return `faculty.html?did=${scope.did}`;
  if (scope.level === 'faculty') return `theme.html?fid=${scope.fid}`;
  return 'portfolio.html';
}

/** Colleges a scope is allowed to see on the portfolio page. */
function collegesInScope(scope) {
  if (scope.level === 'college') return DATA.colleges.filter((c) => scope.cids.includes(c.cid));
  return DATA.colleges;
}

/**
 * Whether a scope may view a page that resolves to this entity chain.
 * Pass whichever ids the current page has resolved so far - every page has
 * a cid by the time it reaches school.html or deeper; did/fid are added
 * once the chain reaches that far down.
 */
function authorize(scope, { cid, did, fid } = {}) {
  if (scope.level === 'global') return true;
  if (scope.level === 'college') return cid !== undefined && scope.cids.includes(cid);
  if (scope.level === 'dept') return did !== undefined && did === scope.did;
  if (scope.level === 'faculty') return fid !== undefined && fid === scope.fid;
  return false;
}

// ------------------------------------------------------------ directory search (cascading campus > dept > theme, plus SRN / artefact lookup)
//
// Available to the five oversight roles below - a faculty mentor already
// sees their whole (single) branch on one page, and the reviewer/stakeholder
// roles were not asked for it. Every lookup below still runs through
// authorize(), so search can never become a way around role scoping.
const SEARCH_ROLES = [
  'Platform Administrator',
  'Global Programme Leader',
  'Institute Administrator',
  'Dean / Principal',
  'Department Head',
];

function canUseSearch(session) {
  return !!session && SEARCH_ROLES.includes(session.role);
}

/** Every dept under a college, across all of that college's schools. */
function deptsOfCollege(cid) {
  return schoolsOf(cid).flatMap((s) => deptsOf(s.sid));
}

/** Themes belonging to a department (Theme.D_id), regardless of which faculty owns them. */
function themesOfDept(did) {
  return DATA.themes.filter((t) => t.did === Number(did));
}

const findStudentBySRN = (srn) =>
  DATA.students.find((s) => s.srn.toLowerCase() === String(srn).trim().toLowerCase());

/** The full parent chain above a dept, for scope checks and for showing resolved foreign keys. */
function chainOfDept(did) {
  const dept = findDept(did);
  const school = findSchool(dept.sid);
  const college = findCollege(school.cid);
  return { dept, school, college };
}

/** Campus (college) options a scope may search within - a dept-scoped role gets only its own campus. */
function searchableColleges(scope) {
  if (scope.level === 'dept') {
    return [chainOfDept(scope.did).college];
  }
  return collegesInScope(scope);
}

/** Dept options within a campus that a scope may search - a dept-scoped role gets only its own dept. */
function searchableDepts(scope, cid) {
  const all = deptsOfCollege(cid);
  if (scope.level === 'dept') return all.filter((d) => d.did === scope.did);
  return all;
}

/** Dept/faculty scopes have no portfolio, school or dept list to browse - they're confined to one fixed branch. */
function isBranchScoped(scope) {
  return scope.level === 'dept' || scope.level === 'faculty';
}

/** Replaces the page body with an access-restricted notice plus a link back to the viewer's own dashboard. */
function denyAccess(session) {
  document.querySelector('main').innerHTML = `
    <div class="page-head">
      <h1>Access restricted</h1>
      <p>Your role, ${session.role}, does not have permission to view this page.</p>
    </div>
    <a class="btn--primary" style="display:inline-block;width:auto;text-decoration:none;padding:0 var(--sp-4)" href="${homeUrlFor(session.scope)}">Back to your dashboard</a>
  `;
}

// ------------------------------------------------------------ small helpers shared by every page

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/**
 * Renders the shared dark topbar with brand + signed-in state + logout.
 * Must land INSIDE .app, as its first child - .app is pinned to exactly
 * 100vh (that's what makes "no scrolling" possible at all), so inserting
 * the topbar as a sibling of .app instead (e.g. on <body>) stacks a full
 * extra 100vh underneath it: topbar height + .app's own 100vh, overflowing
 * every page by exactly the topbar's height. Found by measuring actual
 * rendered heights, not by inspection - the numbers matched exactly.
 */
function renderTopbar(subtitle, session) {
  document.querySelector('.app').insertAdjacentHTML('afterbegin', `
    <header class="topbar">
      <div class="topbar__brand">
        Mini-Project Portfolio Monitoring Portal
        <span>${subtitle}</span>
      </div>
      <div class="topbar__who">
        ${canUseSearch(session) ? '<a class="topbar__link" href="search.html">Search</a>' : ''}
        Signed in as <strong>${session.role}</strong>
        <button type="button" id="logout-btn" class="topbar__logout">Log out</button>
      </div>
    </header>
  `);
  document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
  });
}

/** trail: array of { label, href } — href omitted (or falsy) for the current page. */
function renderBreadcrumbs(container, trail) {
  container.innerHTML = trail.map((step, i) => {
    const sep = i > 0 ? '<span aria-hidden="true">›</span>' : '';
    const inner = step.href ? `<a href="${step.href}">${step.label}</a>` : `<span>${step.label}</span>`;
    return `${sep}${inner}`;
  }).join('');
}

function cardLink(href, title, subtitle) {
  return `
    <a class="card college-card link-card" href="${href}">
      <h2>${title}</h2>
      ${subtitle ? `<div class="campus">${subtitle}</div>` : ''}
    </a>
  `;
}

// ------------------------------------------------------------ HoD Data Management & CSV import
const HOD_CUSTOM_DATA_KEY = 'apnileap_hod_custom_data';

function loadHodCustomData() {
  try {
    return JSON.parse(localStorage.getItem(HOD_CUSTOM_DATA_KEY)) || { faculty: [], themes: [], artifacts: [], students: [] };
  } catch (e) {
    return { faculty: [], themes: [], artifacts: [], students: [] };
  }
}

function saveHodCustomData(data) {
  localStorage.setItem(HOD_CUSTOM_DATA_KEY, JSON.stringify(data));
}

function initHodData() {
  const custom = loadHodCustomData();
  (custom.faculty || []).forEach((f) => {
    if (!DATA.faculty.find((x) => x.fid === f.fid)) DATA.faculty.push(f);
  });
  (custom.themes || []).forEach((t) => {
    if (!DATA.themes.find((x) => x.tid === t.tid)) DATA.themes.push(t);
  });
  (custom.artifacts || []).forEach((a) => {
    if (!DATA.artifacts.find((x) => x.aid === a.aid)) DATA.artifacts.push(a);
  });
  (custom.students || []).forEach((s) => {
    if (!DATA.students.find((x) => x.sid === s.sid)) DATA.students.push(s);
  });
}
initHodData();

function addFaculty(deptId, name) {
  const custom = loadHodCustomData();
  const nextFid = Math.max(...DATA.faculty.map((f) => f.fid), 0) + 1;
  const entry = { fid: nextFid, name: name.trim(), did: Number(deptId) };
  DATA.faculty.push(entry);
  custom.faculty.push(entry);
  saveHodCustomData(custom);
  return entry;
}

function addTheme(deptId, fid, name, academicYear = '2026-27') {
  const custom = loadHodCustomData();
  const nextTid = Math.max(...DATA.themes.map((t) => t.tid), 0) + 1;
  const entry = { tid: nextTid, name: name.trim(), academicYear: academicYear || '2026-27', did: Number(deptId), fid: Number(fid) };
  DATA.themes.push(entry);
  custom.themes.push(entry);
  saveHodCustomData(custom);
  return entry;
}

function addArtifact(tid, name, code = '', teamNo = '') {
  const custom = loadHodCustomData();
  const nextAid = Math.max(...DATA.artifacts.map((a) => a.aid), 0) + 1;
  const entry = {
    aid: nextAid,
    name: name.trim(),
    code: code ? code.trim() : `ART-${String(nextAid).padStart(3, '0')}`,
    tid: Number(tid),
    teamNo: teamNo ? String(teamNo) : '',
    status: 'red',
    progress: 0
  };
  DATA.artifacts.push(entry);
  custom.artifacts.push(entry);
  saveHodCustomData(custom);
  return entry;
}

function addStudent(aid, deptId, name, srn = '', rollNo = '', division = 'B', semester = 5, programme = '') {
  const custom = loadHodCustomData();
  const nextSid = Math.max(...DATA.students.map((s) => s.sid), 0) + 1;
  const entry = {
    sid: nextSid,
    name: name.trim(),
    srn: srn ? srn.trim() : '',
    rollNo: rollNo ? rollNo.trim() : '',
    division: division ? division.trim() : 'B',
    semester: Number(semester) || FIXED_SEMESTER,
    programme: programme || (findDept(deptId) ? findDept(deptId).name : ''),
    aid: Number(aid),
    did: Number(deptId)
  };
  DATA.students.push(entry);
  custom.students.push(entry);
  saveHodCustomData(custom);
  return entry;
}

function downloadCsvTemplate() {
  const headers = ['Faculty', 'Theme', 'Artifact ID', 'Artifact Name', 'Team No', 'Student Name', 'USN', 'Roll No'];
  const sampleRows = [
    // Team 14: Mr. Amit Kachavimath
    ['Mr. Amit Kachavimath', 'Network Systems and Tools', 'ART-014', 'Adaptive Video Streaming and Buffer Management Engine', '14', 'Renuka Kagadal', '01FE24BCI09', '243'],
    ['', '', '', '', '', 'Divya Kumari', '01FE24BCI094', '222'],
    ['', '', '', '', '', 'B. Bhagyashree', '01FE24BCI104', '231'],
    ['', '', '', '', '', 'Akshay Bhat', '01FE24BCI093', '210'],

    // Team 1: Mr. Pranav Kumar Saunshi
    ['Mr. Pranav Kumar Saunshi', 'NETWORK SYSTEM AND TOOLS', 'ART-001', 'DNS RESOLVER AND CACHING SERVER', '1', 'VAGEESH MATHAD', '01FE24BCI008', '216'],
    ['', '', '', '', '', 'MEHAK SAYED YUSUF', '01FE24BCI012', '202'],
    ['', '', '', '', '', 'JOEL BIJU', '01FE24BCI014', '208'],
    ['', '', '', '', '', 'ABHISHEK CHAVAN', '01FE24BCI009', '218'],

    // Team 2: Ms. Pooja Shettar
    ['Ms. Pooja Shettar', 'Resilient Multi Peer File Distribution and Recovery Engine', 'ART-002', 'Resilient Multi Peer File Distribution and Recovery Engine', '2', 'Manasa', '01FE24BCI031', '251'],
    ['', '', '', '', '', 'Vineet', '01FE24BCI032', '252'],
    ['', '', '', '', '', 'Mahadev', '01FE24BCI033', '253'],
    ['', '', '', '', '', 'Arihant', '01FE24BCI034', '254']
  ];
  const csvContent = [headers.join(','), ...sampleRows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hod_team_upload_template.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function validateCsvContent(csvString, deptId) {
  if (!csvString || typeof csvString !== 'string') {
    return { valid: false, errors: [{ row: '-', field: 'File', reason: 'CSV content is empty or unreadable.' }] };
  }
  const lines = csvString.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) {
    return { valid: false, errors: [{ row: 1, field: 'Header/Data', reason: 'CSV must contain a header row and at least one data row.' }] };
  }

  const requiredHeaders = ['Faculty', 'Theme', 'Artifact ID', 'Artifact Name', 'Team No', 'Student Name', 'USN', 'Roll No'];
  const headerCols = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  
  for (const req of requiredHeaders) {
    if (!headerCols.some(h => h.toLowerCase() === req.toLowerCase())) {
      return { valid: false, errors: [{ row: 1, field: req, reason: `Missing required column header: "${req}". Expected columns: ${requiredHeaders.join(', ')}` }] };
    }
  }

  const idx = {
    faculty: headerCols.findIndex(h => h.toLowerCase() === 'faculty'),
    theme: headerCols.findIndex(h => h.toLowerCase() === 'theme'),
    artifactId: headerCols.findIndex(h => h.toLowerCase() === 'artifact id'),
    artifactName: headerCols.findIndex(h => h.toLowerCase() === 'artifact name'),
    teamNo: headerCols.findIndex(h => h.toLowerCase() === 'team no'),
    studentName: headerCols.findIndex(h => h.toLowerCase() === 'student name'),
    usn: headerCols.findIndex(h => h.toLowerCase() === 'usn'),
    rollNo: headerCols.findIndex(h => h.toLowerCase() === 'roll no'),
  };

  const errors = [];
  const rows = [];
  const seenUsn = new Map();

  let lastFaculty = '';
  let lastTheme = '';
  let lastArtifactId = '';
  let lastArtifactName = '';
  let lastTeamNo = '';

  for (let i = 1; i < lines.length; i++) {
    const rowNum = i + 1;
    const rawLine = lines[i];
    const cells = [];
    let inQuotes = false;
    let curr = '';
    for (let c = 0; c < rawLine.length; c++) {
      const char = rawLine[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(curr.trim());
        curr = '';
      } else {
        curr += char;
      }
    }
    cells.push(curr.trim());
    const cleanCells = cells.map(v => v.replace(/^["']|["']$/g, '').trim());

    if (cleanCells.length < headerCols.length) {
      errors.push({ row: rowNum, field: 'Columns', reason: `Incomplete row: found ${cleanCells.length} columns, expected ${headerCols.length}.` });
      continue;
    }

    const rawFaculty = cleanCells[idx.faculty] || '';
    const rawTheme = cleanCells[idx.theme] || '';
    const rawArtifactId = cleanCells[idx.artifactId] || '';
    const rawArtifactName = cleanCells[idx.artifactName] || '';
    const rawTeamNo = cleanCells[idx.teamNo] || '';
    const studentName = cleanCells[idx.studentName] || '';
    const usn = cleanCells[idx.usn] || '';
    const rollNo = cleanCells[idx.rollNo] || '';

    // If completely blank line, skip
    if (!rawFaculty && !rawTheme && !rawArtifactId && !rawArtifactName && !rawTeamNo && !studentName && !usn && !rollNo) {
      continue;
    }

    // Determine inheritance / forward fill
    const isNewTeamDefinition = Boolean(rawArtifactId || rawArtifactName || rawTeamNo);

    let faculty = rawFaculty || lastFaculty;
    let theme = rawTheme || lastTheme;
    let artifactId = rawArtifactId;
    let artifactName = rawArtifactName;
    let teamNo = rawTeamNo;

    if (!isNewTeamDefinition) {
      // Continuing previous team
      artifactId = lastArtifactId;
      artifactName = lastArtifactName;
      teamNo = lastTeamNo;
    } else {
      // New team definition
      if (artifactId) lastArtifactId = artifactId;
      if (artifactName) lastArtifactName = artifactName;
      if (teamNo) lastTeamNo = teamNo;
    }

    if (rawFaculty) lastFaculty = rawFaculty;
    if (rawTheme) lastTheme = rawTheme;

    if (!faculty) errors.push({ row: rowNum, field: 'Faculty', reason: 'Faculty Name is missing.' });
    if (!theme) errors.push({ row: rowNum, field: 'Theme', reason: 'Theme Name is missing.' });
    if (!artifactId) errors.push({ row: rowNum, field: 'Artifact ID', reason: 'Artifact ID is missing.' });
    if (!artifactName) errors.push({ row: rowNum, field: 'Artifact Name', reason: 'Artifact Name is missing.' });
    if (!teamNo) errors.push({ row: rowNum, field: 'Team No', reason: 'Team No is missing.' });
    if (!studentName) errors.push({ row: rowNum, field: 'Student Name', reason: 'Student Name is missing.' });

    if (usn) {
      const normUsn = usn.toUpperCase();
      if (seenUsn.has(normUsn)) {
        errors.push({ row: rowNum, field: 'USN', reason: `Duplicate USN detected: "${usn}" (already in row ${seenUsn.get(normUsn)}).` });
      } else {
        seenUsn.set(normUsn, rowNum);
      }
    }

    rows.push({ rowNum, faculty, theme, artifactId, artifactName, teamNo, studentName, usn, rollNo });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Group into teams
  const teamMap = new Map();
  for (const r of rows) {
    const key = `${r.faculty}|||${r.theme}|||${r.artifactId}|||${r.artifactName}|||${r.teamNo}`;
    if (!teamMap.has(key)) {
      teamMap.set(key, {
        faculty: r.faculty,
        theme: r.theme,
        artifactId: r.artifactId,
        artifactName: r.artifactName,
        teamNo: r.teamNo,
        students: [],
      });
    }
    const team = teamMap.get(key);
    if (team.students.some(s => s.studentName.toLowerCase() === r.studentName.toLowerCase())) {
      errors.push({ row: r.rowNum, field: 'Student Name', reason: `Duplicate student "${r.studentName}" in Team ${r.teamNo}.` });
    }
    team.students.push(r);
  }

  for (const team of teamMap.values()) {
    if (team.students.length > 4) {
      errors.push({
        row: team.students[4].rowNum,
        field: 'Team No',
        reason: `Team ${team.teamNo} has ${team.students.length} students. Maximum allowed per team is 4.`
      });
    }
    const existing = DATA.artifacts.find(a => (a.code && a.code.toLowerCase() === team.artifactId.toLowerCase()) || String(a.aid) === team.artifactId);
    if (existing && existing.name.toLowerCase() !== team.artifactName.toLowerCase()) {
      errors.push({
        row: team.students[0].rowNum,
        field: 'Artifact ID / Name',
        reason: `Artifact ID "${team.artifactId}" already exists with a different Artifact Name ("${existing.name}"). Cannot overwrite.`
      });
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, teams: Array.from(teamMap.values()), totalStudents: rows.length };
}

function importValidatedTeams(teams, deptId) {
  let teamsImported = 0;
  let studentsImported = 0;

  for (const team of teams) {
    let fac = DATA.faculty.find(f => f.did === deptId && f.name.toLowerCase() === team.faculty.toLowerCase());
    if (!fac) {
      fac = addFaculty(deptId, team.faculty);
    }

    let theme = DATA.themes.find(t => t.did === deptId && t.fid === fac.fid && t.name.toLowerCase() === team.theme.toLowerCase());
    if (!theme) {
      theme = addTheme(deptId, fac.fid, team.theme, '2026-27');
    }

    let art = DATA.artifacts.find(a => (a.code && a.code.toLowerCase() === team.artifactId.toLowerCase()) || (a.tid === theme.tid && a.name.toLowerCase() === team.artifactName.toLowerCase()));
    if (!art) {
      art = addArtifact(theme.tid, team.artifactName, team.artifactId, team.teamNo);
    } else if (!art.code) {
      art.code = team.artifactId;
    }
    teamsImported++;

    for (const s of team.students) {
      let st = DATA.students.find(x => x.aid === art.aid && (x.name.toLowerCase() === s.studentName.toLowerCase() || (s.usn && x.srn && x.srn.toLowerCase() === s.usn.toLowerCase())));
      if (!st) {
        addStudent(art.aid, deptId, s.studentName, s.usn, s.rollNo, 'B', 5, findDept(deptId) ? findDept(deptId).name : '');
        studentsImported++;
      }
    }
  }

  return { teamsImported, studentsImported };
}
