'use strict';
// ========================
// admin.js — لوحة تحكم نِكاح
// ========================

// ===== MOCK DATA =====
const USERS_DATA = [
  { id:1,  name:'عبدالرحمن المطيري',  email:'abdulrahman@mail.com', gender:'male',   nationality:'سعودي',   age:28, type:'فردي',   status:'active',    date:'2025-01-10', bio:'مهندس برمجيات، ملتزم، أبحث عن شريكة حياة تشاركني نفس القيم والمبادئ.', education:'بكالوريوس', religiosity:'ملتزم جداً', city:'الرياض' },
  { id:2,  name:'فاطمة العتيبي',      email:'fatima@mail.com',      gender:'female', nationality:'سعودية',  age:24, type:'عائلي',  status:'pending',   date:'2025-01-14', bio:'معلمة، محبة للقرآن والعلم الشرعي.', education:'بكالوريوس', religiosity:'ملتزمة جداً', city:'جدة' },
  { id:3,  name:'خالد الرشيدي',       email:'khalid@mail.com',      gender:'male',   nationality:'إماراتي', age:32, type:'فردي',   status:'active',    date:'2025-01-08', bio:'رجل أعمال، أبحث عن زواج جاد ومستقر.', education:'ماجستير', religiosity:'ملتزم', city:'دبي' },
  { id:4,  name:'نورة الحربي',        email:'noura@mail.com',       gender:'female', nationality:'سعودية',  age:26, type:'فردي',   status:'active',    date:'2025-01-05', bio:'طبيبة، أبحث عن شريك الحياة الجاد.', education:'دكتوراه', religiosity:'ملتزمة', city:'الرياض' },
  { id:5,  name:'محمد الزهراني',      email:'mohammed@mail.com',    gender:'male',   nationality:'سعودي',   age:30, type:'عائلي',  status:'pending',   date:'2025-01-15', bio:'موظف حكومي، عائلة محترمة تبحث لابنها.', education:'بكالوريوس', religiosity:'ملتزم', city:'مكة' },
  { id:6,  name:'أمينة البلوشي',      email:'amina@mail.com',       gender:'female', nationality:'إماراتية',age:22, type:'فردي',   status:'suspended', date:'2024-12-20', bio:'طالبة جامعية.', education:'بكالوريوس', religiosity:'ملتزمة', city:'أبوظبي' },
  { id:7,  name:'يوسف القحطاني',      email:'yousef@mail.com',      gender:'male',   nationality:'سعودي',   age:35, type:'فردي',   status:'active',    date:'2024-12-18', bio:'أستاذ جامعي، مطلق، يبحث عن بداية جديدة.', education:'دكتوراه', religiosity:'ملتزم جداً', city:'المدينة' },
  { id:8,  name:'ريم الشمري',         email:'reem@mail.com',        gender:'female', nationality:'سعودية',  age:27, type:'عائلي',  status:'pending',   date:'2025-01-16', bio:'مصممة غرافيك، تبحث عن شريك ملتزم.', education:'بكالوريوس', religiosity:'ملتزمة', city:'الرياض' },
  { id:9,  name:'عمر العمري',         email:'omar@mail.com',        gender:'male',   nationality:'أردني',   age:29, type:'فردي',   status:'active',    date:'2024-12-25', bio:'محاسب، ملتزم، يقيم في السعودية.', education:'بكالوريوس', religiosity:'ملتزم', city:'الرياض' },
  { id:10, name:'هند المالكي',        email:'hind@mail.com',        gender:'female', nationality:'سعودية',  age:25, type:'فردي',   status:'active',    date:'2024-12-30', bio:'ممرضة، محجبة، تبحث عن أسرة مستقرة.', education:'دبلوم', religiosity:'ملتزمة', city:'الطائف' },
  { id:11, name:'سلطان الغامدي',      email:'sultan@mail.com',      gender:'male',   nationality:'سعودي',   age:31, type:'عائلي',  status:'active',    date:'2024-12-15', bio:'عائلة تبحث لابنها عن زوجة صالحة.', education:'ماجستير', religiosity:'ملتزم جداً', city:'أبها' },
  { id:12, name:'مريم العجمي',        email:'mariam@mail.com',      gender:'female', nationality:'كويتية',  age:23, type:'فردي',   status:'active',    date:'2024-12-12', bio:'صيدلانية، تبحث عن زواج شرعي جاد.', education:'بكالوريوس', religiosity:'ملتزمة جداً', city:'الكويت' },
];

