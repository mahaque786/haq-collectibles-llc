/* ============================================
   HAQ COLLECTIBLES LLC - Collection Gallery
   
   This script loads images from the /collection folder
   and displays them in a gallery format.
   
   SETUP OPTIONS:
   
   Option 1: JSON Manifest (Recommended for GitHub Pages)
   - Create a file called collection/images.json
   - List your images there (see below for format)
   - Images load fast and reliably
   
   Option 2: GitHub API (Auto-detects images)
   - Set USE_GITHUB_API = true below
   - Set your GITHUB_REPO (e.g., 'username/repo-name')
   - Images are detected automatically
   - Note: May hit rate limits with heavy traffic
   
   ============================================ */

// ====== CONFIGURATION ======
const CONFIG = {
  // Set to true to use GitHub API, false to use JSON manifest
  USE_GITHUB_API: false,
  
  // Your GitHub repository (only needed if USE_GITHUB_API is true)
  // Format: 'username/repository-name'
  GITHUB_REPO: 'YOUR_USERNAME/haq-collectibles',
  
  // Path to images folder in your repo
  IMAGES_FOLDER: 'collection',
  
  // Path to JSON manifest (only needed if USE_GITHUB_API is false)
  MANIFEST_PATH: 'collection/images.json',
  
  // Supported image extensions
  IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  
  // Images per page (0 = show all)
  IMAGES_PER_PAGE: 0
};

/* ====== JSON MANIFEST FORMAT ======
   
   Create collection/images.json with this structure:
   
   {
     "images": [
       {
         "filename": "coin-1921-morgan-dollar.jpg",
         "title": "1921 Morgan Silver Dollar",
         "category": "coins",
         "description": "Uncirculated condition"
       },
       {
         "filename": "book-first-edition-hemingway.jpg",
         "title": "First Edition Hemingway",
         "category": "books"
       }
     ]
   }
   
   - filename: required
   - title: optional (defaults to filename)
   - category: optional (for filtering)
   - description: optional
   
====================================== */

class CollectionGallery {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.galleryGrid = null;
    this.lightbox = null;
    this.images = [];
    this.filteredImages = [];
    this.currentFilter = 'all';
    this.currentIndex = 0;
    
