// ========================================
//  ALTIM Incident Management System
//  Main Application Logic (v2.3)
// ========================================

// ========================================
// CONFIGURATION
// ========================================
let CONFIG = {
    GEMINI_API_KEY: '', // Managed via LocalStorage
    EMAILJS_SERVICE_ID: '',
    EMAILJS_TEMPLATE_ID: '',
    EMAILJS_PUBLIC_KEY: '',
    EXCHANGE_USER: 'adelamatta@altim.es',
    EXCHANGE_PASS: 'Lourdes-08',
    SUPABASE_URL: '',
    SUPABASE_KEY: ''
};

let supabaseSvc = null;

// ========================================
// INTERNATIONALIZATION (i18n)
// ========================================
const translations = {
    es: {
        login_title: 'Iniciar Sesión',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        login_button: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
        tab_incidents: 'Incidencias',
        tab_statistics: 'Estadísticas',
        tab_management_clients: 'Gestión Clientes',
        tab_management_users: 'Gestión Usuarios',
        tab_reports: 'Informes',
        tab_mod_log: 'Log de Modificaciones',
        user: 'Usuario',
        client: 'Cliente',
        role: 'Rol',
        sidebar_title: 'Últimas Incidencias',
        contact_phone: 'Teléfono',
        login_error: 'Email o contraseña incorrectos',
        client_created: 'Cliente guardado exitosamente',
        user_created: 'Usuario creado. Se ha enviado un email de verificación y contraseña.',
        incident_created: 'Incidencia creada exitosamente',
        incident_updated: 'Incidencia actualizada exitosamente',
        password_changed: 'Contraseña actualizada. Email de notificación enviado.',
        password_reset: 'Contraseña reseteada. Email de notificación enviado.',
        profile_updated: 'Perfil actualizado exitosamente',
        ai_generating: 'Generando sugerencias con IA...',
        ai_success: 'Sugerencias generadas exitosamente',
        fill_description_first: 'Por favor, ingrese una descripción primero.',
        // Table Columns
        col_cliente: 'Cliente',
        col_numero: 'Nº',
        col_fecha_incid: 'F. Incid.',
        col_resp_cliente: 'Resp. Cliente',
        col_tipo: 'TIPO',
        col_tipo_altim: 'Tipo ALTIM',
        col_lob: 'LoB',
        col_descripcion: 'Descripción',
        col_observaciones: 'Observaciones',
        col_prioridad: 'Prioridad',
        col_comentarios: 'Comentarios',
        col_sistema: 'Sistema',
        col_resp_altim: 'Resp. Altim',
        col_estado: 'Estado',
        col_fecha_entrega: 'F.Entrega',
        col_fecha_cierre: 'F. Cierre Prevista',
        col_comentarios_finales: 'COMENTARIOS FINALES CONSULTOR',
        col_responsable: 'Responsable',
        col_actions: 'Acciones',
        config_saved: 'Configuración guardada correctamente',
        create_incident: 'Nueva Incidencia',
        save: 'Guardar',
        cancel: 'Cancelar',
        // KPI
        kpi_total: 'Total Incidencias',
        kpi_closed: 'Cerradas',
        kpi_open: 'Abiertas',
        kpi_avg_time: 'Tiempo Promedio (días)',
        // Charts
        chart_by_status: 'Incidencias por Estado',
        chart_by_priority: 'Incidencias por Prioridad',
        chart_by_type: 'Incidencias por Tipo',
        chart_by_lob: 'Incidencias por LoB',
        // Management
        client_management: 'Gestión de Clientes',
        user_management: 'Gestión de Usuarios',
        client_name: 'Nombre del Cliente',
        client_abbr: 'Abreviatura (3 caracteres)',
        contact_email: 'Email de Contacto',
        add_client: 'Guardar Cliente',
        add_user: 'Añadir Usuario',
        select_client: 'Seleccionar Cliente',
        search_incidents: 'Buscar incidencias...',
        // Modification Log
        mod_log_title: 'Log de Modificaciones',
        filter_client: 'Filtrar por Cliente',
        filter_user: 'Filtrar por Usuario',
        filter_field: 'Filtrar por Campo',
        filter_date: 'Filtrar por Fecha',
        apply_filters: 'Aplicar Filtros',
        clear_filters: 'Limpiar Filtros',
        col_user: 'Usuario',
        col_client: 'Cliente',
        col_incident_number: 'Nº Incidencia',
        col_date: 'Fecha',
        col_time: 'Hora',
        col_field: 'Campo',
        col_old_value: 'Valor Origen',
        col_new_value: 'Valor Final',
        // Projects
        projects_management: 'Gestión de Proyectos',
        project_name: 'Denominación',
        add_project: 'Añadir Proyecto',
        project_created: 'Proyecto creado exitosamente',
        project_deleted: 'Proyecto eliminado',
        delete_project_confirm: '¿Está seguro de eliminar este proyecto?',
        filter_by_client: 'Filtrar por Cliente',
        clear_filter: 'Limpiar Filtro',
        all_clients: 'Todos los Clientes',
        // Incident fields
        col_proyecto: 'Proyecto',
        col_error_mensaje: 'Mensaje de Error'
    },
    en: {
        login_title: 'Login',
        email: 'Email',
        password: 'Password',
        login_button: 'Login',
        logout: 'Logout',
        tab_incidents: 'Incidents',
        tab_statistics: 'Statistics',
        tab_management_clients: 'Client Management',
        tab_management_users: 'User Management',
        tab_reports: 'Reports',
        tab_mod_log: 'Modification Log',
        user: 'User',
        client: 'Client',
        role: 'Role',
        sidebar_title: 'Latest Incidents',
        contact_phone: 'Phone',
        login_error: 'Invalid email or password',
        client_created: 'Client saved successfully',
        user_created: 'User created. Verification email sent.',
        incident_created: 'Incident created successfully',
        incident_updated: 'Incident updated successfully',
        password_changed: 'Password updated. Notification email sent.',
        password_reset: 'Password reset. Notification email sent.',
        profile_updated: 'Profile updated successfully',
        ai_generating: 'Generating AI suggestions...',
        ai_success: 'Suggestions generated successfully',
        fill_description_first: 'Please enter a description first.',
        // Table Columns
        col_cliente: 'Client',
        col_numero: 'No.',
        col_fecha_incid: 'Incid. Date',
        col_resp_cliente: 'Client Resp.',
        col_tipo: 'TYPE',
        col_tipo_altim: 'ALTIM Type',
        col_lob: 'LoB',
        col_descripcion: 'Description',
        col_observaciones: 'Observations',
        col_prioridad: 'Priority',
        col_comentarios: 'Comments',
        col_sistema: 'System',
        col_resp_altim: 'Resp. Altim',
        col_estado: 'Status',
        col_fecha_entrega: 'Delivery Date',
        col_fecha_cierre: 'Est. Close Date',
        col_comentarios_finales: 'FINAL COMMENTS',
        col_responsable: 'Responsible',
        col_actions: 'Actions',
        config_saved: 'Configuration saved successfully',
        create_incident: 'New Incident',
        save: 'Save',
        cancel: 'Cancel',
        // KPI
        kpi_total: 'Total Incidents',
        kpi_closed: 'Closed',
        kpi_open: 'Open',
        kpi_avg_time: 'Avg Time (days)',
        // Charts
        chart_by_status: 'Incidents by Status',
        chart_by_priority: 'Incidents by Priority',
        chart_by_type: 'Incidents by Type',
        chart_by_lob: 'Incidents by LoB',
        // Management
        client_management: 'Client Management',
        user_management: 'User Management',
        client_name: 'Client Name',
        client_abbr: 'Abbreviation (3 chars)',
        contact_email: 'Contact Email',
        add_client: 'Save Client',
        add_user: 'Add User',
        select_client: 'Select Client',
        search_incidents: 'Search incidents...',
        // Modification Log
        mod_log_title: 'Modification Log',
        filter_client: 'Filter by Client',
        filter_user: 'Filter by User',
        filter_field: 'Filter by Field',
        filter_date: 'Filter by Date',
        apply_filters: 'Apply Filters',
        clear_filters: 'Clear Filters',
        col_user: 'User',
        col_client: 'Client',
        col_incident_number: 'Incident No.',
        col_date: 'Date',
        col_time: 'Time',
        col_field: 'Field',
        col_old_value: 'Old Value',
        col_new_value: 'New Value',
        // Projects
        projects_management: 'Projects Management',
        project_name: 'Project Name',
        add_project: 'Add Project',
        project_created: 'Project created successfully',
        project_deleted: 'Project deleted',
        delete_project_confirm: 'Are you sure you want to delete this project?',
        filter_by_client: 'Filter by Client',
        clear_filter: 'Clear Filter',
        all_clients: 'All Clients',
        // Incident fields
        col_proyecto: 'Project',
        col_error_mensaje: 'Error Message'
    }
};

let currentLang = 'es';

function t(key) {
    return translations[currentLang][key] || key;
}

function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) el.placeholder = translations[currentLang][key];
    });
    localStorage.setItem('language', currentLang);

    // Update Flag Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function initClock() {
    const updateClock = () => {
        const el = document.getElementById('headerClock');
        if (!el) return;
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        el.textContent = now.toLocaleDateString(currentLang === 'es' ? 'es-ES' : 'en-US', options);
    };
    updateClock();
    setInterval(updateClock, 60000);
}

function switchLanguage(lang) {
    currentLang = lang;
    updateUILanguage();
    // Refresh tables/charts if needed to update dynamic content
    if (document.getElementById('incidentsTable')) loadIncidents();
    if (document.getElementById('statisticsView') && !document.getElementById('statisticsView').classList.contains('hidden')) calculateStatistics();
}

// ========================================
// DATA MODELS
// ========================================

