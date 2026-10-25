// ==============================================================================
// AICTE APAAR Platform - Application Logic (Confidential, Handcrafted & Accessible)
// ==============================================================================

// Multi-Language Dictionary
const translations = {
    en: {
        portalTitle: "AICTE - APAAR PORTAL",
        portalSub: "One Nation, One Student ID | National Academic Data Management Platform",
        loginTitle: "AICTE - APAAR Platform",
        loginSub: "Confidential Academic Repository & Verification Portal",
        roleAdmin: "AICTE Administrator",
        roleAdminDesc: "National intake oversight, add colleges & resolve anomalies",
        roleInst: "Approved Institution",
        roleInstDesc: "Upload student admissions & manage college anomaly desk",
        chooseInst: "Select Your Institution:",
        btnEnter: "Enter Portal",
        btnSwitch: "Switch Account",
        dashTitle: "Academic Enrolment Dashboard",
        btnRefresh: "Refresh Data",
        kpiInst: "Approved Institutions",
        kpiEnrolled: "APAAR Enrolments",
        kpiIntake: "Approved Intake",
        kpiAnomalies: "Active Anomalies",
        chartIntake: "Sanctioned Intake vs Actual Enrolment",
        chartQuota: "Seat Quota & Category Breakdown",
        instTableTitle: "Participating AICTE Approved Institutions",
        uploadTitle: "Student Admission Submission",
        modeSingle: "Single Student Admission",
        modeBulk: "Bulk CSV Ingestion",
        anomCenterTitle: "AICTE Anomaly & Compliance Center",
        verifyTitle: "Authorized Student Verification",
        certTitle: "Verifiable Academic Identity & Degree Credential",
        myStudentsTitle: "My Admitted Students Registry"
    },
    hi: {
        portalTitle: "एआईसीटीई - अपार पोर्टल",
        portalSub: "एक राष्ट्र, एक छात्र पहचान | राष्ट्रीय शैक्षणिक डेटा प्रबंधन मंच",
        loginTitle: "एआईसीटीई - अपार प्लेटफॉर्म",
        loginSub: "गोपनीय शैक्षणिक रिपोजिटरी एवं सत्यापन पोर्टल",
        roleAdmin: "एआईसीटीई प्रशासक",
        roleAdminDesc: "राष्ट्रीय स्तर पर निगरानी, कॉलेज जोड़ना और विसंगति समाधान",
        roleInst: "अनुमोदित संस्थान",
        roleInstDesc: "छात्र प्रवेश अपलोड करें और कॉलेज डेस्क प्रबंधित करें",
        chooseInst: "अपना संस्थान चुनें:",
        btnEnter: "पोर्टल में प्रवेश करें",
        btnSwitch: "खाता बदलें",
        dashTitle: "शैक्षणिक नामांकन डैशबोर्ड",
        btnRefresh: "डेटा रीफ्रेश करें",
        kpiInst: "अनुमोदित संस्थान",
        kpiEnrolled: "अपार नामांकन",
        kpiIntake: "मंजूर क्षमता",
        kpiAnomalies: "सक्रिय विसंगतियां",
        chartIntake: "मंजूर क्षमता बनाम वास्तविक नामांकन",
        chartQuota: "सीट कोटा और श्रेणी वितरण",
        instTableTitle: "भाग लेने वाले एआईसीटीई संस्थान",
        uploadTitle: "छात्र प्रवेश डेटा अपलोड",
        modeSingle: "एकल छात्र प्रवेश",
        modeBulk: "थोक सीएसवी अपलोड",
        anomCenterTitle: "एआईसीटीई विसंगति एवं अनुपालन केंद्र",
        verifyTitle: "अधिकृत छात्र सत्यापन",
        certTitle: "सत्यापनीय शैक्षणिक पहचान और डिग्री प्रमाणपत्र",
        myStudentsTitle: "मेरे नामांकित छात्रों का रजिस्टर"
    },
    ta: {
        portalTitle: "ஏஐசிடிஇ - அபார் போர்டல்",
        portalSub: "ஒரே நாடு, ஒரே மாணவர் ஐடி | தேசிய கல்வி தரவு மேலாண்மை",
        loginTitle: "ஏஐசிடிஇ - அபார் தளம்",
        loginSub: "ரகசிய கல்வி தரவு மற்றும் சரிபார்ப்பு தளம்",
        roleAdmin: "ஏஐசிடிஇ நிர்வாகி",
        roleAdminDesc: "தேசிய அளவிலான கண்காணிப்பு மற்றும் கல்லூரிகள் சரிபார்ப்பு",
        roleInst: "அங்கீகரிக்கப்பட்ட நிறுவனம்",
        roleInstDesc: "உங்கள் கல்லூரிக்கு மட்டுமே தரவேற்றம் செய்யவும்",
        chooseInst: "உங்கள் நிறுவனத்தைத் தேர்ந்தெடுக்கவும்:",
        btnEnter: "போர்ட்டலில் நுழையவும்",
        btnSwitch: "கணக்கை மாற்றவும்",
        dashTitle: "கல்வி சேர்க்கை டாஷ்போர்டு",
        btnRefresh: "புதுப்பிக்கவும்",
        kpiInst: "அங்கீகரிக்கப்பட்ட நிறுவனங்கள்",
        kpiEnrolled: "அபார் சேர்க்கைகள்",
        kpiIntake: "அனுமதிக்கப்பட்ட இடங்கள்",
        kpiAnomalies: "செயலில் உள்ள முரண்பாடுகள்",
        chartIntake: "அனுமதி vs உண்மையான சேர்க்கை",
        chartQuota: "இட ஒதுக்கீடு விவரம்",
        instTableTitle: "ஏஐசிடிஇ நிறுவனங்கள்",
        uploadTitle: "மாணவர் சேர்க்கை பதிவேற்றம்",
        modeSingle: "ஒற்றை மாணவர் சேர்க்கை",
        modeBulk: "மொத்த CSV பதிவேற்றம்",
        anomCenterTitle: "முரண்பாடுகள் தீர்வு மையம்",
        verifyTitle: "மாணவர் சரிபார்ப்பு",
        certTitle: "சரிபார்க்கக்கூடிய பட்டச் சான்றிதழ்",
        myStudentsTitle: "என் சேர்க்கப்பட்ட மாணவர்கள் பட்டியல்"
    },
    te: {
        portalTitle: "AICTE - అపార్ పోర్టల్",
        portalSub: "ఒకే దేశం, ఒకే విద్యార్థి ఐడీ | జాతీయ విద్యా డేటా నిర్వహణ",
        loginTitle: "AICTE - అపార్ ప్లాట్‌ఫామ్",
        loginSub: "గోప్యమైన విద్యా రిపోజిటరీ & ధృవీకరణ పోర్టల్",
        roleAdmin: "AICTE అడ్మినిస్ట్రేటర్",
        roleAdminDesc: "జాతీయ పర్యవేక్షణ మరియు ధృవీకరణ",
        roleInst: "ఆమోదిత సంస్థ",
        roleInstDesc: "మీ కళాశాల కోసం మాత్రమే డేటాను అప్‌లోడ్ చేయండి",
        chooseInst: "మీ సంస్థను ఎంచుకోండి:",
        btnEnter: "పోర్టల్‌లోకి ప్రవేశించండి",
        btnSwitch: "ఖాతాను మార్చండి",
        dashTitle: "విద్యా ప్రవేశాల డాష్‌బోర్డ్",
        btnRefresh: "రిఫ్రెష్ చేయండి",
        kpiInst: "ఆమోదిత కళాశాలలు",
        kpiEnrolled: "అపార్ ప్రవేశాలు",
        kpiIntake: "మంజూరు చేసిన సీట్లు",
        kpiAnomalies: "చురుకైన సమస్యలు",
        chartIntake: "మంజూరైన సీట్లు vs చేరిన విద్యార్థులు",
        chartQuota: "కోటా వివరాలు",
        instTableTitle: "AICTE సంస్థలు",
        uploadTitle: "విద్యార్థి ప్రవేశ డేటా సమర్పణ",
        modeSingle: "సింగిల్ స్టూడెంట్ అడ్మిషన్",
        modeBulk: "బల్క్ CSV అప్‌లోడ్",
        anomCenterTitle: "సమస్యల పరిష్కార కేంద్రం",
        verifyTitle: "విద్యార్థి ధృవీకరణ",
        certTitle: "సర్టిఫికేట్ ప్రివ్యూ",
        myStudentsTitle: "చేరిన విద్యార్థుల రిజిస్టర్"
    },
    mr: {
        portalTitle: "एआयसीटीई - अपार पोर्टल",
        portalSub: "एक राष्ट्र, एक विद्यार्थी आयडी | राष्ट्रीय शैक्षणिक डेटा व्यवस्थापन",
        loginTitle: "एआयसीटीई - अपार प्लॅटफॉर्म",
        loginSub: "गोपनीय शैक्षणिक नोंदणी आणि पडताळणी पोर्टल",
        roleAdmin: "एआयसीटीई प्रशासक",
        roleAdminDesc: "राष्ट्रीय स्तरावरील देखरेख आणि कॉलेज पडताळणी",
        roleInst: "मान्यताप्राप्त संस्था",
        roleInstDesc: "फक्त आपल्या संस्थेचा डेटा अपलोड आणि व्यवस्थापित करा",
        chooseInst: "आपली संस्था निवडा:",
        btnEnter: "पोर्टलमध्ये प्रवेश करा",
        btnSwitch: "खाते बदला",
        dashTitle: "शैक्षणिक प्रवेश डॅशबोर्ड",
        btnRefresh: "रिफ्रेश करा",
        kpiInst: "मान्यताप्राप्त संस्था",
        kpiEnrolled: "अपार नोंदणी",
        kpiIntake: "मंजूर जागा",
        kpiAnomalies: "सक्रिय त्रुटी",
        chartIntake: "मंजूर जागा विरूद्ध प्रत्यक्ष प्रवेश",
        chartQuota: "जागांचे वर्गीकरण",
        instTableTitle: "सहभागी एआयसीटीई संस्था",
        uploadTitle: "विद्यार्थी प्रवेश नोंदणी",
        modeSingle: "एकल विद्यार्थी प्रवेश",
        modeBulk: "एकत्रित CSV अपलोड",
        anomCenterTitle: "एआयसीटीई त्रुटी निवारण केंद्र",
        verifyTitle: "विद्यार्थी पडताळणी",
        certTitle: "शैक्षणिक प्रमाणपत्र व पदवी",
        myStudentsTitle: "माझ्या प्रवेशित विद्यार्थ्यांची यादी"
    },
    kn: {
        portalTitle: "ಎಐಸಿಟಿಇ - ಅಪಾರ್ ಪೋರ್ಟಲ್",
        portalSub: "ಒಂದು ರಾಷ್ಟ್ರ, ಒಂದು ವಿದ್ಯಾರ್ಥಿ ಐಡಿ | ರಾಷ್ಟ್ರೀಯ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ ವೇದಿಕೆ",
        loginTitle: "ಎಐಸಿಟಿಇ - ಅಪಾರ್ ವೇದಿಕೆ",
        loginSub: "ಗೌಪ್ಯ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ ಮತ್ತು ಪರಿಶೀಲನೆ ಪೋರ್ಟಲ್",
        roleAdmin: "ಎಐಸಿಟಿಇ ನಿರ್ವಾಹಕರು",
        roleAdminDesc: "ರಾಷ್ಟ್ರೀಯ ಮಟ್ಟದ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಪರಿಶೀಲನೆ",
        roleInst: "ಅನುಮೋದಿತ ಸಂಸ್ಥೆ",
        roleInstDesc: "ನಿಮ್ಮ ಕಾಲೇಜಿನ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        chooseInst: "ನಿಮ್ಮ ಸಂಸ್ಥೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        btnEnter: "ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ",
        btnSwitch: "ಖಾತೆ ಬದಲಾಯಿಸಿ",
        dashTitle: "ಪ್ರವೇಶ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        btnRefresh: "ನವೀಕರಿಸಿ",
        kpiInst: "ಅನುಮೋದಿತ ಸಂಸ್ಥೆಗಳು",
        kpiEnrolled: "ಅಪಾರ್ ಪ್ರವೇಶಗಳು",
        kpiIntake: "ಮಂಜೂರಾದ ಸೀಟುಗಳು",
        kpiAnomalies: "ಸಕ್ರಿಯ ಸಮಸ್ಯೆಗಳು",
        chartIntake: "ಮಂಜೂರಾದ ಸೀಟುಗಳು vs ನಿಜವಾದ ಪ್ರವೇಶ",
        chartQuota: "ಕೋಟಾ ಹಂಚಿಕೆ",
        instTableTitle: "ಎಐಸಿಟಿಇ ಸಂಸ್ಥೆಗಳು",
        uploadTitle: "ವಿದ್ಯಾರ್ಥಿ ಪ್ರವೇಶ ವಿವರ",
        modeSingle: "ಏಕ ವಿದ್ಯಾರ್ಥಿ ಪ್ರವೇಶ",
        modeBulk: "ಬಲ್ಕ್ CSV ಅಪ್‌ಲೋಡ್",
        anomCenterTitle: "ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ ಕೇಂದ್ರ",
        verifyTitle: "ವಿದ್ಯಾರ್ಥಿ ಪರಿಶೀಲನೆ",
        certTitle: "ಶೈಕ್ಷಣಿಕ ಪ್ರಮಾಣಪತ್ರ",
        myStudentsTitle: "ದಾಖಲಾದ ವಿದ್ಯಾರ್ಥಿಗಳ ಪಟ್ಟಿ"
    },
    bn: {
        portalTitle: "এআইসিটিই - অপার পোর্টাল",
        portalSub: "এক দেশ, এক ছাত্র পরিচয়পত্র | জাতীয় শিক্ষাগত ডেটা প্ল্যাটফর্ম",
        loginTitle: "এআইসিটিই - অপার প্ল্যাটফর্ম",
        loginSub: "গোপনীয় শিক্ষাগত ভান্ডার ও যাচাইকরণ পোর্টাল",
        roleAdmin: "এআইসিটিই প্রশাসক",
        roleAdminDesc: "জাতীয় পর্যবেক্ষণ এবং কলেজ যাচাইকরণ",
        roleInst: "অনুমোদিত প্রতিষ্ঠান",
        roleInstDesc: "শুধুমাত্র আপনার কলেজের তথ্য আপলোড ও পরিচালনা করুন",
        chooseInst: "আপনার প্রতিষ্ঠান নির্বাচন করুন:",
        btnEnter: "পোর্টাল প্রবেশ করুন",
        btnSwitch: "অ্যাকাউন্ট পরিবর্তন করুন",
        dashTitle: "শিক্ষাগত ভর্তি ড্যাশবোর্ড",
        btnRefresh: "রিফ্রেশ করুন",
        kpiInst: "অনুমোদিত প্রতিষ্ঠান",
        kpiEnrolled: "অপার ভর্তি",
        kpiIntake: "অনুমোদিত আসন",
        kpiAnomalies: "সক্রিয় অসঙ্গতি",
        chartIntake: "অনুমোদিত আসন বনাম ভর্তি",
        chartQuota: "আসন কোটা বিভাজন",
        instTableTitle: "অংশগ্রহণকারী এআইসিটিই প্রতিষ্ঠান",
        uploadTitle: "ছাত্র ভর্তি তথ্য জমা",
        modeSingle: "একক ছাত্র ভর্তি",
        modeBulk: "বাল্ক CSV আপলোড",
        anomCenterTitle: "অসঙ্গতি সমাধান কেন্দ্র",
        verifyTitle: "ছাত্র যাচাইকরণ",
        certTitle: "যাচাইযোগ্য ডিগ্রি প্রশংসাপত্র",
        myStudentsTitle: "আমার নথিভুক্ত ছাত্রদের তালিকা"
    }
};

