console.log("Hello world");
// MENU BURGER (mobile)
const burgerBtn = document.getElementById('burger-btn');
const mainNav   = document.getElementById('main-nav');

burgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// Ferme le menu quand on clique sur un lien
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});


// ANIMATION AU SCROLL : Les éléments avec la classe .reveal apparaissent progressivement lorsqu'ils entrent dans la vue
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animation une seule fois
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// BARÈMES DE COMPÉTENCES (barres animées) : La largeur de chaque barre est calculée depuis data-level (valeur sur 5) et animée à l'ouverture du menu déroulant parent
function animateBars(container) {
  container.querySelectorAll('.bar-fill').forEach(bar => {
    const level = parseFloat(bar.dataset.level);
    bar.style.width = (level / 5 * 100) + '%'; // convertit sur 5 → pourcentage
  });
}

// Déclenche l'animation dès qu'un <details> est ouvert
document.querySelectorAll('details').forEach(det => {
  det.addEventListener('toggle', () => {
    if (det.open) animateBars(det);
  });
});


// FORMULAIRE DE CONTACT : Validation basique + affichage d'un message de confirmation (sans back-end : simule l'envoi)
const form    = document.getElementById('contact-form');
const confirm = document.getElementById('form-confirm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!email || !message) {
    alert('Merci de remplir tous les champs avant d\'envoyer.');
    return;
    }

// Cache le formulaire et affiche le message de confirmation
  form.style.display    = 'none';
  confirm.style.display = 'block';
});


// MODALE MENTIONS LÉGALES : Ouvre et ferme la pop-up des mentions légales
const mentionsBtn   = document.getElementById('mentions-btn');
const mentionsModal = document.getElementById('mentions-modal');
const modalClose    = document.getElementById('modal-close');

mentionsBtn.addEventListener('click', () => {
  mentionsModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // bloque le scroll derrière
});

function closeModal() {
  mentionsModal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
// Ferme aussi en cliquant en dehors de la boîte
mentionsModal.addEventListener('click', (e) => {
  if (e.target === mentionsModal) closeModal();
});
// Ferme avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});