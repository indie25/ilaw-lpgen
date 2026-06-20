/**
 * app.js — Main Application Logic
 * ILAW Lesson Plan Generator — DepEd Philippines
 * DO No. 016, s. 2026
 *
 * Handles:
 * - PWA installation & service worker registration
 * - Cascading dropdown population from CURRICULUM database
 * - Rule-based engine: context toggles, emergency tier switching
 * - Quill.js editor initialization and autosave
 * - PDF and DOCX export
 * - AI declaration builder
 * - Grading panel rendering
 */

'use strict';

/* ═══════════════════════════════════════════
   1. GLOBAL STATE
   ═══════════════════════════════════════════ */

const APP_STATE = {
  quill: null,
  currentData: null,
  currentContext: {
    grade: '',
    subject: '',
    quarter: '',
    week: '',
    emergencyTier: 'normal',
    diverseLearners: false,
    lowResource: false,
  },
  draftKey: 'ilaw_draft_v1',
  pwaInstallPrompt: null,
  isGenerated: false,
};

/* ═══════════════════════════════════════════
   2. INITIALIZATION
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  initPWA();
  initDropdowns();
  initQuill();
  initContextToggles();
  initAIToggles();
  initNetworkStatus();
  setDefaultDate();
  checkForDraft();
});

/* ═══════════════════════════════════════════
   3. SERVICE WORKER & PWA
   ═══════════════════════════════════════════ */

/**
 * Registers the PWA service worker for offline capabilities.
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => {
        console.log('[ILAW] Service Worker registered:', reg.scope);
        document.getElementById('pwaStatus').textContent = 'Ready (offline-capable)';
        document.getElementById('pwaStatus').classList.replace('text-slate-400', 'text-green-600');
      })
      .catch(err => {
        console.warn('[ILAW] Service Worker registration failed:', err);
      });
  }
}

/**
 * Sets up the PWA "Add to Home Screen" install prompt.
 */
function initPWA() {
  const installBtn = document.getElementById('pwaInstallBtn');

  // Capture the browser's install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    APP_STATE.pwaInstallPrompt = e;
    installBtn.classList.add('visible');
    installBtn.style.display = 'flex';
  });

  // Handle click on install button
  installBtn.addEventListener('click', async () => {
    if (!APP_STATE.pwaInstallPrompt) return;
    APP_STATE.pwaInstallPrompt.prompt();
    const { outcome } = await APP_STATE.pwaInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      installBtn.classList.remove('visible');
      installBtn.style.display = 'none';
      document.getElementById('pwaStatus').textContent = 'Installed ✓';
      document.getElementById('pwaStatus').classList.replace('text-slate-400', 'text-green-600');
      showToast('App installed! You can now use it offline.');
    }
    APP_STATE.pwaInstallPrompt = null;
  });

  // When app is installed (from browser)
  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    showToast('ILAW is installed and ready for offline use!');
  });
}

/* ═══════════════════════════════════════════
   4. NETWORK STATUS
   ═══════════════════════════════════════════ */

