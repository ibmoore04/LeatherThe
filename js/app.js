// ==========================================================================
// LEATHER THE — Interactive Web Application Engine
// ==========================================================================

import { CATALOG_PRODUCTS, BRAND_INFO } from './products-data.js';

// --- State Management ---
const state = {
  products: [...CATALOG_PRODUCTS],
  activeFilter: 'all',
  searchQuery: '',
  catalogViewMode: 'reels', // 'reels' (horizontal category reels) or 'grid' (2-col compact grid)
  quoteCart: [],
  activeModalProduct: null,
  bespokeSelection: {
    material: 'Full-Grain Lambskin',
    hardware: 'YKK Polished Silver',
    technique: 'High-Density Flame Embroidery',
    finish: 'Natural Semi-Gloss'
  }
};

const CATALOG_CATEGORIES = [
  { id: 'mens-jackets', label: "Men's Jackets", icon: "fa-vest", short: "Men's" },
  { id: 'womens-jackets', label: "Women's Jackets", icon: "fa-person-dress", short: "Women's" },
  { id: 'winter-hoodies', label: "Winter Hoodies", icon: "fa-snowflake", short: "Hoodies" },
  { id: 'mens-gloves', label: "Men's Gloves", icon: "fa-mitten", short: "Men's Gloves" },
  { id: 'womens-gloves', label: "Women's Gloves", icon: "fa-hand", short: "Women's Gloves" }
];

// --- Web Audio Tactile Sound Effects ---
let audioCtx = null;
function playTactileClick(type = 'click') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    }
  } catch (e) {
    // Audio optional
  }
}