// Application State
let appState = {
    role: 'admin', // 'admin' or 'institution'
    institutionId: null,
    institutionName: '',
    academicYear: '2026-2027',
    currentLanguage: 'en',
    activeTab: 'tab-dashboard'
};

let globalData = {
    institutions: [],
    programs: [],
    students: [],
    anomalies: [],
    analytics: {}
};

let intakeChartInstance = null;
let quotaChartInstance = null;
let selectedAnomalyForResolution = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
    // Clear search inputs and verification box on refresh as requested
    clearAllSearchInputs();

    await fetchInitialInstitutions();
    setupFormHandlers();
    setDefaultDates();

    const savedRole = sessionStorage.getItem('aicte_apaar_role');
    const savedInst = sessionStorage.getItem('aicte_apaar_inst');
    if (savedRole) {
        appState.role = savedRole;
        appState.institutionId = savedInst ? parseInt(savedInst, 10) : null;
        applyUserRoleSession();
        closeLoginModal();
        await loadAllData();
    } else {
        showLoginModal(false);
    }
});

// Clear all search input boxes on refresh / role change
function clearAllSearchInputs() {
    const vInput = document.getElementById('verifyApaarInput');
    if (vInput) vInput.value = '';
    const vResult = document.getElementById('verifyResultContainer');
    if (vResult) vResult.style.display = 'none';

    const sSearch = document.getElementById('txtSearchMyStudents');
    if (sSearch) sSearch.value = '';
}