const CONVERSATIONS_DATA = [
  { id:1, user1:'عبدالرحمن م.', user2:'نورة ح.', messages:14, stage:'serious', lastMsg:'نشكر الله على التوفيق...', flagged:false },
  { id:2, user1:'يوسف ق.',     user2:'هند م.',   messages:7,  stage:'intro',   lastMsg:'السلام عليكم ورحمة الله...', flagged:false },
  { id:3, user1:'عمر ع.',      user2:'ريم ش.',   messages:3,  stage:'intro',   lastMsg:'أهلاً، شاهدت ملفك وأعجبني...', flagged:true },
  { id:4, user1:'خالد ر.',     user2:'مريم ع.',  messages:21, stage:'serious', lastMsg:'تواصلنا مع أهلها...', flagged:false },
];

const REPORTS_DATA = [
  { id:1, type:'محادثة مشبوهة', desc:'المستخدم عمر ع. حاول مشاركة رقم هاتفه في الرسالة الثالثة. تم إيقاف الرسالة تلقائياً.', time:'منذ ساعتين', severity:'high' },
  { id:2, type:'حساب مزيف محتمل', desc:'الحساب #6 أمينة البلوشي — الصورة مطابقة لصورة موجودة على الإنترنت. مطلوب التحقق.', time:'منذ 5 ساعات', severity:'medium' },
];

const FAMILIES_DATA = [
  { id:1, name:'عائلة الزهراني', guardian:'محمد الزهراني', members:['محمد (ولي الأمر)', 'فيصل (ابن)'], status:'active' },
  { id:2, name:'عائلة العتيبي',  guardian:'سعد العتيبي',   members:['سعد (ولي الأمر)', 'فاطمة (ابنة)'], status:'pending' },
  { id:3, name:'عائلة الشمري',   guardian:'ناصر الشمري',   members:['ناصر (ولي الأمر)', 'ريم (ابنة)'], status:'active' },
];

const ACTIVITIES = [
  { text:'<strong>فاطمة العتيبي</strong> سجّلت حساباً جديداً',            time:'منذ 5 دقائق',   color:'#C8973A' },
  { text:'<strong>ريم الشمري</strong> رفعت وثيقة هوية للتحقق',           time:'منذ 18 دقيقة',  color:'#3182CE' },
  { text:'تم تفعيل حساب <strong>نورة الحربي</strong> بنجاح',             time:'منذ 45 دقيقة',  color:'#2F855A' },
  { text:'محادثة جديدة بين <strong>خالد ر.</strong> و<strong>مريم ع.</strong>', time:'منذ ساعة',color:'#1B5E47' },
  { text:'بلاغ جديد: محاولة مشاركة رقم هاتف في المحادثة #3',             time:'منذ ساعتين',    color:'#E53E3E' },
  { text:'<strong>محمد الزهراني</strong> أنشأ حساباً عائلياً',            time:'منذ 3 ساعات',   color:'#9C27B0' },
];

// ===== STATE =====
let state = {
  loggedIn: false,
  users: [...USERS_DATA],
  filter: 'all',
  searchQuery: '',
  sort: 'newest',
  currentPage: 1,
  perPage: 8,
  selectedUsers: new Set(),
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initDate();
  initSidebarNav();
  initSidebarToggle();
  initModal();
  initSettings();
  initGlobalSearch();
});

// ===== DATE =====
function initDate() {
  const el = document.getElementById('currentDate');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('ar-SA', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }
}

// ===== LOGIN =====
function initLogin() {
  const form = document.getElementById('loginForm');
  const toggleBtn = document.getElementById('togglePass');

  toggleBtn?.addEventListener('click', () => {
    const pass = document.getElementById('adminPass');
    pass.type = pass.type === 'password' ? 'text' : 'password';
    toggleBtn.textContent = pass.type === 'password' ? '👁' : '🙈';
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();
    const errorEl = document.getElementById('loginError');
    const btn = document.getElementById('loginBtn');

    errorEl.textContent = '';
    btn.textContent = '...جارٍ التحقق';
    btn.disabled = true;

    setTimeout(() => {
      if (user === 'admin' && pass === 'admin123') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminLayout').style.display = 'flex';
        state.loggedIn = true;
        renderDashboard();
      } else {
        errorEl.textContent = '❌ اسم المستخدم أو كلمة المرور غير صحيحة';
        btn.textContent = 'دخول';
        btn.disabled = false;
        shakeCard();
      }
    }, 900);
  });

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

function shakeCard() {
  const card = document.getElementById('loginCard');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = 'shake .4s ease';
}

function logout() {
  state.loggedIn = false;
  document.getElementById('adminLayout').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminUser').value = '';
  document.getElementById('adminPass').value = '';
  document.getElementById('loginError').textContent = '';
}

// ===== SIDEBAR NAV =====
function initSidebarNav() {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateTo(page);
    });
  });

  document.querySelectorAll('.view-all').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(a.dataset.page);
    });
  });
}

