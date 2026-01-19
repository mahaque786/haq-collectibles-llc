/* ============================================
   HAQ COLLECTIBLES LLC - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }
  
  // Set active nav item based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let galleryImages = [];
  
  // Initialize gallery items
  window.initGallery = function() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
    
    galleryImages.forEach((item, index) => {
      item.addEventListener('click', function() {
        openLightbox(index);
      });
    });
  }
  
  function openLightbox(index) {
    if (!lightbox || !galleryImages.length) return;
    
    currentImageIndex = index;
    const item = galleryImages[index];
    const img = item.querySelector('img');
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
      currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
      currentImageIndex = 0;
    }
    
    const item = galleryImages[currentImageIndex];
    const img = item.querySelector('img');
    
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || '';
  }
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }
  
  // Initialize gallery if on collection page
  if (document.querySelector('.gallery-grid')) {
    initGallery();
  }
  
  // Gallery filter functionality
  const filterButtons = document.querySelectorAll('.gallery-filter');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const items = document.querySelectorAll('.gallery-item');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Collapsible sections functionality
  const collapsibleToggles = document.querySelectorAll('.collapsible-toggle');
  
  collapsibleToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.dataset.target;
      const content = document.getElementById(targetId);
      
      if (content) {
        this.classList.toggle('active');
        content.classList.toggle('active');
      }
    });
  });
  
});

// Utility function to format file names into titles
function formatFileName(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
}