// --- DOM References ---
const dom = {
  productsGrid: document.getElementById('productsGrid'),
  catalogCount: document.getElementById('catalogCount'),
  searchInput: document.getElementById('catalogSearchInput'),
  filterTabs: document.querySelectorAll('.tab-btn'),
  quoteDrawerBackdrop: document.getElementById('quoteDrawerBackdrop'),
  quoteItemsList: document.getElementById('quoteItemsList'),
  quoteCountBadge: document.getElementById('quoteCountBadge'),
  openDrawerBtn: document.getElementById('openDrawerBtn'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  btnSendWhatsApp: document.getElementById('btnSendWhatsApp'),
  btnSendEmail: document.getElementById('btnSendEmail'),
  btnCopyOrder: document.getElementById('btnCopyOrder'),
  orderCountry: document.getElementById('orderCountry'),
  orderNotes: document.getElementById('orderNotes'),
  productModalBackdrop: document.getElementById('productModalBackdrop'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  customCursor: document.getElementById('customCursor'),
  cursorFollower: document.getElementById('cursorFollower'),
  header: document.querySelector('.site-header'),
  bespokeChips: document.querySelectorAll('.chip-btn'),
  liveMaterialSpec: document.getElementById('liveMaterialSpec'),
  liveHardwareSpec: document.getElementById('liveHardwareSpec'),
  liveTechniqueSpec: document.getElementById('liveTechniqueSpec'),
  btnBespokeWhatsApp: document.getElementById('btnBespokeWhatsApp')
};

// ==========================================================================
// RENDER PRODUCT CARD (Reused for Reels and Grid)
// ==========================================================================
function renderProductCard(product) {
  let variantClass = '';
  if (product.isBurgundyVariant) variantClass = 'tint-burgundy';
  else if (product.isCreamVariant) variantClass = 'tint-cream';
  else if (product.isBrownVariant) variantClass = 'tint-brown';
  else if (product.isWhiteVariant) variantClass = 'tint-white';

  const isAdded = state.quoteCart.some(item => item.product.id === product.id);

  return `
    <article class="product-card ${variantClass}" data-id="${product.id}">
      <div class="product-media-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="product-media-overlay">
          <div class="card-top-tags">
            <span class="product-code-pill">${product.code}</span>
            <span class="product-badge-pill">${product.badge}</span>
          </div>
          <div class="card-overlay-actions">
            <button class="overlay-action-btn quick-view-btn" data-id="${product.id}" aria-label="Quick View ${product.name}">
              <i class="fas fa-eye"></i> Quick View
            </button>
          </div>
        </div>
      </div>

      <div class="product-content">
        <div>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-short-desc">${product.shortDesc}</p>
        </div>

        <div>
          <div class="product-meta-row">
            <div class="meta-color">
              <span class="color-swatch-dot" style="background-color: ${getColorHex(product.defaultColor)}"></span>
              <span>${product.defaultColor}</span>
            </div>
            <div class="meta-moq">
              <span>MOQ: ${product.moq.split(' ')[0]} pcs</span>
            </div>
          </div>

          <button class="card-cta-btn add-to-quote-btn ${isAdded ? 'added' : ''}" data-id="${product.id}">
            <i class="fas ${isAdded ? 'fa-check' : 'fa-plus'}"></i>
            <span>${isAdded ? 'In Quote List' : 'Add to B2B Quote'}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// RENDER CATALOG PRODUCTS (Reels Mode vs Grid Mode)
// ==========================================================================
function renderCatalog() {
  if (!dom.productsGrid) return;

  const isSearching = state.searchQuery.trim().length > 0;
  const isSpecificFilter = state.activeFilter !== 'all';

  // Filtered dataset
  const filtered = state.products.filter(product => {
    const matchesCategory = (state.activeFilter === 'all') || (product.category === state.activeFilter);
    const query = state.searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch = 
      product.code.toLowerCase().includes(query) ||
      product.name.toLowerCase().includes(query) ||
      product.shortDesc.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  if (dom.catalogCount) {
    dom.catalogCount.textContent = filtered.length;
  }

  // Empty state
  if (filtered.length === 0) {
    dom.productsGrid.className = 'products-container';
    dom.productsGrid.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: var(--cream-muted);">
        <div style="font-size: 2.5rem; color: var(--gold); margin-bottom: 1rem;">🔍</div>
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #fff; margin-bottom: 0.5rem;">No products match your search</h3>
        <p style="font-size: 0.9rem;">Try searching for "LT-01", "Flame", "Racing", "Gloves" or "Hoodie"</p>
        <button id="resetSearchBtn" style="margin-top: 1.2rem; background: var(--oxblood-light); border: 1px solid var(--border-gold); color: #fff; padding: 0.6rem 1.4rem; border-radius: 20px; cursor: pointer;">
          Reset Catalog Filters
        </button>
      </div>
    `;
    document.getElementById('resetSearchBtn')?.addEventListener('click', () => {
      state.searchQuery = '';
      state.activeFilter = 'all';
      if (dom.searchInput) dom.searchInput.value = '';
      dom.filterTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === 'all'));
      renderCatalog();
    });
    return;
  }

  // --- MODE 1: REELS VIEW (Horizontal Category Shelves for All 20 items) ---
  if (!isSearching && !isSpecificFilter && state.catalogViewMode === 'reels') {
    dom.productsGrid.className = 'products-container';
    dom.productsGrid.innerHTML = CATALOG_CATEGORIES.map(cat => {
      const catProducts = state.products.filter(p => p.category === cat.id);
      if (catProducts.length === 0) return '';

      return `
        <section class="category-reel-section" data-cat="${cat.id}">
          <div class="category-reel-header">
            <div class="reel-title-wrap">
              <span class="reel-icon-badge"><i class="fas ${cat.icon}"></i></span>
              <h3 class="reel-category-title">${cat.label}</h3>
              <span class="reel-count-pill">${catProducts.length} Items</span>
            </div>

            <div class="reel-actions-wrap">
              <button class="reel-filter-jump-btn" data-filter="${cat.id}" title="View all ${cat.label}">
                <span>View Line</span> <i class="fas fa-arrow-right"></i>
              </button>
              <div class="reel-nav-arrows">
                <button class="reel-arrow-btn reel-arrow-left" data-target="reel-${cat.id}" aria-label="Scroll Left">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="reel-arrow-btn reel-arrow-right" data-target="reel-${cat.id}" aria-label="Scroll Right">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="category-reel-track" id="reel-${cat.id}">
            ${catProducts.map(renderProductCard).join('')}
          </div>
        </section>
      `;
    }).join('');

    // Wire reel scroll arrows
    document.querySelectorAll('.reel-arrow-left').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (target) target.scrollBy({ left: -300, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.reel-arrow-right').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (target) target.scrollBy({ left: 300, behavior: 'smooth' });
      });
    });

    // Wire "View Line" buttons to switch tab
    document.querySelectorAll('.reel-filter-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCat = btn.dataset.filter;
        state.activeFilter = targetCat;
        dom.filterTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === targetCat));
        renderCatalog();
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  } 
  // --- MODE 2: GRID VIEW (Compact Grid) ---
  else {
    dom.productsGrid.className = 'products-grid grid-mode-active';
    dom.productsGrid.innerHTML = filtered.map(renderProductCard).join('');
  }

  // Attach interactive events on cards
  attachCardEvents();
}