    if (this.container) {
      this.init();
    }
  }
  
  async init() {
    this.showLoading();
    
    try {
      if (CONFIG.USE_GITHUB_API) {
        this.images = await this.loadFromGitHub();
      } else {
        this.images = await this.loadFromManifest();
      }
      
      this.filteredImages = [...this.images];
      this.render();
      this.initLightbox();
      this.initFilters();
    } catch (error) {
      console.error('Error loading gallery:', error);
      this.showError(error.message);
    }
  }
  
  showLoading() {
    this.container.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
      </div>
    `;
  }
  
  showError(message) {
    this.container.innerHTML = `
      <div class="gallery-error" style="text-align: center; padding: 3rem;">
        <p style="color: var(--color-charcoal-light); margin-bottom: 1rem;">
          Unable to load collection images.
        </p>
        <p style="font-size: 0.9rem; color: var(--color-charcoal-light);">
          ${message}
        </p>
        <p style="font-size: 0.85rem; margin-top: 1rem;">
          Please check the <a href="https://github.com/${CONFIG.GITHUB_REPO}" target="_blank">repository</a> 
          or ensure the images.json manifest exists.
        </p>
      </div>
    `;
  }
  
  async loadFromManifest() {
    const response = await fetch(CONFIG.MANIFEST_PATH);
    
    if (!response.ok) {
      throw new Error(`Could not load ${CONFIG.MANIFEST_PATH}. Make sure the file exists.`);
    }
    
    const data = await response.json();
    
    return data.images.map(img => ({
      src: `${CONFIG.IMAGES_FOLDER}/${img.filename}`,
      title: img.title || this.formatFilename(img.filename),
      category: img.category || 'uncategorized',
      description: img.description || ''
    }));
  }
  
  async loadFromGitHub() {
    const apiUrl = `https://api.github.com/repos/${CONFIG.GITHUB_REPO}/contents/${CONFIG.IMAGES_FOLDER}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Folder "${CONFIG.IMAGES_FOLDER}" not found in repository.`);
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const files = await response.json();
    
    return files
      .filter(file => {
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        return CONFIG.IMAGE_EXTENSIONS.includes(ext);
      })
      .map(file => ({
        src: `${CONFIG.IMAGES_FOLDER}/${file.name}`,
        title: this.formatFilename(file.name),
        category: this.extractCategory(file.name),
        description: ''
      }));
  }
  
  formatFilename(filename) {
    // Remove extension and convert dashes/underscores to spaces
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
  
  extractCategory(filename) {
    // Try to extract category from filename prefix (e.g., "coins-morgan-dollar.jpg")
    const parts = filename.split(/[-_]/);
    if (parts.length > 1) {
      return parts[0].toLowerCase();
    }
    return 'uncategorized';
  }
  
  getCategories() {
    const categories = new Set(this.images.map(img => img.category));
    return ['all', ...Array.from(categories).sort()];
  }
  
  render() {
    const categories = this.getCategories();
    
    this.container.innerHTML = `
      ${categories.length > 2 ? `
        <div class="gallery-controls">
          ${categories.map(cat => `
            <button class="gallery-filter ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
              ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          `).join('')}
        </div>
      ` : ''}
      
      <div class="gallery-grid">
        ${this.renderImages()}
      </div>
      
      ${this.images.length === 0 ? `
        <div class="gallery-empty" style="text-align: center; padding: 3rem;">
          <p style="color: var(--color-charcoal-light);">
            No images found in the collection folder.
          </p>
          <p style="font-size: 0.9rem; color: var(--color-charcoal-light); margin-top: 0.5rem;">
            Add images to the <code>${CONFIG.IMAGES_FOLDER}</code> folder to display them here.
          </p>
        </div>
      ` : ''}
    `;
    
    this.galleryGrid = this.container.querySelector('.gallery-grid');
    this.attachImageEvents();
  }
  
  renderImages() {
    return this.filteredImages.map((img, index) => `
      <div class="gallery-item" data-index="${index}">
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-title">${img.title}</span>
        </div>
      </div>
    `).join('');
  }
  
  attachImageEvents() {
    const items = this.container.querySelectorAll('.gallery-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        this.openLightbox(index);
      });
    });
  }
  
  initFilters() {
    const filters = this.container.querySelectorAll('.gallery-filter');
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        this.filterImages(category);
        
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
      });
    });
  }
  
  filterImages(category) {
    this.currentFilter = category;
    
    if (category === 'all') {
      this.filteredImages = [...this.images];
    } else {
      this.filteredImages = this.images.filter(img => img.category === category);
    }
    
    // Re-render just the grid
    if (this.galleryGrid) {
      this.galleryGrid.innerHTML = this.renderImages();
      this.attachImageEvents();
    }
  }
  
  initLightbox() {
    // Create lightbox element
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
      <div class="lightbox-content">
        <img src="" alt="">
      </div>
    `;
    
    document.body.appendChild(this.lightbox);
    
    // Event listeners
    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
    this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
    this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
    
    // Close on backdrop click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });
  }
  
  openLightbox(index) {
    this.currentIndex = index;
    const img = this.filteredImages[index];
    const lightboxImg = this.lightbox.querySelector('.lightbox-content img');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
    this.updateLightboxImage();
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredImages.length;
    this.updateLightboxImage();
  }
  
  updateLightboxImage() {
    const img = this.filteredImages[this.currentIndex];
    const lightboxImg = this.lightbox.querySelector('.lightbox-content img');
    
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.title;
      lightboxImg.style.opacity = '1';
    }, 150);
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.querySelector('#collection-gallery');
  if (galleryContainer) {
    new CollectionGallery('#collection-gallery');
  }
});
