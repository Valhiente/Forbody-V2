import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  addDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ==========================================
// 1. FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
  // PLACEHOLDER: Adicione as credenciais do seu projeto Firebase
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ==========================================
// 2. GLOBAL STATE & DOM
// ==========================================
let allMedia = [];
let filteredMedia = [];
let currentPage = 1;
const itemsPerPage = 8;
let currentFilter = 'all';
let unsubscribeSnapshot = null;
let unsubscribeLogs = null;
let currentUser = null;
let currentRole = 'admin';
let isViewingLixeira = false;

// Chart Instance
let uploadsChartInstance = null;

// Modals State
let itemToDelete = null;
let itemToEdit = null;
let selectedFiles = []; // For multiple uploads

const DOM = {
  html: document.documentElement,
  body: document.getElementById('dashboardBody'),
  loginForm: document.getElementById('adminLoginForm'),
  logoutBtn: document.getElementById('logoutBtn'),
  userRoleBadge: document.getElementById('userRoleBadge'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  
  // Upload
  uploadForm: document.getElementById('uploadForm'),
  fileInput: document.getElementById('fileInput'),
  uploadProgress: document.getElementById('uploadProgress'),
  progressBar: document.getElementById('progressBar'),
  progressText: document.getElementById('progressText'),
  progressPercent: document.getElementById('progressPercent'),
  previewImage: document.getElementById('previewImage'),
  previewContainer: document.getElementById('previewContainer'),
  previewText: document.getElementById('previewText'),
  multiPreview: document.getElementById('multiPreview'),
  dropZone: document.getElementById('dropZone'),
  uploadBtn: document.getElementById('uploadBtn'),
  
  // Gallery
  imageGallery: document.getElementById('imageGallery'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  categoryFilters: document.getElementById('categoryFilters'),
  paginationInfo: document.getElementById('paginationInfo'),
  prevPage: document.getElementById('prevPage'),
  nextPage: document.getElementById('nextPage'),
  toggleLixeiraBtn: document.getElementById('toggleLixeiraBtn'),
  lixeiraBadge: document.getElementById('lixeiraBadge'),
  
  // Analytics
  statTotal: document.getElementById('statTotal'),
  statTraining: document.getElementById('statTraining'),
  statTransformation: document.getElementById('statTransformation'),
  statStructure: document.getElementById('statStructure'),
  uploadsChart: document.getElementById('uploadsChart'),

  // Logs
  auditLogsList: document.getElementById('auditLogsList'),

  // Modals
  editModal: document.getElementById('editModal'),
  editForm: document.getElementById('editForm'),
  editMediaId: document.getElementById('editMediaId'),
  editFilename: document.getElementById('editFilename'),
  editCategory: document.getElementById('editCategory'),
  closeEditModal: document.getElementById('closeEditModal'),
  
  deleteModal: document.getElementById('deleteModal'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  
  toastContainer: document.getElementById('toastContainer')
};

// ==========================================
// 3. THEME & TOAST HANDLING
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    DOM.html.classList.remove('dark');
    DOM.html.classList.add('light');
    DOM.themeIcon.className = 'fas fa-sun w-5 text-yellow-500';
  } else {
    DOM.html.classList.add('dark');
    DOM.html.classList.remove('light');
    DOM.themeIcon.className = 'fas fa-moon w-5';
  }

  DOM.themeToggleBtn?.addEventListener('click', () => {
    if (DOM.html.classList.contains('dark')) {
      DOM.html.classList.remove('dark');
      DOM.html.classList.add('light');
      localStorage.setItem('theme', 'light');
      DOM.themeIcon.className = 'fas fa-sun w-5 text-yellow-500';
    } else {
      DOM.html.classList.add('dark');
      DOM.html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      DOM.themeIcon.className = 'fas fa-moon w-5';
    }
    updateChartTheme(); // Redraw chart colors
  });
}

function showToast(message, type = 'success') {
  if (!DOM.toastContainer) return;
  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-green-500/10 border-green-500/20 text-green-500',
    error: 'bg-red-500/10 border-red-500/20 text-red-500',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-500'
  };
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-xl toast-enter bg-white dark:bg-forbody-black ${bgColors[type]}`;
  toast.innerHTML = `<i class="fas ${icons[type]} text-lg"></i><span class="font-medium text-sm">${message}</span>`;
  
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.replace('toast-enter', 'toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// 4. AUTHENTICATION & ROLE-BASED ACCESS
// ==========================================
function initAuth() {
  const isLoginPage = window.location.pathname.includes('admin-login.html');
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      if (isLoginPage) {
        window.location.href = 'admin-dashboard.html';
      } else {
        if (DOM.body) DOM.body.style.display = ''; // Show dashboard
        
        // Mock Role check - usually fetched from Firestore 'users' col
        try {
           const userDoc = await getDoc(doc(db, "users", user.uid));
           if(userDoc.exists()) {
             currentRole = userDoc.data().role || 'editor';
           } else {
             // Fallback for demo
             currentRole = user.email.includes('admin') ? 'super-admin' : 'editor';
           }
        } catch(e) {
           currentRole = 'super-admin';
        }

        if(DOM.userRoleBadge) {
          DOM.userRoleBadge.innerText = currentRole.toUpperCase();
          if(currentRole === 'super-admin') DOM.userRoleBadge.className = "text-xs text-purple-500 font-semibold";
        }

        initTheme();
        initDashboard();
      }
    } else {
      if (!isLoginPage) {
        window.location.href = 'admin-login.html';
      } else {
        if (DOM.body) DOM.body.style.display = '';
      }
    }
  });

  if (DOM.loginForm) {
    DOM.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = DOM.loginForm.email.value;
      const password = DOM.loginForm.password.value;
      const loginBtn = DOM.loginForm.querySelector('button');

      try {
        loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Autenticando...';
        loginBtn.disabled = true;
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        showToast("Falha no login. Verifique as credenciais.", "error");
        loginBtn.innerHTML = 'Entrar no Painel <i class="fa-solid fa-arrow-right ml-2"></i>';
        loginBtn.disabled = false;
      }
    });
  }

  if (DOM.logoutBtn) {
    DOM.logoutBtn.addEventListener('click', async () => {
      logAction("Logout", "Usuário encerrou a sessão.");
      await signOut(auth);
    });
  }
}

// ==========================================
// 5. AUDIT LOGS
// ==========================================
async function logAction(action, details) {
  try {
    await addDoc(collection(db, "audit_logs"), {
      userEmail: currentUser?.email || 'Unknown',
      action,
      details,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
}

function initLogs() {
  if (!DOM.auditLogsList) return;
  
  const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(20));
  
  unsubscribeLogs = onSnapshot(q, (snapshot) => {
    DOM.auditLogsList.innerHTML = '';
    
    if (snapshot.empty) {
      DOM.auditLogsList.innerHTML = '<li class="text-sm text-gray-500 dark:text-forbody-silver text-center py-4">Nenhum log recente.</li>';
      return;
    }

    snapshot.forEach(doc => {
      const log = doc.data();
      const time = log.timestamp ? new Date(log.timestamp.toDate()).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : 'Agora';
      
      const li = document.createElement('li');
      li.className = 'flex flex-col border-b border-gray-100 dark:border-white/5 pb-2 last:border-0';
      li.innerHTML = `
        <div class="flex justify-between items-start">
          <span class="text-xs font-bold dark:text-white text-gray-900">${log.action}</span>
          <span class="text-[10px] text-gray-400 dark:text-forbody-silver">${time}</span>
        </div>
        <span class="text-xs text-gray-500 dark:text-forbody-silver mt-1">${log.details} (${log.userEmail})</span>
      `;
      DOM.auditLogsList.appendChild(li);
    });
  });
}

// ==========================================
// 6. ADAPTIVE COMPRESSION
// ==========================================
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        } else if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Adaptive Quality: If original size > 2MB use 0.6, else 0.85
        const quality = file.size > 2 * 1024 * 1024 ? 0.6 : 0.85;

        canvas.toBlob((blob) => {
          if(!blob) reject(new Error('Canvas is empty'));
          const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
            type: 'image/webp',
            lastModified: Date.now()
          });
          resolve(newFile);
        }, 'image/webp', quality);
      };
      img.onerror = error => reject(error);
    };
    reader.onerror = error => reject(error);
  });
}

function validateFile(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!validTypes.includes(file.type)) {
    showToast(`Formato inválido: ${file.name}`, "error");
    return false;
  }
  if (file.size > maxSize) {
    showToast(`Arquivo excede 5MB: ${file.name}`, "error");
    return false;
  }
  return true;
}

// ==========================================
// 7. MULTIPLE UPLOAD SYSTEM
// ==========================================
function initUploadSystem() {
  if (!DOM.uploadForm) return;

  // Drag & Drop
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    DOM.dropZone.addEventListener(eventName, e => { e.preventDefault(); e.stopPropagation(); }, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    DOM.dropZone.addEventListener(eventName, () => DOM.dropZone.classList.add('border-forbody-red', 'bg-red-500/5'));
  });

  ['dragleave', 'drop'].forEach(eventName => {
    DOM.dropZone.addEventListener(eventName, () => DOM.dropZone.classList.remove('border-forbody-red', 'bg-red-500/5'));
  });

  DOM.dropZone.addEventListener('drop', (e) => {
    handleFiles(e.dataTransfer.files);
  });

  DOM.dropZone.addEventListener('click', () => DOM.fileInput.click());

  DOM.fileInput.addEventListener('change', function() {
    handleFiles(this.files);
  });

  DOM.uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return showToast("Selecione pelo menos um arquivo.", "error");
    
    const category = document.getElementById('imageCategory').value;
    
    try {
      DOM.uploadBtn.disabled = true;
      DOM.uploadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
      DOM.uploadProgress.classList.remove('hidden');
      
      let totalFiles = selectedFiles.length;
      let completed = 0;

      for (let i = 0; i < totalFiles; i++) {
        let file = selectedFiles[i];
        DOM.progressText.innerText = `Enviando ${i+1} de ${totalFiles}...`;
        
        if(file.type.startsWith('image/')) {
           file = await compressImage(file);
        }
        await uploadSingleFile(file, category);
        completed++;
        DOM.progressBar.style.width = ((completed / totalFiles) * 100) + '%';
        DOM.progressPercent.innerText = Math.round((completed / totalFiles) * 100) + '%';
      }

      showToast(`${completed} arquivo(s) enviado(s) com sucesso!`);
      logAction("Upload Múltiplo", `Foram enviados ${completed} arquivo(s) para a categoria ${category}.`);
      
      // Reset form
      selectedFiles = [];
      DOM.uploadForm.reset();
      DOM.multiPreview.innerHTML = '';
      DOM.multiPreview.classList.add('hidden');
      DOM.previewText.classList.remove('hidden');
      DOM.previewText.innerText = 'Preview';
      
    } catch (error) {
      console.error("Upload falhou:", error);
      showToast("Falha em um ou mais uploads.", "error");
    } finally {
      DOM.uploadBtn.disabled = false;
      DOM.uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Enviar Arquivos';
      DOM.uploadProgress.classList.add('hidden');
      DOM.progressBar.style.width = '0%';
      DOM.progressPercent.innerText = '0%';
    }
  });
}

function handleFiles(files) {
  const validFiles = Array.from(files).filter(validateFile);
  if (validFiles.length === 0) return;

  selectedFiles = validFiles;
  DOM.previewText.classList.add('hidden');
  DOM.multiPreview.classList.remove('hidden');
  DOM.multiPreview.innerHTML = '';

  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = "w-full h-20 object-cover rounded border border-gray-200 dark:border-white/10";
      DOM.multiPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function uploadSingleFile(file, category) {
  return new Promise((resolve, reject) => {
    const path = `uploads/${category}/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on('state_changed', null, reject, async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const mediaRef = doc(collection(db, "media"));
        await setDoc(mediaRef, {
          url: downloadURL,
          storagePath: path,
          category: category,
          filename: file.name,
          createdAt: serverTimestamp(),
          active: true // For Soft Delete logic
        });
        resolve();
      } catch(err) {
        reject(err);
      }
    });
  });
}