function initNetworkStatus() {
  const offlineIndicator = document.getElementById('offlineIndicator');
  const connStatus = document.getElementById('connStatus');

  function updateStatus() {
    if (navigator.onLine) {
      offlineIndicator.classList.remove('visible');
      connStatus.textContent = 'Online';
      connStatus.className = 'text-green-600 font-medium text-xs';
    } else {
      offlineIndicator.classList.add('visible');
      connStatus.textContent = 'Offline';
      connStatus.className = 'text-yellow-500 font-medium text-xs';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

/* ═══════════════════════════════════════════
   5. CASCADING DROPDOWNS
   ═══════════════════════════════════════════ */

function initDropdowns() {
  const gradeSelect   = document.getElementById('gradeSelect');
  const subjectSelect = document.getElementById('subjectSelect');
  const quarterSelect = document.getElementById('quarterSelect');
  const weekSelect    = document.getElementById('weekSelect');
  const generateBtn   = document.getElementById('generateBtn');

  // Grade → populate subjects
  gradeSelect.addEventListener('change', () => {
    const grade = gradeSelect.value;
    APP_STATE.currentContext.grade = grade;

    // Reset downstream
    resetSelect(subjectSelect, '— Select Subject —');
    resetSelect(quarterSelect, '— Select Quarter —');
    resetSelect(weekSelect, '— Select Week —');
    subjectSelect.disabled = true;
    quarterSelect.disabled = true;
    weekSelect.disabled = true;
    generateBtn.disabled = true;

    if (!grade || !CURRICULUM[grade]) return;

    const subjects = CURRICULUM[grade].subjects;
    Object.keys(subjects).forEach(key => {
      subjectSelect.appendChild(makeOption(key, subjects[key].label));
    });
    subjectSelect.disabled = false;
  });

  // Subject → populate quarters
  subjectSelect.addEventListener('change', () => {
    const grade   = gradeSelect.value;
    const subject = subjectSelect.value;
    APP_STATE.currentContext.subject = subject;

    resetSelect(quarterSelect, '— Select Quarter —');
    resetSelect(weekSelect, '— Select Week —');
    quarterSelect.disabled = true;
    weekSelect.disabled = true;
    generateBtn.disabled = true;

    if (!subject) return;

    const quarters = CURRICULUM[grade].subjects[subject].quarters;
    Object.keys(quarters).forEach(key => {
      quarterSelect.appendChild(makeOption(key, quarters[key].label));
    });
    quarterSelect.disabled = false;
  });

  // Quarter → populate weeks
  quarterSelect.addEventListener('change', () => {
    const grade   = gradeSelect.value;
    const subject = subjectSelect.value;
    const quarter = quarterSelect.value;
    APP_STATE.currentContext.quarter = quarter;

    resetSelect(weekSelect, '— Select Week —');
    weekSelect.disabled = true;
    generateBtn.disabled = true;

    if (!quarter) return;

    const weeks = CURRICULUM[grade].subjects[subject].quarters[quarter].weeks;
    Object.keys(weeks).forEach(key => {
      weekSelect.appendChild(makeOption(key, weeks[key].label));
    });
    weekSelect.disabled = false;
  });

  // Week → enable generate button
  weekSelect.addEventListener('change', () => {
    APP_STATE.currentContext.week = weekSelect.value;
    generateBtn.disabled = !weekSelect.value;
  });

  // Generate button
  generateBtn.addEventListener('click', generateLessonPlan);
}

/** Creates and returns an <option> element. */
function makeOption(value, label) {
  const opt = document.createElement('option');
  opt.value = value;
  opt.textContent = label;
  return opt;
}

/** Resets a select element to a single placeholder option. */
function resetSelect(selectEl, placeholderText) {
  selectEl.innerHTML = `<option value="">${placeholderText}</option>`;
}

/* ═══════════════════════════════════════════
   6. QUILL.JS RICH TEXT EDITOR
   ═══════════════════════════════════════════ */

function initQuill() {
  APP_STATE.quill = new Quill('#quillEditor', {
    theme: 'snow',
    placeholder: 'Your lesson plan will appear here after generating...',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote'],
        ['clean']
      ]
    }
  });

  // Autosave on every keystroke using the text-change event
  APP_STATE.quill.on('text-change', debounce(() => {
    if (APP_STATE.isGenerated) {
      autoSaveDraft();
    }
  }, 600));
}

/* ═══════════════════════════════════════════
   7. CONTEXT TOGGLES (RULE-BASED ENGINE)
   ═══════════════════════════════════════════ */

function initContextToggles() {
  // Emergency tier dropdown — triggers plan regeneration if active
  document.getElementById('emergencyTier').addEventListener('change', (e) => {
    APP_STATE.currentContext.emergencyTier = e.target.value;
    if (APP_STATE.isGenerated) generateLessonPlan();
  });

  // Diverse learners toggle
  document.getElementById('diverseLearnersToggle').addEventListener('change', (e) => {
    APP_STATE.currentContext.diverseLearners = e.target.checked;
    if (APP_STATE.isGenerated) generateLessonPlan();
  });

  // Low-resource toggle
  document.getElementById('lowResourceToggle').addEventListener('change', (e) => {
    APP_STATE.currentContext.lowResource = e.target.checked;
    if (APP_STATE.isGenerated) generateLessonPlan();
  });
}

/* ═══════════════════════════════════════════
   8. AI DECLARATION TOGGLES
   ═══════════════════════════════════════════ */

function initAIToggles() {
  const aiCheckboxes = ['aiGrammar', 'aiFormat', 'aiScaffold', 'aiTranslate', 'aiNone', 'aiToolName'];

  aiCheckboxes.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      if (APP_STATE.isGenerated) updateAIDeclaration();
    });
  });
}

