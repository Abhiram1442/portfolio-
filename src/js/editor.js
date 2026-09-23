import { currentData, renderPortfolio, showToast } from './app.js';

// Setup Live Content Editor
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
});

function initEditor() {
  createEditorUI();
  setupEventListeners();
}

function createEditorUI() {
  // 1. Floating Action Button (FAB)
  const fab = document.createElement('button');
  fab.id = 'editor-fab';
  fab.className = 'editor-fab';
  fab.setAttribute('title', 'Open Content Editor (Shortcut: Ctrl + Shift + E)');
  fab.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    <span>Live Editor</span>
  `;
  document.body.appendChild(fab);

  // 2. Editor Modal Dialog
  const editorModal = document.createElement('div');
  editorModal.id = 'editor-modal';
  editorModal.className = 'modal-overlay';
  editorModal.innerHTML = `
    <div class="modal-card editor-modal-card">
      <button class="modal-close-btn" id="editor-close-btn">&times;</button>
      <div class="modal-body">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-family: var(--font-heading); font-size: 1.7rem; font-weight: 800;">
            Portfolio Content Manager
          </h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            Edit your projects, skills, and personal information live. Preview changes instantly or export the updated code.
          </p>
        </div>

        <!-- Tabs -->
        <div class="editor-tabs">
          <button class="editor-tab-btn active" data-tab="tab-personal">Profile & Bio</button>
          <button class="editor-tab-btn" data-tab="tab-projects">Projects (${currentData.projects.length})</button>
          <button class="editor-tab-btn" data-tab="tab-skills">Skills & Stack</button>
          <button class="editor-tab-btn" data-tab="tab-export">Export Code</button>
        </div>

        <!-- Personal Info Tab -->
        <div class="editor-section active" id="tab-personal">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="edit-name" class="form-input" value="${escapeHtml(currentData.personal.name)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Professional Title</label>
            <input type="text" id="edit-title" class="form-input" value="${escapeHtml(currentData.personal.title)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Hero Subtitle</label>
            <textarea id="edit-subtitle" class="form-textarea" style="min-height: 70px;">${escapeHtml(currentData.personal.subtitle)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">About Me Bio</label>
            <textarea id="edit-bio" class="form-textarea" style="min-height: 100px;">${escapeHtml(currentData.personal.bio)}</textarea>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="edit-email" class="form-input" value="${escapeHtml(currentData.personal.email)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" id="edit-location" class="form-input" value="${escapeHtml(currentData.personal.location)}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Availability Status</label>
            <input type="text" id="edit-availability" class="form-input" value="${escapeHtml(currentData.personal.availability)}" />
          </div>
        </div>

        <!-- Projects Tab -->
        <div class="editor-section" id="tab-projects">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
            <h4 style="font-size: 1.1rem; font-weight: 700;">Manage Projects</h4>
            <button class="btn btn-primary btn-sm" id="add-project-btn">+ Add New Project</button>
          </div>
          
          <div id="editor-projects-list">
            <!-- Dynamic project items populated in renderEditorProjectsList() -->
          </div>
        </div>

        <!-- Skills Tab -->
        <div class="editor-section" id="tab-skills">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
            <h4 style="font-size: 1.1rem; font-weight: 700;">Manage Skills</h4>
            <button class="btn btn-primary btn-sm" id="add-skill-btn">+ Add Skill</button>
          </div>
          <div id="editor-skills-list">
            <!-- Dynamic skills list -->
          </div>
        </div>

        <!-- Export Tab -->
        <div class="editor-section" id="tab-export">
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
            Click <strong>Download portfolioData.js</strong> to save your edits permanently into your project's <code>src/data/portfolioData.js</code> file!
          </p>
          <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <button class="btn btn-primary" id="download-code-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download portfolioData.js
            </button>
            <button class="btn btn-secondary" id="copy-code-btn">
              Copy to Clipboard
            </button>
          </div>
          <textarea id="export-code-preview" class="form-textarea" style="font-family: monospace; font-size: 0.8rem; height: 260px;" readonly></textarea>
        </div>

        <!-- Action Bar -->
        <div class="editor-actions-bar">
          <span style="color: var(--text-muted); font-size: 0.85rem;">Changes take effect immediately on this page</span>
          <div style="display: flex; gap: 0.8rem;">
            <button class="btn btn-secondary btn-sm" id="editor-cancel-btn">Close</button>
            <button class="btn btn-primary btn-sm" id="editor-save-btn">Apply & Preview Changes</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(editorModal);
}

function setupEventListeners() {
  const fab = document.getElementById('editor-fab');
  const modal = document.getElementById('editor-modal');
  const closeBtn = document.getElementById('editor-close-btn');
  const cancelBtn = document.getElementById('editor-cancel-btn');
  const saveBtn = document.getElementById('editor-save-btn');
  const tabs = document.querySelectorAll('.editor-tab-btn');
  const addProjectBtn = document.getElementById('add-project-btn');
  const addSkillBtn = document.getElementById('add-skill-btn');
  const downloadCodeBtn = document.getElementById('download-code-btn');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  // Toggle modal
  const openModal = () => {
    syncFormWithCurrentData();
    renderEditorProjectsList();
    renderEditorSkillsList();
    updateExportCodePreview();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  fab.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Shortcut Ctrl + Shift + E
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeModal();
      } else {
        openModal();
      }
    }
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      document.querySelectorAll('.editor-section').forEach(sec => sec.classList.remove('active'));
      const activeSec = document.getElementById(targetId);
      if (activeSec) activeSec.classList.add('active');
      if (targetId === 'tab-export') updateExportCodePreview();
    });
  });

  // Apply Changes
  saveBtn.addEventListener('click', () => {
    applyPersonalEdits();
    renderPortfolio(currentData);
    updateExportCodePreview();
    showToast('Portfolio successfully updated with your changes!');
    closeModal();
  });

  // Add Project
  addProjectBtn.addEventListener('click', () => {
    const newProject = {
      id: 'project-' + Date.now(),
      title: 'New Exciting Project',
      tagline: 'A brief one-sentence description of what it solves.',
      category: 'Web Apps',
      featured: false,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      description: 'Full detailed project overview explaining problem, solution, and impact.',
      features: ['Core interactive capability', 'High performance rendering', 'Secure authentication'],
      tags: ['React', 'TypeScript', 'Tailwind'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/repo'
    };
    currentData.projects.unshift(newProject);
    renderEditorProjectsList();
    renderPortfolio(currentData);
    showToast('New project created! You can now edit its details.');
  });

  // Add Skill
  addSkillBtn.addEventListener('click', () => {
    const name = prompt('Skill Name (e.g. Next.js, Rust, Docker):', 'Next.js');
    if (!name) return;
    const icon = prompt('Emoji Icon (e.g. ⚡, 🚀, 💻):', '⚡') || '⚡';
    const level = prompt('Proficiency (e.g. Expert, Advanced, Intermediate):', 'Advanced') || 'Advanced';
    
    // Add to first category or create one
    if (currentData.skillCategories.length > 0) {
      currentData.skillCategories[0].skills.push({ name, icon, level });
      renderEditorSkillsList();
      renderPortfolio(currentData);
      showToast(`Added ${name} to skills!`);
    }
  });

  // Download Code
  downloadCodeBtn.addEventListener('click', () => {
    applyPersonalEdits();
    const code = generatePortfolioDataCode(currentData);
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('portfolioData.js downloaded! Replace src/data/portfolioData.js to keep changes forever.');
  });

  // Copy Code
  copyCodeBtn.addEventListener('click', () => {
    applyPersonalEdits();
    const code = generatePortfolioDataCode(currentData);
    navigator.clipboard.writeText(code).then(() => {
      showToast('Export code copied to clipboard!');
    });
  });
}