let clients = [
    {
        id: 1,
        nombre: 'ALTIM Consulting',
        abreviatura: 'ALT',
        email: 'contacto@altim.com',
        telefono: '+34 900 000 000'
    }
];

const INITIAL_USERS = [
    {
        id: 1,
        email: 'admin@altim.com',
        password: 'admin123',
        role: 'Administrador',
        type: 'ALTIM',
        cliente: null,
        clienteAbreviatura: null,
        photo: null,
        phone: '+34 600 000 000'
    },
    {
        id: 2,
        email: 'adelamatta@altim.es',
        password: 'Altim-02',
        role: 'Administrador',
        type: 'ALTIM',
        cliente: null,
        clienteAbreviatura: null,
        photo: null,
        phone: ''
    },
    {
        id: 3,
        email: 'admin@altim.es',
        password: 'Admin-1234',
        role: 'Administrador',
        type: 'ALTIM',
        cliente: null,
        clienteAbreviatura: null,
        photo: null,
        phone: ''
    }
];

let users = [...INITIAL_USERS];

let incidents = [];
let incidentCounters = {};
let auditLogs = [];
let projects = []; // { id, cliente, denominacion, pep }
let currentUser = null;
let charts = {};
let selectedIncidentId = null;

// ========================================
// PERSISTENCE LAYER
// ========================================
function saveDataToLocalStorage() {
    const data = {
        users: users,
        clients: clients,
        incidents: incidents,
        incidentCounters: incidentCounters,
        auditLogs: auditLogs,
        projects: projects
    };
    localStorage.setItem('ALTIM_DATA', JSON.stringify(data));
}

async function loadData() {
    if (supabaseSvc) {
        await loadFromSupabase();
    } else {
        loadDataFromLocalStorage();
    }
}

async function loadFromSupabase() {
    try {
        const { data: u, error } = await supabaseSvc.from('users').select('*');
        if (error) {
            console.error("Supabase load error", error);
            loadDataFromLocalStorage();
            return;
        }

        if (u && u.length > 0) {
            // Merge Supabase users with INITIAL_USERS to avoid losing hardcoded ones
            const mergedUsers = [...INITIAL_USERS];
            u.forEach(dbUser => {
                const dbEmailLower = dbUser.email ? dbUser.email.toLowerCase() : '';
                const idx = mergedUsers.findIndex(mu => mu.email.toLowerCase() === dbEmailLower);
                if (idx !== -1) mergedUsers[idx] = dbUser;
                else mergedUsers.push(dbUser);
            });
            users = mergedUsers;
            const { data: c } = await supabaseSvc.from('clients').select('*');
            if (c) clients = c;
            const { data: i } = await supabaseSvc.from('incidents').select('*');
            if (i) incidents = i;
            const { data: logs } = await supabaseSvc.from('audit_logs').select('*');
            if (logs) auditLogs = logs;
            const { data: proj } = await supabaseSvc.from('projects').select('*');
            if (proj) projects = proj;
            console.log("Data loaded from Supabase");

            // Purge old audit logs (older than 30 days)
            await purgeOldLogs();

            // If only the default SQL admin is present, suggest migration of local data if exists
            if (u.length === 1 && u[0].email === 'admin@altim.com') {
                await checkAndMigrateLocalData(true);
            }
        } else {
            await checkAndMigrateLocalData();
        }

        if (currentUser) {
            loadIncidents();
            loadClients();
            loadUsers();
        }
    } catch (e) {
        console.error("Exception in loadFromSupabase", e);
        loadDataFromLocalStorage();
    }
}

async function checkAndMigrateLocalData(isOptional = false) {
    const saved = localStorage.getItem('ALTIM_DATA');
    const dataToMigrate = saved ? JSON.parse(saved) : { users: users, clients: clients, incidents: incidents };

    if (supabaseSvc) {
        try {
            if (dataToMigrate.users && dataToMigrate.users.length > 0) {
                const message = isOptional ?
                    "Tu base de datos en Supabase solo tiene el usuario por defecto. ¿Deseas subir tus datos locales para sincronizarlos?" :
                    "Se ha detectado una conexión a Supabase pero la base de datos está vacía. ¿Deseas subir tus datos locales a la nube?";

                if (confirm(message)) {
                    console.log("Migrating data to Supabase...");
                    if (dataToMigrate.clients && dataToMigrate.clients.length > 0) {
                        await supabaseSvc.from('clients').insert(dataToMigrate.clients.map(({ id, ...rest }) => rest));
                    }
                    const usersToMigrate = dataToMigrate.users.map(u => ({
                        email: u.email, password: u.password, role: u.role, type: u.type,
                        cliente: u.cliente, cliente_abreviatura: u.clienteAbreviatura || u.cliente_abreviatura,
                        nombre: u.nombre, apellido: u.apellido, direccion: u.direccion, photo: u.photo, phone: u.phone
                    }));
                    if (usersToMigrate.length > 0) {
                        const { data: existing } = await supabaseSvc.from('users').select('email');
                        const existingEmails = (existing || []).map(e => e.email);
                        const filteredUsers = usersToMigrate.filter(u => !existingEmails.includes(u.email));
                        if (filteredUsers.length > 0) await supabaseSvc.from('users').insert(filteredUsers);
                    }
                    if (dataToMigrate.incidents && dataToMigrate.incidents.length > 0) {
                        await supabaseSvc.from('incidents').insert(dataToMigrate.incidents.map(({ id, ...rest }) => rest));
                    }
                    if (dataToMigrate.auditLogs && dataToMigrate.auditLogs.length > 0) {
                        await supabaseSvc.from('audit_logs').insert(dataToMigrate.auditLogs.map(({ id, ...rest }) => ({
                            ...rest,
                            id: undefined // Let Supabase generate ID
                        })));
                    }
                    if (dataToMigrate.projects && dataToMigrate.projects.length > 0) {
                        await supabaseSvc.from('projects').insert(dataToMigrate.projects.map(({ id, ...rest }) => rest));
                    }
                    console.log("Migration complete.");
                }
                await loadFromSupabase();
            }
        } catch (e) { console.error("Migration error", e); }
    }
}

function loadDataFromLocalStorage() {
    const saved = localStorage.getItem('ALTIM_DATA');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.users) {
                const mergedUsers = [...INITIAL_USERS];
                parsed.users.forEach(localUser => {
                    const localEmailLower = localUser.email ? localUser.email.toLowerCase() : '';
                    const idx = mergedUsers.findIndex(mu => mu.email.toLowerCase() === localEmailLower);
                    if (idx !== -1) mergedUsers[idx] = localUser;
                    else mergedUsers.push(localUser);
                });
                users = mergedUsers;
            }
            if (parsed.clients) clients = parsed.clients;
            if (parsed.incidents) incidents = parsed.incidents;
            if (parsed.incidentCounters) incidentCounters = parsed.incidentCounters;
            if (parsed.auditLogs) auditLogs = parsed.auditLogs;
            if (parsed.projects) projects = parsed.projects;
        } catch (e) {
            console.error("Error loading local data", e);
        }
    }
}

// ========================================
// AUDIT LOG FUNCTIONS
// ========================================

/**
 * Purge audit logs older than 30 days
 * Runs automatically on app load and can be scheduled in Supabase
 */
async function purgeOldLogs() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffTimestamp = thirtyDaysAgo.getTime();

    // Filter local logs
    const initialCount = auditLogs.length;
    auditLogs = auditLogs.filter(log => {
        if (!log.timestamp) return true; // Keep logs without timestamp for safety
        return log.timestamp >= cutoffTimestamp;
    });

    const purgedCount = initialCount - auditLogs.length;
    if (purgedCount > 0) {
        console.log(`Purged ${purgedCount} old audit logs (older than 30 days)`);
        saveDataToLocalStorage();
    }

    // Purge from Supabase
    if (supabaseSvc) {
        try {
            const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];
            const { error } = await supabaseSvc
                .from('audit_logs')
                .delete()
                .lt('fecha', cutoffDate);

            if (error) {
                console.error("Error purging old logs from Supabase:", error);
            } else {
                console.log("Supabase audit logs purged successfully");
            }
        } catch (e) {
            console.error("Exception purging Supabase logs:", e);
        }
    }
}

/**
 * Log an action (creation or modification) to the audit log
 * @param {string} action - "Creación" or field name
 * @param {number} incidentId - ID of the incident
 * @param {string} cliente - Client name
 * @param {string} oldValue - Previous value (empty for creation)
 * @param {string} newValue - New value
 */
async function logAuditAction(action, incidentId, cliente, oldValue = '', newValue = '') {
    if (!currentUser) return;

    const now = new Date();
    const logEntry = {
        id: Date.now() + Math.random(), // Unique ID
        usuario: currentUser.email,
        fecha: now.toISOString().split('T')[0], // YYYY-MM-DD
        hora: now.toTimeString().split(' ')[0], // HH:MM:SS
        incidencia_id: incidentId,
        cliente: cliente,
        campo: action,
        valor_origen: oldValue ? String(oldValue) : '',
        valor_final: newValue ? String(newValue) : '',
        timestamp: now.getTime()
    };

    auditLogs.push(logEntry);
    saveDataToLocalStorage();

    // Save to Supabase
    if (supabaseSvc) {
        try {
            const { id, ...dataToInsert } = logEntry; // Remove local ID for Supabase
            await supabaseSvc.from('audit_logs').insert([dataToInsert]);
        } catch (e) {
            console.error("Error saving audit log to Supabase:", e);
        }
    }
}

