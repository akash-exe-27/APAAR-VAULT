-- ==============================================================================
-- APAAR ID-Based Student Data Management and Verification Platform for AICTE
-- Database: apaar_aicte_db
-- Seed Data: Multiple Departments, Established Operational Years, Hashed APAARs
-- ==============================================================================

USE apaar_aicte_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE audit_logs;
TRUNCATE TABLE validation_anomalies;
TRUNCATE TABLE students;
TRUNCATE TABLE programs_intake;
TRUNCATE TABLE institutions;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Institutions with Different Operational Lifespans & Established Years
INSERT INTO institutions (id, aicte_permanent_id, institution_name, institution_type, state, city, contact_email, accreditation_status, established_year, total_operational_years, api_access_key) VALUES
(1, 'AICTE-MH-0102', 'COEP Technological University', 'Autonomous College', 'Maharashtra', 'Pune', 'principal@coep.ac.in', 'NBA Tier-1 Accredited', 1854, 172, 'KEY_COEP_9921_SECURE'),
(2, 'AICTE-DL-0304', 'Delhi Technological University (DTU)', 'University', 'Delhi', 'New Delhi', 'dean.academic@dtu.ac.in', 'NAAC A++ Accredited', 1941, 85, 'KEY_DTU_8812_SECURE'),
(3, 'AICTE-KA-0506', 'National Institute of Engineering (NIE)', 'Affiliated College', 'Karnataka', 'Mysuru', 'registrar@nie.ac.in', 'NBA Accredited', 1946, 80, 'KEY_NIE_7734_SECURE'),
(4, 'AICTE-KA-0708', 'Xavier Institute of Management (PGDM)', 'PGDM Institute', 'Karnataka', 'Bengaluru', 'admissions@xime.org', 'AICTE & ACBSP Accredited', 1991, 35, 'KEY_XIME_6645_SECURE'),
(5, 'AICTE-TN-0910', 'PSG College of Technology', 'Autonomous College', 'Tamil Nadu', 'Coimbatore', 'principal@psgtech.edu', 'NAAC A+ & NBA Accredited', 1951, 75, 'KEY_PSG_5521_SECURE');