// Swatch color helper
function getColorHex(colorName) {
  const map = {
    'Black': '#111111',
    'Burgundy': '#541224',
    'Oxblood': '#420f1e',
    'Black / White': '#111111',
    'White and Black': '#e2ded5',
    'Red and Black': '#c82333',
    'Tan': '#a67244',
    'Camel': '#b38253',
    'Cream': '#eee4d1',
    'White': '#f2f0ea',
    'Brown': '#5a351e',
    'Light Blue': '#8ab4f8'
  };
  return map[colorName] || '#333333';
}

function attachCardEvents() {
  // Quick View buttons
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick('click');
      const productId = btn.dataset.id;
      const product = CATALOG_PRODUCTS.find(p => p.id === productId);
      if (product) openProductModal(product);
    });
  });

  // Add to Quote buttons
  document.querySelectorAll('.add-to-quote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.id;
      const product = CATALOG_PRODUCTS.find(p => p.id === productId);
      if (product) {
        toggleQuoteCartItem(product);
      }
    });
  });
}

// ==========================================================================
// WHOLESALE QUOTE CART & WHATSAPP ENGINE
// ==========================================================================
function toggleQuoteCartItem(product) {
  const existingIndex = state.quoteCart.findIndex(item => item.product.id === product.id);

  if (existingIndex > -1) {
    // Already in cart -> open drawer
    playTactileClick('click');
    openQuoteDrawer();
  } else {
    // Add new item
    state.quoteCart.push({
      product,
      qty: 25, // Sensible wholesale sample default
      size: 'L',
      customNotes: ''
    });
    playTactileClick('success');
    updateQuoteUI();
    showToast(`Added ${product.code} to your wholesale quote builder!`);
    openQuoteDrawer();
  }
}

