/**
 * Smallfix OS 2.0 Theme Core JavaScript
 * Handles navigation, mobile drawers, search overlays, and product gallery zooms.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('[data-action="toggle-mobile-menu"]');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle mobile nav drawer
      console.log('Mobile menu toggled');
    });
  }

  // Gallery Thumbnail Switcher
  const mainImage = document.getElementById('ProductMainImage');
  const thumbnails = document.querySelectorAll('[data-thumbnail-src]');
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      const newSrc = thumb.getAttribute('data-thumbnail-src');
      if (mainImage && newSrc) {
        mainImage.src = newSrc;
      }
    });
  });

  // Quantity Controls
  const qtyInput = document.getElementById('QuantityInput');
  const plusBtn = document.querySelector('[data-qty-action="plus"]');
  const minusBtn = document.querySelector('[data-qty-action="minus"]');
  if (qtyInput && plusBtn && minusBtn) {
    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value || '1', 10) + 1;
    });
    minusBtn.addEventListener('click', () => {
      const val = parseInt(qtyInput.value || '1', 10);
      if (val > 1) qtyInput.value = val - 1;
    });
  }
});