function syncFormWithCurrentData() {
  document.getElementById('edit-name').value = currentData.personal.name || '';
  document.getElementById('edit-title').value = currentData.personal.title || '';
  document.getElementById('edit-subtitle').value = currentData.personal.subtitle || '';
  document.getElementById('edit-bio').value = currentData.personal.bio || '';
  document.getElementById('edit-email').value = currentData.personal.email || '';
  document.getElementById('edit-location').value = currentData.personal.location || '';
  document.getElementById('edit-availability').value = currentData.personal.availability || '';
}

function applyPersonalEdits() {
  currentData.personal.name = document.getElementById('edit-name').value;
  currentData.personal.title = document.getElementById('edit-title').value;
  currentData.personal.subtitle = document.getElementById('edit-subtitle').value;
  currentData.personal.bio = document.getElementById('edit-bio').value;
  currentData.personal.email = document.getElementById('edit-email').value;
  currentData.personal.location = document.getElementById('edit-location').value;
  currentData.personal.availability = document.getElementById('edit-availability').value;
}

function renderEditorProjectsList() {
  const container = document.getElementById('editor-projects-list');
  if (!container) return;

  container.innerHTML = currentData.projects.map((p, idx) => `
    <div class="editor-item-box" data-project-idx="${idx}">
      <div class="editor-item-header">
        <strong style="font-size: 1rem; color: #fff;">${escapeHtml(p.title)} (${p.category})</strong>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm delete-proj-btn" data-idx="${idx}" style="color: #ef4444;">Delete</button>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0.8rem; margin-bottom: 0.8rem;">
        <div>
          <label class="form-label">Project Title</label>
          <input type="text" class="form-input proj-title" value="${escapeHtml(p.title)}" data-idx="${idx}" />
        </div>
        <div>
          <label class="form-label">Category</label>
          <input type="text" class="form-input proj-category" value="${escapeHtml(p.category)}" data-idx="${idx}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Tagline (Short Summary)</label>
        <input type="text" class="form-input proj-tagline" value="${escapeHtml(p.tagline)}" data-idx="${idx}" />
      </div>
      <div class="form-group">
        <label class="form-label">Full Description</label>
        <textarea class="form-textarea proj-desc" style="min-height: 70px;" data-idx="${idx}">${escapeHtml(p.description)}</textarea>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 0.8rem;">
        <div>
          <label class="form-label">Tech Tags (comma separated)</label>
          <input type="text" class="form-input proj-tags" value="${escapeHtml(p.tags.join(', '))}" data-idx="${idx}" />
        </div>
        <div>
          <label class="form-label">Image URL</label>
          <input type="text" class="form-input proj-image" value="${escapeHtml(p.image)}" data-idx="${idx}" />
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
        <div>
          <label class="form-label">Live Demo URL</label>
          <input type="text" class="form-input proj-live" value="${escapeHtml(p.liveUrl || '')}" data-idx="${idx}" />
        </div>
        <div>
          <label class="form-label">GitHub URL</label>
          <input type="text" class="form-input proj-github" value="${escapeHtml(p.githubUrl || '')}" data-idx="${idx}" />
        </div>
      </div>
    </div>
  `).join('');

  // Attach live change listeners
  container.querySelectorAll('.proj-title').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].title = e.target.value;
    });
  });

  container.querySelectorAll('.proj-category').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].category = e.target.value;
    });
  });

  container.querySelectorAll('.proj-tagline').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].tagline = e.target.value;
    });
  });

  container.querySelectorAll('.proj-desc').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].description = e.target.value;
    });
  });

  container.querySelectorAll('.proj-tags').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    });
  });

  container.querySelectorAll('.proj-image').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].image = e.target.value;
    });
  });

  container.querySelectorAll('.proj-live').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].liveUrl = e.target.value;
    });
  });

  container.querySelectorAll('.proj-github').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-idx');
      currentData.projects[idx].githubUrl = e.target.value;
    });
  });

  container.querySelectorAll('.delete-proj-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      if (confirm(`Are you sure you want to remove "${currentData.projects[idx].title}"?`)) {
        currentData.projects.splice(idx, 1);
        renderEditorProjectsList();
        renderPortfolio(currentData);
        showToast('Project removed.');
      }
    });
  });
}

