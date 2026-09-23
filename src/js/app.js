import { portfolioData } from '../data/portfolioData.js';

// Global state for live editing and filtering
export let currentData = JSON.parse(JSON.stringify(portfolioData));
let activeFilter = 'All';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  initNavigation();
  initContactForm();
});

// Main render function (called initially and upon live edits)
export function renderPortfolio(data = currentData) {
  currentData = data;
  renderHero(currentData.personal);
  renderStats(currentData.stats);
  renderAbout(currentData.personal);
  renderSkills(currentData.skillCategories);
  renderProjects(currentData.projects);
  renderTimeline(currentData.experience);
  renderContact(currentData.personal);
}

// 1. Render Hero Section
function renderHero(personal) {
  const brandName = document.getElementById('brand-name');
  const heroTitle = document.getElementById('hero-name');
  const heroRole = document.getElementById('hero-role');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroStatus = document.getElementById('hero-status');
  const heroSocials = document.getElementById('hero-socials');
  const resumeBtn = document.getElementById('resume-btn');

  if (brandName) brandName.textContent = personal.name;
  if (heroTitle) heroTitle.textContent = personal.name;
  if (heroRole) heroRole.textContent = personal.title;
  if (heroSubtitle) heroSubtitle.textContent = personal.subtitle;
  if (heroStatus) heroStatus.textContent = personal.availability;
  if (resumeBtn) resumeBtn.href = personal.resumeUrl;

  if (heroSocials) {
    heroSocials.innerHTML = `
      <a href="${personal.socials.github}" target="_blank" rel="noopener" class="social-link" title="GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </a>
      <a href="${personal.socials.linkedin}" target="_blank" rel="noopener" class="social-link" title="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </a>
      <a href="${personal.socials.twitter}" target="_blank" rel="noopener" class="social-link" title="Twitter / X">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      </a>
      <a href="${personal.socials.email}" class="social-link" title="Email Direct">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      </a>
    `;
  }
}

// 2. Render Key Statistics
function renderStats(stats) {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;

  statsContainer.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

// 3. Render About Section
function renderAbout(personal) {
  const aboutBio = document.getElementById('about-bio');
  const aboutLocation = document.getElementById('about-location');
  if (aboutBio) aboutBio.textContent = personal.bio;
  if (aboutLocation) aboutLocation.textContent = personal.location;
}

// 4. Render Skills
function renderSkills(categories) {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = categories.map(cat => `
    <div class="skill-category-card">
      <h3 class="category-title">${cat.category}</h3>
      <div class="skills-list">
        ${cat.skills.map(skill => `
          <div class="skill-row">
            <div class="skill-info">
              <span>${skill.icon}</span>
              <span>${skill.name}</span>
            </div>
            <span class="skill-level-badge">${skill.level}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// 5. Render Projects & Categories
function renderProjects(projects) {
  const filtersContainer = document.getElementById('project-filters');
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Render filter buttons
  if (filtersContainer) {
    filtersContainer.innerHTML = categories.map(category => `
      <button class="filter-btn ${category === activeFilter ? 'active' : ''}" data-category="${category}">
        ${category}
      </button>
    `).join('');

    // Attach click listeners to filters
    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.getAttribute('data-category');
        filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjectsGrid();
      });
    });
  }

  filterProjectsGrid();
}

function filterProjectsGrid() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  const filtered = activeFilter === 'All'
    ? currentData.projects
    : currentData.projects.filter(p => p.category === activeFilter);

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        No projects found in this category.
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = filtered.map(p => `
    <article class="project-card" data-id="${p.id}">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="project-badge">${p.category}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-tagline">${p.tagline}</p>
        <div class="project-tags">
          ${p.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="view-details-btn" data-id="${p.id}">
            Learn More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div class="project-links">
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener" class="icon-btn" title="View Source Code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            ` : ''}
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener" class="icon-btn" title="Live Preview">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Attach click listeners to cards & details buttons
  projectsGrid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking external links
      if (e.target.closest('.project-links')) return;
      const id = card.getAttribute('data-id');
      const project = currentData.projects.find(item => item.id === id);
      if (project) openProjectModal(project);
    });
  });
}

// 6. Project Modal Details
export function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="modal-hero-img" />
    <div class="modal-body">
      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.8rem;">
        <span class="project-badge" style="position: static;">${project.category}</span>
        ${project.featured ? '<span class="project-badge" style="position: static; color: #a855f7;">★ Featured</span>' : ''}
      </div>
      <h2 class="modal-title">${project.title}</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">${project.description}</p>
      
      <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; font-family: var(--font-heading);">Key Features & Architecture</h4>
      <ul class="modal-features-list">
        ${(project.features || []).map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 style="font-size: 1rem; margin-top: 1.5rem; margin-bottom: 0.8rem; color: var(--text-muted);">Technologies Used</h4>
      <div class="project-tags" style="margin-bottom: 2rem;">
        ${project.tags.map(tag => `<span class="tag-badge" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">${tag}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        ${project.liveUrl ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
            Visit Live Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        ` : ''}
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
            GitHub Repository
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// 7. Render Experience Timeline
function renderTimeline(experience) {
  const timelineContainer = document.getElementById('timeline-container');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = experience.map(item => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <div class="timeline-period">${item.period}</div>
        <h4 class="timeline-role">${item.role}</h4>
        <div class="timeline-company">${item.company}</div>
        <p class="timeline-description">${item.description}</p>
      </div>
    </div>
  `).join('');
}

// 8. Render Contact Section
function renderContact(personal) {
  const contactEmail = document.getElementById('contact-email');
  const contactLocation = document.getElementById('contact-location');
  const contactAvailability = document.getElementById('contact-availability');
  if (contactEmail) {
    contactEmail.textContent = personal.email;
    contactEmail.href = `mailto:${personal.email}`;
  }
  if (contactLocation) contactLocation.textContent = personal.location;
  if (contactAvailability) contactAvailability.textContent = personal.availability;
}

// 9. Navigation & Scroll Interactions
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const projectModal = document.getElementById('project-modal');

  // Sticky header scroll blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Modal close listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

// 10. Contact Form Submission
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `Sending...`;

    // Simulate reliable submission
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.');
    }, 800);
  });
}

// Toast helper
export function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
