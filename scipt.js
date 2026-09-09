// Architecture: State, Elements, API, Rendering, Event Handlers

const STORAGE_KEY = "github_style_countries_data_v1";

const API_ROUTE = "/api/countries";

const state = {
  savedCountries: [],
  selectedCountry: null,
  theme: localStorage.getItem("theme") || "light"
};

const elements = {
  themeToggle: document.getElementById("theme-toggle"),
  themeIcon: document.getElementById("theme-icon"),
  searchForm: document.getElementById("search-form"),
  searchInput: document.getElementById("search-input"),
  filterLocalInput: document.getElementById("filter-local-input"),
  countryList: document.getElementById("country-list"),
  savedCount: document.getElementById("saved-count"),
  
  // Status & Empty
  statusContainer: document.getElementById("status-container"),
  emptyState: document.getElementById("empty-state"),
  toastMessage: document.getElementById("toast-message"),
  
  // Detail
  countryDetailCard: document.getElementById("country-detail-card"),
  dataSourceBadge: document.getElementById("data-source-badge"),
  detailFlag: document.getElementById("detail-flag"),
  detailName: document.getElementById("detail-name"),
  detailOfficialName: document.getElementById("detail-official-name"),
  detailCapital: document.getElementById("detail-capital"),
  detailPopulation: document.getElementById("detail-population"),
  detailRegion: document.getElementById("detail-region"),
  detailSubregion: document.getElementById("detail-subregion"),
  detailArea: document.getElementById("detail-area"),
  detailLanguages: document.getElementById("detail-languages"),
  detailCurrencies: document.getElementById("detail-currencies"),
  detailTimezones: document.getElementById("detail-timezones"),
  detailTld: document.getElementById("detail-tld"),
  detailMap: document.getElementById("detail-map"),

  // Actions
  btnShare: document.getElementById("btn-share"),
  btnScreenshot: document.getElementById("btn-screenshot"),
  btnExportTxt: document.getElementById("btn-export-txt"),
  btnEdit: document.getElementById("btn-edit"),
  btnDelete: document.getElementById("btn-delete"),
  btnOpenAddModal: document.getElementById("btn-open-add-modal"),

  // Modal
  formModal: document.getElementById("form-modal"),
  modalTitle: document.getElementById("modal-title"),
  countryForm: document.getElementById("country-form"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  btnCancelModal: document.getElementById("btn-cancel-modal"),
  
  // Form fields
  formId: document.getElementById("form-id"),
  formName: document.getElementById("form-name"),
  formOfficial: document.getElementById("form-official"),
  formFlag: document.getElementById("form-flag"),
  formCapital: document.getElementById("form-capital"),
  formPopulation: document.getElementById("form-population"),
  formRegion: document.getElementById("form-region"),
  formLanguages: document.getElementById("form-languages"),
  formCurrencies: document.getElementById("form-currencies")
};

// Application Initialization
function init() {
  applyTheme(state.theme);
  loadSavedData();
  bindEvents();
  renderList();
}

// Data Normalization Helper (Xử lý tương thích v5 và v3.1)
function normalizeApiData(apiCountry) {
  if (!apiCountry) return null;

  // Xử lý Tên
  const name = apiCountry.names?.common || apiCountry.name?.common || apiCountry.name || "Không rõ";
  const officialName = apiCountry.names?.official || apiCountry.name?.official || "";

  // Xử lý Cờ
  const flag = apiCountry.flag?.png || apiCountry.flag?.url_png || apiCountry.flags?.png || apiCountry.flags?.svg || "";

  // Xử lý Thủ đô
  let capital = "N/A";
  const capitals = apiCountry.capital || apiCountry.capitals;
  if (Array.isArray(capitals)) {
    capital = capitals
      .map(item => typeof item === "object" ? item.name : item)
      .filter(Boolean)
      .join(", ") || "N/A";
  } else if (typeof capitals === "string") {
    capital = capitals;
  }

  // Xử lý Ngôn ngữ
  let languages = "N/A";
  if (apiCountry.languages) {
    if (Array.isArray(apiCountry.languages)) {
      languages = apiCountry.languages
        .map(item => typeof item === "object" ? (item.name || item.native_name) : item)
        .filter(Boolean)
        .join(", ") || "N/A";
    } else if (typeof apiCountry.languages === "object") {
      languages = Object.values(apiCountry.languages).join(", ");
    }
  }

  // Xử lý Tiền tệ
  let currencies = "N/A";
  if (apiCountry.currencies) {
    if (Array.isArray(apiCountry.currencies)) {
      currencies = apiCountry.currencies
        .map(currency => `${currency.name || ""} (${currency.code || currency.symbol || ""})`)
        .filter(Boolean)
        .join(", ") || "N/A";
    } else if (typeof apiCountry.currencies === "object") {
      currencies = Object.values(apiCountry.currencies)
        .map(currency => typeof currency === "object" ? `${currency.name || ""} (${currency.symbol || ""})` : currency)
        .join(", ");
    }
  }

  // Xử lý Múi giờ
  const timezones = Array.isArray(apiCountry.timezones) ? apiCountry.timezones.join(", ") : (apiCountry.timezones || "N/A");

  // Xử lý TLD
  const tlds = apiCountry.tld || apiCountry.tlds;
  const tld = Array.isArray(tlds) ? tlds.join(", ") : (tlds || "N/A");

  return {
    id: apiCountry.codes?.alpha_3 || apiCountry.cca3 || "CUSTOM_" + Date.now(),
    name: name,
    officialName: officialName,
    flag: flag,
    capital: capital,
    population: apiCountry.population || 0,
    region: apiCountry.region || "N/A",
    subregion: apiCountry.subregion || "N/A",
    area: apiCountry.area
      ? `${Number(typeof apiCountry.area === "object" ? apiCountry.area.kilometers : apiCountry.area).toLocaleString()} km²`
      : "N/A",
    languages: languages,
    currencies: currencies,
    timezones: timezones,
    tld: tld,
    map: apiCountry.maps?.googleMaps || apiCountry.links?.google_maps || apiCountry.map || "#",
    isCustom: false
  };
}

// Local Storage Management
function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state.savedCountries = raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Lỗi khi tải LocalStorage:", error);
    state.savedCountries = [];
  }
}

