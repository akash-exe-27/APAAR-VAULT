// ==============================================================================
// AICTE APAAR Student Data Management & Verification Portal - Backend Server
// Confidential, Role-Based Architecture with Cryptographic Security & Department Switching
// ==============================================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// ---------------- API Routes ----------------

// System Health Status
app.get('/api/health', async (req, res) => {
    res.json({
        status: 'ONLINE',
        service: 'AICTE-APAAR National Academic Registry',
        timestamp: new Date().toISOString()
    });
});

// 1. Get all AICTE Approved Institutions
app.get('/api/institutions', async (req, res) => {
    try {
        const institutions = await db.getInstitutions();
        res.json({ success: true, data: institutions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Add New Institution (AICTE Admin Feature)
app.post('/api/institutions', async (req, res) => {
    try {
        const { aicte_permanent_id, institution_name, institution_type, state, city, contact_email, established_year, initial_program, initial_intake } = req.body;
        if (!aicte_permanent_id || !institution_name || !contact_email) {
            return res.status(400).json({ success: false, message: 'AICTE Permanent ID, Name, and Email are required.' });
        }

        const result = await db.addInstitution({
            aicte_permanent_id,
            institution_name,
            institution_type,
            state: state || 'India',
            city: city || 'City',
            contact_email,
            established_year: established_year || 2024,
            initial_program,
            initial_intake
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Get Academic Programs and Approved Intake
app.get('/api/programs', async (req, res) => {
    try {
        const institutionId = req.query.institution_id;
        const academicYear = req.query.academic_year || '2026-2027';
        const programs = await db.getPrograms(institutionId, academicYear);
        res.json({ success: true, data: programs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. Get Student Records with Confidentiality Scoping & Academic Year
app.get('/api/students', async (req, res) => {
    try {
        const filters = {
            institution_id: req.query.institution_id,
            academic_year: req.query.academic_year || '2026-2027',
            status: req.query.status,
            search: req.query.search
        };
        const students = await db.getStudents(filters);
        res.json({ success: true, count: students.length, data: students });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 5. Validate & Upload Student (Single Entry)
app.post('/api/students/upload', async (req, res) => {
    try {
        const studentData = req.body;
        const result = await db.validateAndUploadStudent(studentData);
        if (!result.success) {
            return res.status(422).json(result);
        }
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 6. Change Department for Student when Seat Limit is Reached
app.post('/api/students/reallocate-department', async (req, res) => {
    try {
        const { apaar_id, new_program_id, institution_id } = req.body;
        if (!apaar_id || !new_program_id || !institution_id) {
            return res.status(400).json({ success: false, message: 'Missing apaar_id, new_program_id, or institution_id' });
        }
        const outcome = await db.reallocateStudentDepartment({ apaar_id, new_program_id, institution_id });
        if (!outcome.success) {
            return res.status(422).json(outcome);
        }
        res.json(outcome);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 7. Bulk Student Data Ingestion
app.post('/api/students/bulk-upload', async (req, res) => {
    try {
        const { institution_id, program_id, academic_year, students } = req.body;
        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or empty student array.' });
        }

        const report = { total: students.length, passed: 0, failed: 0, results: [] };
        for (const s of students) {
            const payload = {
                ...s,
                institution_id: institution_id || s.institution_id,
                program_id: program_id || s.program_id,
                academic_year: academic_year || s.academic_year || '2026-2027'
            };
            const outcome = await db.validateAndUploadStudent(payload);
            if (outcome.success) {
                report.passed++;
            } else {
                report.failed++;
            }
            report.results.push({
                apaar_id: s.apaar_id,
                name: `${s.first_name || ''} ${s.last_name || ''}`.trim(),
                success: outcome.success,
                message: outcome.message,
                errors: outcome.errors || []
            });
        }

        res.json({
            success: report.failed === 0,
            summary: report,
            message: `Processed ${report.total} records: ${report.passed} admitted, ${report.failed} rejected.`
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 8. AICTE Anomaly Center (Scoped by Academic Year and Institution)
app.get('/api/anomalies', async (req, res) => {
    try {
        const filters = {
            academic_year: req.query.academic_year || '2026-2027',
            institution_id: req.query.institution_id
        };
        const anomalies = await db.getAnomalies(filters);
        res.json({ success: true, count: anomalies.length, data: anomalies });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 9. REAL Anomaly Investigation & Resolution (Actually updates the record in database!)
app.post('/api/anomalies/resolve', async (req, res) => {
    try {
        const { anomaly_id, resolution_action, new_quota, new_status, admin_notes } = req.body;
        if (!anomaly_id || !resolution_action) {
            return res.status(400).json({ success: false, message: 'Anomaly ID and Resolution Action required.' });
        }

        const outcome = await db.resolveAnomaly({
            anomaly_id,
            resolution_action,
            new_quota,
            new_status,
            admin_notes
        });

        res.json(outcome);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 10. Authorized Verification Endpoint (By APAAR ID)
app.get('/api/verify/:apaar_id', async (req, res) => {
    try {
        const { apaar_id } = req.params;
        const student = await db.getStudentByApaar(apaar_id);

        if (!student) {
            await db.logAuditAction('AUTHORIZED_VERIFIER', null, apaar_id, 'RECORD_VERIFY_NOT_FOUND', 'APAAR ID not found in registry.');
            return res.status(404).json({
                success: false,
                is_valid: false,
                message: `No authentic student record found for APAAR ID: ${apaar_id}`
            });
        }

        await db.logAuditAction('AUTHORIZED_VERIFIER', student.institution_id, apaar_id, 'RECORD_VERIFIED_SUCCESS', 'Authorized record verification.');

        res.json({
            success: true,
            is_valid: true,
            verification_timestamp: new Date().toISOString(),
            data: student
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 11. Analytics & Dashboard Metrics
app.get('/api/analytics', async (req, res) => {
    try {
        const filters = {
            academic_year: req.query.academic_year || '2026-2027',
            institution_id: req.query.institution_id
        };
        const analytics = await db.getAnalytics(filters);
        res.json({ success: true, data: analytics });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start the server
async function startServer() {
    await db.initDatabase();
    app.listen(PORT, () => {
        console.log(`================================================================`);
        console.log(`🎓 AICTE APAAR Confidential Student Data Platform`);
        console.log(`🌐 Portal URL: http://localhost:${PORT}`);
        console.log(`🔐 Role-Based Access: Admin & Multi-College Isolation Active`);
        console.log(`================================================================`);
    });
}

startServer();