function renderEditorSkillsList() {
  const container = document.getElementById('editor-skills-list');
  if (!container) return;

  container.innerHTML = currentData.skillCategories.map((cat, catIdx) => `
    <div class="editor-item-box">
      <h5 style="color: var(--accent-secondary); margin-bottom: 0.8rem;">${cat.category}</h5>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${cat.skills.map((s, sIdx) => `
          <span style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.7rem; background: rgba(255,255,255,0.06); border-radius: var(--radius-sm); font-size: 0.85rem;">
            ${s.icon} ${s.name} (${s.level})
            <button class="delete-skill-btn" data-cat="${catIdx}" data-skill="${sIdx}" style="color: #ef4444; margin-left: 0.2rem; cursor: pointer;">&times;</button>
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.delete-skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const catIdx = btn.getAttribute('data-cat');
      const skillIdx = btn.getAttribute('data-skill');
      currentData.skillCategories[catIdx].skills.splice(skillIdx, 1);
      renderEditorSkillsList();
      renderPortfolio(currentData);
      showToast('Skill removed.');
    });
  });
}

function updateExportCodePreview() {
  const preview = document.getElementById('export-code-preview');
  if (preview) {
    preview.value = generatePortfolioDataCode(currentData);
  }
}

function generatePortfolioDataCode(data) {
  return `export const portfolioData = ${JSON.stringify(data, null, 2)};\n`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