function saveLocalData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedCountries));
  } catch (error) {
    showToast("Không thể lưu dữ liệu vào LocalStorage.", true);
  }
}

// Theme handling
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  elements.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  state.theme = theme;
  localStorage.setItem("theme", theme);
}

// Event Bindings
function bindEvents() {
  elements.themeToggle.addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
  });

  elements.searchForm.addEventListener("submit", handleSearchApi);
  elements.filterLocalInput.addEventListener("input", handleFilterLocal);

  // Modal events
  elements.btnOpenAddModal.addEventListener("click", () => openModal());
  elements.btnCloseModal.addEventListener("click", closeModal);
  elements.btnCancelModal.addEventListener("click", closeModal);
  elements.countryForm.addEventListener("submit", handleFormSubmit);

  // Detail actions
  elements.btnShare.addEventListener("click", handleShare);
  elements.btnScreenshot.addEventListener("click", handleScreenshot);
  elements.btnExportTxt.addEventListener("click", handleExportTxt);
  elements.btnEdit.addEventListener("click", handleEdit);
  elements.btnDelete.addEventListener("click", handleDelete);
}

// Fetching multiple countries from REST Countries API v5
async function handleSearchApi(e) {
  e.preventDefault();
  const query = elements.searchInput.value.trim();
  if (!query) return;

  showStatus("Đang tìm kiếm quốc gia từ API...", "loading");

  try {
    const response = await fetch(
      `${API_ROUTE}?q=${encodeURIComponent(query)}&limit=5`
    );

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(responseText || "API quốc gia trả về dữ liệu không hợp lệ.");
    }

    if (!response.ok) throw new Error(data.error || "Không thể kết nối đến API quốc gia.");

    const countries = data.data?.objects;
    if (!Array.isArray(countries) || countries.length === 0) {
      throw new Error("Không tìm thấy quốc gia phù hợp.");
    }

    const normalizedCountries = countries
      .map(normalizeApiData)
      .filter(Boolean);

    normalizedCountries.forEach(country => {
      const index = state.savedCountries.findIndex(saved => saved.id === country.id);
      if (index === -1) {
        state.savedCountries.unshift(country);
      } else {
        state.savedCountries[index] = country;
      }
    });

    const firstCountry = normalizedCountries[0];
    saveLocalData();
    state.selectedCountry = firstCountry;
    renderList();
    renderDetail(firstCountry);
    hideStatus();
    showToast(`Đã tải ${normalizedCountries.length} quốc gia.`);
  } catch (error) {
    showStatus(error.message || "Không thể tải dữ liệu quốc gia.", "error");
  }
}