function updateQuoteUI() {
  // Update badge count
  const count = state.quoteCart.reduce((total, item) => total + item.qty, 0);
  if (dom.quoteCountBadge) {
    dom.quoteCountBadge.textContent = count;
    dom.quoteCountBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // Render items in drawer
  if (!dom.quoteItemsList) return;

  if (state.quoteCart.length === 0) {
    dom.quoteItemsList.innerHTML = `
      <div class="empty-quote-state">
        <i class="fas fa-layer-group"></i>
        <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: #fff; margin-bottom: 0.4rem;">Your Quote List is Empty</h4>
        <p style="font-size: 0.85rem; color: var(--cream-muted);">Browse the 20 catalog products below and click <strong>"Add to B2B Quote"</strong> to generate a 1-click WhatsApp wholesale quote.</p>
      </div>
    `;
    return;
  }

  dom.quoteItemsList.innerHTML = state.quoteCart.map((item, idx) => `
    <div class="quote-item-row" data-idx="${idx}">
      <img src="${item.product.image}" alt="${item.product.name}" class="quote-item-thumb">
      <div class="quote-item-info">
        <span class="quote-item-code">${item.product.code}</span>
        <h4 class="quote-item-name">${item.product.name}</h4>
        <div class="quote-item-controls">
          <div class="qty-control">
            <button class="qty-btn btn-qty-minus" data-idx="${idx}" aria-label="Decrease quantity">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn btn-qty-plus" data-idx="${idx}" aria-label="Increase quantity">+</button>
          </div>
          <span style="font-size: 0.75rem; color: var(--gold-light);">units</span>
        </div>
      </div>
      <button class="quote-item-remove" data-idx="${idx}" title="Remove item">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');

  // Attach controls in drawer
  dom.quoteItemsList.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      state.quoteCart[idx].qty += 5;
      playTactileClick('click');
      updateQuoteUI();
    });
  });

  dom.quoteItemsList.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      if (state.quoteCart[idx].qty > 5) {
        state.quoteCart[idx].qty -= 5;
      } else {
        state.quoteCart.splice(idx, 1);
      }
      playTactileClick('click');
      updateQuoteUI();
      renderCatalog();
    });
  });

  dom.quoteItemsList.querySelectorAll('.quote-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      state.quoteCart.splice(idx, 1);
      playTactileClick('click');
      updateQuoteUI();
      renderCatalog();
    });
  });
}

function openQuoteDrawer() {
  if (dom.quoteDrawerBackdrop) {
    dom.quoteDrawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuoteDrawer() {
  if (dom.quoteDrawerBackdrop) {
    dom.quoteDrawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Generate WhatsApp order message (Implements PDF Page 8: How to Order)
function generateOrderMessageText() {
  const country = dom.orderCountry ? dom.orderCountry.value.trim() : 'International';
  const notes = dom.orderNotes ? dom.orderNotes.value.trim() : 'None';

  let text = `👑 *WHOLESALE INQUIRY — LEATHER THE (Sialkot)*\n\n`;
  text += `Hello Leather The team, I am interested in placing a wholesale / sample order for the following items:\n\n`;

  if (state.quoteCart.length > 0) {
    text += `*SELECTED CATALOG PRODUCTS:*\n`;
    state.quoteCart.forEach(item => {
      text += `▪ *[${item.product.code}]* ${item.product.name}\n`;
      text += `  Quantity: *${item.qty} pcs* | Color: ${item.product.defaultColor}\n`;
    });
    text += `\n`;
  } else {
    text += `▪ General Wholesale Catalog & Price List Request\n\n`;
  }

  text += `📍 *Destination Country:* ${country || 'Worldwide'}\n`;
  if (notes) {
    text += `📝 *Custom Requirements / OEM Notes:* ${notes}\n`;
  }
  text += `\nPlease reply with availability, sample lead times, and wholesale pricing. Thank you!`;

  return text;
}

function dispatchWhatsAppOrder() {
  playTactileClick('success');
  const message = generateOrderMessageText();
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${BRAND_INFO.whatsappDigits}?text=${encoded}`;
  window.open(url, '_blank');
}

function dispatchEmailOrder() {
  playTactileClick('click');
  const message = generateOrderMessageText();
  const subject = encodeURIComponent(`Wholesale Catalog Inquiry — Leather The`);
  const body = encodeURIComponent(message);
  const url = `mailto:${BRAND_INFO.email}?subject=${subject}&body=${body}`;
  window.location.href = url;
}

function copyOrderManifesto() {
  const message = generateOrderMessageText();
  navigator.clipboard.writeText(message).then(() => {
    playTactileClick('success');
    showToast('Order details copied to clipboard!');
  }).catch(() => {
    showToast('Please copy text manually');
  });
}

// ==========================================================================
// PRODUCT QUICK VIEW MODAL
// ==========================================================================
function openProductModal(product) {
  state.activeModalProduct = product;
  const modal = dom.productModalBackdrop;
  if (!modal) return;

  const modalImg = document.getElementById('modalProductImg');
  const modalCode = document.getElementById('modalProductCode');
  const modalBadge = document.getElementById('modalProductBadge');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalSpecs = document.getElementById('modalProductSpecs');
  const modalMaterials = document.getElementById('modalProductMaterials');
  const modalMoq = document.getElementById('modalProductMoq');
  const modalAddBtn = document.getElementById('modalAddQuoteBtn');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppInquiryBtn');

  if (modalImg) {
    modalImg.src = product.image;
    modalImg.alt = product.name;
  }
  if (modalCode) modalCode.textContent = product.code;
  if (modalBadge) modalBadge.textContent = product.badge;
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalMaterials) modalMaterials.textContent = product.materials;
  if (modalMoq) modalMoq.textContent = product.moq;

  if (modalSpecs) {
    modalSpecs.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
  }

  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      toggleQuoteCartItem(product);
      closeProductModal();
    };
  }

  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.onclick = () => {
      const msg = encodeURIComponent(`Hello Leather The! I am inquiring about product *[${product.code}] ${product.name}*. Please send wholesale MOQ and pricing to my country.`);
      window.open(`https://wa.me/${BRAND_INFO.whatsappDigits}?text=${msg}`, '_blank');
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  if (dom.productModalBackdrop) {
    dom.productModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// BESPOKE CUSTOMIZER & OEM MANUFACTURING STUDIO
// ==========================================================================
function initBespokeStudio() {
  dom.bespokeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playTactileClick('click');
      const group = chip.dataset.group;
      const value = chip.dataset.val;

      // Update active state in group
      document.querySelectorAll(`.chip-btn[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');

      state.bespokeSelection[group] = value;

      // Update live specs display
      if (group === 'material' && dom.liveMaterialSpec) dom.liveMaterialSpec.textContent = value;
      if (group === 'hardware' && dom.liveHardwareSpec) dom.liveHardwareSpec.textContent = value;
      if (group === 'technique' && dom.liveTechniqueSpec) dom.liveTechniqueSpec.textContent = value;
    });
  });

  if (dom.btnBespokeWhatsApp) {
    dom.btnBespokeWhatsApp.addEventListener('click', () => {
      playTactileClick('success');
      const text = `👑 *BESPOKE / OEM TECH-PACK REQUEST — LEATHER THE*\n\n` +
        `Hello Leather The artisans! I would like a custom quote for private label manufacturing with the following specifications:\n\n` +
        `▪ *Material:* ${state.bespokeSelection.material}\n` +
        `▪ *Hardware:* ${state.bespokeSelection.hardware}\n` +
        `▪ *Technique:* ${state.bespokeSelection.technique}\n` +
        `▪ *Origin:* Sialkot Factory Direct\n\n` +
        `Please advise on sample prototyping turnaround and minimum batch costs.`;
      window.open(`https://wa.me/${BRAND_INFO.whatsappDigits}?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
}

// ==========================================================================
// TOAST NOTIFICATION HELPER
// ==========================================================================
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(20, 16, 21, 0.95);
      border: 1px solid var(--gold);
      color: var(--cream);
      padding: 0.85rem 1.8rem;
      border-radius: 30px;
      font-size: 0.88rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(212,175,55,0.3);
      z-index: 2000;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--gold);"></i> ${message}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3200);
}

// ==========================================================================
// CUSTOM CURSOR & MOUSE FOLLOWER
// ==========================================================================
function initCustomCursor() {
  if (!dom.customCursor || !dom.cursorFollower) return;

  // Only enable on desktop devices with hover support
  if (window.matchMedia('(pointer: coarse)').matches) {
    dom.customCursor.style.display = 'none';
    dom.cursorFollower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dom.customCursor.style.left = `${mouseX}px`;
    dom.customCursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    dom.cursorFollower.style.left = `${followerX}px`;
    dom.cursorFollower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover states on clickable targets
  document.querySelectorAll('a, button, input, .product-card, .pillar-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dom.customCursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      dom.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4)';
      dom.cursorFollower.style.borderColor = 'var(--gold-light)';
    });
    el.addEventListener('mouseleave', () => {
      dom.customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
      dom.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      dom.cursorFollower.style.borderColor = 'var(--border-gold)';
    });
  });
}