// ==========================================
// 8. REALTIME DASHBOARD & CHARTS
// ==========================================
function initDashboard() {
  if (!DOM.imageGallery) return;
  initUploadSystem();
  setupGalleryListeners();
  initLogs();
  
  renderSkeletons();

  // Listen to Firestore real-time updates
  const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
  
  unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
    allMedia = [];
    snapshot.forEach(doc => {
      allMedia.push({ id: doc.id, ...doc.data() });
    });
    
    updateAnalytics();
    renderChart();
    applyFiltersAndSort();
  }, error => {
    console.error("Gallery Sync Error:", error);
    showToast("Erro ao carregar a galeria.", "error");
  });
}

function renderSkeletons() {
  DOM.imageGallery.innerHTML = Array(8).fill(`
    <div class="rounded-xl overflow-hidden aspect-square skeleton border border-gray-200 dark:border-white/10"></div>
  `).join('');
}

function updateAnalytics() {
  if(!DOM.statTotal) return;
  
  // Only count active media for analytics
  const activeMedia = allMedia.filter(m => m.active !== false);

  const counts = { total: activeMedia.length, training: 0, transformation: 0, structure: 0 };
  activeMedia.forEach(item => { if(counts[item.category] !== undefined) counts[item.category]++; });

  DOM.statTotal.innerText = counts.total;
  DOM.statTraining.innerText = counts.training;
  DOM.statTransformation.innerText = counts.transformation;
  DOM.statStructure.innerText = counts.structure;
}

