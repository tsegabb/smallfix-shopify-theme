/**
 * Smallfix Shopify Cart Drawer & Ajax API Handler
 */

class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer-modal');
    this.triggers = document.querySelectorAll('[data-action="toggle-cart"]');
    this.closeTriggers = document.querySelectorAll('[data-action="close-cart"]');
    this.init();
  }

  init() {
    this.triggers.forEach(t => t.addEventListener('click', () => this.open()));
    this.closeTriggers.forEach(t => t.addEventListener('click', () => this.close()));
  }

  open() {
    if (this.drawer) {
      this.drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  async addItem(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });
      const data = await response.json();
      this.open();
      return data;
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cartDrawer = new CartDrawer();
});