/**
 * Updates the AI declaration banner at the top of the document.
 */
function updateAIDeclaration() {
  const aiSettings = getAISettings();
  const banner = document.getElementById('aiDeclarationBanner');
  const text = document.getElementById('aiDeclarationText');
  const declaration = buildAIDeclaration(aiSettings);

  text.textContent = ' ' + declaration;
  banner.classList.remove('hidden');
}

/** Reads current AI toggle settings from the form. */
function getAISettings() {
  return {
    grammar:  document.getElementById('aiGrammar').checked,
    format:   document.getElementById('aiFormat').checked,
    scaffold: document.getElementById('aiScaffold').checked,
    translate:document.getElementById('aiTranslate').checked,
    none:     document.getElementById('aiNone').checked,
    toolName: document.getElementById('aiToolName').value.trim()
  };
}

/* ═══════════════════════════════════════════
   9. LESSON PLAN GENERATION ENGINE
   ═══════════════════════════════════════════ */

/**
 * Main generation function — assembles and renders the full lesson plan.
 */
function generateLessonPlan() {
  const ctx = APP_STATE.currentContext;
  const { grade, subject, quarter, week, emergencyTier, diverseLearners, lowResource } = ctx;

  if (!grade || !subject || !quarter || !week) {
    showToast('Please complete all curriculum selections first.');
    return;
  }

  // Fetch data from curriculum database
  const data = CURRICULUM[grade]?.subjects[subject]?.quarters[quarter]?.weeks[week];
  if (!data) {
    showToast('Curriculum data not found. Please try a different selection.');
    return;
  }
  APP_STATE.currentData = data;

  // Build context object for template engine
  const context = {
    grade, subject, quarter, week,
    emergencyTier,
    diverseLearners,
    lowResource,
  };

  // Generate HTML from template engine
  const html = buildILAWPlan(data, context);

  // Populate the Quill editor with generated content
  APP_STATE.quill.clipboard.dangerouslyPasteHTML(html);

  // Update the document header display fields
  updateDocumentHeader(data, grade, subject, quarter, week);

  // Show the editor, hide the empty state
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('editorContainer').classList.remove('hidden');
  APP_STATE.isGenerated = true;

  // Render grading panel based on key stage
  renderGradingPanel(grade);

  // Update AI declaration if any toggles are set
  const aiSettings = getAISettings();
  const hasAISelections = aiSettings.grammar || aiSettings.format || aiSettings.scaffold || aiSettings.translate;
  if (hasAISelections) updateAIDeclaration();

  // Save draft automatically
  autoSaveDraft();

  showToast('Lesson plan generated successfully!');
}

/**
 * Populates the document header with current teacher/lesson info.
 */
function updateDocumentHeader(data, grade, subject, quarter, week) {
  const teacherName = document.getElementById('teacherName').value || 'Teacher Name';
  const schoolName  = document.getElementById('schoolName').value || 'School Name';
  const lessonDate  = document.getElementById('lessonDate').value;
  const lessonTime  = document.getElementById('lessonTime').value;
  const sectionName = document.getElementById('sectionName').value;

  const gradeData   = CURRICULUM[grade];
  const subjectData = gradeData.subjects[subject];
  const quarterData = subjectData.quarters[quarter];
  const weekData    = quarterData.weeks[week];

  document.getElementById('displayTeacher').textContent = teacherName;
  document.getElementById('displaySchool').textContent  = schoolName;
  document.getElementById('displayDate').textContent    =
    (lessonDate ? formatDate(lessonDate) : '') + (lessonTime ? ' | ' + lessonTime : '');
  document.getElementById('displaySection').textContent =
    sectionName ? 'Section: ' + sectionName : '';

  document.getElementById('displaySubject').textContent = subjectData.label;
  document.getElementById('displayGrade').textContent   = gradeData.label;
  document.getElementById('displayQuarter').textContent = quarterData.label;
  document.getElementById('displayWeek').textContent    = weekData.label;
  document.getElementById('displayCode').textContent    = data.CompetencyCode;
}