function renderChart() {
  if (!DOM.uploadsChart) return;
  const ctx = DOM.uploadsChart.getContext('2d');
  
  // Group uploads by Month
  const activeMedia = allMedia.filter(m => m.active !== false);
  const dataMap = {};
  
  activeMedia.forEach(item => {
    if(!item.createdAt) return;
    const date = new Date(item.createdAt.toDate());
    const label = `${date.toLocaleString('pt-BR', { month: 'short' })}/${date.getFullYear()}`;
    dataMap[label] = (dataMap[label] || 0) + 1;
  });

  const labels = Object.keys(dataMap).reverse(); // Oldest first for chart line
  const data = Object.values(dataMap).reverse();

  const isDark = DOM.html.classList.contains('dark');
  const textColor = isDark ? '#C0C0C0' : '#6B7280';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  if (uploadsChartInstance) {
    uploadsChartInstance.data.labels = labels;
    uploadsChartInstance.data.datasets[0].data = data;
    uploadsChartInstance.options.scales.x.ticks.color = textColor;
    uploadsChartInstance.options.scales.y.ticks.color = textColor;
    uploadsChartInstance.options.scales.x.grid.color = gridColor;
    uploadsChartInstance.options.scales.y.grid.color = gridColor;
    uploadsChartInstance.update();
    return;
  }

  uploadsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Uploads',
        data: data,
        borderColor: '#E30613',
        backgroundColor: 'rgba(227, 6, 19, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor, drawBorder: false } },
        y: { ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor, drawBorder: false }, beginAtZero: true }
      }
    }
  });
}