async function saveData(type, data, isEdit = false, id = null) {
    console.log(`saveData called for ${type}, isEdit: ${isEdit}, id: ${id}`, data);
    if (supabaseSvc) {
        try {
            let result;
            if (isEdit) {
                result = await supabaseSvc.from(type).update(data).eq('id', id).select();
            } else {
                result = await supabaseSvc.from(type).insert([data]).select();
            }
            if (result.error) {
                console.error(`Supabase Error saving ${type}:`, result.error);
                throw result.error;
            }
            console.log(`Supabase Save Success for ${type}`, result.data);
            saveDataToLocalStorage(); // Sync local storage after successful Supabase save
            return result.data && result.data.length > 0 ? result.data[0] : null;
        } catch (e) {
            console.error(`Supabase Save Exception for ${type}`, e);
            throw e;
        }
    } else {
        saveDataToLocalStorage();
        return null;
    }
}

// ========================================
// DROPDOWN OPTIONS
// ========================================
const DROPDOWN_OPTIONS = {
    prioridad: ['Alta', 'Baja', 'Sin prioridad', 'Crítica', 'Media'],
    tipo: ['Consulta', 'Duda', 'Evolutivo', 'Formación', 'Gestión', 'Incidencia', 'Petición', 'Preventiva', 'Proyecto'],
    sistema: ['S/4Hana CP', 'S/4Hana Rise', 'S/4Hana OP', 'Data Warehouse', 'CRM', 'SAC', 'Integration Suite', 'SAP BTP', 'Build'],
    estado: [
        '01 En proceso', '02 Retrasada Altim', '03 Entregada', '04 Pte Info cliente',
        '05 Pte de Pruebas cliente', '06 Retrasada cliente', '07 Parada por cliente',
        '08 Abierta', '09 Nueva', '10 Cerrada', '11 Descartada', '12 Duplicada'
    ],
    lob: [
        'Finanzas', 'Aprovisionamientos', 'Gestión de almacenes', 'Ventas', 'Control de gestión',
        'Fabricación', 'Calidad', 'Proyectos e ingeniería', 'Gestión de activos',
        'Tesorería', 'Recursos humanos', 'Servicios a cliente y CRM', 'Desarrollo a medida', 'Analíticas',
        'BASIS', 'SUCCESSFACTORS', 'MODULO ALTIM', 'OTROS'
    ]
};

// ========================================
// AUTHENTICATION & STARTUP
// ========================================
// Utility to safe-add event listeners
function safeAddEventListener(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener(event, handler);
    } else {
        console.warn(`Element with id "${id}" not found. Skipping listener for "${event}".`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Config (Sync)
    loadAppConfig();

    // 2. Init UI elements that don't depend on data
    initClock();
    if (localStorage.getItem('language')) {
        currentLang = localStorage.getItem('language');
        updateUILanguage();
    }

    // 3. Set up all listeners safely
    setupEventListeners();

    // 4. Check for persisted session
    const savedUser = localStorage.getItem('ALTIM_USER');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showDashboard();
            await loadData();
        } catch (e) {
            console.error("Error restoring session", e);
            localStorage.removeItem('ALTIM_USER');
        }
    }

    // 5. Populate dropdowns (after loadData or if not logged in)
    populateDropdowns();
});

function setupEventListeners() {
    // Language Switchers
    const langSelector = document.querySelector('.language-selector');
    if (langSelector) {
        langSelector.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-btn');
            if (btn) switchLanguage(btn.dataset.lang);
        });
    }

    // Navigation Listeners
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            const target = tab.dataset.tab;

            const viewId = target === 'incidents' ? 'incidentsView' :
                target === 'statistics' ? 'statisticsView' :
                    target === 'managementClients' ? 'managementClientsView' :
                        target === 'managementUsers' ? 'managementUsersView' :
                            target === 'reports' ? 'reportsView' :
                                target === 'modLog' ? 'modLogView' : null;

            if (viewId) {
                const view = document.getElementById(viewId);
                if (view) view.classList.remove('hidden');

                if (target === 'incidents') loadIncidents();
                if (target === 'statistics') calculateStatistics();
                if (target === 'managementClients') loadClients();
                if (target === 'managementUsers') loadUsers();
                if (target === 'reports') loadReports();
                if (target === 'modLog') loadModificationLog();
            }
        });
    });

    // Login
    safeAddEventListener('loginForm', 'submit', (e) => {
        e.preventDefault();
        login(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value);
    });

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🔒';
        });
    }

    // Dashboard Actions
    safeAddEventListener('logoutBtn', 'click', logout);
    safeAddEventListener('configBtn', 'click', openConfigModal);
    safeAddEventListener('profileBtn', 'click', openProfileModal);
    safeAddEventListener('closeProfileModal', 'click', () => document.getElementById('profileModal').classList.remove('show'));
    safeAddEventListener('profileInfoForm', 'submit', handleProfileInfoUpdate);
    safeAddEventListener('profilePasswordForm', 'submit', handleProfilePasswordUpdate);
    safeAddEventListener('profilePhotoInput', 'change', handlePhotoUpload);

    // Management
    safeAddEventListener('clientForm', 'submit', saveClient);
    safeAddEventListener('userForm', 'submit', saveUser);
    safeAddEventListener('userType', 'change', toggleUserClientField);
    safeAddEventListener('userRole', 'change', toggleUserClientField);

    // Incidents
    safeAddEventListener('createIncidentBtn', 'click', () => openIncidentModal());
    safeAddEventListener('editIncidentActionBtn', 'click', () => {
        if (selectedIncidentId) editIncident(selectedIncidentId);
    });
    safeAddEventListener('incidentForm', 'submit', (e) => {
        e.preventDefault();
        saveIncident();
    });
    safeAddEventListener('closeModal', 'click', closeIncidentModal);
    safeAddEventListener('cancelIncidentBtn', 'click', closeIncidentModal);
    safeAddEventListener('aiSuggestionBtn', 'click', handleManualAI);

    // Filters
    safeAddEventListener('searchIncident', 'input', loadIncidents);
    safeAddEventListener('filterClient', 'change', loadIncidents);
    safeAddEventListener('filterLob', 'change', loadIncidents);
    safeAddEventListener('btnApplyReportFilters', 'click', loadReports);
    safeAddEventListener('statsClientSelect', 'change', calculateStatistics);
    safeAddEventListener('btnApplyModLogFilters', 'click', loadModificationLog);
    safeAddEventListener('btnClearModLogFilters', 'click', clearModLogFilters);

    // Projects
    safeAddEventListener('projectForm', 'submit', saveProject);
    safeAddEventListener('filterProjectClient', 'change', loadProjects);
    safeAddEventListener('btnClearProjectFilter', 'click', () => {
        const el = document.getElementById('filterProjectClient');
        if (el) el.value = '';
        loadProjects();
    });
}

function loadAppConfig() {
    const saved = localStorage.getItem('ALTIM_APP_CONFIG');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            CONFIG = { ...CONFIG, ...parsed };
        } catch (e) { console.error("Error loading config", e); }
    }

    initSupabase();
    initEmailJS();
    loadData();
}

function initEmailJS() {
    if (CONFIG.EMAILJS_PUBLIC_KEY) {
        try {
            emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
            console.log("EmailJS initialized");
        } catch (e) {
            console.error("EmailJS initialization error:", e);
        }
    }
}

function initSupabase() {
    if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_KEY) {
        if (!window.supabase) return;
        try {
            supabaseSvc = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            console.log("Supabase client initialized");
        } catch (e) {
            console.error("Supabase initialization error:", e);
        }
    }
}

function saveAppConfig() {
    const setVal = (id, key, fallback = '') => {
        const el = document.getElementById(id);
        if (el) CONFIG[key] = el.value;
    };

    setVal('cfgGeminiKey', 'GEMINI_API_KEY');
    setVal('cfgEmailService', 'EMAILJS_SERVICE_ID');
    setVal('cfgEmailTemplate', 'EMAILJS_TEMPLATE_ID');
    setVal('cfgEmailPublicKey', 'EMAILJS_PUBLIC_KEY');
    setVal('cfgExchangeUser', 'EXCHANGE_USER');
    setVal('cfgExchangePass', 'EXCHANGE_PASS');
    setVal('cfgSupabaseUrl', 'SUPABASE_URL');
    setVal('cfgSupabaseKey', 'SUPABASE_KEY');

    localStorage.setItem('ALTIM_APP_CONFIG', JSON.stringify(CONFIG));
    initSupabase();
    initEmailJS();
    loadData();
    alert(t('config_saved'));
    document.getElementById('configModal').classList.remove('show');
}

function openConfigModal() {
    console.log("Opening configuration modal...");
    const modal = document.getElementById('configModal');
    if (modal) {
        const setElVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val || '';
        };

        setElVal('cfgGeminiKey', CONFIG.GEMINI_API_KEY);
        setElVal('cfgEmailService', CONFIG.EMAILJS_SERVICE_ID);
        setElVal('cfgEmailTemplate', CONFIG.EMAILJS_TEMPLATE_ID);
        setElVal('cfgEmailPublicKey', CONFIG.EMAILJS_PUBLIC_KEY);
        setElVal('cfgExchangeUser', CONFIG.EXCHANGE_USER);
        setElVal('cfgExchangePass', CONFIG.EXCHANGE_PASS);
        setElVal('cfgSupabaseUrl', CONFIG.SUPABASE_URL);
        setElVal('cfgSupabaseKey', CONFIG.SUPABASE_KEY);

        modal.classList.add('show');
    } else {
        console.error("Config modal element not found!");
    }
}

window.openAdminPassModal = function (userId) {
    document.getElementById('adminPassUserId').value = userId;
    document.getElementById('adminNewPass').value = '';
    document.getElementById('adminPassModal').classList.add('show');
};