/**
 * Renders the appropriate grading panel based on the key stage of the selected grade.
 */
function renderGradingPanel(grade) {
  const gradeData = CURRICULUM[grade];
  const panel     = document.getElementById('gradingPanel');
  const content   = document.getElementById('gradingContent');

  if (gradeData.keyStage === 1) {
    // Key Stage 1 — qualitative PACE form
    content.innerHTML = buildKS1GradingPanel(GRADING_CONFIG.keyStage1);
  } else {
    // Key Stages 2–4 — numerical grading with weights
    content.innerHTML = buildKS2to4GradingPanel(GRADING_CONFIG.keyStage2to4);
  }

  panel.classList.remove('hidden');
}

/**
 * Grade calculator for KS2–4 panel (called by inline oninput handlers).
 */
function calculateGrade() {
  const ww = parseFloat(document.getElementById('wwScore')?.value) || 0;
  const pt = parseFloat(document.getElementById('ptScore')?.value) || 0;
  const st = parseFloat(document.getElementById('stScore')?.value) || 0;

  const weighted = (ww * 0.20) + (pt * 0.50) + (st * 0.30);
  const transmuted = (weighted / 100 * 50) + 50;
  const passed = transmuted >= 75;

  const resultEl = document.getElementById('gradeResult');
  if (!resultEl) return;

  resultEl.innerHTML = `
    <span style="font-size:13px; color:${passed ? '#16a34a' : '#dc2626'};">
      Weighted Average: ${weighted.toFixed(2)}% → Transmuted Grade: <strong>${transmuted.toFixed(2)}</strong>
      ${passed ? '✅ Passed' : '❌ Did Not Pass'}
    </span>`;
  resultEl.className = 'text-center py-2 rounded-md text-sm ' + (passed ? 'bg-green-50' : 'bg-red-50');
}

/* ═══════════════════════════════════════════
   10. DRAFT MANAGEMENT (localStorage)
   ═══════════════════════════════════════════ */

/**
 * Autosave the current draft to localStorage.
 * Called on every text change (debounced).
 */
function autoSaveDraft() {
  if (!APP_STATE.quill || !APP_STATE.isGenerated) return;

  const draft = {
    timestamp: Date.now(),
    html: APP_STATE.quill.root.innerHTML,
    context: APP_STATE.currentContext,
    teacher: {
      name:    document.getElementById('teacherName').value,
      school:  document.getElementById('schoolName').value,
      date:    document.getElementById('lessonDate').value,
      time:    document.getElementById('lessonTime').value,
      section: document.getElementById('sectionName').value
    }
  };

  try {
    localStorage.setItem(APP_STATE.draftKey, JSON.stringify(draft));
    const statusEl = document.getElementById('autosaveStatus');
    statusEl.textContent = 'Autosaved ' + formatTimeNow();
    statusEl.className = 'text-xs text-green-400';
    document.getElementById('draftStatus').textContent = 'Saved';
    document.getElementById('draftStatus').className = 'text-green-600 text-xs';
  } catch (e) {
    console.warn('[ILAW] Autosave failed (localStorage quota exceeded?):', e);
    document.getElementById('autosaveStatus').textContent = 'Save failed';
  }
}

/**
 * Manual save — provides user feedback.
 */
function saveDraft() {
  autoSaveDraft();
  showToast('Draft saved to this device.');
}

/**
 * Loads the last saved draft from localStorage.
 */
