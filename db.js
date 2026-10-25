// ==============================================================================
// Database Adapter & Auto-Validation Engine for AICTE APAAR Platform
// Supports: Live MySQL 8.0+ Connection with Multi-Department & Cryptographic APAAR Hashing
// ==============================================================================

const mysql = require('mysql2/promise');
const crypto = require('crypto');

// Configuration for local MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'apaar_aicte_db',
    connectTimeout: 1200
};

let pool = null;
let isMySqlConnected = false;

// Cryptographic Salt & Helpers for APAAR ID Security
const APAAR_SALT = 'AICTE_SECURE_SALT_2026_NEP';

function hashApaarId(apaarId) {
    if (!apaarId) return '';
    return crypto.createHash('sha256').update(`${APAAR_SALT}_${apaarId.trim()}`).digest('hex');
}

function maskApaarId(apaarId) {
    if (!apaarId || typeof apaarId !== 'string') return '•••• •••• ••••';
    const cleaned = apaarId.trim();
    if (cleaned.length < 4) return '•••• •••• ••••';
    return `•••• •••• ${cleaned.slice(-4)}`;
}

// In-Memory Multi-Year & Multi-Department Dataset
let memoryStore = {
    institutions: [
        { id: 1, aicte_permanent_id: 'AICTE-MH-0102', institution_name: 'COEP Technological University', institution_type: 'Autonomous College', state: 'Maharashtra', city: 'Pune', contact_email: 'principal@coep.ac.in', accreditation_status: 'NBA Tier-1 Accredited', established_year: 1854, total_operational_years: 172, api_access_key: 'KEY_COEP_9921_SECURE' },
        { id: 2, aicte_permanent_id: 'AICTE-DL-0304', institution_name: 'Delhi Technological University (DTU)', institution_type: 'University', state: 'Delhi', city: 'New Delhi', contact_email: 'dean.academic@dtu.ac.in', accreditation_status: 'NAAC A++ Accredited', established_year: 1941, total_operational_years: 85, api_access_key: 'KEY_DTU_8812_SECURE' },
        { id: 3, aicte_permanent_id: 'AICTE-KA-0506', institution_name: 'National Institute of Engineering (NIE)', institution_type: 'Affiliated College', state: 'Karnataka', city: 'Mysuru', contact_email: 'registrar@nie.ac.in', accreditation_status: 'NBA Accredited', established_year: 1946, total_operational_years: 80, api_access_key: 'KEY_NIE_7734_SECURE' },
        { id: 4, aicte_permanent_id: 'AICTE-KA-0708', institution_name: 'Xavier Institute of Management (PGDM)', institution_type: 'PGDM Institute', state: 'Karnataka', city: 'Bengaluru', contact_email: 'admissions@xime.org', accreditation_status: 'AICTE & ACBSP Accredited', established_year: 1991, total_operational_years: 35, api_access_key: 'KEY_XIME_6645_SECURE' },
        { id: 5, aicte_permanent_id: 'AICTE-TN-0910', institution_name: 'PSG College of Technology', institution_type: 'Autonomous College', state: 'Tamil Nadu', city: 'Coimbatore', contact_email: 'principal@psgtech.edu', accreditation_status: 'NAAC A+ Accredited', established_year: 1951, total_operational_years: 75, api_access_key: 'KEY_PSG_5521_SECURE' }
    ],
    programs: [
        // COEP Pune (2026-2027)
        { id: 1, institution_id: 1, program_name: 'B.Tech Computer Science & Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 59 },
        { id: 2, institution_id: 1, program_name: 'B.Tech Artificial Intelligence & Data Science', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 52 },
        { id: 3, institution_id: 1, program_name: 'B.Tech Electronics & Telecommunication', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 50 },
        { id: 4, institution_id: 1, program_name: 'B.Tech Mechanical Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 45 },
        { id: 5, institution_id: 1, program_name: 'B.Tech Robotics & Automation', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 40 },

        // DTU Delhi (2026-2027)
        { id: 6, institution_id: 2, program_name: 'B.Tech Information Technology', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 60 }, // Full (limit reached)
        { id: 7, institution_id: 2, program_name: 'B.Tech Software Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 54 },
        { id: 8, institution_id: 2, program_name: 'B.Tech Electrical & Electronics Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 48 },
        { id: 9, institution_id: 2, program_name: 'M.Tech Cyber Security', degree_level: 'Postgraduate', duration_years: 2, academic_year: '2026-2027', approved_intake: 30, supernumerary_quota: 3, nri_quota: 2, oci_quota: 1, fn_quota: 1, actual_enrolment: 22 },

        // NIE Mysuru (2026-2027)
        { id: 10, institution_id: 3, program_name: 'B.Tech Artificial Intelligence & Machine Learning', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 58 },
        { id: 11, institution_id: 3, program_name: 'B.Tech Civil Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 42 },

        // XIME Bangalore (2026-2027)
        { id: 12, institution_id: 4, program_name: 'Post Graduate Diploma in Management (PGDM)', degree_level: 'PGDM', duration_years: 2, academic_year: '2026-2027', approved_intake: 120, supernumerary_quota: 12, nri_quota: 10, oci_quota: 5, fn_quota: 5, actual_enrolment: 118 },
        { id: 13, institution_id: 4, program_name: 'PGDM in Business Analytics', degree_level: 'PGDM', duration_years: 2, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 5, oci_quota: 2, fn_quota: 2, actual_enrolment: 55 },

        // PSG Tech Coimbatore (2026-2027)
        { id: 14, institution_id: 5, program_name: 'B.Tech Computer Science & Business Systems', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 57 },
        { id: 15, institution_id: 5, program_name: 'B.Tech Biomedical Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2026-2027', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 44 },

        // Historical Academic Years (2025-2026)
        { id: 16, institution_id: 1, program_name: 'B.Tech Computer Science & Engineering', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2025-2026', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 60 },
        { id: 17, institution_id: 2, program_name: 'B.Tech Information Technology', degree_level: 'Undergraduate', duration_years: 4, academic_year: '2025-2026', approved_intake: 60, supernumerary_quota: 6, nri_quota: 3, oci_quota: 2, fn_quota: 2, actual_enrolment: 59 },
        { id: 18, institution_id: 4, program_name: 'Post Graduate Diploma in Management (PGDM)', degree_level: 'PGDM', duration_years: 2, academic_year: '2025-2026', approved_intake: 120, supernumerary_quota: 12, nri_quota: 10, oci_quota: 5, fn_quota: 5, actual_enrolment: 115 }
    ],
    students: [
        {
            id: 1, apaar_id: '904128475102', apaar_hash: hashApaarId('904128475102'), masked_apaar: maskApaarId('904128475102'),
            roll_number: '2026-COEP-CS-01', first_name: 'Aarav', last_name: 'Sharma', gender: 'Male', dob: '2005-04-12',
            email: 'aarav.sharma@coep.ac.in', phone: '9876543210', institution_id: 1, program_id: 1, academic_year: '2026-2027',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-90412847', digital_signature_hash: 'SHA256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', admission_date: '2026-08-01'
        },
        {
            id: 2, apaar_id: '904128475103', apaar_hash: hashApaarId('904128475103'), masked_apaar: maskApaarId('904128475103'),
            roll_number: '2026-COEP-CS-02', first_name: 'Ananya', last_name: 'Deshmukh', gender: 'Female', dob: '2005-09-24',
            email: 'ananya.d@coep.ac.in', phone: '9823456781', institution_id: 1, program_id: 1, academic_year: '2026-2027',
            quota_category: 'Supernumerary-TFW', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-90412848', digital_signature_hash: 'SHA256_b4c5d6e7f8a91011121314151617181920212223242526272829303132333435', admission_date: '2026-08-01'
        },
        {
            id: 3, apaar_id: '904128475104', apaar_hash: hashApaarId('904128475104'), masked_apaar: maskApaarId('904128475104'),
            roll_number: '2026-COEP-CS-03', first_name: 'Rohan', last_name: 'Patel', gender: 'Male', dob: '2005-11-15',
            email: 'rohan.p@coep.ac.in', phone: '9765432109', institution_id: 1, program_id: 1, academic_year: '2026-2027',
            quota_category: 'NRI', is_nri: true, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-90412849', digital_signature_hash: 'SHA256_c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', admission_date: '2026-08-02'
        },
        {
            id: 4, apaar_id: '904128475105', apaar_hash: hashApaarId('904128475105'), masked_apaar: maskApaarId('904128475105'),
            roll_number: '2026-COEP-AI-01', first_name: 'Fatima', last_name: 'Zehra', gender: 'Female', dob: '2004-03-18',
            email: 'fatima.z@coep.ac.in', phone: '9654321098', institution_id: 1, program_id: 2, academic_year: '2026-2027',
            quota_category: 'OCI', is_nri: false, is_oci: true, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-90412850', digital_signature_hash: 'SHA256_d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2', admission_date: '2026-08-02'
        },
        {
            id: 5, apaar_id: '781923450912', apaar_hash: hashApaarId('781923450912'), masked_apaar: maskApaarId('781923450912'),
            roll_number: '2026-DTU-IT-101', first_name: 'Kavya', last_name: 'Iyer', gender: 'Female', dob: '2005-02-14',
            email: 'kavya.iyer@dtu.ac.in', phone: '9811223344', institution_id: 2, program_id: 6, academic_year: '2026-2027',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-78192345', digital_signature_hash: 'SHA256_a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678', admission_date: '2026-08-05'
        },
        {
            id: 6, apaar_id: '781923450913', apaar_hash: hashApaarId('781923450913'), masked_apaar: maskApaarId('781923450913'),
            roll_number: '2026-DTU-IT-102', first_name: 'Harsh', last_name: 'Vardhan', gender: 'Male', dob: '2005-06-30',
            email: 'harsh.v@dtu.ac.in', phone: '9877665544', institution_id: 2, program_id: 6, academic_year: '2026-2027',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'EXCESS_INTAKE_HOLD',
            abc_account_id: 'ABC-IN-78192346', digital_signature_hash: 'SHA256_f6e5d4c3b2a10987fedcba0987654321fedcba0987654321fedcba09876543', admission_date: '2026-08-05'
        },
        {
            id: 7, apaar_id: '882190341255', apaar_hash: hashApaarId('882190341255'), masked_apaar: maskApaarId('882190341255'),
            roll_number: '2026-COEP-MECH-44', first_name: 'Vikram', last_name: 'Aditya', gender: 'Male', dob: '2005-05-10',
            email: 'vikram.a@coep.ac.in', phone: '9123456780', institution_id: 1, program_id: 4, academic_year: '2026-2027',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'FLAGGED_DUPLICATE',
            abc_account_id: 'ABC-IN-88219034', digital_signature_hash: 'SHA256_998877665544332211aabbccddeeff00998877665544332211aabbccddeeff00', admission_date: '2026-08-04'
        },
        {
            id: 8, apaar_id: '662019483721', apaar_hash: hashApaarId('662019483721'), masked_apaar: maskApaarId('662019483721'),
            roll_number: '2026-XIME-PG-01', first_name: 'Pooja', last_name: 'Nair', gender: 'Female', dob: '2002-12-05',
            email: 'pooja.nair@xime.org', phone: '9443322110', institution_id: 4, program_id: 12, academic_year: '2026-2027',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-66201948', digital_signature_hash: 'SHA256_11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff', admission_date: '2026-07-28'
        },
        {
            id: 9, apaar_id: '551092837461', apaar_hash: hashApaarId('551092837461'), masked_apaar: maskApaarId('551092837461'),
            roll_number: '2025-COEP-CS-11', first_name: 'Priya', last_name: 'Rao', gender: 'Female', dob: '2004-02-11',
            email: 'priya.rao@coep.ac.in', phone: '9871122334', institution_id: 1, program_id: 16, academic_year: '2025-2026',
            quota_category: 'Regular', is_nri: false, is_oci: false, is_foreign_national: false, verification_status: 'VERIFIED',
            abc_account_id: 'ABC-IN-55109283', digital_signature_hash: 'SHA256_2025_hash_coep_priya_verified', admission_date: '2025-08-10'
        }
    ],
    anomalies: [
        {
            id: 1, apaar_id: '882190341255', institution_id: 2, program_id: 6, student_name: 'Vikram Aditya',
            anomaly_type: 'CROSS_INSTITUTION_DUPLICATE', severity: 'CRITICAL',
            academic_year: '2026-2027',
            details: 'DUPLICATE ENROLMENT: Student with APAAR ID 882190341255 is already admitted at COEP Technological University in B.Tech Mechanical Engineering. Cannot be admitted to DTU simultaneously.',
            status: 'OPEN', detected_at: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
            id: 2, apaar_id: '781923450913', institution_id: 2, program_id: 6, student_name: 'Harsh Vardhan',
            anomaly_type: 'APPROVED_INTAKE_BREACH', severity: 'WARNING',
            academic_year: '2026-2027',
            details: 'CAPACITY FULL: Department B.Tech Information Technology at DTU reached 100% capacity (60/60 sanctioned intake). Student placed on hold pending department reallocation or quota approval.',
            status: 'OPEN', detected_at: new Date(Date.now() - 3600000 * 24).toISOString()
        },
        {
            id: 3, apaar_id: '999900001111', institution_id: 3, program_id: 10, student_name: 'Suresh K',
            anomaly_type: 'INVALID_APAAR_FORMAT', severity: 'CRITICAL',
            academic_year: '2026-2027',
            details: 'INVALID APAAR FORMAT: The provided ID 999900001111 failed national Verhoeff/Luhn checksum algorithm check against UIDAI/ABC master format.',
            status: 'OPEN', detected_at: new Date(Date.now() - 3600000 * 48).toISOString()
        }
    ],
    audit_logs: [
        { id: 1, actor_type: 'AICTE_ADMIN', institution_id: null, apaar_id: null, action_type: 'PORTAL_INITIALIZATION', request_ip: '10.0.0.1', status: 'SUCCESS', notes: 'AICTE National APAAR Registry online with cryptographic hashing enabled.', created_at: new Date(Date.now() - 3600000 * 72).toISOString() }
    ]
};

// Initialize database
async function initDatabase() {
    try {
        pool = mysql.createPool({
            ...dbConfig,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();

        isMySqlConnected = true;
        console.log('✅ Connected successfully to MySQL database:', dbConfig.database);
    } catch (err) {
        isMySqlConnected = false;
        console.warn('⚠️  Notice: Local MySQL server not active on port 3306 or requires password.');
        console.log('💡 Running in High-Performance In-Memory Mode with full multi-year & multi-department dataset.');
    }
}

function generateDigitalSignature(student) {
    const raw = `${student.apaar_id}|${student.institution_id}|${student.program_id}|${student.academic_year || '2026-2027'}|AICTE_CONFIDENTIAL_VERIFIED`;
    return 'SHA256_' + crypto.createHash('sha256').update(raw).digest('hex');
}

function isValidApaarFormat(apaarId) {
    if (!apaarId || typeof apaarId !== 'string') return false;
    const cleaned = apaarId.trim();
    if (!/^\d{12}$/.test(cleaned)) return false;
    if (/^(\d)\1{11}$/.test(cleaned)) return false;
    return true;
}

// ---------------- Database Query Functions ----------------

async function getInstitutions() {
    if (isMySqlConnected) {
        const [rows] = await pool.query('SELECT * FROM institutions ORDER BY id ASC');
        return rows;
    }
    return memoryStore.institutions;
}

async function addInstitution(data) {
    const newInst = {
        aicte_permanent_id: data.aicte_permanent_id.trim().toUpperCase(),
        institution_name: data.institution_name.trim(),
        institution_type: data.institution_type || 'Autonomous College',
        state: data.state.trim(),
        city: data.city.trim(),
        contact_email: data.contact_email.trim(),
        accreditation_status: data.accreditation_status || 'NBA/NAAC Accredited',
        established_year: parseInt(data.established_year, 10) || 2020,
        total_operational_years: (new Date().getFullYear()) - (parseInt(data.established_year, 10) || 2020),
        api_access_key: `KEY_${data.aicte_permanent_id.replace(/\W/g, '')}_SECURE`
    };

    if (isMySqlConnected) {
        const [result] = await pool.query(`
            INSERT INTO institutions 
            (aicte_permanent_id, institution_name, institution_type, state, city, contact_email, accreditation_status, established_year, total_operational_years, api_access_key)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            newInst.aicte_permanent_id, newInst.institution_name, newInst.institution_type,
            newInst.state, newInst.city, newInst.contact_email, newInst.accreditation_status,
            newInst.established_year, newInst.total_operational_years, newInst.api_access_key
        ]);
        newInst.id = result.insertId;

        // Add default department for this institution
        await pool.query(`
            INSERT INTO programs_intake 
            (institution_id, program_name, degree_level, duration_years, academic_year, approved_intake, supernumerary_quota, nri_quota, oci_quota, fn_quota, actual_enrolment)
            VALUES (?, 'B.Tech Computer Science & Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 0)
        `, [newInst.id]);
    } else {
        newInst.id = memoryStore.institutions.length + 1;
        memoryStore.institutions.push(newInst);

        // Add default department in memory
        memoryStore.programs.push({
            id: memoryStore.programs.length + 1,
            institution_id: newInst.id,
            program_name: data.initial_program || 'B.Tech Computer Science & Engineering',
            degree_level: 'Undergraduate',
            duration_years: 4,
            academic_year: '2026-2027',
            approved_intake: parseInt(data.initial_intake, 10) || 60,
            supernumerary_quota: 6,
            nri_quota: 3,
            oci_quota: 2,
            fn_quota: 2,
            actual_enrolment: 0
        });
    }

    await logAuditAction('AICTE_ADMIN', newInst.id, null, 'INSTITUTION_REGISTERED', `Added ${newInst.institution_name} (${newInst.aicte_permanent_id})`);
    return { success: true, institution: newInst };
}

async function getPrograms(institutionId, academicYear = '2026-2027') {
    if (isMySqlConnected) {
        let sql = 'SELECT p.*, i.institution_name FROM programs_intake p JOIN institutions i ON p.institution_id = i.id WHERE 1=1';
        const params = [];
        if (institutionId) {
            sql += ' AND p.institution_id = ?';
            params.push(institutionId);
        }
        if (academicYear) {
            sql += ' AND p.academic_year = ?';
            params.push(academicYear);
        }
        sql += ' ORDER BY p.id ASC';
        const [rows] = await pool.query(sql, params);
        return rows;
    }

    let res = memoryStore.programs.map(p => {
        const inst = memoryStore.institutions.find(i => i.id === p.institution_id);
        return { ...p, institution_name: inst ? inst.institution_name : 'Unknown' };
    });

    if (academicYear) {
        res = res.filter(p => p.academic_year === academicYear);
    }
    if (institutionId) {
        res = res.filter(p => p.institution_id === parseInt(institutionId, 10));
    }
    return res;
}

async function getStudents(filters = {}) {
    const year = filters.academic_year || '2026-2027';

    if (isMySqlConnected) {
        let sql = `
            SELECT s.*, i.institution_name, p.program_name, p.duration_years 
            FROM students s
            JOIN institutions i ON s.institution_id = i.id
            JOIN programs_intake p ON s.program_id = p.id
            WHERE 1=1
        `;
        const params = [];
        if (filters.institution_id) {
            sql += ' AND s.institution_id = ?';
            params.push(filters.institution_id);
        }
        if (year) {
            sql += ' AND s.academic_year = ?';
            params.push(year);
        }
        if (filters.status) {
            sql += ' AND s.verification_status = ?';
            params.push(filters.status);
        }
        if (filters.search) {
            sql += ' AND (s.apaar_id LIKE ? OR s.first_name LIKE ? OR s.last_name LIKE ? OR s.roll_number LIKE ?)';
            const term = `%${filters.search}%`;
            params.push(term, term, term, term);
        }
        sql += ' ORDER BY s.id DESC';
        const [rows] = await pool.query(sql, params);
        return rows;
    }

    let list = memoryStore.students.map(s => {
        const inst = memoryStore.institutions.find(i => i.id === s.institution_id);
        const prog = memoryStore.programs.find(p => p.id === s.program_id);
        return {
            ...s,
            institution_name: inst ? inst.institution_name : 'Unknown Institution',
            program_name: prog ? prog.program_name : 'Unknown Program',
            duration_years: prog ? prog.duration_years : 4
        };
    });

    if (year) {
        list = list.filter(s => s.academic_year === year);
    }
    if (filters.institution_id) {
        list = list.filter(s => s.institution_id === parseInt(filters.institution_id, 10));
    }
    if (filters.status) {
        list = list.filter(s => s.verification_status === filters.status);
    }
    if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(s =>
            s.apaar_id.includes(q) ||
            s.first_name.toLowerCase().includes(q) ||
            s.last_name.toLowerCase().includes(q) ||
            s.roll_number.toLowerCase().includes(q)
        );
    }
    return list.slice().reverse();
}

async function getStudentByApaar(apaarId) {
    if (!apaarId) return null;
    const cleaned = apaarId.trim();

    if (isMySqlConnected) {
        const [rows] = await pool.query(`
            SELECT s.*, i.institution_name, i.aicte_permanent_id, i.state, i.city, i.established_year, i.total_operational_years,
                   p.program_name, p.degree_level, p.duration_years, p.approved_intake
            FROM students s
            JOIN institutions i ON s.institution_id = i.id
            JOIN programs_intake p ON s.program_id = p.id
            WHERE s.apaar_id = ?
        `, [cleaned]);
        return rows[0] || null;
    }

    const s = memoryStore.students.find(item => item.apaar_id === cleaned);
    if (!s) return null;

    const inst = memoryStore.institutions.find(i => i.id === s.institution_id) || {};
    const prog = memoryStore.programs.find(p => p.id === s.program_id) || {};

    return {
        ...s,
        institution_name: inst.institution_name || 'N/A',
        aicte_permanent_id: inst.aicte_permanent_id || 'N/A',
        state: inst.state || 'N/A',
        city: inst.city || 'N/A',
        established_year: inst.established_year || 1980,
        total_operational_years: inst.total_operational_years || 40,
        program_name: prog.program_name || 'N/A',
        degree_level: prog.degree_level || 'N/A',
        duration_years: prog.duration_years || 4,
        approved_intake: prog.approved_intake || 0
    };
}

async function getAnomalies(filters = {}) {
    const year = filters.academic_year || '2026-2027';

    if (isMySqlConnected) {
        let sql = `
            SELECT a.*, i.institution_name, p.program_name 
            FROM validation_anomalies a
            LEFT JOIN institutions i ON a.institution_id = i.id
            LEFT JOIN programs_intake p ON a.program_id = p.id
            WHERE 1=1
        `;
        const params = [];
        if (filters.institution_id) {
            sql += ' AND a.institution_id = ?';
            params.push(filters.institution_id);
        }
        if (year) {
            sql += ' AND (a.academic_year = ? OR a.academic_year IS NULL)';
            params.push(year);
        }
        sql += ' ORDER BY a.id DESC';
        const [rows] = await pool.query(sql, params);
        return rows;
    }

    let list = memoryStore.anomalies.map(a => {
        const inst = memoryStore.institutions.find(i => i.id === a.institution_id);
        const prog = memoryStore.programs.find(p => p.id === a.program_id);
        return {
            ...a,
            institution_name: inst ? inst.institution_name : 'Unknown',
            program_name: prog ? prog.program_name : 'N/A'
        };
    });

    if (year) {
        list = list.filter(a => !a.academic_year || a.academic_year === year);
    }
    if (filters.institution_id) {
        list = list.filter(a => a.institution_id === parseInt(filters.institution_id, 10));
    }
    return list.slice().reverse();
}

async function getAnalytics(filters = {}) {
    const year = filters.academic_year || '2026-2027';
    const institutionId = filters.institution_id ? parseInt(filters.institution_id, 10) : null;

    let institutionsCount = 0;
    let studentsCount = 0;
    let anomaliesCount = 0;
    let totalIntake = 0;
    let totalEnrolled = 0;
    let categoryBreakdown = {
        Regular: 0,
        'Supernumerary-TFW': 0,
        'Supernumerary-EWS': 0,
        'Supernumerary-PMSSS': 0,
        NRI: 0,
        OCI: 0,
        'Foreign National': 0
    };

    if (isMySqlConnected) {
        const [instRows] = await pool.query('SELECT COUNT(*) as cnt FROM institutions');
        institutionsCount = instRows[0].cnt;

        let studSql = 'SELECT COUNT(*) as cnt FROM students WHERE academic_year = ?';
        const studParams = [year];
        if (institutionId) {
            studSql += ' AND institution_id = ?';
            studParams.push(institutionId);
        }
        const [studRows] = await pool.query(studSql, studParams);
        studentsCount = studRows[0].cnt;

        let anomSql = 'SELECT COUNT(*) as cnt FROM validation_anomalies WHERE status = "OPEN"';
        const anomParams = [];
        if (institutionId) {
            anomSql += ' AND institution_id = ?';
            anomParams.push(institutionId);
        }
        const [anomRows] = await pool.query(anomSql, anomParams);
        anomaliesCount = anomRows[0].cnt;

        let progSql = 'SELECT SUM(approved_intake) as total_intake, SUM(actual_enrolment) as total_enrolled FROM programs_intake WHERE academic_year = ?';
        const progParams = [year];
        if (institutionId) {
            progSql += ' AND institution_id = ?';
            progParams.push(institutionId);
        }
        const [progRows] = await pool.query(progSql, progParams);
        totalIntake = progRows[0].total_intake || 0;
        totalEnrolled = progRows[0].total_enrolled || 0;

        let catSql = 'SELECT quota_category, COUNT(*) as cnt FROM students WHERE academic_year = ?';
        const catParams = [year];
        if (institutionId) {
            catSql += ' AND institution_id = ?';
            catParams.push(institutionId);
        }
        catSql += ' GROUP BY quota_category';
        const [catRows] = await pool.query(catSql, catParams);
        catRows.forEach(r => {
            categoryBreakdown[r.quota_category] = r.cnt;
        });
    } else {
        const progsOfYear = memoryStore.programs.filter(p => p.academic_year === year && (!institutionId || p.institution_id === institutionId));
        const studentsOfYear = memoryStore.students.filter(s => s.academic_year === year && (!institutionId || s.institution_id === institutionId));
        const anomsOfYear = memoryStore.anomalies.filter(a => (!a.academic_year || a.academic_year === year) && a.status === 'OPEN' && (!institutionId || a.institution_id === institutionId));

        institutionsCount = institutionId ? 1 : memoryStore.institutions.length;
        studentsCount = studentsOfYear.length;
        anomaliesCount = anomsOfYear.length;
        totalIntake = progsOfYear.reduce((sum, p) => sum + p.approved_intake, 0);
        totalEnrolled = progsOfYear.reduce((sum, p) => sum + p.actual_enrolment, 0);

        studentsOfYear.forEach(s => {
            categoryBreakdown[s.quota_category] = (categoryBreakdown[s.quota_category] || 0) + 1;
        });
    }

    return {
        institutionsCount,
        studentsCount,
        anomaliesCount,
        totalIntake,
        totalEnrolled,
        utilizationRate: totalIntake > 0 ? Math.round((totalEnrolled / totalIntake) * 100) : 0,
        categoryBreakdown,
        academicYear: year,
        institutionScope: institutionId ? `Institution #${institutionId}` : 'National Overview'
    };
}

// ---------------- Multi-Rule Automated Validation Engine ----------------
async function validateAndUploadStudent(studentData) {
    const institutionId = parseInt(studentData.institution_id, 10);
    const programId = parseInt(studentData.program_id, 10);
    const academicYear = studentData.academic_year || '2026-2027';
    const apaarId = (studentData.apaar_id || '').trim();
    const phone = (studentData.phone || '').trim().replace(/\D/g, '');
    const fullName = `${studentData.first_name || ''} ${studentData.last_name || ''}`.trim();
    const quota = studentData.quota_category || 'Regular';

    const errors = [];
    let isIntakeBreach = false;

    // Rule 1: Validate APAAR ID format (12 numeric digits)
    if (!isValidApaarFormat(apaarId)) {
        errors.push({
            rule: 'INVALID_APAAR_FORMAT',
            message: `INVALID APAAR FORMAT: '${apaarId}' is not valid. Must be exactly 12 numeric digits compliant with UIDAI/ABC format.`
        });
    }

    // Rule 2: Phone number length validation (strictly 10 digits)
    if (phone.length !== 10) {
        errors.push({
            rule: 'INVALID_PHONE_NUMBER',
            message: `INVALID PHONE NUMBER: Indian mobile numbers must be strictly 10 digits (provided: ${phone.length} digits).`
        });
    }

    let program = null;
    let existingStudents = [];
    let institutionPrograms = [];

    if (isMySqlConnected) {
        const [progRows] = await pool.query('SELECT * FROM programs_intake WHERE id = ?', [programId]);
        program = progRows[0] || null;
        const [allStudents] = await pool.query('SELECT * FROM students WHERE academic_year = ?', [academicYear]);
        existingStudents = allStudents;
        const [allInstProgs] = await pool.query('SELECT * FROM programs_intake WHERE institution_id = ? AND academic_year = ?', [institutionId, academicYear]);
        institutionPrograms = allInstProgs;
    } else {
        program = memoryStore.programs.find(p => p.id === programId) || null;
        existingStudents = memoryStore.students.filter(s => s.academic_year === academicYear);
        institutionPrograms = memoryStore.programs.filter(p => p.institution_id === institutionId && p.academic_year === academicYear);
    }

    if (!program) {
        errors.push({ rule: 'PROGRAM_NOT_FOUND', message: 'The selected academic department does not exist.' });
    }

    // Rule 3: Duplicate APAAR check within same institution
    const duplicateSameInst = existingStudents.find(
        s => s.apaar_id === apaarId && s.institution_id === institutionId
    );
    if (duplicateSameInst) {
        errors.push({
            rule: 'DUPLICATE_APAAR_SAME_COLLEGE',
            message: `DUPLICATE IN YOUR COLLEGE: Student with APAAR ID ${apaarId} is already admitted in your college under Roll No: ${duplicateSameInst.roll_number}.`
        });
    }

    // Rule 4: Cross-Institution Duplicate Admission Detection
    const duplicateOtherInst = existingStudents.find(
        s => s.apaar_id === apaarId && s.institution_id !== institutionId
    );
    if (duplicateOtherInst) {
        const otherInstName = (memoryStore.institutions.find(i => i.id === duplicateOtherInst.institution_id) || {}).institution_name || `College #${duplicateOtherInst.institution_id}`;
        errors.push({
            rule: 'CROSS_INSTITUTION_DUPLICATE',
            message: `🚨 DOUBLE ENROLMENT DETECTED: Student with APAAR ID ${apaarId} is already enrolled at '${otherInstName}' for Academic Year ${academicYear}. Simultaneous admission across AICTE colleges is prohibited.`
        });
    }

    // Rule 5: Approved Intake Limit & Change Department Opportunity
    if (program && errors.length === 0) {
        const isSupernumerary = quota.startsWith('Supernumerary');
        const isNriOciFn = ['NRI', 'OCI', 'Foreign National'].includes(quota);

        if (!isSupernumerary && !isNriOciFn) {
            if (program.actual_enrolment >= program.approved_intake) {
                isIntakeBreach = true;
                // Find alternate departments with available seats
                const alternateDepartments = institutionPrograms
                    .filter(p => p.id !== program.id && p.actual_enrolment < p.approved_intake)
                    .map(p => ({
                        id: p.id,
                        name: p.program_name,
                        availableSeats: p.approved_intake - p.actual_enrolment
                    }));

                // Record anomaly for college & national anomaly desk
                const breachDetails = `INTAKE CAPACITY REACHED: Department '${program.program_name}' has reached maximum approved capacity (${program.approved_intake}/${program.approved_intake} seats filled). Student admission held. Option to change department is available.`;

                const anomalyRecord = {
                    apaar_id: apaarId,
                    institution_id: institutionId,
                    program_id: programId,
                    student_name: fullName,
                    anomaly_type: 'APPROVED_INTAKE_BREACH',
                    severity: 'WARNING',
                    academic_year: academicYear,
                    details: breachDetails,
                    status: 'OPEN',
                    detected_at: new Date().toISOString()
                };

                if (isMySqlConnected) {
                    await pool.query(`
                        INSERT INTO validation_anomalies 
                        (apaar_id, institution_id, program_id, student_name, anomaly_type, severity, academic_year, details, status)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPEN')
                    `, [
                        anomalyRecord.apaar_id, anomalyRecord.institution_id, anomalyRecord.program_id,
                        anomalyRecord.student_name, anomalyRecord.anomaly_type, anomalyRecord.severity,
                        anomalyRecord.academic_year, anomalyRecord.details
                    ]);
                } else {
                    anomalyRecord.id = memoryStore.anomalies.length + 1;
                    memoryStore.anomalies.push(anomalyRecord);
                }

                return {
                    success: false,
                    intakeBreach: true,
                    currentProgram: program.program_name,
                    alternateDepartments,
                    message: `Department limit reached for ${program.program_name} (${program.approved_intake}/${program.approved_intake}). Please choose a department with open seats below, or select Supernumerary quota.`
                };
            }
        }
    }

    // If critical validation errors exist
    if (errors.length > 0) {
        const primaryError = errors[0];
        const anomalyRecord = {
            apaar_id: apaarId,
            institution_id: institutionId,
            program_id: programId,
            student_name: fullName || 'Unknown Candidate',
            anomaly_type: primaryError.rule,
            severity: 'CRITICAL',
            academic_year: academicYear,
            details: primaryError.message,
            status: 'OPEN',
            detected_at: new Date().toISOString()
        };

        if (isMySqlConnected) {
            await pool.query(`
                INSERT INTO validation_anomalies 
                (apaar_id, institution_id, program_id, student_name, anomaly_type, severity, academic_year, details, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPEN')
            `, [
                anomalyRecord.apaar_id, anomalyRecord.institution_id, anomalyRecord.program_id,
                anomalyRecord.student_name, anomalyRecord.anomaly_type, anomalyRecord.severity,
                anomalyRecord.academic_year, anomalyRecord.details
            ]);
        } else {
            anomalyRecord.id = memoryStore.anomalies.length + 1;
            memoryStore.anomalies.push(anomalyRecord);
        }

        await logAuditAction('INSTITUTION_USER', institutionId, apaarId, 'VALIDATION_REJECTED', primaryError.message);

        return {
            success: false,
            errors,
            message: `Validation Failed: ${primaryError.message}`
        };
    }

    // Success! Build secure student record with Salted SHA-256 Hash
    const hashedApaar = hashApaarId(apaarId);
    const maskedApaar = maskApaarId(apaarId);
    const digitalSignature = generateDigitalSignature({
        apaar_id: apaarId,
        institution_id: institutionId,
        program_id: programId,
        academic_year: academicYear
    });

    const isNri = quota === 'NRI' ? 1 : 0;
    const isOci = quota === 'OCI' ? 1 : 0;
    const isFn = quota === 'Foreign National' ? 1 : 0;
    const verificationStatus = 'VERIFIED';
    const abcAccountId = `ABC-IN-${apaarId.substring(0, 8)}`;
    const admissionDate = studentData.admission_date || new Date().toISOString().split('T')[0];

    const newStudent = {
        apaar_id: apaarId,
        apaar_hash: hashedApaar,
        masked_apaar: maskedApaar,
        roll_number: studentData.roll_number,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        gender: studentData.gender,
        dob: studentData.dob,
        email: studentData.email,
        phone: phone,
        institution_id: institutionId,
        program_id: programId,
        academic_year: academicYear,
        quota_category: quota,
        is_nri: isNri,
        is_oci: isOci,
        is_foreign_national: isFn,
        verification_status: verificationStatus,
        abc_account_id: abcAccountId,
        digital_signature_hash: digitalSignature,
        admission_date: admissionDate
    };

    if (isMySqlConnected) {
        const [result] = await pool.query(`
            INSERT INTO students 
            (apaar_id, apaar_hash, masked_apaar, roll_number, first_name, last_name, gender, dob, email, phone, institution_id, program_id, academic_year, quota_category, is_nri, is_oci, is_foreign_national, verification_status, abc_account_id, digital_signature_hash, admission_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            newStudent.apaar_id, newStudent.apaar_hash, newStudent.masked_apaar, newStudent.roll_number,
            newStudent.first_name, newStudent.last_name, newStudent.gender, newStudent.dob,
            newStudent.email, newStudent.phone, newStudent.institution_id, newStudent.program_id,
            newStudent.academic_year, newStudent.quota_category, newStudent.is_nri, newStudent.is_oci,
            newStudent.is_foreign_national, newStudent.verification_status, newStudent.abc_account_id,
            newStudent.digital_signature_hash, newStudent.admission_date
        ]);
        newStudent.id = result.insertId;
        await pool.query('UPDATE programs_intake SET actual_enrolment = actual_enrolment + 1 WHERE id = ?', [programId]);
    } else {
        newStudent.id = memoryStore.students.length + 1;
        memoryStore.students.push(newStudent);
        if (program) {
            program.actual_enrolment += 1;
        }
    }

    await logAuditAction('INSTITUTION_USER', institutionId, apaarId, 'STUDENT_ADMISSION_VERIFIED', `Enrolled in Program ID #${programId}`);

    return {
        success: true,
        student: newStudent,
        message: `Student ${newStudent.first_name} ${newStudent.last_name} successfully enrolled and verified! Cryptographic APAAR Hash: ${hashedApaar.substring(0, 16)}...`
    };
}

// ---------------- REALLOCATE / CHANGE DEPARTMENT ----------------
async function reallocateStudentDepartment({ apaar_id, new_program_id, institution_id }) {
    const progId = parseInt(new_program_id, 10);
    const instId = parseInt(institution_id, 10);

    let program = null;
    if (isMySqlConnected) {
        const [progRows] = await pool.query('SELECT * FROM programs_intake WHERE id = ? AND institution_id = ?', [progId, instId]);
        program = progRows[0] || null;
    } else {
        program = memoryStore.programs.find(p => p.id === progId && p.institution_id === instId);
    }

    if (!program) {
        return { success: false, message: 'Target department not found or does not belong to this institution.' };
    }

    if (program.actual_enrolment >= program.approved_intake) {
        return { success: false, message: `Department '${program.program_name}' is also at full capacity (${program.approved_intake}/${program.approved_intake}).` };
    }

    // Update in MySQL or memory
    if (isMySqlConnected) {
        await pool.query('UPDATE students SET program_id = ?, verification_status = "VERIFIED" WHERE apaar_id = ? AND institution_id = ?', [progId, apaar_id, instId]);
        await pool.query('UPDATE programs_intake SET actual_enrolment = actual_enrolment + 1 WHERE id = ?', [progId]);
        await pool.query('UPDATE validation_anomalies SET status = "RESOLVED", details = CONCAT(details, " | [Reallocated to ", ?, "]") WHERE apaar_id = ? AND status = "OPEN"', [program.program_name, apaar_id]);
    } else {
        const student = memoryStore.students.find(s => s.apaar_id === apaar_id && s.institution_id === instId);
        if (student) {
            // decrement old program
            const oldProg = memoryStore.programs.find(p => p.id === student.program_id);
            if (oldProg && oldProg.actual_enrolment > 0) oldProg.actual_enrolment--;
            student.program_id = progId;
            student.verification_status = 'VERIFIED';
        }
        program.actual_enrolment++;
        const anom = memoryStore.anomalies.find(a => a.apaar_id === apaar_id && a.status === 'OPEN');
        if (anom) {
            anom.status = 'RESOLVED';
            anom.severity = 'RESOLVED';
            anom.details += ` | [Reallocated to ${program.program_name}]`;
        }
    }

    await logAuditAction('INSTITUTION_USER', instId, apaar_id, 'DEPARTMENT_REALLOCATED', `Transferred to ${program.program_name}`);

    return {
        success: true,
        message: `Student successfully reallocated to ${program.program_name}! Intake capacity updated and verification cleared.`
    };
}

// ---------------- ANOMALY RESOLUTION (Actually changes the student record data!) ----------------
async function resolveAnomaly({ anomaly_id, resolution_action, new_quota, new_status, admin_notes }) {
    const anomId = parseInt(anomaly_id, 10);
    let anomaly = null;

    if (isMySqlConnected) {
        const [rows] = await pool.query('SELECT * FROM validation_anomalies WHERE id = ?', [anomId]);
        anomaly = rows[0] || null;
    } else {
        anomaly = memoryStore.anomalies.find(a => a.id === anomId) || null;
    }

    if (!anomaly) {
        return { success: false, message: 'Anomaly record not found.' };
    }

    let targetStatus = new_status || 'VERIFIED';
    let targetQuota = new_quota || 'Regular';

    if (resolution_action === 'APPROVE_AS_SUPERNUMERARY') {
        targetStatus = 'VERIFIED';
        targetQuota = new_quota || 'Supernumerary-TFW';
    } else if (resolution_action === 'APPROVE_INTAKE_EXCEPTION') {
        targetStatus = 'VERIFIED';
    } else if (resolution_action === 'REJECT_DUPLICATE') {
        targetStatus = 'REJECTED_DUPLICATE';
    }

    // ACTUALLY update the student record in database
    if (isMySqlConnected) {
        await pool.query(`
            UPDATE students 
            SET verification_status = ?, quota_category = ? 
            WHERE apaar_id = ?
        `, [targetStatus, targetQuota, anomaly.apaar_id]);

        await pool.query(`
            UPDATE validation_anomalies 
            SET status = 'RESOLVED', severity = 'RESOLVED', 
                resolution_notes = ?,
                details = CONCAT(details, ' | [Resolved: ', ?, ']')
            WHERE id = ?
        `, [admin_notes || resolution_action, admin_notes || resolution_action, anomId]);
    } else {
        const student = memoryStore.students.find(s => s.apaar_id === anomaly.apaar_id);
        if (student) {
            student.verification_status = targetStatus;
            student.quota_category = targetQuota;
        }
        anomaly.status = 'RESOLVED';
        anomaly.severity = 'RESOLVED';
        anomaly.resolution_notes = admin_notes || resolution_action;
        anomaly.details += ` | [Resolved: ${admin_notes || resolution_action}]`;
    }

    await logAuditAction('AICTE_ADMIN', anomaly.institution_id, anomaly.apaar_id, 'ANOMALY_RESOLVED', `Action: ${resolution_action}, Status: ${targetStatus}, Quota: ${targetQuota}`);

    return {
        success: true,
        apaar_id: anomaly.apaar_id,
        new_status: targetStatus,
        new_quota: targetQuota,
        message: `Investigation resolved! Student record for APAAR ${anomaly.apaar_id} has been modified to '${targetStatus}' (${targetQuota}).`
    };
}

async function logAuditAction(actorType, institutionId, apaarId, actionType, notes) {
    const entry = {
        actor_type: actorType,
        institution_id: institutionId || null,
        apaar_id: apaarId || null,
        action_type: actionType,
        request_ip: '127.0.0.1',
        status: 'SUCCESS',
        notes: notes || null,
        created_at: new Date().toISOString()
    };

    if (isMySqlConnected) {
        await pool.query(`
            INSERT INTO audit_logs (actor_type, institution_id, apaar_id, action_type, request_ip, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [entry.actor_type, entry.institution_id, entry.apaar_id, entry.action_type, entry.request_ip, entry.status, entry.notes]);
    } else {
        entry.id = memoryStore.audit_logs.length + 1;
        memoryStore.audit_logs.push(entry);
    }
}

module.exports = {
    initDatabase,
    getInstitutions,
    addInstitution,
    getPrograms,
    getStudents,
    getStudentByApaar,
    getAnomalies,
    getAnalytics,
    validateAndUploadStudent,
    reallocateStudentDepartment,
    resolveAnomaly,
    logAuditAction,
    hashApaarId,
    maskApaarId,
    isMySqlConnected: () => isMySqlConnected,
    dbConfig
};