window.adminUpdatePassword = async function () {
    const userId = document.getElementById('adminPassUserId').value;
    const newPass = document.getElementById('adminNewPass').value;
    if (!newPass) { alert("Ingrese una contraseña"); return; }
    const idx = users.findIndex(u => u.id == userId);
    if (idx !== -1) {
        users[idx].password = newPass;
        await saveData('users', { password: newPass }, true, userId);
        alert("Contraseña actualizada correctamente");
        document.getElementById('adminPassModal').classList.remove('show');
    }
};

async function login(email, password) {
    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password;

    const errorDiv = document.getElementById('loginError');
    if (errorDiv) errorDiv.classList.add('hidden');

    if (supabaseSvc) {
        try {
            const { data, error } = await supabaseSvc.from('users').select('*').eq('email', inputEmail);

            if (data && data.length > 0) {
                const dbUser = data[0];
                if (dbUser.password === inputPassword) {
                    if (dbUser.blocked) {
                        showLoginError("Acceso denegado: Usuario bloqueado.");
                        return false;
                    }
                    currentUser = dbUser;
                    localStorage.setItem('ALTIM_USER', JSON.stringify(currentUser));
                    await loadData();
                    showDashboard();
                    return true;
                } else {
                    showLoginError(t('login_error'));
                    return false;
                }
            }
        } catch (e) {
            console.error("Supabase Login Exception:", e);
        }
    }

    const user = users.find(u => u.email && u.email.toLowerCase() === inputEmail);

    if (user) {
        if (user.password === inputPassword) {
            if (user.blocked) {
                showLoginError("Acceso denegado: Usuario bloqueado.");
                return false;
            }
            currentUser = user;
            localStorage.setItem('ALTIM_USER', JSON.stringify(currentUser));
            showDashboard();
            return true;
        } else {
            showLoginError(t('login_error'));
            return false;
        }
    } else {
        showLoginError(t('login_error'));
        return false;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('ALTIM_USER');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('loginForm').reset();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');

    document.getElementById('userEmail').textContent = currentUser.email;
    const headerRole = document.getElementById('headerUserRole');
    if (headerRole) headerRole.textContent = currentUser.role;

    const clientDisplay = document.getElementById('clientNameDisplay');
    if (currentUser.type === 'CLIENTE') {
        document.getElementById('userClient').textContent = currentUser.cliente;
        clientDisplay.classList.remove('hidden');
    } else {
        clientDisplay.classList.add('hidden');
    }

    const photoImg = document.getElementById('headerUserPhoto');
    const initialsDiv = document.getElementById('headerUserInitials');
    if (currentUser.photo) {
        photoImg.src = currentUser.photo;
        photoImg.classList.remove('hidden');
        initialsDiv.classList.add('hidden');
    } else {
        photoImg.classList.add('hidden');
        initialsDiv.classList.remove('hidden');
        initialsDiv.textContent = currentUser.email.charAt(0).toUpperCase();
    }

    setupRoleBasedUI();
    loadIncidents();
    loadFilterDropdowns(); // Ensure filter loads for non-admins 
    populateDropdowns();
    calculateStatistics();
}

function setupRoleBasedUI() {
    if (!currentUser) return;
    const isAdmin = currentUser.role === 'Administrador';
    const isJefe = currentUser.role === 'Jefe de Proyecto';
    const isConsultor = currentUser.role === 'Consultor';
    const isArea = currentUser.role === 'Responsable de Área';
    const isCliente = currentUser.role === 'Cliente';
    const isAltim = currentUser.type === 'ALTIM';

    // Tabs Visibility
    const tabClients = document.getElementById('tabManagementClients');
    if (tabClients) tabClients.classList.toggle('hidden', !isAdmin);

    const tabUsers = document.getElementById('tabManagementUsers');
    if (tabUsers) tabUsers.classList.toggle('hidden', !(isAdmin || isJefe));

    const tabReports = document.getElementById('tabReports');
    if (tabReports) tabReports.classList.toggle('hidden', isCliente);

    const tabModLog = document.getElementById('tabModLog');
    if (tabModLog) tabModLog.classList.toggle('hidden', isCliente);

    // Projects
    setupProjectRoles();

    // Create Incident Button
    const createBtn = document.getElementById('createIncidentBtn');
    if (createBtn) createBtn.classList.toggle('hidden', !(isAdmin || isJefe || isCliente));

    // Fill management lists if admin
    if (isAdmin) {
        loadClients();
    }
    if (isAdmin || isJefe) {
        loadUsers();
    }

    // Dashboard Filters
    const filterClient = document.getElementById('filterClientContainer');
    if (filterClient) filterClient.classList.toggle('hidden', isCliente);

    const filterLob = document.getElementById('filterLobContainer');
    if (filterLob) filterLob.classList.toggle('hidden', isCliente);

    const statsSelector = document.getElementById('statsClientSelector');
    if (statsSelector) statsSelector.classList.toggle('hidden', isCliente);
}

// ... Sidebar, Profile, Management (Same as before) ...
function loadSidebarSummary() {
    const container = document.getElementById('sidebarContent');
    const MAX_ITEMS = 10;

    let filtered = incidents.filter(i => {
        if (!i.estado) return true;
        return !i.estado.includes('10 Closed') && !i.estado.includes('10 Cerrada') && !i.estado.includes('11');
    });

    if (currentUser.type === 'CLIENTE') {
        filtered = filtered.filter(i => i.cliente === currentUser.cliente);
    }

    filtered.sort((a, b) => new Date(b.fechaIncid) - new Date(a.fechaIncid));
    filtered = filtered.slice(0, MAX_ITEMS);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-muted text-center" style="font-size:0.8rem; padding:10px;">No hay incidencias activas recientes.</div>';
        return;
    }

    container.innerHTML = filtered.map(inc => `
        <div class="sidebar-item" onclick="editIncident(${inc.id}, event)" style="cursor:pointer;">
            <div class="flex-between">
                <span class="sidebar-item-title">${inc.cliente} - ${inc.numero}</span>
                <span style="font-size: 0.7rem; color: var(--primary-color); font-weight: 600;">${inc.proyecto || ''}</span>
            </div>
            <span style="font-size:0.8rem; display:block; color:#666;">${inc.descripcion.substring(0, 40)}${inc.descripcion.length > 40 ? '...' : ''}</span>
            <div class="sidebar-item-meta">
                <span>${inc.estado || 'Nuevo'}</span>
                <span>${inc.prioridad || ''}</span>
            </div>
        </div>
    `).join('');
}


function openProfileModal() {
    // ... Existing Profile Logic ...
    const modal = document.getElementById('profileModal');
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role;
    document.getElementById('profilePhone').value = currentUser.phone || '';
    if (currentUser.type === 'CLIENTE') {
        document.getElementById('profileOrgLabel').textContent = "Cliente:";
        document.getElementById('profileOrg').textContent = currentUser.cliente;
    } else {
        document.getElementById('profileOrgLabel').textContent = "Organización:";
        document.getElementById('profileOrg').textContent = "ALTIM Consulting";
    }
    const photoReview = document.getElementById('profilePhotoReview');
    const initials = document.getElementById('profileInitials');
    if (currentUser.photo) {
        photoReview.src = currentUser.photo;
        photoReview.classList.remove('hidden');
        initials.classList.add('hidden');
    } else {
        photoReview.classList.add('hidden');
        initials.classList.remove('hidden');
    }
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    modal.classList.add('show');
}
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profilePhotoReview').src = e.target.result;
            document.getElementById('profilePhotoReview').classList.remove('hidden');
            document.getElementById('profileInitials').classList.add('hidden');
            currentUser._tempPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    currentUser.phone = document.getElementById('profilePhone').value;
    if (currentUser._tempPhoto) {
        currentUser.photo = currentUser._tempPhoto;
        delete currentUser._tempPhoto;
        document.getElementById('headerUserPhoto').src = currentUser.photo;
        document.getElementById('headerUserPhoto').classList.remove('hidden');
        document.getElementById('headerUserInitials').classList.add('hidden');
    }
    await saveData('users', currentUser, true, currentUser.id);
    alert(t('profile_updated'));
}
async function handleProfilePasswordUpdate(e) {
    e.preventDefault();
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    if (!newPass) return;
    if (newPass !== confirmPass) { alert('Las contraseñas no coinciden'); return; }
    currentUser.password = newPass;
    await saveData('users', { password: newPass }, true, currentUser.id);
    sendEmailNotification(currentUser.email, "Password Changed", "Your password has been successfully updated.");
    alert(t('password_changed'));
    document.getElementById('profileModal').classList.remove('show');
}