function loadDraft() {
  try {
    const raw = localStorage.getItem(APP_STATE.draftKey);
    if (!raw) {
      showToast('No saved draft found on this device.');
      return;
    }

    const draft = JSON.parse(raw);

    // Restore editor content
    APP_STATE.quill.clipboard.dangerouslyPasteHTML(draft.html || '');
    APP_STATE.isGenerated = true;

    // Restore teacher fields
    if (draft.teacher) {
      document.getElementById('teacherName').value = draft.teacher.name || '';
      document.getElementById('schoolName').value  = draft.teacher.school || '';
      document.getElementById('lessonDate').value  = draft.teacher.date || '';
      document.getElementById('lessonTime').value  = draft.teacher.time || '';
      document.getElementById('sectionName').value = draft.teacher.section || '';
    }

    // Show editor
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('editorContainer').classList.remove('hidden');

    const savedAt = new Date(draft.timestamp).toLocaleString('en-PH');
    showToast(`Draft loaded (saved ${savedAt})`);
    document.getElementById('autosaveStatus').textContent = 'Draft loaded';
    document.getElementById('draftStatus').textContent = 'Loaded';
  } catch (e) {
    console.error('[ILAW] Failed to load draft:', e);
    showToast('Could not load draft. It may be corrupted.');
  }
}

/**
 * Check for existing draft on startup.
 */
function checkForDraft() {
  try {
    const raw = localStorage.getItem(APP_STATE.draftKey);
    if (raw) {
      const draft = JSON.parse(raw);
      const savedAt = new Date(draft.timestamp).toLocaleString('en-PH');
      document.getElementById('draftStatus').textContent = `Saved ${formatTimeNow(draft.timestamp)}`;
      document.getElementById('draftStatus').className = 'text-blue-500 text-xs';
    }
  } catch (e) {
    // Ignore
  }
}

/**
 * Clears the current plan and resets the UI.
 */
function clearPlan() {
  if (!confirm('Clear the current lesson plan? Your last saved draft will still be available via "Load Draft".')) return;

  APP_STATE.quill.setText('');
  APP_STATE.isGenerated = false;
  APP_STATE.currentData = null;

  document.getElementById('editorContainer').classList.add('hidden');
  document.getElementById('emptyState').classList.remove('hidden');
  document.getElementById('aiDeclarationBanner').classList.add('hidden');
  document.getElementById('gradingPanel').classList.add('hidden');
  document.getElementById('autosaveStatus').textContent = 'Draft saved';

  showToast('Plan cleared. Start a new plan using the sidebar.');
}

/* ═══════════════════════════════════════════
   11. EXPORT: PDF
   ═══════════════════════════════════════════ */

/**
 * Exports the lesson plan to a PDF file using html2pdf.js.
 */