function navigateTo(page) {
  // Update sidebar links
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`nav-${page}`)?.classList.add('active');

  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');

  // Update topbar title
  const titles = {
    dashboard: 'لوحة التحكم',
    users: 'إدارة المستخدمين',
    pending: 'بانتظار المراجعة',
    families: 'الحسابات العائلية',
    messages: 'مراقبة المحادثات',
    reports: 'البلاغات',
    settings: 'إعدادات الموقع',
  };
  document.getElementById('topbarTitle').textContent = titles[page] || '';

  // Render page
  const renderers = {
    dashboard: renderDashboard,
    users: renderUsersPage,
    pending: renderPendingPage,
    families: renderFamiliesPage,
    messages: renderMessagesPage,
    reports: renderReportsPage,
    settings: loadWaSettings,
  };
  renderers[page]?.();

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

function initSidebarToggle() {
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

// ===== DASHBOARD =====
function renderDashboard() {
  const all = state.users;
  const active = all.filter(u => u.status === 'active');
  const pending = all.filter(u => u.status === 'pending');

  animateVal('s-total', all.length);
  animateVal('s-active', active.length);
  animateVal('s-pending', pending.length);
  animateVal('s-marriages', 3241);

  renderQuickPending(pending);
  renderActivity();
}

function animateVal(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString('ar-SA');
    if (start >= target) clearInterval(timer);
  }, 40);
}

function renderQuickPending(pending) {
  const container = document.getElementById('quickPending');
  if (!container) return;

  const colors = ['#1B5E47','#C8973A','#3182CE'];
  container.innerHTML = pending.slice(0,3).map((u, i) => `
    <div class="pending-mini" id="qp-${u.id}">
      <div class="pending-mini-avatar" style="background:${colors[i % colors.length]}">${u.name[0]}</div>
      <div class="pending-mini-info">
        <strong>${u.name}</strong>
        <span>${u.nationality} · ${u.age} سنة · ${u.type}</span>
      </div>
      <div class="pending-mini-actions">
        <button class="mini-approve action-btn" title="قبول" onclick="quickApprove(${u.id})">✅</button>
        <button class="mini-reject action-btn" title="رفض" onclick="quickReject(${u.id})">❌</button>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-3);padding:1rem">لا توجد طلبات معلّقة 🎉</p>';
}

function renderActivity() {
  const container = document.getElementById('activityList');
  if (!container) return;
  container.innerHTML = ACTIVITIES.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </div>
  `).join('');
}

// ===== USERS PAGE =====
function renderUsersPage() {
  renderUsersTable();
  initUsersFilters();
  initUsersSearch();
  initSelectAll();
  initSortSelect();
  initAddUserBtn();
}

function getFilteredUsers() {
  let users = [...state.users];

  // Filter by tab
  if (state.filter === 'active')    users = users.filter(u => u.status === 'active');
  else if (state.filter === 'pending')   users = users.filter(u => u.status === 'pending');
  else if (state.filter === 'suspended') users = users.filter(u => u.status === 'suspended');
  else if (state.filter === 'male')      users = users.filter(u => u.gender === 'male');
  else if (state.filter === 'female')    users = users.filter(u => u.gender === 'female');

  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    users = users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.nationality.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.sort === 'newest') users.sort((a,b) => new Date(b.date) - new Date(a.date));
  else if (state.sort === 'oldest') users.sort((a,b) => new Date(a.date) - new Date(b.date));
  else if (state.sort === 'name') users.sort((a,b) => a.name.localeCompare(b.name, 'ar'));

  return users;
}