function loadClients() {
    const tbody = document.getElementById('clientsList');
    tbody.innerHTML = clients.map(c => `
        <tr><td>${c.nombre}</td><td>${c.abreviatura}</td><td>${c.email}</td><td>${c.telefono}</td><td><button class="btn btn-sm btn-secondary" onclick="editClient(${c.id})">Editar</button></td></tr>`).join('');

    const options = '<option value="">Seleccionar...</option>' + clients.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
    ['userCliente', 'statsClientSelect', 'filterClient', 'reportFilterClient', 'incClienteSelect', 'projectCliente'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = options;
    });

    // Also reload projects list and dropdowns
    loadProjects();
}
window.editClient = function (id) {
    document.getElementById('nav-tab-management').click();
    const client = clients.find(c => c.id === id);
    if (client) {
        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.nombre;
        document.getElementById('clientAbbr').value = client.abreviatura;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientPhone').value = client.telefono;
        document.getElementById('btnSaveClient').textContent = 'Actualizar Cliente';
    }
};
async function saveClient(e) {
    e.preventDefault();
    const id = document.getElementById('clientId').value;
    const data = { nombre: document.getElementById('clientName').value, abreviatura: document.getElementById('clientAbbr').value.toUpperCase(), email: document.getElementById('clientEmail').value, telefono: document.getElementById('clientPhone').value };
    if (id) {
        const idx = clients.findIndex(c => c.id == id);
        if (idx !== -1) {
            clients[idx] = { ...clients[idx], ...data };
            await saveData('clients', clients[idx], true, id);
        }
    } else {
        if (clients.find(c => c.abreviatura === data.abreviatura)) { alert('Abreviatura existente'); return; }
        const newClient = { id: Date.now(), ...data };
        clients.push(newClient);
        incidentCounters[data.abreviatura] = 0;
        await saveData('clients', newClient);
    }
    resetClientForm(); loadClients(); alert(t('client_created'));
}
function resetClientForm() { document.getElementById('clientForm').reset(); document.getElementById('clientId').value = ''; document.getElementById('btnSaveClient').textContent = t('add_client'); }
function toggleUserClientField() {
    const type = document.getElementById('userType').value;
    const role = document.getElementById('userRole').value;
    const row = document.getElementById('userClientRow');
    const select = document.getElementById('userCliente');

    if (type === 'CLIENTE' || role === 'Cliente') {
        row.classList.remove('hidden');
        select.required = true;
    }
    else {
        row.classList.add('hidden');
        select.required = false;
        select.value = '';
    }
}
function loadUsers() {
    const tbody = document.getElementById('usersList');
    if (!tbody) return;
    tbody.innerHTML = users.map(u => {
        const isNotMe = u.email !== currentUser.email;
        const passBtn = (u.role !== 'Administrador') ? `<button class="btn btn-sm btn-secondary" title="Cambiar Password" onclick="openAdminPassModal(${u.id})">🔑</button>` : '';
        const blockText = u.blocked ? 'Desbloquear' : 'Bloquear';
        const blockBtn = isNotMe ? `<button class="btn btn-sm ${u.blocked ? 'btn-success' : 'btn-warning'}" onclick="toggleUserBlock(${u.id})">${blockText}</button>` : '';
        const deleteBtn = isNotMe ? `<button class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})">Borrar</button>` : '';

        return `<tr>
            <td>
                ${u.email}
                ${u.blocked ? ' <span class="badge badge-error" style="font-size:0.6rem; background:red; color:white; padding:2px 4px; border-radius:4px;">BLOQUEADO</span>' : ''}
            </td>
            <td>${u.role}</td>
            <td>${u.type}</td>
            <td>${u.cliente || '-'}</td>
            <td style="display:flex; gap:5px;">
                <button class="btn btn-sm btn-secondary" onclick="editUser(${u.id})">Editar</button>
                ${passBtn}
                <button class="btn btn-sm btn-secondary" onclick="resetUserPassword(${u.id})">Reset</button>
                ${blockBtn}
                ${deleteBtn}
            </td>
        </tr>`;
    }).join('');
    const validAltimUsers = users.filter(u => u.role !== 'Cliente');
    const options = '<option value="">Seleccionar...</option>' + validAltimUsers.map(u => `<option value="${u.email}">${u.email} (${u.role})</option>`).join('');
    const el = document.getElementById('incRespAltim'); if (el) el.innerHTML = options;
}

window.editUser = function (id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('userEditId').value = user.id;
        document.getElementById('userNewEmail').value = user.email;
        document.getElementById('userType').value = user.type;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userNombre').value = user.nombre || '';
        document.getElementById('userApellido').value = user.apellido || '';
        document.getElementById('userDireccion').value = user.direccion || '';

        if (user.type === 'CLIENTE') {
            document.getElementById('userClientRow').classList.remove('hidden');
            document.getElementById('userCliente').value = user.cliente || '';
        } else {
            document.getElementById('userClientRow').classList.add('hidden');
        }

        document.getElementById('btnSaveUser').textContent = 'Actualizar Usuario';
        document.getElementById('btnCancelUser').classList.remove('hidden');
        document.getElementById('userNewEmail').readOnly = true; // Email is key
    }
};

window.resetUserForm = function () {
    document.getElementById('userForm').reset();
    document.getElementById('userEditId').value = '';
    document.getElementById('userNewEmail').readOnly = false;
    document.getElementById('userClientRow').classList.add('hidden');
    document.getElementById('btnSaveUser').textContent = t('add_user');
    document.getElementById('btnCancelUser').classList.add('hidden');
};

async function saveUser(e) {
    e.preventDefault();
    const editId = document.getElementById('userEditId').value;
    const email = document.getElementById('userNewEmail').value;
    const role = document.getElementById('userRole').value;
    const type = document.getElementById('userType').value;
    const clientName = document.getElementById('userCliente').value;
    const nombre = document.getElementById('userNombre').value;
    const apellido = document.getElementById('userApellido').value;
    const direccion = document.getElementById('userDireccion').value;

    let clientAbbr = null;
    if (type === 'CLIENTE' || role === 'Cliente') {
        const c = clients.find(cl => cl.nombre === clientName);
        if (c) clientAbbr = c.abreviatura;
    }

    if (editId) {
        const idx = users.findIndex(u => u.id == editId);
        if (idx !== -1) {
            const updatedUser = {
                ...users[idx],
                role, type, cliente: (type === 'CLIENTE' || role === 'Cliente') ? clientName : null,
                cliente_abreviatura: clientAbbr,
                nombre, apellido, direccion
            };
            users[idx] = updatedUser;
            await saveData('users', updatedUser, true, editId);
            alert('Usuario actualizado correctamente');
        }
    } else {
        if (users.find(u => u.email === email)) { alert('Email ya registrado'); return; }
        const tempPass = 'Alt' + Math.floor(Math.random() * 9000 + 1000);
        const newUser = {
            id: Date.now(), email: email, password: tempPass,
            role: role, type: type,
            cliente: (type === 'CLIENTE' || role === 'Cliente') ? clientName : null,
            cliente_abreviatura: clientAbbr,
            photo: null, phone: '',
            nombre, apellido, direccion
        };
        const appUrl = window.location.origin + window.location.pathname;
        const emailBody = `
            <h2>¡Bienvenido al Portal de Incidencias Altim!</h2>
            <p>Se ha creado tu cuenta con éxito.</p>
            <p><strong>Usuario:</strong> ${email}<br>
            <strong>Contraseña Temporal:</strong> ${tempPass}</p>
            <p>Puedes acceder aquí para completar tu perfil y cambiar la contraseña:</p>
            <p><a href="${appUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Acceder a la Aplicación</a></p>
            <p>O copia este enlace: ${appUrl}</p>
        `;

        users.push(newUser);
        await saveData('users', newUser);
        sendEmailNotification(email, "Bienvenido - Acceso al Sistema", emailBody);
        alert(t('user_created'));
    }
    resetUserForm();
    loadUsers();
}
window.resetUserPassword = async function (userId) {
    if (!confirm("¿Está seguro de enviar un nuevo password por email?")) return;
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
        const newTemp = 'Reset' + Math.floor(Math.random() * 9000);
        const appUrl = window.location.origin + window.location.pathname;
        const emailBody = `
            <h2>Reseteo de Contraseña</h2>
            <p>Se ha generado una nueva clave temporal para tu cuenta.</p>
            <p><strong>Nueva Contraseña:</strong> ${newTemp}</p>
            <p>Accede aquí para cambiarla:</p>
            <p><a href="${appUrl}" style="background-color: #6c757d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Acceder al Sistema</a></p>
        `;

        users[idx].password = newTemp;
        await saveData('users', { password: newTemp }, true, userId);
        sendEmailNotification(users[idx].email, "Reseteo de Contraseña", emailBody);
        alert(t('password_reset'));
    }
};

window.toggleUserBlock = async function (userId) {
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
        const newState = !users[idx].blocked;
        users[idx].blocked = newState;
        await saveData('users', { blocked: newState }, true, userId);
        loadUsers();
        alert(`Usuario ${newState ? 'bloqueado' : 'desbloqueado'} correctamente.`);
    }
};

window.deleteUser = async function (userId) {
    if (!confirm("¿De verdad quiere borrar el usuario? Esta acción no se puede deshacer.")) return;
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
        const userToDelete = users[idx];
        users.splice(idx, 1);

        // Local Save
        saveDataToLocalStorage();

        // Supabase Delete
        if (supabaseSvc) {
            try {
                await supabaseSvc.from('users').delete().eq('id', userId);
            } catch (e) {
                console.error("Error deleting user from Supabase", e);
            }
        }

        loadUsers();
        alert("Usuario borrado correctamente.");
    }
};
function sendEmailNotification(to, subject, body) {
    if (!to || !to.includes('@')) {
        console.warn("Invalid recipient email. Email not sent:", to);
        return;
    }
    if (!CONFIG.EMAILJS_SERVICE_ID || !CONFIG.EMAILJS_TEMPLATE_ID || !CONFIG.EMAILJS_PUBLIC_KEY) {
        console.warn("EmailJS configuration missing. Email not sent:", { to, subject, body });
        return;
    }

    const templateParams = {
        to_email: to,
        subject: subject,
        message: body,
        to_name: to.split('@')[0]
    };

    console.log("Sending email via EmailJS...", templateParams);

    emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
        .then(response => {
            console.log('Email sent successfully!', response.status, response.text);
        }, error => {
            console.error('Email failed to send. Check if your EmailJS Template "To Email" field is set to {{to_email}}', error);
        });
}