function updateChartTheme() {
  if (uploadsChartInstance) renderChart();
}

// ==========================================
// 9. GALLERY LOGIC & SOFT DELETE
// ==========================================
function setupGalleryListeners() {
  DOM.searchInput.addEventListener('input', () => { currentPage = 1; applyFiltersAndSort(); });
  DOM.sortSelect.addEventListener('change', () => { applyFiltersAndSort(); });

  if(DOM.categoryFilters) {
    const btns = DOM.categoryFilters.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        btns.forEach(b => {
          b.classList.remove('bg-forbody-red', 'text-white', 'border-transparent');
          b.classList.add('bg-gray-100', 'dark:bg-white/5', 'text-gray-600', 'dark:text-forbody-silver');
        });
        e.target.classList.remove('bg-gray-100', 'dark:bg-white/5', 'text-gray-600', 'dark:text-forbody-silver');
        e.target.classList.add('bg-forbody-red', 'text-white', 'border-transparent');

        currentFilter = e.target.dataset.filter;
        currentPage = 1;
        applyFiltersAndSort();
      });
    });
  }

  DOM.prevPage.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderGallery(); } });
  DOM.nextPage.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredMedia.length / itemsPerPage);
    if (currentPage < maxPage) { currentPage++; renderGallery(); }
  });

  DOM.toggleLixeiraBtn.addEventListener('click', () => {
    isViewingLixeira = !isViewingLixeira;
    if(isViewingLixeira) {
      DOM.toggleLixeiraBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar à Galeria';
      DOM.toggleLixeiraBtn.classList.replace('text-gray-700', 'text-forbody-red');
      DOM.lixeiraBadge.classList.remove('hidden');
    } else {
      DOM.toggleLixeiraBtn.innerHTML = '<i class="fas fa-trash-restore"></i> Ver Lixeira';
      DOM.toggleLixeiraBtn.classList.replace('text-forbody-red', 'text-gray-700');
      DOM.lixeiraBadge.classList.add('hidden');
    }
    currentPage = 1;
    applyFiltersAndSort();
  });
  
  DOM.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  DOM.closeEditModal.addEventListener('click', closeEditModal);
  DOM.confirmDeleteBtn.addEventListener('click', confirmDelete);
  DOM.editForm.addEventListener('submit', confirmEdit);
}