function renderUsersTable() {
  const filtered = getFilteredUsers();
  const start = (state.currentPage - 1) * state.perPage;
  const page = filtered.slice(start, start + state.perPage);
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  tbody.innerHTML = page.map(u => {
    const statusMap = {
      active: '<span class="status-badge status-active">● مفعّل</span>',
      pending: '<span class="status-badge status-pending">● انتظار</span>',
      suspended: '<span class="status-badge status-suspended">● موقوف</span>',
    };
    const genderBadge = u.gender === 'male'
      ? '<span class="gender-badge gender-m">ذكر</span>'
      : '<span class="gender-badge gender-f">أنثى</span>';
    const colors = { male:'linear-gradient(135deg,#1B5E47,#2D7A5F)', female:'linear-gradient(135deg,#C8973A,#8B6914)' };

    const checked = state.selectedUsers.has(u.id) ? 'checked' : '';

    return `
    <tr>
      <td><input type="checkbox" class="row-check" data-id="${u.id}" ${checked} onchange="toggleSelect(${u.id})" /></td>
      <td>
        <div class="user-cell">
          <div class="user-cell-avatar" style="background:${colors[u.gender]}">${u.name[0]}</div>
          <div>
            <div class="user-cell-name">${u.name}</div>
            <div class="user-cell-email">${u.email}</div>
          </div>
        </div>
      </td>
      <td>${genderBadge}</td>
      <td>${u.nationality}</td>
      <td>${u.age}</td>
      <td><span class="type-badge">${u.type}</span></td>
      <td style="color:var(--text-3);font-size:.82rem">${u.date}</td>
      <td>${statusMap[u.status]}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-view" title="عرض التفاصيل" onclick="viewUser(${u.id})">👁</button>
          ${u.status !== 'active' ? `<button class="action-btn action-approve" title="تفعيل" onclick="approveUser(${u.id})">✅</button>` : ''}
          ${u.status !== 'suspended' ? `<button class="action-btn action-suspend" title="إيقاف" onclick="suspendUser(${u.id})">⏸</button>` : ''}
          <button class="action-btn action-delete" title="حذف" onclick="deleteUser(${u.id})">🗑</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  renderPagination(filtered.length);
  updateBulkBar();
  updatePendingBadge();
}

function renderPagination(total) {
  const pages = Math.ceil(total / state.perPage);
  const container = document.getElementById('pagination');
  if (!container) return;

  let html = '';
  if (pages <= 1) { container.innerHTML = ''; return; }

  html += `<button class="page-btn" onclick="goPage(${state.currentPage - 1})" ${state.currentPage === 1 ? 'disabled' : ''}>›</button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="goPage(${state.currentPage + 1})" ${state.currentPage === pages ? 'disabled' : ''}>‹</button>`;
  container.innerHTML = html;
}

window.goPage = function(page) {
  const filtered = getFilteredUsers();
  const pages = Math.ceil(filtered.length / state.perPage);
  if (page < 1 || page > pages) return;
  state.currentPage = page;
  renderUsersTable();
};

function initUsersFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.filter = tab.dataset.filter;
      state.currentPage = 1;
      renderUsersTable();
    });
  });
}

function initUsersSearch() {
  const searchEl = document.getElementById('usersSearch');
  searchEl?.addEventListener('input', () => {
    state.searchQuery = searchEl.value;
    state.currentPage = 1;
    renderUsersTable();
  });
}

function initSortSelect() {
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderUsersTable();
  });
}

function initSelectAll() {
  document.getElementById('selectAll')?.addEventListener('change', (e) => {
    const checks = document.querySelectorAll('.row-check');
    checks.forEach(c => {
      c.checked = e.target.checked;
      const id = parseInt(c.dataset.id);
      e.target.checked ? state.selectedUsers.add(id) : state.selectedUsers.delete(id);
    });
    updateBulkBar();
  });
}

window.toggleSelect = function(id) {
  if (state.selectedUsers.has(id)) state.selectedUsers.delete(id);
  else state.selectedUsers.add(id);
  updateBulkBar();
};

function updateBulkBar() {
  const bar = document.getElementById('bulkBar');
  const count = document.getElementById('selectedCount');
  if (!bar) return;
  if (state.selectedUsers.size > 0) {
    bar.style.display = 'flex';
    count.textContent = `${state.selectedUsers.size} محدد`;
  } else {
    bar.style.display = 'none';
  }
}

window.bulkAction = function(action) {
  if (state.selectedUsers.size === 0) return;
  const ids = [...state.selectedUsers];

  if (action === 'activate') {
    ids.forEach(id => { const u = state.users.find(u => u.id === id); if (u) u.status = 'active'; });
    showToast(`تم تفعيل ${ids.length} مستخدم ✅`, 'success');
  } else if (action === 'suspend') {
    ids.forEach(id => { const u = state.users.find(u => u.id === id); if (u) u.status = 'suspended'; });
    showToast(`تم إيقاف ${ids.length} مستخدم`, 'warning');
  } else if (action === 'delete') {
    if (!confirm(`هل تريد حذف ${ids.length} مستخدم؟`)) return;
    state.users = state.users.filter(u => !ids.includes(u.id));
    showToast(`تم حذف ${ids.length} مستخدم 🗑`, 'error');
  }

  state.selectedUsers.clear();
  renderUsersTable();
};

// ===== USER ACTIONS =====
window.approveUser = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  user.status = 'active';
  renderUsersTable();
  showToast(`✅ تم تفعيل حساب ${user.name}`, 'success');
  updatePendingBadge();
};

window.suspendUser = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  user.status = 'suspended';
  renderUsersTable();
  showToast(`⏸ تم إيقاف حساب ${user.name}`, 'warning');
};

window.deleteUser = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  if (!confirm(`هل تريد حذف حساب "${user.name}"؟ لا يمكن التراجع.`)) return;
  state.users = state.users.filter(u => u.id !== id);
  state.selectedUsers.delete(id);
  renderUsersTable();
  showToast(`🗑 تم حذف حساب ${user.name}`, 'error');
};

window.quickApprove = function(id) {
  approveUser(id);
  const card = document.getElementById(`qp-${id}`);
  card?.remove();
  renderDashboard();
};

window.quickReject = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  user.status = 'suspended';
  showToast(`❌ تم رفض طلب ${user.name}`, 'error');
  const card = document.getElementById(`qp-${id}`);
  card?.remove();
  updatePendingBadge();
};

function updatePendingBadge() {
  const pending = state.users.filter(u => u.status === 'pending').length;
  const badge = document.getElementById('pendingBadge');
  if (badge) badge.textContent = pending;
}

// ===== VIEW USER MODAL =====
window.viewUser = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;

  const statusMap = { active:'مفعّل ✅', pending:'بانتظار المراجعة ⏳', suspended:'موقوف 🚫' };
  const colors = { male:'linear-gradient(135deg,#1B5E47,#2D7A5F)', female:'linear-gradient(135deg,#C8973A,#8B6914)' };

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-user-header">
      <div class="modal-avatar" style="background:${colors[user.gender]}">${user.name[0]}</div>
      <div>
        <div class="modal-user-name">${user.name}</div>
        <div class="modal-user-email">${user.email}</div>
      </div>
      <span class="status-badge ${user.status === 'active' ? 'status-active' : user.status === 'pending' ? 'status-pending' : 'status-suspended'}" style="margin-right:auto">
        ${statusMap[user.status]}
      </span>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><span class="mil">الجنسية</span><span class="miv">${user.nationality}</span></div>
      <div class="modal-info-item"><span class="mil">العمر</span><span class="miv">${user.age} سنة</span></div>
      <div class="modal-info-item"><span class="mil">نوع الحساب</span><span class="miv">${user.type}</span></div>
      <div class="modal-info-item"><span class="mil">المدينة</span><span class="miv">${user.city}</span></div>
      <div class="modal-info-item"><span class="mil">التعليم</span><span class="miv">${user.education}</span></div>
      <div class="modal-info-item"><span class="mil">الالتزام الديني</span><span class="miv">${user.religiosity}</span></div>
      <div class="modal-info-item"><span class="mil">تاريخ التسجيل</span><span class="miv">${user.date}</span></div>
      <div class="modal-info-item"><span class="mil">الجنس</span><span class="miv">${user.gender === 'male' ? 'ذكر' : 'أنثى'}</span></div>
    </div>
    ${user.bio ? `
    <div class="modal-bio">
      <div class="modal-bio-label">نبذة شخصية:</div>
      ${user.bio}
    </div>` : ''}
    <div class="modal-actions">
      ${user.status !== 'active' ? `<button class="modal-btn approve" onclick="approveUser(${user.id});closeModal()">✅ تفعيل الحساب</button>` : ''}
      ${user.status !== 'suspended' ? `<button class="modal-btn suspend" onclick="suspendUser(${user.id});closeModal()">⏸ إيقاف الحساب</button>` : ''}
      <button class="modal-btn delete" onclick="deleteUser(${user.id});closeModal()">🗑 حذف</button>
      <button class="modal-btn cancel" onclick="closeModal()">إغلاق</button>
    </div>
  `;

  openModal();
};

// ===== ADD USER =====
function initAddUserBtn() {
  document.getElementById('btnAddUser')?.addEventListener('click', showAddUserForm);
}

function showAddUserForm() {
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="add-user-form">
      <h2>➕ إضافة مستخدم جديد</h2>
      <div class="form-pair">
        <div class="add-field">
          <label>الاسم الكامل *</label>
          <input type="text" id="nu-name" placeholder="الاسم الكامل" />
        </div>
        <div class="add-field">
          <label>البريد الإلكتروني *</label>
          <input type="email" id="nu-email" placeholder="example@mail.com" />
        </div>
      </div>
      <div class="form-pair">
        <div class="add-field">
          <label>الجنسية</label>
          <select id="nu-nat">
            <option>سعودي/ة</option><option>إماراتي/ة</option><option>مصري/ة</option>
            <option>أردني/ة</option><option>كويتي/ة</option><option>أخرى</option>
          </select>
        </div>
        <div class="add-field">
          <label>الجنس</label>
          <select id="nu-gender">
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
      </div>
      <div class="form-pair">
        <div class="add-field">
          <label>العمر</label>
          <input type="number" id="nu-age" placeholder="العمر" min="18" max="70" value="25" />
        </div>
        <div class="add-field">
          <label>نوع الحساب</label>
          <select id="nu-type">
            <option>فردي</option>
            <option>عائلي</option>
          </select>
        </div>
      </div>
      <div class="add-field">
        <label>الحالة</label>
        <select id="nu-status">
          <option value="active">مفعّل</option>
          <option value="pending">انتظار المراجعة</option>
        </select>
      </div>
      <div class="modal-actions" style="margin-top:.5rem">
        <button class="modal-btn approve" onclick="saveNewUser()">💾 حفظ المستخدم</button>
        <button class="modal-btn cancel" onclick="closeModal()">إلغاء</button>
      </div>
    </div>
  `;
  openModal();
}

window.saveNewUser = function() {
  const name   = document.getElementById('nu-name')?.value.trim();
  const email  = document.getElementById('nu-email')?.value.trim();
  const nat    = document.getElementById('nu-nat')?.value;
  const gender = document.getElementById('nu-gender')?.value;
  const age    = parseInt(document.getElementById('nu-age')?.value) || 25;
  const type   = document.getElementById('nu-type')?.value;
  const status = document.getElementById('nu-status')?.value;

  if (!name || !email) { showToast('الاسم والبريد مطلوبان ⚠️', 'warning'); return; }

  const newUser = {
    id: Math.max(...state.users.map(u => u.id)) + 1,
    name, email, nationality: nat, gender, age, type, status,
    date: new Date().toISOString().split('T')[0],
    bio: '', education: 'بكالوريوس', religiosity: 'ملتزم', city: 'غير محدد',
  };

  state.users.unshift(newUser);
  closeModal();
  renderUsersTable();
  showToast(`✅ تم إضافة ${name} بنجاح`, 'success');
};

// ===== PENDING PAGE =====
function renderPendingPage() {
  const pending = state.users.filter(u => u.status === 'pending');
  const container = document.getElementById('pendingCards');
  if (!container) return;

  const colors = ['#1B5E47','#C8973A','#3182CE','#9C27B0'];

  container.innerHTML = pending.length === 0
    ? '<div style="text-align:center;padding:3rem;color:var(--text-3)">🎉 لا توجد طلبات معلّقة!</div>'
    : pending.map((u, i) => `
      <div class="pending-card" id="pc-${u.id}">
        <div class="pending-card-header">
          <div class="pending-card-avatar" style="background:${colors[i % colors.length]}">${u.name[0]}</div>
          <div>
            <div class="pending-card-name">${u.name}</div>
            <div class="pending-card-meta">${u.nationality} · ${u.age} سنة · ${u.gender === 'male' ? 'ذكر' : 'أنثى'}</div>
          </div>
        </div>
        <div class="pending-card-body">
          <div class="pending-info-grid">
            <div class="pending-info-item"><span class="pil">التعليم</span><span class="piv">${u.education}</span></div>
            <div class="pending-info-item"><span class="pil">الالتزام</span><span class="piv">${u.religiosity}</span></div>
            <div class="pending-info-item"><span class="pil">النوع</span><span class="piv">${u.type}</span></div>
            <div class="pending-info-item"><span class="pil">التسجيل</span><span class="piv">${u.date}</span></div>
          </div>
          ${u.bio ? `<p style="font-size:.85rem;color:var(--text-2);margin-bottom:1rem;line-height:1.6">"${u.bio}"</p>` : ''}
          <div class="pending-card-actions">
            <button class="btn-full-approve" onclick="pendingApprove(${u.id})">✅ قبول وتفعيل</button>
            <button class="btn-full-reject" onclick="pendingReject(${u.id})">❌ رفض</button>
          </div>
        </div>
      </div>
    `).join('');
}

window.pendingApprove = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  user.status = 'active';
  document.getElementById(`pc-${id}`)?.remove();
  showToast(`✅ تم تفعيل حساب ${user.name} بنجاح`, 'success');
  updatePendingBadge();
  if (document.querySelectorAll('[id^="pc-"]').length === 0) {
    document.getElementById('pendingCards').innerHTML =
      '<div style="text-align:center;padding:3rem;color:var(--text-3)">🎉 لا توجد طلبات معلّقة!</div>';
  }
};

window.pendingReject = function(id) {
  const user = state.users.find(u => u.id === id);
  if (!user) return;
  user.status = 'suspended';
  document.getElementById(`pc-${id}`)?.remove();
  showToast(`❌ تم رفض طلب ${user.name}`, 'error');
  updatePendingBadge();
};

// ===== FAMILIES PAGE =====
function renderFamiliesPage() {
  const container = document.getElementById('familiesGrid');
  if (!container) return;
  container.innerHTML = FAMILIES_DATA.map(f => `
    <div class="family-card">
      <div class="family-header">
        <div class="family-icon">👨‍👩‍👧‍👦</div>
        <div>
          <div class="family-name">${f.name}</div>
          <div class="family-members">ولي الأمر: ${f.guardian}</div>
        </div>
        <span class="status-badge ${f.status === 'active' ? 'status-active' : 'status-pending'}" style="margin-right:auto">
          ${f.status === 'active' ? 'مفعّل' : 'انتظار'}
        </span>
      </div>
      <div class="family-member-list">
        ${f.members.map(m => `
          <div class="family-member">
            <span>👤</span>
            <span>${m.split(' (')[0]}</span>
            <span class="fm-role">${m.includes('ولي') ? 'ولي الأمر' : m.includes('ابن') ? 'ابن' : 'ابنة'}</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:.5rem">
        ${f.status === 'pending' ? `<button class="btn-full-approve" style="flex:1;padding:.6rem" onclick="showToast('تم تفعيل عائلة ${f.name}','success')">✅ تفعيل</button>` : ''}
        <button class="btn-full-reject" style="flex:1;padding:.6rem" onclick="showToast('تم إيقاف العائلة','warning')">⏸ إيقاف</button>
      </div>
    </div>
  `).join('');
}

// ===== MESSAGES PAGE =====
function renderMessagesPage() {
  const container = document.getElementById('conversationsList');
  if (!container) return;
  const colors = ['#1B5E47','#C8973A','#3182CE'];
  container.innerHTML = CONVERSATIONS_DATA.map((c, i) => `
    <div class="convo-card" onclick="showToast('عرض المحادثة غير متاح في النسخة التجريبية','info')">
      <div class="convo-avatars">
        <div class="convo-av" style="background:${colors[i%colors.length]}">${c.user1[0]}</div>
        <div class="convo-av" style="background:${colors[(i+1)%colors.length]}">${c.user2[0]}</div>
      </div>
      <div class="convo-info">
        <div class="convo-names">${c.user1} ↔ ${c.user2}</div>
        <div class="convo-last">${c.lastMsg.substring(0,50)}...</div>
      </div>
      <div class="convo-meta">
        <div class="convo-count">${c.messages}</div>
        <div class="convo-stage ${c.stage === 'serious' ? 'stage-serious' : 'stage-intro'}">
          ${c.stage === 'serious' ? 'جدية' : 'تعارف'}
        </div>
      </div>
      ${c.flagged ? '<div class="convo-flag">🚨 مشبوه</div>' : ''}
    </div>
  `).join('');
}

// ===== REPORTS PAGE =====
function renderReportsPage() {
  const container = document.getElementById('reportsList');
  if (!container) return;
  container.innerHTML = REPORTS_DATA.map(r => `
    <div class="report-card" id="report-${r.id}">
      <div class="report-icon">${r.severity === 'high' ? '🚨' : '⚠️'}</div>
      <div class="report-info">
        <div class="report-title">${r.type}</div>
        <div class="report-desc">${r.desc}</div>
        <div class="report-meta">
          <span class="report-time">🕐 ${r.time}</span>
          <span class="status-badge ${r.severity === 'high' ? 'status-suspended' : 'status-pending'}">
            ${r.severity === 'high' ? 'عالي الخطورة' : 'متوسط'}
          </span>
        </div>
      </div>
      <div class="report-actions">
        <button class="btn-investigate" onclick="investigateReport(${r.id})">🔍 تحقيق</button>
        <button class="btn-dismiss" onclick="dismissReport(${r.id})">✓ إغلاق</button>
      </div>
    </div>
  `).join('');

  document.getElementById('reportsBadge').textContent = REPORTS_DATA.length;
}

window.investigateReport = function(id) {
  showToast('تم فتح ملف التحقيق 🔍', 'info');
};

window.dismissReport = function(id) {
  document.getElementById(`report-${id}`)?.remove();
  const remaining = document.querySelectorAll('[id^="report-"]').length;
  document.getElementById('reportsBadge').textContent = remaining;
  showToast('تم إغلاق البلاغ ✓', 'success');
};

// ===== MODAL =====
function openModal() {
  document.getElementById('userModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('userModal').classList.remove('open');
  document.body.style.overflow = '';
}

window.closeModal = closeModal;

function initModal() {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('userModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('userModal')) closeModal();
  });
}

// ===== SETTINGS =====
function initSettings() {
  document.getElementById('relWeight')?.addEventListener('input', function() {
    document.getElementById('relWeightVal').textContent = this.value + '%';
  });
  document.getElementById('ageWeight')?.addEventListener('input', function() {
    document.getElementById('ageWeightVal').textContent = this.value + '%';
  });
}

// ===== GLOBAL SEARCH =====
function initGlobalSearch() {
  document.getElementById('globalSearch')?.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length < 2) return;
    state.searchQuery = q;
    navigateTo('users');
  });
}