// ... Incidents ...
function generateIncidentNumber(clientAbbr) {
    // Count incidents for this client locally (which are synced with Supabase)
    const count = incidents.filter(i => i.numero && i.numero.startsWith(clientAbbr)).length;
    return `${clientAbbr}${String(count + 1).padStart(7, '0')}`;
}
function openIncidentModal(incident = null) {
    const modal = document.getElementById('incidentModal'); const form = document.getElementById('incidentForm'); const isAltim = currentUser.type === 'ALTIM';
    document.getElementById('aiLoading').classList.add('hidden');
    if (!incident) {
        form.reset(); document.getElementById('incidentId').value = ''; document.getElementById('modalTitle').textContent = t('create_incident');
        const r1 = document.getElementById('incidentClientSelectRow'); const s1 = document.getElementById('incClienteSelect');
        if (isAltim) {
            r1.classList.remove('hidden');
            s1.required = true;
            s1.onchange = () => {
                const c = clients.find(cl => cl.nombre === s1.value);
                if (c) {
                    document.getElementById('incCliente').value = c.nombre;
                    document.getElementById('incNumero').value = generateIncidentNumber(c.abreviatura);
                    loadProjectsForIncidentModal(c.nombre);
                }
            };
        }
        else {
            r1.classList.add('hidden');
            s1.required = false;
            document.getElementById('incCliente').value = currentUser.cliente;
            document.getElementById('incNumero').value = generateIncidentNumber(currentUser.cliente_abreviatura);
            loadProjectsForIncidentModal(currentUser.cliente);
        }
        document.getElementById('incFechaIncid').value = new Date().toISOString().split('T')[0]; applyFieldPermissions(false);
    } else {
        document.getElementById('incidentClientSelectRow').classList.add('hidden'); document.getElementById('incidentId').value = incident.id;
        const client = clients.find(cl => cl.nombre === incident.cliente);
        if (client) loadProjectsForIncidentModal(client.nombre);
        Object.keys(incident).forEach(key => { const el = document.getElementById('inc' + key.charAt(0).toUpperCase() + key.slice(1)); if (el) el.value = incident[key]; });
        applyFieldPermissions(true, incident);
    }
    modal.classList.add('show');
}

function loadProjectsForIncidentModal(clientName) {
    const projectSelect = document.getElementById('incProyecto');
    if (!projectSelect) return;
    const filteredProjects = (projects || []).filter(p => p.cliente === clientName);
    projectSelect.innerHTML = '<option value="">Sin proyecto</option>' +
        filteredProjects.map(p => `<option value="${p.denominacion}">${p.denominacion}</option>`).join('');
}

function applyFieldPermissions(isEdit, incident = null) {
    const isClient = currentUser.type === 'CLIENTE';
    const clientReadOnly = ['incPrioridad', 'incSistema', 'incRespAltim', 'incEstado', 'incFechaEntrega', 'incFechaCierre', 'incComentariosFinales', 'incResponsable', 'incTipoAltim'];
    ['incDescripcion', 'incObservaciones', 'incTipo', 'incLob', ...clientReadOnly].forEach(id => { const el = document.getElementById(id); if (el) el.disabled = false; });
    if (isClient) {
        clientReadOnly.forEach(id => { const el = document.getElementById(id); if (el) el.disabled = true; });
        if (isEdit) { ['incDescripcion', 'incObservaciones', 'incTipo', 'incLob'].forEach(id => { const el = document.getElementById(id); if (el) el.disabled = true; }); }
    }

    // AI button should only be visible for ALTIM users (Consultants, Admins, etc.)
    const aiBtn = document.getElementById('aiSuggestionBtn');
    if (aiBtn) {
        const isAltim = currentUser.type === 'ALTIM';
        aiBtn.classList.toggle('hidden', !isAltim);
        console.log("Setting AI button visibility. UserType:", currentUser.type, "hidden:", aiBtn.classList.contains('hidden'));
    }
}
async function saveIncident() {
    try {
        const idField = document.getElementById('incidentId');
        const id = idField ? idField.value : '';
        console.log("saveIncident started. Raw ID from form:", id);

        const isEdit = id !== '';
        // Use the ID as is if it's not numeric, otherwise keep it as a string for comparison 
        // until we find it in the array. Supabase usually provides numeric IDs as numbers,
        // but DOM values are always strings.
        const searchId = isEdit ? id : null;
        console.log("isEdit:", isEdit, "searchId:", searchId);

        const form = document.getElementById('incidentForm');
        if (!form || !form.checkValidity()) {
            console.warn("Form invalid. Browser should show bubbles.");
            form.reportValidity();
            return;
        }

        const data = {
            cliente: document.getElementById('incCliente').value,
            numero: document.getElementById('incNumero').value,
            proyecto: document.getElementById('incProyecto').value,
            fechaIncid: document.getElementById('incFechaIncid').value,
            respCliente: document.getElementById('incRespCliente').value,
            tipo: document.getElementById('incTipo').value,
            tipoAltim: document.getElementById('incTipoAltim').value,
            lob: document.getElementById('incLob').value,
            descripcion: document.getElementById('incDescripcion').value,
            errorMensaje: document.getElementById('incErrorMensaje').value,
            observaciones: document.getElementById('incObservaciones').value,
            prioridad: document.getElementById('incPrioridad').value,
            comentarios: document.getElementById('incComentarios').value,
            sistema: document.getElementById('incSistema').value,
            respAltim: document.getElementById('incRespAltim').value,
            estado: document.getElementById('incEstado').value,
            fechaEntrega: document.getElementById('incFechaEntrega').value,
            fechaCierre: document.getElementById('incFechaCierre').value,
            comentariosFinales: document.getElementById('incComentariosFinales').value,
            responsable: document.getElementById('incResponsable').value
        };

        if (isEdit) {
            // Flexible match for ID (string vs number)
            const idx = incidents.findIndex(i => String(i.id) === String(searchId));
            if (idx !== -1) {
                const oldIncident = incidents[idx];

                // Log each changed field
                const fieldNames = {
                    cliente: 'Cliente',
                    numero: 'Número',
                    proyecto: 'Proyecto',
                    fechaIncid: 'Fecha Incidencia',
                    respCliente: 'Responsable Cliente',
                    tipo: 'Tipo',
                    tipoAltim: 'Tipo ALTIM',
                    lob: 'LoB',
                    descripcion: 'Descripción',
                    errorMensaje: 'Mensaje de Error',
                    observaciones: 'Observaciones',
                    prioridad: 'Prioridad',
                    comentarios: 'Comentarios',
                    sistema: 'Sistema',
                    respAltim: 'Responsable ALTIM',
                    estado: 'Estado',
                    fechaEntrega: 'Fecha Entrega',
                    fechaCierre: 'Fecha Cierre',
                    comentariosFinales: 'Comentarios Finales',
                    responsable: 'Responsable'
                };

                for (const [key, value] of Object.entries(data)) {
                    if (oldIncident[key] !== value) {
                        await logAuditAction(
                            fieldNames[key] || key,
                            oldIncident.id,
                            oldIncident.cliente,
                            oldIncident[key] || '',
                            value || ''
                        );
                    }
                }

                incidents[idx] = { ...incidents[idx], ...data };
                console.log("Updating incident in Supabase...", searchId, data);
                await saveData('incidents', data, true, incidents[idx].id);

                // Trigger automation if Resp Altim is newly assigned
                if (!oldIncident.respAltim && data.respAltim) {
                    automatedAIDiagnosis(incidents[idx].id, incidents[idx]);
                }

                alert(t('incident_updated'));
            } else {
                console.error("Incident not found in local array for update:", numericId);
                alert("Error: No se encontró la incidencia localmente para actualizar.");
            }
        } else {
            console.log("Creating new incident in Supabase...", data);
            const savedItem = await saveData('incidents', data);

            if (savedItem) {
                incidents.push(savedItem);

                // Log creation
                await logAuditAction('Creación', savedItem.id, savedItem.cliente, '', `Incidencia ${savedItem.numero} creada`);

                // Trigger automation if Resp Altim is assigned on creation
                if (savedItem.respAltim) {
                    automatedAIDiagnosis(savedItem.id, savedItem);
                }
            } else {
                const newInc = { id: Date.now(), ...data };
                incidents.push(newInc);
                await logAuditAction('Creación', newInc.id, newInc.cliente, '', `Incidencia ${newInc.numero} creada (Local)`);
            }

            alert(t('incident_created'));
        }
    } catch (err) {
        console.error("Critical error in saveIncident:", err);
        alert("Error al guardar la incidencia: " + err.message);
    } finally {
        closeIncidentModal();
        loadIncidents();
    }
}

async function automatedAIDiagnosis(incidentId, data) {
    console.log("Iniciando diagnóstico automático IA para:", incidentId);
    try {
        // 1. Get AI Suggestion
        const aiText = await generateAISolutions(data, true);
        if (!aiText) return;

        // 2. Update comments locally and in DB
        const header = `\n\n[IA DIAGNÓSTICO PRELIMINAR AUTOMÁTICO]:\n`;
        const fullText = header + aiText;

        const idx = incidents.findIndex(i => i.id == incidentId);
        if (idx !== -1) {
            incidents[idx].comentarios = (incidents[idx].comentarios || "") + fullText;
            await saveData('incidents', { comentarios: incidents[idx].comentarios }, true, incidentId);
            loadIncidents(); // Refresh UI to show the new comment
        }

        // 3. Send Email to Responsable Altim
        if (data.respAltim && data.respAltim.includes('@')) {
            const emailBody = `
                <h2>Diagnóstico Preliminar de IA - Incidencia ${data.numero}</h2>
                <p>Se ha generado un diagnóstico automático para la siguiente incidencia:</p>
                <hr>
                <p><strong>Cliente:</strong> ${data.cliente}</p>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
                <p><strong>Diagnóstico Sugerido:</strong></p>
                <div style="background: #f0f7ff; padding: 15px; border-left: 5px solid #007bff; border-radius: 4px; font-family: sans-serif;">
                    ${aiText.replace(/\n/g, '<br>')}
                </div>
                <p>Por favor, revisa la incidencia en el portal para más detalles.</p>
            `;
            sendEmailNotification(data.respAltim, `Diagnóstico Automático IA - Nº ${data.numero}`, emailBody);
        }
    } catch (e) {
        console.error("Error in automatedAIDiagnosis:", e);
    }
}
function closeIncidentModal() { document.getElementById('incidentModal').classList.remove('show'); }