function exportToPDF() {
  if (!APP_STATE.isGenerated) {
    showToast('Please generate a lesson plan first.');
    return;
  }

  showToast('Preparing PDF export...');

  const element = document.getElementById('lessonPaperWrapper');
  const teacherName = document.getElementById('teacherName').value || 'LessonPlan';
  const date = document.getElementById('lessonDate').value || formatDateYMD(new Date());

  // Temporarily hide the Quill toolbar for clean export
  const toolbar = element.querySelector('.ql-toolbar');
  if (toolbar) toolbar.style.display = 'none';

  const options = {
    margin:       [15, 15, 15, 15],
    filename:     `ILAW_${teacherName.replace(/\s+/g, '_')}_${date}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'legal', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(options).from(element).save().then(() => {
    if (toolbar) toolbar.style.display = '';
    showToast('PDF exported successfully!');
  }).catch(err => {
    if (toolbar) toolbar.style.display = '';
    console.error('[ILAW] PDF export error:', err);
    showToast('PDF export failed. Please try again.');
  });
}

/* ═══════════════════════════════════════════
   12. EXPORT: DOCX (Word)
   ═══════════════════════════════════════════ */

/**
 * Exports the lesson plan to a .docx Word file using docx.js.
 * Converts the Quill HTML content into Word-compatible paragraphs.
 */
function exportToDocx() {
  if (!APP_STATE.isGenerated) {
    showToast('Please generate a lesson plan first.');
    return;
  }

  showToast('Building Word document...');

  try {
    const teacherName  = document.getElementById('teacherName').value || 'Teacher';
    const schoolName   = document.getElementById('schoolName').value || 'School';
    const lessonDate   = document.getElementById('lessonDate').value || '';
    const displayGrade = document.getElementById('displayGrade').textContent;
    const displaySubj  = document.getElementById('displaySubject').textContent;
    const displayQtr   = document.getElementById('displayQuarter').textContent;
    const displayWeek  = document.getElementById('displayWeek').textContent;
    const displayCode  = document.getElementById('displayCode').textContent;

    // Parse the Quill editor's HTML to extract text
    const editorHTML = APP_STATE.quill.root.innerHTML;
    const paragraphs  = htmlToParagraphs(editorHTML, teacherName, schoolName,
                          lessonDate, displayGrade, displaySubj, displayQtr, displayWeek, displayCode);

    const doc = new docx.Document({
      creator: teacherName,
      title: `ILAW Lesson Plan — ${displaySubj} ${displayGrade}`,
      description: `Generated by ILAW Lesson Plan Generator. DO No. 016, s. 2026.`,
      sections: [{
        properties: {
          page: {
            margin: {
              top:    docx.convertInchesToTwip(1),
              bottom: docx.convertInchesToTwip(1),
              left:   docx.convertInchesToTwip(1.25),
              right:  docx.convertInchesToTwip(1.25),
            }
          }
        },
        children: paragraphs
      }]
    });

    docx.Packer.toBlob(doc).then(blob => {
      saveAs(blob, `ILAW_${teacherName.replace(/\s+/g, '_')}_${displaySubj}_${lessonDate || 'Plan'}.docx`);
      showToast('Word document exported!');
    });

  } catch (err) {
    console.error('[ILAW] DOCX export error:', err);
    showToast('Word export failed. Please try again.');
  }
}

/**
 * Converts the editor HTML into docx Paragraph objects.
 * Parses the DOM tree and maps headings, lists, and paragraphs to docx elements.
 *
 * @param {string} html - Raw HTML from Quill editor
 * @param {string} teacherName - Teacher's name
 * @param {string} schoolName - School name
 * @param {string} date - Lesson date
 * @param {string} grade - Grade level
 * @param {string} subject - Subject area
 * @param {string} quarter - Quarter
 * @param {string} week - Week
 * @param {string} code - Competency code
 * @returns {Array} Array of docx Paragraph objects
 */
function htmlToParagraphs(html, teacherName, schoolName, date, grade, subject, quarter, week, code) {
  const paragraphs = [];

  // Document title block
  paragraphs.push(
    new docx.Paragraph({
      text: 'Republic of the Philippines',
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 0 },
      run: { size: 20, font: 'Arial' }
    }),
    new docx.Paragraph({
      children: [new docx.TextRun({ text: 'Department of Education', size: 20, font: 'Arial' })],
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 0 }
    }),
    new docx.Paragraph({
      children: [new docx.TextRun({ text: 'ILAW LESSON PLAN', bold: true, size: 28, font: 'Arial', color: '1e3a5f' })],
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 120 }
    }),
    new docx.Paragraph({
      children: [new docx.TextRun({ text: 'DO No. 016, s. 2026 — ILAW Framework', italics: true, size: 18, font: 'Arial', color: '2563eb' })],
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 240 }
    })
  );

  // Teacher info table
  paragraphs.push(
    new docx.Paragraph({
      children: [
        new docx.TextRun({ text: 'Teacher: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: teacherName, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: '    School: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: schoolName, font: 'Arial', size: 22 })
      ],
      spacing: { after: 80 }
    }),
    new docx.Paragraph({
      children: [
        new docx.TextRun({ text: 'Grade: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: grade, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: '    Subject: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: subject, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: '    Quarter: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: quarter, font: 'Arial', size: 22 })
      ],
      spacing: { after: 80 }
    }),
    new docx.Paragraph({
      children: [
        new docx.TextRun({ text: week, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: '    Competency Code: ', bold: true, font: 'Arial', size: 22 }),
        new docx.TextRun({ text: code, font: 'Arial', size: 22, color: '2563eb' })
      ],
      spacing: { after: 240 }
    })
  );

  // Parse the editor HTML and add content paragraphs
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Walk all child nodes and convert to docx paragraphs
  tempDiv.querySelectorAll('h1, h2, h3, p, li, blockquote').forEach(node => {
    const text = node.textContent.trim();
    if (!text) return;

    let para;

    if (node.tagName === 'H1') {
      para = new docx.Paragraph({
        children: [new docx.TextRun({ text, bold: true, size: 28, font: 'Arial', color: '1e3a5f' })],
        spacing: { before: 240, after: 120 }
      });
    } else if (node.tagName === 'H2') {
      para = new docx.Paragraph({
        children: [new docx.TextRun({ text, bold: true, size: 24, font: 'Arial', color: '2563eb' })],
        spacing: { before: 200, after: 100 },
        border: { bottom: { color: 'e2e8f0', space: 1, value: docx.BorderStyle.SINGLE, size: 6 } }
      });
    } else if (node.tagName === 'H3') {
      para = new docx.Paragraph({
        children: [new docx.TextRun({ text, bold: true, size: 22, font: 'Arial', color: '374151' })],
        spacing: { before: 160, after: 80 }
      });
    } else if (node.tagName === 'LI') {
      para = new docx.Paragraph({
        children: [new docx.TextRun({ text: '• ' + text, font: 'Arial', size: 20 })],
        indent: { left: 360 },
        spacing: { after: 60 }
      });
    } else if (node.tagName === 'BLOCKQUOTE') {
      para = new docx.Paragraph({
        children: [new docx.TextRun({ text, italics: true, font: 'Arial', size: 20, color: '1e3a5f' })],
        indent: { left: 720 },
        border: { left: { color: '2563eb', space: 8, value: docx.BorderStyle.SINGLE, size: 12 } },
        spacing: { after: 80 }
      });
    } else {
      // Regular paragraph
      const runs = [];
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          if (child.textContent.trim()) {
            runs.push(new docx.TextRun({ text: child.textContent, font: 'Arial', size: 20 }));
          }
        } else if (child.tagName === 'STRONG' || child.tagName === 'B') {
          runs.push(new docx.TextRun({ text: child.textContent, bold: true, font: 'Arial', size: 20 }));
        } else if (child.tagName === 'EM' || child.tagName === 'I') {
          runs.push(new docx.TextRun({ text: child.textContent, italics: true, font: 'Arial', size: 20 }));
        } else if (child.textContent.trim()) {
          runs.push(new docx.TextRun({ text: child.textContent, font: 'Arial', size: 20 }));
        }
      });
      if (runs.length === 0 && text) {
        runs.push(new docx.TextRun({ text, font: 'Arial', size: 20 }));
      }
      if (runs.length > 0) {
        para = new docx.Paragraph({ children: runs, spacing: { after: 80 } });
      }
    }

    if (para) paragraphs.push(para);
  });

  // Footer
  paragraphs.push(
    new docx.Paragraph({
      children: [new docx.TextRun({
        text: `Generated by ILAW Lesson Plan Generator | DepEd Philippines | DO No. 016, s. 2026 | ${new Date().toLocaleDateString('en-PH')}`,
        size: 14, font: 'Arial', color: '94a3b8', italics: true
      })],
      alignment: docx.AlignmentType.CENTER,
      spacing: { before: 480 }
    })
  );

  return paragraphs;
}

/* ═══════════════════════════════════════════
   13. UTILITY FUNCTIONS
   ═══════════════════════════════════════════ */

/**
 * Shows a toast notification.
 * @param {string} message
 * @param {number} duration - Duration in ms (default 3000)
 */
function showToast(message, duration = 3000) {
  const toast  = document.getElementById('toast');
  const msg    = document.getElementById('toastMsg');
  msg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('show');
  }, duration);
}

/**
 * Sets the date input to today's date as a default.
 */
function setDefaultDate() {
  const dateInput = document.getElementById('lessonDate');
  if (!dateInput.value) {
    const today = new Date();
    dateInput.value = formatDateYMD(today);
  }
}

/**
 * Formats a Date object as YYYY-MM-DD.
 * @param {Date} date
 * @returns {string}
 */
function formatDateYMD(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Formats a date string (YYYY-MM-DD) to a readable format.
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Returns a time-ago or time string.
 * @param {number} [timestamp] - Optional Unix timestamp. Defaults to now.
 * @returns {string}
 */
function formatTimeNow(timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Debounce utility — limits function call frequency.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