// Fetch initial institution list for login dropdown
async function fetchInitialInstitutions() {
    try {
        const res = await fetch('/api/institutions').then(r => r.json());
        if (res.success) {
            globalData.institutions = res.data;
            const select = document.getElementById('loginInstitutionSelect');
            select.innerHTML = globalData.institutions.map(i => `
                <option value="${i.id}">${i.institution_name} (${i.total_operational_years || 40} Yrs Established - ${i.city})</option>
            `).join('');
        }
    } catch (e) {
        console.error('Failed to load institutions:', e);
    }
}

// ================= 1. LOGIN & ROLE SWITCH MODAL =================
function showLoginModal(canGoBack = false) {
    document.body.classList.add('modal-open');
    const overlay = document.getElementById('loginOverlay');
    overlay.classList.add('active');
    overlay.style.display = 'flex';

    const backBtn = document.getElementById('btnModalBack');
    if (backBtn) {
        backBtn.style.display = canGoBack ? 'inline-flex' : 'none';
    }
}

function closeLoginModal() {
    document.body.classList.remove('modal-open');
    const overlay = document.getElementById('loginOverlay');
    overlay.classList.remove('active');
    overlay.style.display = 'none';
}

function selectLoginRole(role) {
    const adminBox = document.getElementById('roleBoxAdmin');
    const instBox = document.getElementById('roleBoxInst');
    const instSelectWrap = document.getElementById('institutionSelectWrap');

    if (role === 'admin') {
        adminBox.classList.add('active');
        instBox.classList.remove('active');
        instSelectWrap.style.display = 'none';
    } else {
        adminBox.classList.remove('active');
        instBox.classList.add('active');
        instSelectWrap.style.display = 'block';
    }
}

function authenticateAndEnter() {
    clearAllSearchInputs();
    const isAdmin = document.getElementById('roleBoxAdmin').classList.contains('active');
    if (isAdmin) {
        appState.role = 'admin';
        appState.institutionId = null;
        appState.institutionName = '';
        sessionStorage.setItem('aicte_apaar_role', 'admin');
        sessionStorage.removeItem('aicte_apaar_inst');
    } else {
        const select = document.getElementById('loginInstitutionSelect');
        appState.role = 'institution';
        appState.institutionId = parseInt(select.value, 10);
        const inst = globalData.institutions.find(i => i.id === appState.institutionId);
        appState.institutionName = inst ? inst.institution_name : 'Institution';
        sessionStorage.setItem('aicte_apaar_role', 'institution');
        sessionStorage.setItem('aicte_apaar_inst', appState.institutionId.toString());
    }

    applyUserRoleSession();
    closeLoginModal();
    loadAllData();
}

function applyUserRoleSession() {
    const roleBadge = document.getElementById('currentRoleLabel');
    const footerRole = document.getElementById('footerRoleLabel');
    const adminInstCard = document.getElementById('adminInstitutionsCard');
    const navContainer = document.getElementById('navButtonsContainer');

    if (appState.role === 'admin') {
        roleBadge.textContent = 'AICTE Admin';
        footerRole.textContent = 'AICTE Administrator (National)';
        if (adminInstCard) adminInstCard.style.display = 'block';

        // Admin Navigation Tabs (Centered Icons & Tabs)
        navContainer.innerHTML = `
            <button class="nav-btn active" data-tab="tab-dashboard">
                <i class="fa-solid fa-chart-pie"></i> <span>Dashboard</span>
            </button>
            <button class="nav-btn" data-tab="tab-add-institution">
                <i class="fa-solid fa-building-circle-plus"></i> <span>Add Approved Institution</span>
            </button>
            <button class="nav-btn" data-tab="tab-anomalies">
                <i class="fa-solid fa-triangle-exclamation"></i> <span>AICTE Anomaly Center</span>
                <span class="badge-pill" id="navAnomCount">0</span>
            </button>
            <button class="nav-btn" data-tab="tab-verify">
                <i class="fa-solid fa-id-card-clip"></i> <span>Verify Student</span>
            </button>
            <button class="nav-btn" data-tab="tab-idcard">
                <i class="fa-solid fa-certificate"></i> <span>Degree & ID Card</span>
            </button>
        `;
    } else {
        const inst = globalData.institutions.find(i => i.id === appState.institutionId);
        const name = inst ? inst.institution_name.split(' (')[0] : 'Institution';
        roleBadge.textContent = name;
        footerRole.textContent = `${name} (Confidential)`;
        if (adminInstCard) adminInstCard.style.display = 'none';

        // Institution Navigation Tabs (Centered Icons & Tabs + College Anomaly Desk)
        navContainer.innerHTML = `
            <button class="nav-btn active" data-tab="tab-dashboard">
                <i class="fa-solid fa-chart-pie"></i> <span>College Dashboard</span>
            </button>
            <button class="nav-btn" data-tab="tab-upload">
                <i class="fa-solid fa-cloud-arrow-up"></i> <span>Admission Upload</span>
            </button>
            <button class="nav-btn" data-tab="tab-institution-students">
                <i class="fa-solid fa-users"></i> <span>My Students</span>
            </button>
            <button class="nav-btn" data-tab="tab-inst-anomalies">
                <i class="fa-solid fa-triangle-exclamation"></i> <span>My College Anomaly Desk</span>
                <span class="badge-pill" id="navInstAnomCount">0</span>
            </button>
            <button class="nav-btn" data-tab="tab-idcard">
                <i class="fa-solid fa-certificate"></i> <span>Issue Student ID</span>
            </button>
        `;
    }

    bindNavButtons();
    switchToTab('tab-dashboard');
}