// ==========================================================================
// 3D HERO CARD TILT EFFECT
// ==========================================================================
function initHeroTilt() {
  const heroCard = document.getElementById('hero3dCard');
  if (!heroCard) return;

  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
}

// ==========================================================================
// SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// ==========================================================================
// INIT APP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Render full initial catalog
  renderCatalog();
  updateQuoteUI();
  initBespokeStudio();
  initCustomCursor();
  initHeroTilt();
  initScrollReveal();

  // Filter tabs
  dom.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playTactileClick('click');
      dom.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFilter = tab.dataset.filter;
      renderCatalog();
    });
  });

  // View Mode Switcher (Reels vs Grid)
  const btnViewReels = document.getElementById('btnViewReels');
  const btnViewGrid = document.getElementById('btnViewGrid');
  if (btnViewReels && btnViewGrid) {
    btnViewReels.addEventListener('click', () => {
      playTactileClick('click');
      state.catalogViewMode = 'reels';
      btnViewReels.classList.add('active');
      btnViewGrid.classList.remove('active');
      renderCatalog();
    });

    btnViewGrid.addEventListener('click', () => {
      playTactileClick('click');
      state.catalogViewMode = 'grid';
      btnViewGrid.classList.add('active');
      btnViewReels.classList.remove('active');
      renderCatalog();
    });
  }

  // Search input
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Drawer triggers
  if (dom.openDrawerBtn) dom.openDrawerBtn.addEventListener('click', openQuoteDrawer);
  if (dom.closeDrawerBtn) dom.closeDrawerBtn.addEventListener('click', closeQuoteDrawer);
  if (dom.quoteDrawerBackdrop) {
    dom.quoteDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.quoteDrawerBackdrop) closeQuoteDrawer();
    });
  }

  // WhatsApp & Email dispatch
  if (dom.btnSendWhatsApp) dom.btnSendWhatsApp.addEventListener('click', dispatchWhatsAppOrder);
  if (dom.btnSendEmail) dom.btnSendEmail.addEventListener('click', dispatchEmailOrder);
  if (dom.btnCopyOrder) dom.btnCopyOrder.addEventListener('click', copyOrderManifesto);

  // Modal triggers
  if (dom.modalCloseBtn) dom.modalCloseBtn.addEventListener('click', closeProductModal);
  if (dom.productModalBackdrop) {
    dom.productModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.productModalBackdrop) closeProductModal();
    });
  }

  // Scroll header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      dom.header?.classList.add('scrolled');
    } else {
      dom.header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNavDrawer');
  const mobileIcon = document.getElementById('mobileMenuIcon');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileNav.classList.toggle('active');
      mobileToggle.classList.toggle('active', isActive);
      if (mobileIcon) {
        mobileIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
      }
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        if (mobileIcon) mobileIcon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      });
    });
  }

  // Keyboard escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteDrawer();
      closeProductModal();
    }
  });
});
