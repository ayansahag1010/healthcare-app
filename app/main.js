/**
 * MediCare HMS — Frontend JS
 * SECURITY: No sensitive logic here — all auth/validation is server-side.
 * This file only provides UX enhancements.
 */

'use strict';

// ─── Auto-dismiss alerts after 5 seconds ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const successAlerts = document.querySelectorAll('.alert-success');
  successAlerts.forEach(function (el) {
    setTimeout(function () {
      el.style.transition = 'opacity .4s ease';
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 400);
    }, 5000);
  });

  // ─── Prevent double-submit on forms ────────────────────────────────────────
  // SECURITY: Prevents duplicate records from impatient double-clicks
  const forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function () {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving…';
      }
    });
  });
});