// ===== TOAST =====
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// ===== WHATSAPP API SETTINGS =====
const WA_API_URL = 'https://wats-enzn.onrender.com/api/v1/send';
const DEFAULT_TOKEN = 'sau11zbtz1ruma8o2k5tt';

function getStoredToken() {
  return localStorage.getItem('nikah_wa_token') || DEFAULT_TOKEN;
}

// Load saved token on settings page open
function loadWaSettings() {
  const input = document.getElementById('waTokenInput');
  if (input) input.value = getStoredToken();
  checkWaStatus();
}

// Check API status
async function checkWaStatus() {
  const dot = document.getElementById('waDot');
  const txt = document.getElementById('waStatusText');
  if (!dot || !txt) return;

  dot.className = 'wa-dot checking';
  txt.textContent = 'جارٍ التحقق من الاتصال...';

  try {
    const res = await fetch(WA_API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getStoredToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: '966500000000', message: 'ping' }),
      signal: AbortSignal.timeout(8000),
    });
    // Any response (even 4xx) means server is reachable
    dot.className = 'wa-dot online';
    txt.textContent = `✅ الخادم متصل — Status: ${res.status}`;
    addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Connection OK — HTTP ${res.status}`);
  } catch (err) {
    dot.className = 'wa-dot offline';
    txt.textContent = '❌ تعذّر الاتصال بالخادم';
    addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Error: ${err.message}`, 'err');
  }
}