// Filter Local List
function handleFilterLocal() {
  const query = elements.filterLocalInput.value.toLowerCase();
  const items = elements.countryList.querySelectorAll(".panel-item");
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.classList.toggle("hidden", !text.includes(query));
  });
}

// Render Functions
function renderList() {
  elements.countryList.innerHTML = "";
  elements.savedCount.textContent = state.savedCountries.length;

  state.savedCountries.forEach(country => {
    const li = document.createElement("li");
    li.className = `panel-item ${state.selectedCountry?.id === country.id ? "active" : ""}`;
    
    const flagImg = country.flag ? `<img src="${country.flag}" alt="" class="item-flag">` : "🌐";
    li.innerHTML = `${flagImg} <span>${escapeHtml(country.name)}</span>`;
    
    li.addEventListener("click", () => {
      state.selectedCountry = country;
      renderList();
      renderDetail(country);
    });

    elements.countryList.appendChild(li);
  });
}

function renderDetail(country) {
  if (!country) {
    elements.countryDetailCard.classList.add("hidden");
    elements.emptyState.classList.remove("hidden");
    return;
  }

  elements.emptyState.classList.add("hidden");
  elements.countryDetailCard.classList.remove("hidden");

  elements.dataSourceBadge.textContent = country.isCustom ? "Tự tạo (Local)" : "REST Countries API";
  elements.detailFlag.crossOrigin = "anonymous";
  elements.detailFlag.src = country.flag || "";
  elements.detailName.textContent = country.name;
  elements.detailOfficialName.textContent = country.officialName || country.name;
  elements.detailCapital.textContent = country.capital || "N/A";
  elements.detailPopulation.textContent = country.population ? country.population.toLocaleString() : "N/A";
  elements.detailRegion.textContent = country.region || "N/A";
  elements.detailSubregion.textContent = country.subregion || "N/A";
  elements.detailArea.textContent = country.area || "N/A";
  elements.detailLanguages.textContent = country.languages || "N/A";
  elements.detailCurrencies.textContent = country.currencies || "N/A";
  elements.detailTimezones.textContent = country.timezones || "N/A";
  elements.detailTld.textContent = country.tld || "N/A";
  
  if (country.map && country.map !== "#") {
    elements.detailMap.href = country.map;
    elements.detailMap.style.display = "inline";
  } else {
    elements.detailMap.style.display = "none";
  }
}

// Actions Handlers
function handleShare() {
  if (!state.selectedCountry) return;
  const text = `Quốc gia: ${state.selectedCountry.name}\nThủ đô: ${state.selectedCountry.capital}\nDân số: ${state.selectedCountry.population}`;
  
  navigator.clipboard.writeText(text).then(() => {
    showToast("Đã sao chép thông tin vào Clipboard!");
  }).catch(() => {
    showToast("Không thể sao chép thông tin.", true);
  });
}

async function handleScreenshot() {
  const target = document.getElementById("capture-area");
  if (!target || !state.selectedCountry) return;

  showToast("Đang tạo ảnh màn hình...");

  try {
    const flag = elements.detailFlag;
    if (flag.src && !flag.complete) {
      await new Promise((resolve, reject) => {
        flag.addEventListener("load", resolve, { once: true });
        flag.addEventListener("error", reject, { once: true });
      });
    }

    const canvas = await html2canvas(target, {
      useCORS: true,
      allowTaint: false,
      imageTimeout: 15000
    });
    const link = document.createElement("a");
    link.download = `${state.selectedCountry.name}_info.png`;
    link.href = canvas.toDataURL();
    link.click();
    showToast("Đã tải ảnh màn hình thành công!");
  } catch (error) {
    console.error("Lỗi khi chụp ảnh quốc gia:", error);
    showToast("Không thể chụp ảnh màn hình.", true);
  }
}

