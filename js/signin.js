/* ============================================================
   RETRIEVERFORGE — SIGN IN LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNav('');
  document.getElementById('rf-signin-art').innerHTML = RFArt.retrieveScene({ id: 'signin-hero' });
  document.getElementById('rf-signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('This is a frontend prototype — sign-in is not yet connected to a backend.');
  });
});