window.saveWaToken = function() {
  const input = document.getElementById('waTokenInput');
  const val = input?.value?.trim();
  if (!val || val.length < 10) {
    showToast('الرمز قصير جداً ⚠️', 'warning');
    return;
  }
  localStorage.setItem('nikah_wa_token', val);
  showToast('✅ تم حفظ التوكن بنجاح وتطبيقه على الموقع', 'success');
  addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Token updated by admin`, 'warn');
  checkWaStatus();
};

window.toggleTokenVisibility = function() {
  const input = document.getElementById('waTokenInput');
  const btn = document.getElementById('tokenEye');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
};

window.copyToken = function() {
  const input = document.getElementById('waTokenInput');
  if (!input) return;
  const val = input.value;
  navigator.clipboard.writeText(val).then(() => {
    showToast('📋 تم نسخ التوكن', 'info');
  }).catch(() => {
    // Fallback
    input.type = 'text';
    input.select();
    document.execCommand('copy');
    showToast('📋 تم نسخ التوكن', 'info');
  });
};

window.testWaApi = async function() {
  const btn = document.querySelector('.btn-test-wa');
  btn.textContent = '⏳ جارٍ الاختبار...';
  btn.disabled = true;

  const testNum = prompt('أدخل رقم واتساب للاختبار (مع مفتاح الدولة):\nمثال: 966501234567');
  if (!testNum) { btn.textContent = '🧪 اختبار الاتصال'; btn.disabled = false; return; }

  const cleanNum = testNum.replace(/\D/g, '');
  const token = getStoredToken();

  addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Testing → ${cleanNum}`);

  try {
    const res = await fetch(WA_API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: cleanNum, message: '🧪 رسالة اختبار من لوحة تحكم منصة نِكاح\nالإدارة تتحقق من عمل الـ API بشكل صحيح.' }),
    });

    if (res.ok) {
      showToast(`✅ تم إرسال رسالة الاختبار إلى ${cleanNum}`, 'success');
      addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Test sent OK — HTTP ${res.status}`);
    } else {
      const err = await res.json().catch(() => ({}));
      showToast(`❌ فشل الإرسال: ${err.message || res.status}`, 'error');
      addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Test failed — ${res.status}: ${err.message || ''}`, 'err');
    }
  } catch (err) {
    showToast(`❌ خطأ في الاتصال: ${err.message}`, 'error');
    addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] Network error: ${err.message}`, 'err');
  }

  btn.textContent = '🧪 اختبار الاتصال';
  btn.disabled = false;
};

window.generateNewToken = function() {
  if (!confirm('⚠️ توليد توكن جديد سيُبطل التوكن الحالي. هل تريد الاستمرار؟')) return;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const newToken = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const input = document.getElementById('waTokenInput');
  if (input) { input.value = newToken; input.type = 'text'; }
  showToast('🔄 تم توليد توكن جديد — لا تنسَ حفظه!', 'warning');
  addWaLog(`[${new Date().toLocaleTimeString('ar-SA')}] New token generated (not saved yet)`, 'warn');
};

function addWaLog(msg, type = '') {
  const log = document.getElementById('waLog');
  if (!log) return;
  log.classList.add('visible');
  const entry = document.createElement('div');
  entry.className = `wa-log-entry${type ? ' ' + type : ''}`;
  entry.textContent = msg;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== INJECT SHAKE ANIM =====
const style = document.createElement('style');
style.textContent = `@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-10px)}
  40%{transform:translateX(10px)}
  60%{transform:translateX(-8px)}
  80%{transform:translateX(8px)}
}`;
document.head.appendChild(style);