// ================= 2. NAVIGATION =================
function bindNavButtons() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            switchToTab(target);
        });
    });
}

function switchToTab(targetTabId) {
    appState.activeTab = targetTabId;

    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const targetPane = document.getElementById(targetTabId);
    if (targetPane) targetPane.classList.add('active');

    const activeBtn = document.querySelector(`.nav-btn[data-tab="${targetTabId}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (targetTabId === 'tab-idcard') {
        populateIdCardDropdown();
    } else if (targetTabId === 'tab-institution-students') {
        renderInstitutionStudentsTable();
    } else if (targetTabId === 'tab-inst-anomalies') {
        renderCollegeAnomaliesTable();
    }
}

// ================= 3. MULTI-LANGUAGE & ACADEMIC YEAR =================
function changeLanguage(lang) {
    appState.currentLanguage = lang;
    const t = translations[lang] || translations.en;

    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el && val) el.textContent = val;
    };

    setTxt('t-portal-title', t.portalTitle);
    setTxt('t-portal-subtitle', t.portalSub);
    setTxt('t-login-title', t.loginTitle);
    setTxt('t-login-sub', t.loginSub);
    setTxt('t-role-admin', t.roleAdmin);
    setTxt('t-role-admin-desc', t.roleAdminDesc);
    setTxt('t-role-inst', t.roleInst);
    setTxt('t-role-inst-desc', t.roleInstDesc);
    setTxt('t-choose-inst', t.chooseInst);
    setTxt('t-btn-enter', t.btnEnter);
    setTxt('t-btn-switch', t.btnSwitch);
    setTxt('t-dash-title', t.dashTitle);
    setTxt('t-btn-refresh', t.btnRefresh);
    setTxt('t-kpi-inst', t.kpiInst);
    setTxt('t-kpi-enrolled', t.kpiEnrolled);
    setTxt('t-kpi-intake', t.kpiIntake);
    setTxt('t-kpi-anomalies', t.kpiAnomalies);
    setTxt('t-chart-intake', t.chartIntake);
    setTxt('t-chart-quota', t.chartQuota);
    setTxt('t-inst-table-title', t.instTableTitle);
    setTxt('t-upload-title', t.uploadTitle);
    setTxt('t-mode-single', t.modeSingle);
    setTxt('t-mode-bulk', t.modeBulk);
    setTxt('t-anom-center-title', t.anomCenterTitle);
    setTxt('t-verify-title', t.verifyTitle);
    setTxt('t-cert-title', t.certTitle);
    setTxt('t-my-students-title', t.myStudentsTitle);
}

function changeAcademicYear(year) {
    appState.academicYear = year;
    document.querySelectorAll('.active-year-label').forEach(el => el.textContent = year);
    document.getElementById('formAcademicYear').value = year;
    loadAllData();
}

// ================= 4. FETCH AND LOAD DATA =================
async function loadAllData() {
    try {
        const year = appState.academicYear;
        const instParam = appState.role === 'institution' && appState.institutionId ? `&institution_id=${appState.institutionId}` : '';

        const [instRes, progRes, studRes, anomRes, statRes] = await Promise.all([
            fetch('/api/institutions').then(r => r.json()),
            fetch(`/api/programs?academic_year=${year}${instParam}`).then(r => r.json()),
            fetch(`/api/students?academic_year=${year}${instParam}`).then(r => r.json()),
            fetch(`/api/anomalies?academic_year=${year}${instParam}`).then(r => r.json()),
            fetch(`/api/analytics?academic_year=${year}${instParam}`).then(r => r.json())
        ]);

        if (instRes.success) globalData.institutions = instRes.data;
        if (progRes.success) globalData.programs = progRes.data;
        if (studRes.success) globalData.students = studRes.data;
        if (anomRes.success) globalData.anomalies = anomRes.data;
        if (statRes.success) globalData.analytics = statRes.data;

        updateKpiCounters();
        renderCharts();
        renderInstitutionsTable();
        populateFormDropdowns();
        renderAnomaliesTable();
        renderCollegeAnomaliesTable();
        renderInstitutionStudentsTable();
        populateIdCardDropdown();

    } catch (err) {
        console.error('Error loading data:', err);
    }
}

function updateKpiCounters() {
    const a = globalData.analytics;
    const isInst = appState.role === 'institution';

    document.getElementById('kpiInstitutions').textContent = isInst ? '1 College' : (a.institutionsCount || globalData.institutions.length);
    document.getElementById('kpiStudents').textContent = a.studentsCount || globalData.students.length;
    document.getElementById('kpiTotalIntake').textContent = a.totalIntake || 0;
    document.getElementById('kpiUtilization').textContent = `${a.utilizationRate || 0}% Seat Utilization`;
    
    const anomCount = a.anomaliesCount !== undefined ? a.anomaliesCount : globalData.anomalies.filter(x => x.status === 'OPEN').length;
    document.getElementById('kpiAnomalies').textContent = anomCount;
    
    const navPill = document.getElementById('navAnomCount');
    if (navPill) navPill.textContent = anomCount;
    const anomPill = document.getElementById('anomaliesCountPill');
    if (anomPill) anomPill.textContent = `${anomCount} Active Incidents`;

    const instAnomPill = document.getElementById('instAnomPill');
    if (instAnomPill) instAnomPill.textContent = `${anomCount} College Incidents`;
    const navInstPill = document.getElementById('navInstAnomCount');
    if (navInstPill) navInstPill.textContent = anomCount;

    // Headings
    const heading = document.getElementById('dashboardHeading');
    const sub = document.getElementById('dashboardSubHeading');
    if (isInst) {
        const inst = globalData.institutions.find(i => i.id === appState.institutionId);
        heading.innerHTML = `<i class="fa-solid fa-chart-pie" style="color:var(--teal-main);"></i> ${inst ? inst.institution_name : 'College'} Enrolment Dashboard`;
        sub.textContent = `Confidential Institutional Data for Academic Year ${appState.academicYear}`;
    } else {
        heading.innerHTML = `<i class="fa-solid fa-chart-pie" style="color:var(--teal-main);"></i> AICTE National Academic Dashboard`;
        sub.textContent = `National Overview Across All Institutions for Academic Year ${appState.academicYear}`;
    }
}

// Render Charts
function renderCharts() {
    const intakeCtx = document.getElementById('intakeChart');
    if (intakeCtx && globalData.programs.length > 0) {
        const labels = globalData.programs.map(p => p.program_name.split(' (')[0].replace('B.Tech ', ''));
        const approvedData = globalData.programs.map(p => p.approved_intake);
        const actualData = globalData.programs.map(p => p.actual_enrolment);

        if (intakeChartInstance) intakeChartInstance.destroy();

        intakeChartInstance = new Chart(intakeCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Approved Intake',
                        data: approvedData,
                        backgroundColor: '#E8E2D8',
                        borderRadius: 4
                    },
                    {
                        label: 'Admitted Students',
                        data: actualData,
                        backgroundColor: '#0E7490',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    const quotaCtx = document.getElementById('quotaChart');
    if (quotaCtx && globalData.analytics.categoryBreakdown) {
        const cats = globalData.analytics.categoryBreakdown;
        const labels = Object.keys(cats);
        const data = Object.values(cats);

        if (quotaChartInstance) quotaChartInstance.destroy();

        quotaChartInstance = new Chart(quotaCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#0E7490', '#155E75', '#15803D', '#B45309', '#B91C1C', '#6C7A87', '#34404B'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }
}

// Render Participating Institutions (Admin Only - Shows Operational Years)
function renderInstitutionsTable() {
    const tbody = document.getElementById('institutionsTableBody');
    if (!tbody) return;

    if (globalData.institutions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">No institutions found.</td></tr>';
        return;
    }

    tbody.innerHTML = globalData.institutions.map(inst => {
        const instProgs = globalData.programs.filter(p => p.institution_id === inst.id);
        const totalIntake = instProgs.reduce((sum, p) => sum + p.approved_intake, 0);
        const totalEnrolled = instProgs.reduce((sum, p) => sum + p.actual_enrolment, 0);

        return `
            <tr>
                <td><code>${inst.aicte_permanent_id}</code></td>
                <td><strong>${inst.institution_name}</strong></td>
                <td><span class="badge badge-cyan">${inst.institution_type}</span></td>
                <td>${inst.city}, ${inst.state}</td>
                <td><strong>${inst.established_year || 1980}</strong></td>
                <td><span class="badge badge-cyan">${inst.total_operational_years || 40} Yrs</span></td>
                <td><strong>${totalIntake || 60}</strong></td>
                <td><strong style="color:var(--color-green);">${totalEnrolled || 50}</strong></td>
                <td><span class="badge badge-success"><i class="fa-solid fa-check"></i> Compliant</span></td>
            </tr>
        `;
    }).join('');
}

// Render My Admitted Students Table (Institution Role - with Direct Verify Button)
function renderInstitutionStudentsTable() {
    const tbody = document.getElementById('institutionStudentsTableBody');
    if (!tbody) return;

    if (globalData.students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No students enrolled yet for this academic year.</td></tr>';
        return;
    }

    tbody.innerHTML = globalData.students.map(s => {
        const isVerified = s.verification_status === 'VERIFIED';
        return `
            <tr>
                <td><strong style="color:var(--teal-main); font-family:var(--font-mono);">${s.masked_apaar || ('•••• ' + s.apaar_id.slice(-4))}</strong></td>
                <td>${s.roll_number}</td>
                <td><strong>${s.first_name} ${s.last_name}</strong></td>
                <td>${s.program_name || 'B.Tech'}</td>
                <td><small>${s.duration_years || 4} Years</small></td>
                <td><span class="badge badge-cyan">${s.quota_category}</span></td>
                <td><span class="badge ${isVerified ? 'badge-success' : 'badge-danger'}">${s.verification_status}</span></td>
                <td style="display:flex; gap:6px;">
                    <!-- Direct Verify Button as Requested -->
                    <button class="btn btn-primary btn-sm" onclick="quickVerifyStudent('${s.apaar_id}')" title="Verify Credentials in Real Time">
                        <i class="fa-solid fa-shield-check"></i> Verify
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="previewStudentCard('${s.apaar_id}')" title="View Digital Academic Card">
                        <i class="fa-solid fa-id-card"></i> ID
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterInstitutionStudents(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#institutionStudentsTableBody tr');
    rows.forEach(r => {
        r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

// Quick verify student directly from My Students table
function quickVerifyStudent(apaarId) {
    switchToTab('tab-verify');
    document.getElementById('verifyApaarInput').value = apaarId;
    executeStudentVerification(apaarId);
}

function previewStudentCard(apaarId) {
    const select = document.getElementById('idCardStudentSelect');
    if (select) {
        select.value = apaarId;
        renderStudentIdCard();
        switchToTab('tab-idcard');
    }
}

// Render College-Specific Anomaly Desk (For Institutions)
function renderCollegeAnomaliesTable() {
    const tbody = document.getElementById('instAnomaliesTableBody');
    if (!tbody) return;

    if (globalData.anomalies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--color-green); padding:20px;"><i class="fa-solid fa-circle-check"></i> No active admission anomalies for your college!</td></tr>';
        return;
    }

    tbody.innerHTML = globalData.anomalies.map(anom => {
        const isCritical = anom.severity === 'CRITICAL';
        const isResolved = anom.status === 'RESOLVED';

        return `
            <tr>
                <td><code>INC-00${anom.id}</code></td>
                <td><span class="badge ${isResolved ? 'badge-success' : (isCritical ? 'badge-danger' : 'badge-warning')}">${anom.severity}</span></td>
                <td><strong>${anom.anomaly_type.replace(/_/g, ' ')}</strong></td>
                <td><strong>${anom.student_name}</strong></td>
                <td><code style="color:var(--teal-main);">${anom.apaar_id}</code></td>
                <td style="max-width: 320px;"><strong style="color:var(--color-red); font-size:0.8rem;">${anom.details}</strong></td>
                <td><span class="badge ${isResolved ? 'badge-success' : 'badge-warning'}">${anom.status}</span></td>
                <td>
                    ${isResolved ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Resolved</span>' : `
                        <button class="btn btn-primary btn-sm" onclick="openResolutionModal(${anom.id})">
                            <i class="fa-solid fa-gavel"></i> Resolve
                        </button>
                    `}
                </td>
            </tr>
        `;
    }).join('');
}

// Render National Anomalies Table (For AICTE Admin)
function renderAnomaliesTable() {
    const tbody = document.getElementById('anomaliesTableBody');
    if (!tbody) return;

    if (globalData.anomalies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--color-green); padding:20px;"><i class="fa-solid fa-circle-check"></i> No active anomalies detected. All student records verified!</td></tr>';
        return;
    }

    tbody.innerHTML = globalData.anomalies.map(anom => {
        const isCritical = anom.severity === 'CRITICAL';
        const isResolved = anom.status === 'RESOLVED';

        return `
            <tr>
                <td><code>INC-00${anom.id}</code></td>
                <td><span class="badge ${isResolved ? 'badge-success' : (isCritical ? 'badge-danger' : 'badge-warning')}">${anom.severity}</span></td>
                <td><strong>${anom.anomaly_type.replace(/_/g, ' ')}</strong></td>
                <td><strong style="color:var(--color-red); font-family:var(--font-mono);">${anom.apaar_id}</strong></td>
                <td><strong>${anom.student_name}</strong></td>
                <td>${anom.institution_name || 'N/A'}</td>
                <td style="max-width: 280px;"><small style="color:var(--color-red); font-weight:600;">${anom.details}</small></td>
                <td><span class="badge ${isResolved ? 'badge-success' : 'badge-warning'}">${anom.status}</span></td>
                <td>
                    ${isResolved ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Resolved</span>' : `
                        <button class="btn btn-primary btn-sm" onclick="openResolutionModal(${anom.id})">
                            <i class="fa-solid fa-gavel"></i> Investigate & Resolve
                        </button>
                    `}
                </td>
            </tr>
        `;
    }).join('');
}

// ================= 5. ANOMALY RESOLUTION MODAL (FIXED SCROLL) =================
function openResolutionModal(anomalyId) {
    document.body.classList.add('modal-open'); // Locks body scroll so only the modal scrolls!
    const anom = globalData.anomalies.find(a => a.id === anomalyId);
    if (!anom) return;

    selectedAnomalyForResolution = anom;

    const summaryBox = document.getElementById('modalAnomalySummary');
    summaryBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong>Incident #INC-00${anom.id}: ${anom.anomaly_type.replace(/_/g, ' ')}</strong>
            <span class="badge badge-danger">${anom.severity}</span>
        </div>
        <p><strong>Candidate:</strong> ${anom.student_name} | <strong>APAAR:</strong> <code style="color:var(--teal-main);">${anom.apaar_id}</code></p>
        <p><strong>Institution:</strong> ${anom.institution_name || 'AICTE Institution'}</p>
        <div style="margin-top:8px; padding:8px; background:#FFFFFF; border:1px solid var(--amber-border); border-radius:6px; color:var(--color-amber); font-weight:600;">
            Exact Cause: ${anom.details}
        </div>
    `;

    document.getElementById('modalAdminNotes').value = '';
    const modalOverlay = document.getElementById('resolutionModalOverlay');
    modalOverlay.classList.add('active');
    modalOverlay.style.display = 'flex';
}

function closeResolutionModal() {
    document.body.classList.remove('modal-open');
    const modalOverlay = document.getElementById('resolutionModalOverlay');
    modalOverlay.classList.remove('active');
    modalOverlay.style.display = 'none';
    selectedAnomalyForResolution = null;
}

function toggleResolutionFields() {
    const action = document.querySelector('input[name="resAction"]:checked').value;
    const quotaField = document.getElementById('resolutionQuotaField');
    if (action === 'APPROVE_AS_SUPERNUMERARY') {
        quotaField.style.display = 'block';
    } else {
        quotaField.style.display = 'none';
    }
}

// Submit Resolution & ACTUALLY Update Database Record
async function submitAnomalyResolution() {
    if (!selectedAnomalyForResolution) return;

    const action = document.querySelector('input[name="resAction"]:checked').value;
    const newQuota = document.getElementById('modalNewQuota').value;
    const notes = document.getElementById('modalAdminNotes').value.trim() || 'Resolved by Administrator';

    try {
        const res = await fetch('/api/anomalies/resolve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                anomaly_id: selectedAnomalyForResolution.id,
                resolution_action: action,
                new_quota: newQuota,
                admin_notes: notes
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            alert(`✅ ${data.message}`);
            closeResolutionModal();
            await loadAllData();
        } else {
            alert(`Error: ${data.message || 'Could not resolve anomaly'}`);
        }
    } catch (err) {
        alert(`Network Error: ${err.message}`);
    }
}

// ================= 6. FORMS & DEPARTMENT SWITCHING =================
function populateFormDropdowns() {
    const instSelect = document.getElementById('formInstitutionSelect');
    if (!instSelect) return;

    if (appState.role === 'institution' && appState.institutionId) {
        const myInst = globalData.institutions.find(i => i.id === appState.institutionId);
        instSelect.innerHTML = `<option value="${appState.institutionId}">${myInst ? myInst.institution_name : 'My Institution'}</option>`;
        instSelect.disabled = true;
    } else {
        instSelect.disabled = false;
        instSelect.innerHTML = '<option value="">-- Choose Institution --</option>' +
            globalData.institutions.map(i => `<option value="${i.id}">${i.institution_name}</option>`).join('');
    }

    onInstitutionChange();
}

function onInstitutionChange() {
    const instId = appState.role === 'institution' ? appState.institutionId : parseInt(document.getElementById('formInstitutionSelect').value, 10);
    const progSelect = document.getElementById('formProgramSelect');
    const filtered = globalData.programs.filter(p => p.institution_id === instId);

    progSelect.innerHTML = '<option value="">-- Choose Academic Department --</option>' +
        filtered.map(p => {
            const isFull = p.actual_enrolment >= p.approved_intake;
            return `<option value="${p.id}">${p.program_name} (${p.duration_years || 4} Yrs - ${isFull ? 'FULL: ' : 'Intake: '}${p.actual_enrolment}/${p.approved_intake})</option>`;
        }).join('');
    
    if (filtered.length > 0) {
        progSelect.value = filtered[0].id;
    }
}

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const admissionInput = document.getElementById('formAdmissionDate');
    if (admissionInput) admissionInput.value = today;
}

function switchUploadMode(mode) {
    const singleContainer = document.getElementById('uploadSingleContainer');
    const bulkContainer = document.getElementById('uploadBulkContainer');
    const btnSingle = document.getElementById('btnUploadModeSingle');
    const btnBulk = document.getElementById('btnUploadModeBulk');

    if (mode === 'single') {
        singleContainer.style.display = 'block';
        bulkContainer.style.display = 'none';
        btnSingle.classList.add('active');
        btnBulk.classList.remove('active');
    } else {
        singleContainer.style.display = 'none';
        bulkContainer.style.display = 'block';
        btnSingle.classList.remove('active');
        btnBulk.classList.add('active');
    }
}

// Student upload submission with Department Change option on limit reach
function setupFormHandlers() {
    // 1. Single Student Admission
    const form = document.getElementById('studentUploadForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resultContainer = document.getElementById('singleUploadResult');
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = '<div style="padding:10px; background:#FAF7F2; border-radius:6px;"><i class="fa-solid fa-spinner fa-spin"></i> Validating APAAR format, duplicate registries, and intake limits...</div>';

            const instId = appState.role === 'institution' ? appState.institutionId : document.getElementById('formInstitutionSelect').value;

            const payload = {
                institution_id: instId,
                program_id: document.getElementById('formProgramSelect').value,
                academic_year: appState.academicYear,
                apaar_id: document.getElementById('formApaarId').value,
                roll_number: document.getElementById('formRollNo').value,
                quota_category: document.getElementById('formQuota').value,
                first_name: document.getElementById('formFirstName').value,
                last_name: document.getElementById('formLastName').value,
                gender: document.getElementById('formGender').value,
                dob: document.getElementById('formDob').value,
                email: document.getElementById('formEmail').value,
                phone: document.getElementById('formPhone').value,
                admission_date: document.getElementById('formAdmissionDate').value
            };

            try {
                const res = await fetch('/api/students/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    resultContainer.innerHTML = `
                        <div style="background:var(--green-bg); border:1px solid var(--green-border); color:var(--color-green); padding:14px; border-radius:8px;">
                            <i class="fa-solid fa-circle-check"></i>
                            <strong>Record Successfully Registered!</strong> Candidate <strong>${payload.first_name} ${payload.last_name}</strong> (APAAR: <code>${payload.apaar_id}</code>).
                            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px; font-family:var(--font-mono);">Cryptographic Hash: ${data.student.apaar_hash}</div>
                        </div>
                    `;
                    form.reset();
                    setDefaultDates();
                    await loadAllData();
                } else if (data.intakeBreach) {
                    // SEAT LIMIT REACHED: Offer Department Change / Reallocation as requested!
                    let optionsHtml = '';
                    if (data.alternateDepartments && data.alternateDepartments.length > 0) {
                        optionsHtml = data.alternateDepartments.map(d => `
                            <option value="${d.id}">${d.name} (${d.availableSeats} Seats Available)</option>
                        `).join('');
                    }

                    resultContainer.innerHTML = `
                        <div class="department-switch-banner">
                            <h4><i class="fa-solid fa-triangle-exclamation"></i> Sanctioned Intake Reached for ${data.currentProgram}</h4>
                            <p style="font-size:0.82rem; margin: 4px 0 10px;">The regular capacity is currently 100% full. You can reallocate this student to an alternate department with open seats:</p>
                            
                            <div style="display:flex; gap:10px; align-items:center;">
                                <select id="reallocateSelect" class="form-select" style="max-width:380px;">
                                    ${optionsHtml || '<option value="">No other departments open</option>'}
                                </select>
                                <button type="button" class="btn btn-primary btn-sm" onclick="reallocateDepartment('${payload.apaar_id}', ${instId})">
                                    <i class="fa-solid fa-arrow-right-arrow-left"></i> Reallocate to Selected Department
                                </button>
                            </div>
                        </div>
                    `;
                    await loadAllData();
                } else {
                    const errorMsg = (data.errors && data.errors.length > 0) ? data.errors[0].message : (data.message || 'Validation error');
                    resultContainer.innerHTML = `
                        <div style="background:var(--red-bg); border:1px solid var(--red-border); color:var(--color-red); padding:14px; border-radius:8px;">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <strong>Admission Blocked:</strong> ${errorMsg}
                        </div>
                    `;
                    await loadAllData();
                }
            } catch (err) {
                resultContainer.innerHTML = `<div style="color:var(--color-red);">Network error: ${err.message}</div>`;
            }
        });
    }

    // 2. Add New Institution Form (Admin Feature)
    const addInstForm = document.getElementById('addInstitutionForm');
    if (addInstForm) {
        addInstForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resBox = document.getElementById('addInstitutionResult');
            resBox.style.display = 'block';
            resBox.innerHTML = '<div style="padding:10px;">Registering institution with AICTE Central Database...</div>';

            const payload = {
                aicte_permanent_id: document.getElementById('addInstId').value,
                institution_type: document.getElementById('addInstType').value,
                institution_name: document.getElementById('addInstName').value,
                state: document.getElementById('addInstState').value,
                city: document.getElementById('addInstCity').value,
                established_year: document.getElementById('addInstYear').value,
                contact_email: document.getElementById('addInstEmail').value,
                initial_program: document.getElementById('addInstProgram').value,
                initial_intake: document.getElementById('addInstIntake').value
            };

            try {
                const res = await fetch('/api/institutions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    resBox.innerHTML = `
                        <div style="background:var(--green-bg); border:1px solid var(--green-border); color:var(--color-green); padding:12px; border-radius:8px;">
                            <i class="fa-solid fa-circle-check"></i>
                            <strong>Institution Registered!</strong> ${payload.institution_name} (${payload.aicte_permanent_id}) added with ${payload.initial_intake} sanctioned seats in ${payload.initial_program}.
                        </div>
                    `;
                    addInstForm.reset();
                    await fetchInitialInstitutions();
                    await loadAllData();
                } else {
                    resBox.innerHTML = `<div style="color:var(--color-red);">${data.message || 'Error adding institution'}</div>`;
                }
            } catch (err) {
                resBox.innerHTML = `<div style="color:var(--color-red);">${err.message}</div>`;
            }
        });
    }
}

// Function to Reallocate Student to another Department
async function reallocateDepartment(apaarId, institutionId) {
    const newProgId = document.getElementById('reallocateSelect').value;
    if (!newProgId) return alert('Please select a target department with open seats.');

    try {
        const res = await fetch('/api/students/reallocate-department', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apaar_id: apaarId,
                new_program_id: newProgId,
                institution_id: institutionId
            })
        });

        const data = await res.json();
        if (res.ok && data.success) {
            alert(`✅ ${data.message}`);
            document.getElementById('singleUploadResult').innerHTML = `
                <div style="background:var(--green-bg); border:1px solid var(--green-border); color:var(--color-green); padding:12px; border-radius:8px;">
                    <i class="fa-solid fa-check"></i> Student successfully transferred and enrolled!
                </div>
            `;
            await loadAllData();
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (e) {
        alert(`Network Error: ${e.message}`);
    }
}

// ================= 7. BULK CSV UPLOAD =================
let parsedCsvRecords = [];

function loadSampleCsvData() {
    parsedCsvRecords = [
        { apaar_id: '904128475107', roll_number: '2026-COEP-CS-06', first_name: 'Sanya', last_name: 'Kulkarni', gender: 'Female', dob: '2005-08-14', email: 'sanya.k@coep.ac.in', phone: '9811223399', quota_category: 'Regular' },
        { apaar_id: '904128475108', roll_number: '2026-COEP-CS-07', first_name: 'Tanmay', last_name: 'Verma', gender: 'Male', dob: '2005-01-22', email: 'tanmay.v@coep.ac.in', phone: '9822334455', quota_category: 'Supernumerary-TFW' },
        { apaar_id: '904128475109', roll_number: '2026-COEP-CS-08', first_name: 'Aditi', last_name: 'Sharma', gender: 'Female', dob: '2004-10-10', email: 'aditi.s@coep.ac.in', phone: '9833445566', quota_category: 'NRI' },
        // Anomaly: Cross-Institution Duplicate
        { apaar_id: '882190341255', roll_number: '2026-DTU-MECH-99', first_name: 'Vikram', last_name: 'Aditya', gender: 'Male', dob: '2005-05-10', email: 'vikram.a@dtu.ac.in', phone: '9123456780', quota_category: 'Regular' }
    ];
    renderCsvPreview();
}

function handleCsvFileSelected(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) return alert('CSV file is empty or missing headers.');

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        parsedCsvRecords = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            headers.forEach((h, index) => {
                row[h] = values[index] || '';
            });
            if (row.apaar_id) parsedCsvRecords.push(row);
        }
        renderCsvPreview();
    };
    reader.readAsText(file);
}

function renderCsvPreview() {
    const container = document.getElementById('csvPreviewContainer');
    const tbody = document.getElementById('csvPreviewTableBody');
    document.getElementById('csvRecordCount').textContent = parsedCsvRecords.length;
    container.style.display = 'block';

    tbody.innerHTML = parsedCsvRecords.map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td><code>${r.apaar_id}</code></td>
            <td>${r.roll_number || 'N/A'}</td>
            <td>${r.first_name} ${r.last_name}</td>
            <td>${r.phone || 'N/A'}</td>
            <td><span class="badge badge-cyan">${r.quota_category || 'Regular'}</span></td>
            <td>${r.email || 'N/A'}</td>
        </tr>
    `).join('');
}

async function submitBulkData() {
    if (parsedCsvRecords.length === 0) return alert('No records to upload.');

    const instId = appState.role === 'institution' ? appState.institutionId : document.getElementById('formInstitutionSelect').value;
    const progId = document.getElementById('formProgramSelect').value;
    const reportBox = document.getElementById('bulkUploadReport');

    reportBox.style.display = 'block';
    reportBox.innerHTML = '<div style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Ingesting records...</div>';

    try {
        const res = await fetch('/api/students/bulk-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                institution_id: instId,
                program_id: progId,
                academic_year: appState.academicYear,
                students: parsedCsvRecords
            })
        });

        const data = await res.json();
        const summary = data.summary;

        reportBox.innerHTML = `
            <div class="card" style="margin-top:14px;">
                <div class="card-title">Bulk Upload Outcome: ${summary.passed} Admitted, ${summary.failed} Blocked</div>
                <div class="table-responsive" style="margin-top:10px;">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>APAAR ID</th>
                                <th>Candidate</th>
                                <th>Status</th>
                                <th>Validation Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${summary.results.map(r => `
                                <tr>
                                    <td><code>${r.apaar_id}</code></td>
                                    <td><strong>${r.name}</strong></td>
                                    <td><span class="badge ${r.success ? 'badge-success' : 'badge-danger'}">${r.success ? 'ADMITTED' : 'BLOCKED'}</span></td>
                                    <td><small style="color:${r.success ? 'var(--color-green)' : 'var(--color-red)'}">${r.message}</small></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        await loadAllData();
    } catch (err) {
        reportBox.innerHTML = `<div style="color:var(--color-red);">Error: ${err.message}</div>`;
    }
}

