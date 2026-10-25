# 🎓 AICTE APAAR National Student Data Management & Verification Platform
### Smart India Hackathon (SIH) Prototype & Solution Documentation

---

## 📌 1. Simple Explanation of the Problem Statement

### 🔍 Current Reality & The AICTE Challenge
Today, thousands of technical institutions across India are approved by AICTE. However, student data submission is fractured:
1. **PGDM Institutions**: Submit detailed annual student records.
2. **Other AICTE Institutions (Engineering, Pharmacy, Architecture, MCA, Polytechnic)**: Mostly submit only aggregate/statistical numbers (e.g., *"We enrolled 1,200 students this year"*), without individual student-level identities.

### ⚠️ Real-World Loopholes & Risks
- **Duplicate Enrolment / Seat Blocking**: A student can register in College A (e.g., in Maharashtra) and simultaneously take admission in College B (e.g., in Delhi) for scholarship claims or seat hoarding. AICTE had no real-time cross-institutional check.
- **Excess Admissions Beyond Sanctioned Intake**: Institutions admitting students beyond approved intake quotas without regulatory oversight.
- **Misuse of Special Quotas**: Difficulty verifying Supernumerary seats (Tuition Fee Waiver - TFW, EWS, PMSSS for J&K), NRI quota, OCI status, and Foreign National (FN) seats.
- **Credential Fraud**: Employers and degree-awarding bodies lack an authentic, single-click government gateway to verify genuine student enrollment.

---

## 💡 2. The Solution: APAAR ID as the Anchor

### What is APAAR ID?
**APAAR (Automated Permanent Academic Account Registry)** is India's **"One Nation, One Student ID"** under NEP 2020. It is a 12-digit lifelong unique identifier linked with the Academic Bank of Credits (ABC) and DigiLocker.

### 🔄 The End-to-End Workflow
```
[AICTE Approved Institution]
          │
          ▼
[Student Data Upload Portal] (Single Entry Form OR Bulk CSV Ingestion)
          │
          ▼
[Automated 5-Stage Validation Engine]
   ├─ 1. 12-Digit Format & Checksum Verification
   ├─ 2. Cross-Institutional Duplicate Enrolment Check (Across all Indian Colleges)
   ├─ 3. Approved Intake Capacity Monitor (Sanctioned vs Actual)
   ├─ 4. Quota Validation (TFW, EWS, NRI, OCI, FN quotas)
   └─ 5. Tamper-Proof Cryptographic Hash Generation (SHA-256)
          │
          ▼
[AICTE Central Repository (MySQL Database)]
          │
    ┌─────┴─────────────────────────────────────────────┐
    ▼                                                   ▼
[AICTE Real-Time Anomaly & Monitoring Dashboard]   [Public & Employer Instant Verification Portal]
- Live Intake Utilization & Charts                 - Instant QR Code / APAAR Lookup
- Active Fraud / Duplicate Flags                   - Verified Academic ID & Degree Certificate
```

---

## 🛠️ 3. Beginner-Friendly Tech Stack (Strictly No Complex Tech)

| Layer | Technology | Why Chosen for SIH |
| :--- | :--- | :--- |
| **Backend** | **Node.js + Express** | Clean, readable JavaScript code, standard REST endpoints, zero complex build configs. |
| **Database** | **MySQL 8.0+** | Industry standard relational database with foreign keys, indexes, and full SQL seed scripts (`schema.sql`, `seeds.sql`). Includes zero-config in-memory fallback for offline presentation! |
| **Frontend** | **Vanilla HTML5, CSS3 & JavaScript** | No heavy React/Angular/Redux boilerplate. Instant browser loading, high performance. |
| **Visual Analytics** | **Chart.js** (via CDN) | Beautiful live bar & doughnut charts for intake vs enrolled and quota distribution. |
| **Verification & QR**| **QRCode.js** (via CDN) | Generates dynamic scannable QR codes for student credentials and printable degree certificates. |
| **Security & Protocol**| **HTTPS / TLS 1.3** | High-visibility top security ribbon and secure API routes. |

---

## 🚀 4. How to Run the Prototype in 60 Seconds

### Step 1: Open the Project Directory
```powershell
cd c:\Users\keert\Downloads\apaar-aicte-portal
```

### Step 2: Start the Portal
```powershell
npm start
```
*(Dependencies `express`, `cors`, and `mysql2` are already installed).*

### Step 3: Open in Browser
Open: **`http://localhost:3000`**

> **💡 Zero-Friction Demo Mode**: The application automatically checks if local MySQL is running on port 3306. If MySQL is active, it runs pure MySQL queries. If your MySQL server is offline or requires a custom password, it automatically uses the included in-memory SQL-compliant store populated with the exact test dataset, so your demo **never fails in front of judges!**