function applyFiltersAndSort() {
  const searchTerm = DOM.searchInput.value.toLowerCase();
  const sortOrder = DOM.sortSelect.value;

  filteredMedia = allMedia.filter(item => {
    // Filter active/deleted based on view mode
    if(isViewingLixeira && item.active !== false) return false;
    if(!isViewingLixeira && item.active === false) return false;

    const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  if (sortOrder === 'asc') filteredMedia.reverse();
  renderGallery();
}

function renderGallery() {
  DOM.imageGallery.innerHTML = '';
  
  const totalItems = filteredMedia.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  if(totalItems === 0) {
    DOM.imageGallery.innerHTML = `<div class="col-span-full py-10 text-center text-gray-500 dark:text-forbody-silver">${isViewingLixeira ? 'Lixeira vazia.' : 'Nenhuma mídia encontrada.'}</div>`;
    DOM.paginationInfo.innerText = "Mostrando 0 de 0";
    DOM.prevPage.disabled = true;
    DOM.nextPage.disabled = true;
    return;
  }

  if(currentPage > totalPages) currentPage = totalPages;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageItems = filteredMedia.slice(startIdx, endIdx);

  pageItems.forEach(item => {
    const el = document.createElement('div');
    el.className = `relative group rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 ${item.active === false ? 'opacity-70 grayscale' : ''}`;
    
    // Determine buttons based on state
    let actionButtons = '';
    if(isViewingLixeira) {
      actionButtons = `
        <button class="w-8 h-8 rounded bg-green-500/80 hover:bg-green-500 flex items-center justify-center transition-colors restore-btn" data-id="${item.id}" title="Restaurar">
          <i class="fas fa-undo text-white"></i>
        </button>
        <button class="w-8 h-8 rounded bg-red-600/90 hover:bg-red-600 flex items-center justify-center transition-colors hard-delete-btn" data-id="${item.id}" title="Excluir Permanentemente">
          <i class="fas fa-times text-white"></i>
        </button>
      `;
    } else {
      actionButtons = `
        <button class="w-8 h-8 rounded bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors edit-btn" data-id="${item.id}">
          <i class="fas fa-edit text-white"></i>
        </button>
        <button class="w-8 h-8 rounded bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors delete-btn" data-id="${item.id}">
          <i class="fas fa-trash text-white"></i>
        </button>
      `;
    }

    el.innerHTML = `
      <img src="${item.url}" alt="${item.filename}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400?text=Error'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
        <div class="flex justify-between items-start">
          <span class="text-[10px] font-bold px-2 py-1 bg-forbody-red text-white rounded uppercase tracking-wider shadow-sm">${item.category}</span>
          <div class="flex gap-2">
            ${actionButtons}
          </div>
        </div>
        <span class="text-xs text-white truncate w-full block drop-shadow-md font-medium" title="${item.filename}">${item.filename}</span>
      </div>
    `;
    DOM.imageGallery.appendChild(el);
  });

  const showingEnd = Math.min(endIdx, totalItems);
  DOM.paginationInfo.innerText = `Mostrando ${startIdx + 1}-${showingEnd} de ${totalItems}`;
  DOM.prevPage.disabled = currentPage === 1;
  DOM.nextPage.disabled = currentPage === totalPages;

  // Attach dynamic events
  document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', (e) => openEditModal(e.currentTarget.dataset.id)));
  document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => openDeleteModal(e.currentTarget.dataset.id)));
  document.querySelectorAll('.restore-btn').forEach(btn => btn.addEventListener('click', (e) => restoreMedia(e.currentTarget.dataset.id)));
  document.querySelectorAll('.hard-delete-btn').forEach(btn => btn.addEventListener('click', (e) => openDeleteModal(e.currentTarget.dataset.id, true)));
}

