// =====================================================
// work.js — optional, only needed on work.html
// main.js already handles the nav, scroll reveal, and footer
// year for this page. This file adds one small enhancement:
// clicking a technology tag filters the project grid to
// projects using that tag. Click the same tag again (or the
// "All" tag, if present) to clear the filter.
// =====================================================

const projectCards = document.querySelectorAll('.project-card');
let activeFilter = null;

document.querySelectorAll('.project-card .tag').forEach(tagEl => {
  tagEl.style.cursor = 'pointer';
  tagEl.setAttribute('role', 'button');
  tagEl.setAttribute('tabindex', '0');

  const applyFilter = () => {
    const tagText = tagEl.textContent.trim();
    activeFilter = activeFilter === tagText ? null : tagText;

    projectCards.forEach(card => {
      if (!activeFilter) {
        card.style.display = '';
        return;
      }
      const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
      card.style.display = tags.includes(activeFilter) ? '' : 'none';
    });
  };

  tagEl.addEventListener('click', applyFilter);
  tagEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyFilter();
    }
  });
});