-- 2. Insert Multiple Diverse Academic Departments & Intakes
INSERT INTO programs_intake (id, institution_id, program_name, degree_level, duration_years, academic_year, approved_intake, supernumerary_quota, nri_quota, oci_quota, fn_quota, actual_enrolment) VALUES
-- COEP Pune Departments (2026-2027)
(1, 1, 'B.Tech Computer Science & Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 59),
(2, 1, 'B.Tech Artificial Intelligence & Data Science', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 52),
(3, 1, 'B.Tech Electronics & Telecommunication', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 50),
(4, 1, 'B.Tech Mechanical Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 45),
(5, 1, 'B.Tech Robotics & Automation', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 40),

-- DTU Delhi Departments (2026-2027)
(6, 2, 'B.Tech Information Technology', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 60), -- FULL (at capacity)
(7, 2, 'B.Tech Software Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 54),
(8, 2, 'B.Tech Electrical & Electronics Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 48),
(9, 2, 'M.Tech Cyber Security', 'Postgraduate', 2, '2026-2027', 30, 3, 2, 1, 1, 22),

-- NIE Mysuru Departments (2026-2027)
(10, 3, 'B.Tech Artificial Intelligence & Machine Learning', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 58),
(11, 3, 'B.Tech Civil Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 42),

-- XIME Bangalore (2026-2027)
(12, 4, 'Post Graduate Diploma in Management (PGDM)', 'PGDM', 2, '2026-2027', 120, 12, 10, 5, 5, 118),
(13, 4, 'PGDM in Business Analytics', 'PGDM', 2, '2026-2027', 60, 6, 5, 2, 2, 55),

-- PSG Tech Coimbatore (2026-2027)
(14, 5, 'B.Tech Computer Science & Business Systems', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 57),
(15, 5, 'B.Tech Biomedical Engineering', 'Undergraduate', 4, '2026-2027', 60, 6, 3, 2, 2, 44),

-- Historical Academic Years (2025-2026)
(16, 1, 'B.Tech Computer Science & Engineering', 'Undergraduate', 4, '2025-2026', 60, 6, 3, 2, 2, 60),
(17, 2, 'B.Tech Information Technology', 'Undergraduate', 4, '2025-2026', 60, 6, 3, 2, 2, 59),
(18, 4, 'Post Graduate Diploma in Management (PGDM)', 'PGDM', 2, '2025-2026', 120, 12, 10, 5, 5, 115);

-- 3. Insert Test Students with Hashed & Masked APAAR IDs
INSERT INTO students (id, apaar_id, apaar_hash, masked_apaar, roll_number, first_name, last_name, gender, dob, email, phone, institution_id, program_id, academic_year, quota_category, is_nri, is_oci, is_foreign_national, verification_status, abc_account_id, digital_signature_hash, admission_date) VALUES
(1, '904128475102', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '•••• •••• 5102', '2026-COEP-CS-01', 'Aarav', 'Sharma', 'Male', '2005-04-12', 'aarav.sharma@coep.ac.in', '9876543210', 1, 1, '2026-2027', 'Regular', 0, 0, 0, 'VERIFIED', 'ABC-IN-90412847', 'SHA256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '2026-08-01'),
(2, '904128475103', 'b4c5d6e7f8a91011121314151617181920212223242526272829303132333435', '•••• •••• 5103', '2026-COEP-CS-02', 'Ananya', 'Deshmukh', 'Female', '2005-09-24', 'ananya.d@coep.ac.in', '9823456781', 1, 1, '2026-2027', 'Supernumerary-TFW', 0, 0, 0, 'VERIFIED', 'ABC-IN-90412848', 'SHA256_b4c5d6e7f8a91011121314151617181920212223242526272829303132333435', '2026-08-01'),
(3, '904128475104', 'c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', '•••• •••• 5104', '2026-COEP-CS-03', 'Rohan', 'Patel', 'Male', '2005-11-15', 'rohan.p@coep.ac.in', '9765432109', 1, 1, '2026-2027', 'NRI', 1, 0, 0, 'VERIFIED', 'ABC-IN-90412849', 'SHA256_c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8', '2026-08-02'),
(4, '904128475105', 'd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2', '•••• •••• 5105', '2026-COEP-AI-01', 'Fatima', 'Zehra', 'Female', '2004-03-18', 'fatima.z@coep.ac.in', '9654321098', 1, 2, '2026-2027', 'OCI', 0, 1, 0, 'VERIFIED', 'ABC-IN-90412850', 'SHA256_d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2', '2026-08-02'),
(5, '781923450912', 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678', '•••• •••• 0912', '2026-DTU-IT-101', 'Kavya', 'Iyer', 'Female', '2005-02-14', 'kavya.iyer@dtu.ac.in', '9811223344', 2, 6, '2026-2027', 'Regular', 0, 0, 0, 'VERIFIED', 'ABC-IN-78192345', 'SHA256_a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678', '2026-08-05'),
(6, '781923450913', 'f6e5d4c3b2a10987fedcba0987654321fedcba0987654321fedcba09876543', '•••• •••• 0913', '2026-DTU-IT-102', 'Harsh', 'Vardhan', 'Male', '2005-06-30', 'harsh.v@dtu.ac.in', '9877665544', 2, 6, '2026-2027', 'Regular', 0, 0, 0, 'EXCESS_INTAKE_HOLD', 'ABC-IN-78192346', 'SHA256_f6e5d4c3b2a10987fedcba0987654321fedcba0987654321fedcba09876543', '2026-08-05'),
(7, '882190341255', '998877665544332211aabbccddeeff00998877665544332211aabbccddeeff00', '•••• •••• 1255', '2026-COEP-MECH-44', 'Vikram', 'Aditya', 'Male', '2005-05-10', 'vikram.a@coep.ac.in', '9123456780', 1, 4, '2026-2027', 'Regular', 0, 0, 0, 'FLAGGED_DUPLICATE', 'ABC-IN-88219034', 'SHA256_998877665544332211aabbccddeeff00998877665544332211aabbccddeeff00', '2026-08-04'),
(8, '662019483721', '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff', '•••• •••• 3721', '2026-XIME-PG-01', 'Pooja', 'Nair', 'Female', '2002-12-05', 'pooja.nair@xime.org', '9443322110', 4, 12, '2026-2027', 'Regular', 0, 0, 0, 'VERIFIED', 'ABC-IN-66201948', 'SHA256_11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff', '2026-07-28'),
(9, '551092837461', 'aa551092837461aa551092837461aa551092837461aa551092837461aa5510', '•••• •••• 7461', '2025-COEP-CS-11', 'Priya', 'Rao', 'Female', '2004-02-11', 'priya.rao@coep.ac.in', '9871122334', 1, 16, '2025-2026', 'Regular', 0, 0, 0, 'VERIFIED', 'ABC-IN-55109283', 'SHA256_2025_hash_coep_priya_verified', '2025-08-10');

-- 4. Insert Test Anomalies with Explicit Plain-English Reasons
INSERT INTO validation_anomalies (id, apaar_id, institution_id, program_id, student_name, anomaly_type, severity, academic_year, details, status) VALUES
(1, '882190341255', 2, 6, 'Vikram Aditya', 'CROSS_INSTITUTION_DUPLICATE', 'CRITICAL', '2026-2027', 'DUPLICATE ENROLMENT DETECTED: Student with APAAR ID 882190341255 is already actively enrolled at COEP Technological University (ID: 1) in B.Tech Mechanical Engineering. Cannot be admitted to DTU simultaneously.', 'OPEN'),
(2, '781923450913', 2, 6, 'Harsh Vardhan', 'APPROVED_INTAKE_BREACH', 'WARNING', '2026-2027', 'SANCTIONED INTAKE LIMIT REACHED: Department B.Tech Information Technology at DTU has reached 100% capacity (60/60 seats filled). Admission placed on hold pending department reallocation or supernumerary quota approval.', 'OPEN'),
(3, '999900001111', 3, 10, 'Suresh K', 'INVALID_APAAR_FORMAT', 'CRITICAL', '2026-2027', 'INVALID APAAR FORMAT: The provided ID 999900001111 failed national Verhoeff/Luhn checksum algorithm check against UIDAI/ABC master format.', 'OPEN');

-- 5. Insert Test Audit Logs
INSERT INTO audit_logs (id, actor_type, institution_id, apaar_id, action_type, request_ip, status, notes) VALUES
(1, 'AICTE_ADMIN', NULL, NULL, 'PORTAL_INITIALIZATION', '10.0.0.1', 'SUCCESS', 'AICTE National APAAR Registry online with cryptographic hashing enabled.'),
(2, 'INSTITUTION_USER', 1, '904128475102', 'STUDENT_BATCH_UPLOAD', '192.168.1.50', 'SUCCESS', 'COEP uploaded student admissions. All APAAR hashes validated.');