function handleExportTxt() {
  if (!state.selectedCountry) return;
  const c = state.selectedCountry;
  
  const content = `THÔNG TIN QUỐC GIA: ${c.name.toUpperCase()}
========================================
Tên chính thức: ${c.officialName}
Thủ đô        : ${c.capital}
Dân số        : ${c.population}
Khu vực       : ${c.region} (${c.subregion})
Diện tích     : ${c.area}
Ngôn ngữ      : ${c.languages}
Tiền tệ       : ${c.currencies}
Múi giờ       : ${c.timezones}
Tên miền TLD  : ${c.tld}
Bản đồ        : ${c.map}
========================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${c.name}_detail.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Đã xuất thông tin thành file .txt!");
}

function handleDelete() {
  if (!state.selectedCountry) return;
  
  const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa quốc gia "${state.selectedCountry.name}" khỏi danh sách lưu trữ?`);
  if (confirmDelete) {
    state.savedCountries = state.savedCountries.filter(c => c.id !== state.selectedCountry.id);
    saveLocalData();
    state.selectedCountry = null;
    renderList();
    renderDetail(null);
    showToast("Đã xóa quốc gia thành công.");
  }
}

// Modal Form handling (Add/Edit)
function openModal(country = null) {
  elements.countryForm.reset();
  
  if (country) {
    elements.modalTitle.textContent = "Chỉnh sửa quốc gia";
    elements.formId.value = country.id;
    elements.formName.value = country.name;
    elements.formOfficial.value = country.officialName;
    elements.formFlag.value = country.flag;
    elements.formCapital.value = country.capital;
    elements.formPopulation.value = country.population;
    elements.formRegion.value = country.region;
    elements.formLanguages.value = country.languages;
    elements.formCurrencies.value = country.currencies;
  } else {
    elements.modalTitle.textContent = "Thêm quốc gia mới";
    elements.formId.value = "";
  }
  
  elements.formModal.classList.remove("hidden");
}

function closeModal() {
  elements.formModal.classList.add("hidden");
}

function handleEdit() {
  if (state.selectedCountry) {
    openModal(state.selectedCountry);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const id = elements.formId.value || "CUSTOM_" + Date.now();
  const newCountry = {
    id: id,
    name: elements.formName.value.trim(),
    officialName: elements.formOfficial.value.trim(),
    flag: elements.formFlag.value.trim() || "https://via.placeholder.com/150",
    capital: elements.formCapital.value.trim() || "N/A",
    population: Number(elements.formPopulation.value) || 0,
    region: elements.formRegion.value.trim() || "N/A",
    subregion: "N/A",
    area: "N/A",
    languages: elements.formLanguages.value.trim() || "N/A",
    currencies: elements.formCurrencies.value.trim() || "N/A",
    timezones: "N/A",
    tld: "N/A",
    map: "#",
    isCustom: true
  };

  const existingIndex = state.savedCountries.findIndex(c => c.id === id);
  if (existingIndex > -1) {
    state.savedCountries[existingIndex] = newCountry;
  } else {
    state.savedCountries.unshift(newCountry);
  }

  saveLocalData();
  state.selectedCountry = newCountry;
  renderList();
  renderDetail(newCountry);
  closeModal();
  showToast("Lưu thông tin quốc gia thành công!");
}

// Helpers / UI Status
function showStatus(msg, type) {
  elements.statusContainer.textContent = msg;
  elements.statusContainer.className = `status-box ${type}`;
  elements.statusContainer.classList.remove("hidden");
  elements.countryDetailCard.classList.add("hidden");
  elements.emptyState.classList.add("hidden");
}

function hideStatus() {
  elements.statusContainer.classList.add("hidden");
}

function showToast(msg, isError = false) {
  elements.toastMessage.textContent = msg;
  elements.toastMessage.style.borderColor = isError ? "var(--danger)" : "var(--primary)";
  elements.toastMessage.classList.remove("hidden");
  setTimeout(() => {
    elements.toastMessage.classList.add("hidden");
  }, 3000);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[match]);
}

// Start Application
document.addEventListener("DOMContentLoaded", init);