function loadIncidents() {
    let filtered = incidents;
    if (currentUser.type === 'CLIENTE') filtered = filtered.filter(i => i.cliente === currentUser.cliente);
    if (currentUser.type === 'ALTIM') {
        const cF = document.getElementById('filterClient').value; const lF = document.getElementById('filterLob').value;
        if (cF) filtered = filtered.filter(i => i.cliente === cF); if (lF) filtered = filtered.filter(i => i.lob === lF);
    }
    const search = document.getElementById('searchIncident').value.toLowerCase();
    if (search) filtered = filtered.filter(i => Object.values(i).some(v => String(v).toLowerCase().includes(search)));

    document.getElementById('incidentsTableBody').innerHTML = filtered.map(inc => `
        <tr class="${getStatusRowClass(inc.estado)} ${selectedIncidentId === inc.id ? 'selected-row' : ''}" onclick="selectIncidentRow(${inc.id}, event)">
            <td>${inc.cliente}</td><td>${inc.numero}</td><td>${inc.proyecto || ''}</td><td>${inc.fechaIncid}</td><td>${inc.respCliente}</td>
            <td>${inc.tipo}</td><td>${inc.tipoAltim || ''}</td><td>${inc.lob}</td><td>${inc.descripcion}</td><td>${inc.errorMensaje || ''}</td>
            <td>${inc.observaciones}</td><td>${inc.prioridad}</td><td>${inc.comentarios || ''}</td>
            <td>${inc.sistema}</td><td>${inc.respAltim || ''}</td>
            <td><span class="${getStatusBadgeClass(inc.estado)}">${inc.estado || ''}</span></td>
            <td>${inc.fechaEntrega || ''}</td><td>${inc.fechaCierre || ''}</td>
            <td>${inc.comentariosFinales || ''}</td><td>${inc.responsable || ''}</td>
            <td><button class="btn btn-sm btn-secondary" onclick="editIncident(${inc.id}, event)">Editar</button></td>
        </tr>
    `).join('');
    loadSidebarSummary();
}
function selectIncidentRow(id, event) { if (event && event.target.tagName === 'BUTTON') return; selectedIncidentId = id; loadIncidents(); document.getElementById('editIncidentActionBtn').disabled = false; document.getElementById('editIncidentActionBtn').style.opacity = '1'; }
window.editIncident = function (id, event) { if (event) event.stopPropagation(); const inc = incidents.find(i => i.id === id); if (inc) openIncidentModal(inc); };
function getStatusRowClass(estado) { if (!estado) return ''; if (estado.includes('10')) return 'status-closed'; if (estado.includes('03')) return 'status-delivered'; if (estado.includes('11')) return 'status-discarded'; if (['04', '05', '06', '07'].some(c => estado.includes(c))) return 'status-pending'; return ''; }
function getStatusBadgeClass(estado) { if (!estado) return 'status-badge'; return `status-badge status-${estado.split(' ')[0]}`; }

function populateDropdowns() {
    ['incTipo', 'incTipoAltim'].forEach(id => fillSelect(id, DROPDOWN_OPTIONS.tipo));
    ['incLob', 'filterLob'].forEach(id => fillSelect(id, DROPDOWN_OPTIONS.lob));
    ['incPrioridad', 'reportFilterPriority'].forEach(id => fillSelect(id, DROPDOWN_OPTIONS.prioridad));
    ['incSistema'].forEach(id => fillSelect(id, DROPDOWN_OPTIONS.sistema));
    ['incEstado', 'reportFilterStatus'].forEach(id => fillSelect(id, DROPDOWN_OPTIONS.estado));
}
function loadFilterDropdowns() { // For non-admin ALTIM
    if (currentUser.type === 'ALTIM' && currentUser.role !== 'Administrador') {
        const options = '<option value="">Todos los Clientes</option>' + clients.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
        ['filterClient', 'statsClientSelect', 'reportFilterClient'].forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = options; });
    }
}
function fillSelect(id, options) { const el = document.getElementById(id); if (el) el.innerHTML = '<option value="">Seleccionar...</option>' + options.map(o => `<option value="${o}">${o}</option>`).join(''); }