// ================= 8. VERIFICATION & DEGREE ID CARD =================
async function verifyStudentByInput() {
    const input = document.getElementById('verifyApaarInput').value.trim();
    if (!input || input.length !== 12) {
        alert('Please enter a valid 12-digit APAAR ID.');
        return;
    }
    await executeStudentVerification(input);
}

function quickFillVerify(apaar) {
    document.getElementById('verifyApaarInput').value = apaar;
    executeStudentVerification(apaar);
}

async function executeStudentVerification(apaarId) {
    const container = document.getElementById('verifyResultContainer');
    container.style.display = 'block';
    container.innerHTML = '<div style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Querying confidential AICTE registry...</div>';

    try {
        const res = await fetch(`/api/verify/${apaarId}`);
        const data = await res.json();

        if (res.ok && data.is_valid) {
            const s = data.data;
            const isFlagged = s.verification_status === 'FLAGGED_DUPLICATE';
            container.innerHTML = `
                <div class="card" style="margin-top: 15px; border-color: ${isFlagged ? 'var(--color-red)' : 'var(--color-green)'};">
                    <div class="flex-between">
                        <div class="card-title">
                            <i class="fa-solid fa-shield-check" style="color:var(--color-green);"></i> Authenticated Student Record
                        </div>
                        <span class="badge ${isFlagged ? 'badge-danger' : 'badge-success'}">${s.verification_status}</span>
                    </div>

                    <div class="two-col-grid" style="margin-top: 14px;">
                        <div>
                            <p style="font-size:0.74rem; color:var(--text-light); font-weight:700;">STUDENT DETAILS</p>
                            <h3 style="color:var(--text-heading); margin: 2px 0;">${s.first_name} ${s.last_name}</h3>
                            <p><strong>Masked APAAR:</strong> <code style="color:var(--teal-main);">${s.masked_apaar || ('•••• ' + s.apaar_id.slice(-4))}</code></p>
                            <p><strong>Roll No:</strong> ${s.roll_number}</p>
                            <p><strong>Admission Date:</strong> ${s.admission_date}</p>
                            <p><small style="font-family:var(--font-mono); font-size:0.65rem; color:var(--text-muted);">Salted Hash: ${s.apaar_hash || 'SHA256_...'}</small></p>
                        </div>
                        <div>
                            <p style="font-size:0.74rem; color:var(--text-light); font-weight:700;">ENROLLED INSTITUTION</p>
                            <h4 style="margin: 2px 0;">${s.institution_name}</h4>
                            <p><strong>Department:</strong> ${s.program_name} (${s.duration_years || 4} Years)</p>
                            <p><strong>Quota:</strong> <span class="badge badge-cyan">${s.quota_category}</span></p>
                            <p><strong>Established:</strong> ${s.established_year || 1980} (${s.total_operational_years || 40} Yrs)</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div style="background:var(--red-bg); border:1px solid var(--red-border); color:var(--color-red); padding:12px; border-radius:8px; margin-top:14px;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <strong>Verification Failed:</strong> ${data.message || 'No record found with this APAAR ID in the AICTE repository.'}
                </div>
            `;
        }
    } catch (err) {
        container.innerHTML = `<div style="color:var(--color-red);">Verification error: ${err.message}</div>`;
    }
}