// ==========================================
// 10. MODALS & CRUD (WITH AUDIT)
// ==========================================
let isHardDelete = false;

function openDeleteModal(id, hard = false) {
  itemToDelete = allMedia.find(m => m.id === id);
  if(!itemToDelete) return;
  isHardDelete = hard;
  
  const modalText = DOM.deleteModal.querySelector('p');
  if(isHardDelete) {
    modalText.innerText = "Esta ação removerá o arquivo permanentemente do sistema. Não pode ser desfeita.";
    DOM.confirmDeleteBtn.innerHTML = '<i class="fas fa-times"></i> Excluir Para Sempre';
  } else {
    modalText.innerText = "A mídia será enviada para a lixeira (Soft Delete) antes de ser removida permanentemente.";
    DOM.confirmDeleteBtn.innerHTML = '<i class="fas fa-trash"></i> Sim, Mover para Lixeira';
  }
  
  DOM.deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  itemToDelete = null;
  DOM.deleteModal.classList.add('hidden');
}

async function confirmDelete() {
  if(!itemToDelete) return;
  const btn = DOM.confirmDeleteBtn;
  const mediaRef = doc(db, "media", itemToDelete.id);
  
  try {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    
    if (isHardDelete) {
      if(itemToDelete.storagePath) {
        const fileRef = ref(storage, itemToDelete.storagePath);
        await deleteObject(fileRef).catch(err => console.warn("Storage delete warn:", err));
      }
      await deleteDoc(mediaRef);
      logAction("Exclusão Permanente", `Arquivo ${itemToDelete.filename} foi removido definitivamente.`);
      showToast("Mídia removida permanentemente.");
    } else {
      await updateDoc(mediaRef, { active: false, deletedAt: serverTimestamp() });
      logAction("Mover para Lixeira", `Arquivo ${itemToDelete.filename} movido para a lixeira.`);
      showToast("Mídia movida para a lixeira. Você pode restaurá-la depois.");
    }
    
    closeDeleteModal();
  } catch (error) {
    console.error("Delete Error:", error);
    showToast("Erro ao processar exclusão.", "error");
  } finally {
    btn.disabled = false;
  }
}

async function restoreMedia(id) {
  const item = allMedia.find(m => m.id === id);
  if(!item) return;

  try {
    await updateDoc(doc(db, "media", id), { active: true });
    logAction("Restauração", `Arquivo ${item.filename} restaurado da lixeira.`);
    showToast("Mídia restaurada com sucesso!");
  } catch (error) {
    showToast("Erro ao restaurar.", "error");
  }
}

function openEditModal(id) {
  itemToEdit = allMedia.find(m => m.id === id);
  if(!itemToEdit) return;
  
  DOM.editMediaId.value = itemToEdit.id;
  DOM.editFilename.value = itemToEdit.filename;
  DOM.editCategory.value = itemToEdit.category;
  
  DOM.editModal.classList.remove('hidden');
}

function closeEditModal() {
  itemToEdit = null;
  DOM.editModal.classList.add('hidden');
}

async function confirmEdit(e) {
  e.preventDefault();
  if(!itemToEdit) return;
  
  const newFilename = DOM.editFilename.value.trim();
  const newCategory = DOM.editCategory.value;
  const btn = DOM.editForm.querySelector('button[type="submit"]');

  if(!newFilename) return showToast("Nome não pode ser vazio", "error");

  try {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
    
    const mediaRef = doc(db, "media", itemToEdit.id);
    await updateDoc(mediaRef, {
      filename: newFilename,
      category: newCategory,
      updatedAt: serverTimestamp()
    });
    
    logAction("Edição de Mídia", `Arquivo ${itemToEdit.filename} foi atualizado (Nome: ${newFilename}, Categoria: ${newCategory}).`);
    showToast("Mídia atualizada com sucesso.");
    closeEditModal();
  } catch (error) {
    console.error("Edit Error:", error);
    showToast("Erro ao atualizar mídia.", "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Salvar';
  }
}

// ==========================================
// 11. BOOTSTRAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
});