function loadReports() {
    let filtered = incidents;
    const client = document.getElementById('reportFilterClient').value; const status = document.getElementById('reportFilterStatus').value; const priority = document.getElementById('reportFilterPriority').value;
    if (client) filtered = filtered.filter(i => i.cliente === client); if (status) filtered = filtered.filter(i => i.estado === status); if (priority) filtered = filtered.filter(i => i.prioridad === priority);
    document.getElementById('reportTableBody').innerHTML = filtered.map(inc => `
        <tr>
            <td>${inc.cliente}</td><td>${inc.numero}</td><td>${inc.proyecto || '-'}</td><td>${inc.fechaIncid}</td>
            <td>${inc.respCliente}</td><td>${inc.tipo}</td><td>${inc.tipoAltim || '-'}</td><td>${inc.lob}</td>
            <td>${inc.descripcion}</td><td>${inc.errorMensaje || '-'}</td><td>${inc.observaciones}</td><td>${inc.prioridad}</td>
            <td>${inc.comentarios || '-'}</td><td>${inc.sistema}</td><td>${inc.respAltim || '-'}</td>
            <td>${inc.estado || '-'}</td><td>${inc.fechaEntrega || '-'}</td><td>${inc.fechaCierre || '-'}</td>
        </tr>`).join('');
}
function calculateStatistics() { /* ... Same stats logic ... */
    // Simplified for brevity, assume exists or I'll copy it later
    let data = incidents;
    if (currentUser.type === 'CLIENTE') {
        data = data.filter(i => i.cliente === currentUser.cliente);
    } else {
        const selectedClient = document.getElementById('statsClientSelect').value;
        if (selectedClient) data = data.filter(i => i.cliente === selectedClient);
    }
    document.getElementById('kpiTotal').textContent = data.length;
    document.getElementById('kpiClosed').textContent = data.filter(i => i.estado && (i.estado.includes('10') || i.estado.includes('Cerrada'))).length;
    document.getElementById('kpiOpen').textContent = data.filter(i => i.estado && !i.estado.includes('10') && !i.estado.includes('Cerrada') && !i.estado.includes('11')).length;
    updateCharts(data);
}
function updateCharts(data) {
    if (typeof Chart === 'undefined') return;
    const counts = { status: {}, priority: {}, type: {}, lob: {} };
    data.forEach(i => {
        counts.status[i.estado || 'Sin estado'] = (counts.status[i.estado || 'Sin estado'] || 0) + 1;
        counts.priority[i.prioridad || 'Sin prioridad'] = (counts.priority[i.prioridad || 'Sin prioridad'] || 0) + 1;
        counts.type[i.tipo || 'Sin tipo'] = (counts.type[i.tipo || 'Sin tipo'] || 0) + 1;
        counts.lob[i.lob || 'Sin LoB'] = (counts.lob[i.lob || 'Sin LoB'] || 0) + 1;
    });
    createChart('chartStatus', 'doughnut', counts.status);
    createChart('chartPriority', 'bar', counts.priority);
    createChart('chartType', 'pie', counts.type);
    createChart('chartLoB', 'bar', counts.lob);
}
function createChart(canvasId, type, dataObj) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (charts[canvasId]) charts[canvasId].destroy();
    charts[canvasId] = new Chart(ctx, { type: type, data: { labels: Object.keys(dataObj), datasets: [{ label: 'Cantidad', data: Object.values(dataObj), backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'], borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false } });
}

function handleManualAI() {
    const data = {
        sistema: document.getElementById('incSistema').value,
        descripcion: document.getElementById('incDescripcion').value,
        errorMensaje: document.getElementById('incErrorMensaje').value,
        observaciones: document.getElementById('incObservaciones').value
    };
    if (!data.descripcion) { alert(t('fill_description_first')); return; }
    if (!CONFIG.GEMINI_API_KEY) { alert('Clave API de Gemini no configurada.'); return; }
    document.getElementById('aiLoading').classList.remove('hidden');
    generateAISolutions(data);
}

async function generateAISolutions(incident, isSilent = false) {
    try {
        if (!CONFIG.GEMINI_API_KEY) { console.log("Gemini API Key missing"); return ""; }

        const prompt = `Actúa como soporte experto de SAP. Analiza la siguiente incidencia y proporciona un diagnóstico preliminar breve:
- Sistema: ${incident.sistema || 'No informado'}
- Descripción: ${incident.descripcion || 'No informado'}
- Mensaje de Error: ${incident.errorMensaje || 'No informado'}
- Observaciones: ${incident.observaciones || 'No informado'}

Sugerencia:`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        if (isSilent) {
            return text;
        } else {
            const commentsEl = document.getElementById('incComentarios');
            if (commentsEl) {
                commentsEl.value += `\n\n[IA DIAGNÓSTICO PRELIMINAR]:\n${text}`;
            }
            document.getElementById('aiLoading').classList.add('hidden');
            alert(t('ai_success'));
            return text;
        }

    } catch (error) {
        console.error("AI Error", error);
        if (!isSilent) {
            document.getElementById('aiLoading').classList.add('hidden');
            alert("Error al generar diagnóstico IA: " + error.message);
        }
        return "";
    }
}

// ========================================
// MODIFICATION LOG FUNCTIONS
// ========================================

function loadModificationLog() {
    // Filter logs to show only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffTimestamp = thirtyDaysAgo.getTime();

    let filtered = auditLogs.filter(log => {
        if (!log.timestamp) return true; // Keep logs without timestamp
        return log.timestamp >= cutoffTimestamp;
    });

    // Apply filters
    const clientFilter = document.getElementById('modLogFilterClient').value;
    const userFilter = document.getElementById('modLogFilterUser').value;
    const fieldFilter = document.getElementById('modLogFilterField').value;
    const dateFilter = document.getElementById('modLogFilterDate').value;

    if (clientFilter) {
        filtered = filtered.filter(log => log.cliente === clientFilter);
    }
    if (userFilter) {
        filtered = filtered.filter(log => log.usuario === userFilter);
    }
    if (fieldFilter) {
        filtered = filtered.filter(log => log.campo === fieldFilter);
    }
    if (dateFilter) {
        filtered = filtered.filter(log => log.fecha === dateFilter);
    }

    // Sort by date and time (newest first)
    filtered.sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA;
    });

    // Get incident number for each log
    const getIncidentNumber = (incidentId) => {
        const inc = incidents.find(i => i.id == incidentId);
        return inc ? inc.numero : `ID:${incidentId}`;
    };

    // Render table
    const tbody = document.getElementById('modLogTableBody');
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#999;">No hay registros de modificaciones en los últimos 30 días</td></tr>';
    } else {
        tbody.innerHTML = filtered.map(log => `
            <tr>
                <td>${log.usuario}</td>
                <td>${log.cliente}</td>
                <td>${getIncidentNumber(log.incidencia_id)}</td>
                <td>${log.fecha}</td>
                <td>${log.hora}</td>
                <td>${log.campo}</td>
                <td>${log.valor_origen || '-'}</td>
                <td>${log.valor_final || '-'}</td>
            </tr>
        `).join('');
    }

    // Populate filter dropdowns
    populateModLogFilters();
}

function populateModLogFilters() {
    console.log("Populating Modification Log filters...");
    // Get unique values for filters
    const uniqueClients = [...new Set(auditLogs.map(log => log.cliente))].filter(Boolean).sort();
    const uniqueUsers = [...new Set(auditLogs.map(log => log.usuario))].filter(Boolean).sort();
    const uniqueFields = [...new Set(auditLogs.map(log => log.campo))].filter(Boolean).sort();

    // Populate client filter
    const clientSelect = document.getElementById('modLogFilterClient');
    if (clientSelect) {
        const current = clientSelect.value;
        clientSelect.innerHTML = '<option value="">Todos</option>' +
            uniqueClients.map(c => `<option value="${c}">${c}</option>`).join('');
        clientSelect.value = current;
    }

    // Populate user filter
    const userSelect = document.getElementById('modLogFilterUser');
    if (userSelect) {
        const current = userSelect.value;
        userSelect.innerHTML = '<option value="">Todos</option>' +
            uniqueUsers.map(u => `<option value="${u}">${u}</option>`).join('');
        userSelect.value = current;
    }

    // Populate field filter
    const fieldSelect = document.getElementById('modLogFilterField');
    if (fieldSelect) {
        const current = fieldSelect.value;
        fieldSelect.innerHTML = '<option value="">Todos</option>' +
            uniqueFields.map(f => `<option value="${f}">${f}</option>`).join('');
        fieldSelect.value = current;
    }
}

function clearModLogFilters() {
    document.getElementById('modLogFilterClient').value = '';
    document.getElementById('modLogFilterUser').value = '';
    document.getElementById('modLogFilterField').value = '';
    const dateFilter = document.getElementById('modLogFilterDate');
    if (dateFilter) dateFilter.value = '';
    loadModificationLog();
}

// ========================================
// PROJECTS MANAGEMENT
// ========================================

async function saveProject(e) {
    if (e) e.preventDefault();
    console.log("Saving project...");

    const data = {
        cliente: document.getElementById('projectCliente').value,
        denominacion: document.getElementById('projectDenominacion').value,
        pep: document.getElementById('projectPep').value
    };

    if (!data.cliente || !data.denominacion || !data.pep) {
        alert("Por favor rellene todos los campos");
        return;
    }

    if (supabaseSvc) {
        try {
            console.log("Attempting to save project to Supabase...", data);
            const savedItem = await saveData('projects', data);
            if (savedItem) {
                projects.push(savedItem);
                console.log("Project saved and synchronized:", savedItem);
            } else {
                // local fallback if saveData returned null but didn't throw
                projects.push({ id: Date.now(), ...data, created_at: new Date().toISOString() });
            }
        } catch (err) {
            console.error("Error saving project to Supabase:", err);
            alert("Error al guardar en la base de datos: " + (err.message || err));
            // Still push locally to avoid total loss if that was the intention originally
            projects.push({ id: Date.now(), ...data, created_at: new Date().toISOString() });
        }
    } else {
        projects.push({ id: Date.now(), ...data, created_at: new Date().toISOString() });
        saveDataToLocalStorage();
    }

    document.getElementById('projectForm').reset();
    loadProjects();
    alert(t('project_created'));
}

function loadProjects() {
    const filterEl = document.getElementById('filterProjectClient');
    if (!filterEl) return;
    const clientFilter = filterEl.value;

    let filtered = projects;
    if (clientFilter) {
        filtered = projects.filter(p => p.cliente === clientFilter);
    }

    const tbody = document.getElementById('projectsList');
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px; color:#999;">${clientFilter ? 'No hay proyectos para este cliente' : 'No hay proyectos registrados'}</td></tr>`;
    } else {
        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td>${p.cliente}</td>
                <td>${p.denominacion}</td>
                <td>${p.pep}</td>
                <td>
                    <button class="btn btn-sm btn-danger btn-delete-project" data-id="${p.id}">
                        ${t('delete')}
                    </button>
                </td>
            </tr>
        `).join('');

        // Add delete event listeners
        document.querySelectorAll('.btn-delete-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                deleteProject(id);
            });
        });
    }

    // Populate client dropdowns if needed
    populateProjectDropdowns();

    // Setup role based visibility for actions
    setupProjectRoles();
}

function populateProjectDropdowns() {
    const clientOptions = '<option value="">' + (t('select') || 'Seleccionar...') + '</option>' +
        clients.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');

    const select = document.getElementById('projectCliente');
    if (select && select.innerHTML === "") {
        select.innerHTML = clientOptions;
    }

    const filterSelect = document.getElementById('filterProjectClient');
    if (filterSelect) {
        const currentFilter = filterSelect.value;
        filterSelect.innerHTML = '<option value="">' + (t('all_clients') || 'Todos los Clientes') + '</option>' +
            clients.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
        filterSelect.value = currentFilter;
    }
}

async function deleteProject(id) {
    if (!confirm(t('delete_project_confirm'))) return;

    const idx = projects.findIndex(p => p.id === id);
    if (idx !== -1) {
        const projectToDelete = projects[idx];
        projects.splice(idx, 1);
        saveDataToLocalStorage();

        if (supabaseSvc) {
            try {
                const { error } = await supabaseSvc.from('projects')
                    .delete()
                    .eq('cliente', projectToDelete.cliente)
                    .eq('denominacion', projectToDelete.denominacion)
                    .eq('pep', projectToDelete.pep);
                if (error) throw error;
            } catch (err) {
                console.error("Error deleting project from Supabase:", err);
            }
        }

        loadProjects();
        alert(t('project_deleted'));
    }
}

function setupProjectRoles() {
    if (!currentUser) return;

    const canManageProjects = currentUser.role === 'Administrador' ||
        currentUser.role === 'Jefe de Proyecto';
    const isCliente = currentUser.role === 'Cliente';

    const projectsSection = document.getElementById('projectsSection');
    const projectForm = document.getElementById('projectForm');

    if (projectsSection) {
        projectsSection.classList.toggle('hidden', isCliente);
    }

    if (projectForm) {
        projectForm.classList.toggle('hidden', !canManageProjects);
    }

    // Hide delete buttons if user can't manage
    document.querySelectorAll('.btn-delete-project').forEach(btn => {
        btn.classList.toggle('hidden', !canManageProjects);
    });
}

window.exportToExcel = function () {
    let filtered = incidents;
    const client = document.getElementById('reportFilterClient').value;
    const status = document.getElementById('reportFilterStatus').value;
    const priority = document.getElementById('reportFilterPriority').value;

    if (client) filtered = filtered.filter(i => i.cliente === client);
    if (status) filtered = filtered.filter(i => i.estado === status);
    if (priority) filtered = filtered.filter(i => i.prioridad === priority);

    const headers = [
        t('col_cliente'), t('col_numero'), t('col_proyecto'), t('col_fecha_incid'),
        t('col_resp_cliente'), t('col_tipo'), t('col_tipo_altim'), t('col_lob'),
        t('col_descripcion'), t('col_error_mensaje'), t('col_observaciones'),
        t('col_prioridad'), t('col_comentarios'), t('col_sistema'),
        t('col_resp_altim'), t('col_estado'), t('col_fecha_entrega'),
        t('col_fecha_cierre'), t('col_comentarios_finales'), t('col_responsable')
    ];

    const rows = filtered.map(inc => [
        inc.cliente, inc.numero, inc.proyecto || '', inc.fechaIncid,
        inc.respCliente, inc.tipo, inc.tipoAltim || '', inc.lob,
        inc.descripcion, inc.errorMensaje || '', inc.observaciones,
        inc.prioridad, inc.comentarios || '', inc.sistema,
        inc.respAltim || '', inc.estado || '', inc.fechaEntrega || '',
        inc.fechaCierre || '', inc.comentariosFinales || '', inc.responsable || ''
    ]);

    // Use semicolon for Excel (CSV in Spanish locale) and add BOM for UTF-8
    let csvContent = "\ufeff" + headers.join(";") + "\n"
        + rows.map(e => e.map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `incidencias_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