---

## 🗄️ 5. Using with MySQL / MySQL Workbench

To import the database directly into your local MySQL server:
1. Open **MySQL Workbench** or run MySQL Command Line:
   ```powershell
   mysql -u root -p
   ```
2. Import the schema and seed files:
   ```sql
   SOURCE c:/Users/keert/Downloads/apaar-aicte-portal/database/schema.sql;
   SOURCE c:/Users/keert/Downloads/apaar-aicte-portal/database/seeds.sql;
   ```
3. Set your MySQL root password in `db.js` (line 12) if configured.

---

## 🧭 6. The 7 Top Tools on the 1st Page

The application places all key tools at the **very top ribbon** under the **HTTPS Secured Protocol Banner**:

1. 📊 **1. Analytics Dashboard**: Real-time KPI counters (Approved Institutions, Verified Enrolments, Total Intake, Detected Anomalies), interactive Intake vs Admitted charts, and quota category breakdown.
2. 📤 **2. Institution Upload**:
   - **Single Student Form**: Enter student admission details with instant real-time validation.
   - **Bulk CSV Upload**: Upload batch CSV records with a 1-click **"Load Pre-Built SIH Test CSV"** button.
3. 🚨 **3. AICTE Anomaly Center**: Real-time monitoring of flagged duplicate admissions, cross-college double registrations, and intake breaches.
4. 🔍 **4. Instant Student Verify**: Enter any 12-digit APAAR ID (with quick-test chips) to view verified academic credentials, institution details, and digital seal.
5. 🎓 **5. Academic ID & Certificate**: Generates official AICTE verifiable identity card with scannable QR code and Degree Awarding Body certificate with SHA-256 digital signature.
6. 🗄️ **6. MySQL Explorer**: Live data table inspector for `students`, `institutions`, `programs_intake`, and `validation_anomalies`.
7. ⚡ **7. API & Integration Hub**: Interactive RESTful API documentation for ERP systems (POST upload, GET verify, GET anomalies).

---

## 🎯 7. Live Demo Scenarios for SIH Judges

| Test Case | Action in Prototype | Expected Outcome |
| :--- | :--- | :--- |
| **1. Legitimate Admission** | Fill Single Form with APAAR `904128475999` and submit | ✅ **Passed**: Record validated, SHA-256 signature generated, admitted count updated. |
| **2. Cross-Institution Double Admission** | In Single Form, enter APAAR `882190341255` (already enrolled at COEP) and choose DTU | 🚨 **Rejected & Flagged**: System blocks admission and logs `CROSS_INSTITUTION_DUPLICATE` in AICTE Anomaly Center. |
| **3. Invalid APAAR Format** | Enter APAAR `111111111111` or fewer than 12 digits | 🚨 **Rejected**: System rejects format compliance breach. |
| **4. Bulk CSV Ingestion with Errors** | Go to Tool #2 ➔ Bulk Tab ➔ Click *"Load Pre-Built SIH Test CSV"* ➔ Click *"Run Automated Validation"* | 📊 **Pass/Fail Breakdown**: Ingests valid students, rejects duplicate & invalid records, and generates an audit log. |
| **5. Employer Verification & Certificate** | Go to Tool #4 ➔ Click quick-test APAAR `904128475102` | 🔍 **Instant Verification**: Shows verified candidate Aarav Sharma, COEP Pune, and tamper-proof hash. |

---

## 🏆 8. Answers to Common Judge Questions in SIH

**Q: How does this prevent fake student admissions?**  
> *"Every student must have an APAAR ID linked with their Aadhaar / ABC DigiLocker account. Our platform validates the 12-digit format and performs a cross-institutional uniqueness check across the entire national repository. No student can be registered in two colleges at once."*

**Q: How do colleges integrate their existing ERPs (like ERPNext, TCS iON, SAP)?**  
> *"We provide standard RESTful HTTPS APIs with institutional API keys. Colleges do not need to replace their ERP; their system simply calls `/api/students/upload` upon completing admissions."*

**Q: How does the system handle supernumerary and NRI/OCI/FN seats?**  
> *"Under AICTE rules, supernumerary (TFW, EWS, PMSSS) and foreign/NRI seats are over and above the sanctioned intake. Our database schema tracks these quotas independently, preventing colleges from exceeding their authorized sub-allocations."*
# APAAR-VAULT
A web-based APAAR ID management and verification platform for AICTE-approved institutions, designed to streamline student data management, detect duplicate records, validate student information, and monitor enrolment against approved intake using a centralized dashboard.
