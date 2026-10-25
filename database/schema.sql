-- ==============================================================================
-- APAAR ID-Based Student Data Management and Verification Platform for AICTE
-- Database: apaar_aicte_db
-- Target: MySQL 8.0+
-- Description: AICTE Central Repository Schema with Enhanced Confidentiality,
--              APAAR Cryptographic Hashing, Program Durations, and Multi-Level Anomaly Desk.
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS apaar_aicte_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE apaar_aicte_db;

DROP TABLE IF EXISTS validation_anomalies;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS programs_intake;
DROP TABLE IF EXISTS institutions;

-- 1. Institutions Table (AICTE Approved Institutions)
CREATE TABLE institutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aicte_permanent_id VARCHAR(50) NOT NULL UNIQUE,
    institution_name VARCHAR(255) NOT NULL,
    institution_type ENUM('University', 'Autonomous College', 'Affiliated College', 'PGDM Institute', 'Deemed University') NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    accreditation_status VARCHAR(50) DEFAULT 'NBA/NAAC Accredited',
    established_year INT NOT NULL DEFAULT 1980,
    total_operational_years INT NOT NULL DEFAULT 40,
    api_access_key VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Programs & Approved Intake Table
CREATE TABLE programs_intake (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_id INT NOT NULL,
    program_name VARCHAR(150) NOT NULL, -- e.g., B.Tech Computer Science & Engineering
    degree_level ENUM('Diploma', 'Undergraduate', 'Postgraduate', 'PGDM', 'Doctoral') NOT NULL,
    duration_years INT NOT NULL DEFAULT 4, -- Program duration in years
    academic_year VARCHAR(20) NOT NULL, -- e.g., 2026-2027
    approved_intake INT NOT NULL DEFAULT 60, -- Sanctioned Regular Intake
    supernumerary_quota INT NOT NULL DEFAULT 10, -- TFW, EWS, J&K, PMSSS
    nri_quota INT NOT NULL DEFAULT 5, -- Non-Resident Indian quota
    oci_quota INT NOT NULL DEFAULT 3, -- Overseas Citizen of India quota
    fn_quota INT NOT NULL DEFAULT 3, -- Foreign National quota
    actual_enrolment INT NOT NULL DEFAULT 0, -- Counter of admitted students
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY uq_inst_program_year (institution_id, program_name, academic_year)
) ENGINE=InnoDB;

-- 3. Students Table (APAAR-Linked Student Repository with Cryptographic Hashing)
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apaar_id VARCHAR(12) NOT NULL, -- 12-digit Automated Permanent Academic Account Registry ID
    apaar_hash VARCHAR(64) NOT NULL, -- Cryptographic Salted SHA-256 Hash
    masked_apaar VARCHAR(14) NOT NULL, -- Masked display (•••• •••• 1255)
    roll_number VARCHAR(50) NOT NULL, -- Institutional student ID / Roll No
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(10) NOT NULL, -- Strictly 10 digits
    institution_id INT NOT NULL,
    program_id INT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    quota_category ENUM('Regular', 'Supernumerary-TFW', 'Supernumerary-EWS', 'Supernumerary-PMSSS', 'NRI', 'OCI', 'Foreign National') NOT NULL DEFAULT 'Regular',
    is_nri BOOLEAN DEFAULT FALSE,
    is_oci BOOLEAN DEFAULT FALSE,
    is_foreign_national BOOLEAN DEFAULT FALSE,
    verification_status ENUM('VERIFIED', 'PENDING', 'FLAGGED_DUPLICATE', 'EXCESS_INTAKE_HOLD', 'REJECTED_DUPLICATE') DEFAULT 'VERIFIED',
    abc_account_id VARCHAR(50) NULL,
    digital_signature_hash VARCHAR(128) NOT NULL,
    admission_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE RESTRICT,
    FOREIGN KEY (program_id) REFERENCES programs_intake(id) ON DELETE RESTRICT,
    INDEX idx_apaar (apaar_id),
    INDEX idx_apaar_hash (apaar_hash),
    INDEX idx_quota (quota_category),
    INDEX idx_verification (verification_status)
) ENGINE=InnoDB;

-- 4. Validation & Anomaly Detection Log
CREATE TABLE validation_anomalies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apaar_id VARCHAR(12) NOT NULL,
    institution_id INT NOT NULL,
    program_id INT NULL,
    student_name VARCHAR(150) NOT NULL,
    anomaly_type ENUM(
        'DUPLICATE_APAAR_SAME_COLLEGE',
        'CROSS_INSTITUTION_DUPLICATE',
        'APPROVED_INTAKE_BREACH',
        'QUOTA_LIMIT_EXCEEDED',
        'INVALID_APAAR_FORMAT'
    ) NOT NULL,
    severity ENUM('CRITICAL', 'WARNING', 'RESOLVED') DEFAULT 'CRITICAL',
    academic_year VARCHAR(20) NOT NULL DEFAULT '2026-2027',
    details TEXT NOT NULL,
    resolution_notes TEXT NULL,
    status ENUM('OPEN', 'UNDER_REVIEW', 'ACTION_TAKEN', 'RESOLVED', 'DISMISSED') DEFAULT 'OPEN',
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Audit Trail & Verification Log
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor_type ENUM('AICTE_ADMIN', 'INSTITUTION_USER', 'AUTHORIZED_VERIFIER', 'SYSTEM_VALIDATOR') NOT NULL,
    institution_id INT NULL,
    apaar_id VARCHAR(12) NULL,
    action_type VARCHAR(100) NOT NULL,
    request_ip VARCHAR(50) DEFAULT '127.0.0.1',
    status VARCHAR(30) DEFAULT 'SUCCESS',
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