// Academic ID Card & Certificate Preview
function populateIdCardDropdown() {
    const select = document.getElementById('idCardStudentSelect');
    if (!select || globalData.students.length === 0) return;

    select.innerHTML = globalData.students.map(s => `
        <option value="${s.apaar_id}">${s.first_name} ${s.last_name} (${s.masked_apaar || ('•••• ' + s.apaar_id.slice(-4))}) - ${s.program_name}</option>
    `).join('');

    renderStudentIdCard();
}

function renderStudentIdCard() {
    const select = document.getElementById('idCardStudentSelect');
    if (!select) return;
    const apaar = select.value;
    const student = globalData.students.find(s => s.apaar_id === apaar) || globalData.students[0];
    if (!student) return;

    const masked = student.masked_apaar || `•••• •••• ${student.apaar_id.slice(-4)}`;

    document.getElementById('cardStudentName').textContent = `${student.first_name} ${student.last_name}`.toUpperCase();
    document.getElementById('cardApaarTag').textContent = `APAAR: ${masked}`;
    document.getElementById('cardApaarHash').textContent = `Salted Hash: ${(student.apaar_hash || 'SHA256_...').substring(0, 24)}...`;
    document.getElementById('cardRollNo').textContent = student.roll_number;
    document.getElementById('cardProgram').textContent = `${student.program_name} (${student.duration_years || 4} Yrs)`;
    document.getElementById('cardInstitution').textContent = student.institution_name;
    document.getElementById('cardCategory').textContent = student.quota_category;

    const statusTag = document.getElementById('cardStatusTag');
    statusTag.textContent = student.verification_status;
    statusTag.className = `badge ${student.verification_status === 'VERIFIED' ? 'badge-success' : 'badge-danger'}`;

    // Certificate
    document.getElementById('certInstitutionName').textContent = student.institution_name.toUpperCase();
    document.getElementById('certStudentName').textContent = `${student.first_name} ${student.last_name}`;
    document.getElementById('certApaarId').textContent = masked;
    document.getElementById('certRollNo').textContent = student.roll_number;
    document.getElementById('certProgramName').textContent = student.program_name;
    document.getElementById('certDigitalHash').textContent = `Salted Hash: ${(student.apaar_hash || 'SHA256_...').substring(0, 24)}...`;

    // Render Scannable QR Codes
    const verifyUrl = `${window.location.origin}/api/verify/${student.apaar_id}`;
    const cardQr = document.getElementById('qrcodeCard');
    const certQr = document.getElementById('qrcodeCert');

    if (cardQr && window.QRCode) {
        cardQr.innerHTML = '';
        new QRCode(cardQr, { text: verifyUrl, width: 68, height: 68, colorDark: '#0E7490', colorLight: '#ffffff' });
    }
    if (certQr && window.QRCode) {
        certQr.innerHTML = '';
        new QRCode(certQr, { text: verifyUrl, width: 60, height: 60, colorDark: '#0E7490', colorLight: '#ffffff' });
    }
}
