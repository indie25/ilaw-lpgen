/**
 * templates.js — ILAW Lesson Plan HTML Template Engine
 * ILAW Lesson Plan Generator — DepEd Philippines
 * DO No. 016, s. 2026
 *
 * Generates structured HTML content for the Quill.js editor
 * from curriculum data objects. Each ILAW section has a dedicated
 * template builder function.
 */

/**
 * Main assembly function — builds the full ILAW lesson plan HTML
 * from curriculum data and current context toggle settings.
 *
 * @param {Object} data - The week's curriculum data object
 * @param {Object} context - Current toggle/filter settings
 * @returns {string} Complete HTML string for Quill editor
 */
function buildILAWPlan(data, context) {
  const sections = [];

  // ─── Emergency Tier Banner ───
  if (context.emergencyTier !== 'normal') {
    const tierContent = EMERGENCY_CONTENT[context.emergencyTier];
    if (tierContent && tierContent.banner) {
      sections.push(buildEmergencyBanner(tierContent.banner));
    }
  }

  // ─── I — INTENTIONS ───
  sections.push(buildIntentionsSection(data, context));

  // ─── L — LEARNING EXPERIENCE ───
  sections.push(buildLearningExperienceSection(data, context));

  // ─── A — ASSESSING LEARNING ───
  sections.push(buildAssessingLearningSection(data, context));

  // ─── W — WAYS FORWARD ───
  sections.push(buildWaysForwardSection(data, context));

  // ─── Appendices based on toggles ───
  if (context.diverseLearners) {
    sections.push(buildAppendixSection('ANNEX A: Diverse Learners Accommodation Plan', DIVERSE_LEARNERS_CONTENT));
  }

  if (context.emergencyTier !== 'normal') {
    const tierContent = EMERGENCY_CONTENT[context.emergencyTier];
    if (tierContent && tierContent.appendix) {
      sections.push(buildAppendixSection(`ANNEX: ${context.emergencyTier.toUpperCase()} Protocol Details`, tierContent.appendix));
    }
  }

  if (context.lowResource) {
    const subjectKey = context.subject;
    const weekKey = context.week;
    const altContent = LOW_RESOURCE_CONTENT[subjectKey]?.[weekKey] || LOW_RESOURCE_CONTENT.default;
    sections.push(buildAppendixSection('ANNEX: Low-Resource Classroom Alternatives', LOW_RESOURCE_CONTENT.header + altContent));
  }

  return sections.join('\n');
}

/**
 * Section wrapper builder — creates the styled ILAW section container.
 *
 * @param {string} letter - ILAW letter (I/L/A/W)
 * @param {string} title - Full section title
 * @param {string} content - Inner HTML content
 * @returns {string}
 */
function buildSection(letter, title, content) {
  return `
<div class="ilaw-section" style="margin-bottom:24px; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
  <div style="background:#1e3a5f; color:white; padding:10px 18px; display:flex; align-items:center; gap:10px;">
    <span style="background:#f59e0b; color:#1e3a5f; font-weight:900; font-size:14px; padding:2px 10px; border-radius:20px; display:inline-block;">${letter}</span>
    <strong style="font-size:13px; letter-spacing:0.05em; text-transform:uppercase;">${title}</strong>
  </div>
  <div style="padding:16px 20px; font-family:Arial, 'Times New Roman', serif; font-size:11pt; line-height:1.6;">
    ${content}
  </div>
</div>`;
}

/**
 * Builds the emergency tier banner HTML.
 *
 * @param {Object} banner - Banner data from EMERGENCY_CONTENT
 * @returns {string}
 */
function buildEmergencyBanner(banner) {
  const colors = {
    hinay: { bg: '#fefce8', border: '#fde68a', text: '#92400e' },
    hinga: { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412' },
    hinto: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' }
  };
  const c = colors[banner.type] || colors.hinay;
  return `
<div style="background:${c.bg}; border:2px solid ${c.border}; border-radius:8px; padding:14px 18px; margin-bottom:20px; color:${c.text};">
  <p style="font-weight:800; font-size:13px; margin:0 0 6px;">${banner.emoji} ${banner.title}</p>
  <p style="font-size:11px; margin:0; line-height:1.5;">${banner.message}</p>
</div>`;
}

/**
 * Builds the INTENTIONS section (I).
 *
 * @param {Object} data - Week curriculum data
 * @param {Object} context - Toggle context
 * @returns {string}
 */
function buildIntentionsSection(data, context) {
  const intent = data.Intentions;
  const obj = intent.Objectives;

  // In HINTO mode, replace objectives with PFA goals
  if (context.emergencyTier === 'hinto') {
    const hintoCognitive = 'Ensure the physical and emotional safety of all learners and their families.';
    const hintoAffective = 'Provide a calm, supportive presence to learners experiencing trauma or acute stress.';
    return buildSection('I', 'INTENTIONS — PFA Mode (HINTO)', `
      <p style="color:#991b1b; font-weight:700; margin-bottom:10px;">⚠️ Academic objectives are suspended. PFA goals are active.</p>
      <table style="width:100%; border-collapse:collapse; font-size:10.5pt;">
        <tr style="background:#fef2f2;">
          <th style="padding:8px 12px; text-align:left; font-weight:700; width:140px; border:1px solid #fecaca;">PFA Goal 1</th>
          <td style="padding:8px 12px; border:1px solid #fecaca;">${hintoCognitive}</td>
        </tr>
        <tr>
          <th style="padding:8px 12px; text-align:left; font-weight:700; background:#fef2f2; border:1px solid #fecaca;">PFA Goal 2</th>
          <td style="padding:8px 12px; border:1px solid #fecaca;">${hintoAffective}</td>
        </tr>
      </table>`);
  }

  const materialsHtml = intent.Materials
    ? `<h3 style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:14px 0 6px;">Materials & Resources</h3>
       <ul style="margin:0; padding-left:20px;">${intent.Materials.map(m => `<li>${m}</li>`).join('')}</ul>`
    : '';

  const refsHtml = intent.References
    ? `<h3 style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:14px 0 6px;">References</h3>
       <ul style="margin:0; padding-left:20px;">${intent.References.map(r => `<li>${r}</li>`).join('')}</ul>`
    : '';

  return buildSection('I', 'INTENTIONS — Objectives & Standards', `
    <p style="margin-bottom:10px;"><strong style="color:#1e3a5f;">Competency Code:</strong> <code style="background:#eff6ff; padding:2px 6px; border-radius:4px; font-size:10pt;">${data.CompetencyCode}</code></p>
    <p style="margin-bottom:14px; font-style:italic; font-size:10.5pt; color:#475569; background:#f8fafc; padding:10px 14px; border-left:3px solid #2563eb; border-radius:0 4px 4px 0;">${data.CompetencyText}</p>

    <h3 style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:0 0 8px;">Learning Objectives</h3>
    <table style="width:100%; border-collapse:collapse; font-size:10.5pt;">
      <tr style="background:#f0f9ff;">
        <th style="padding:8px 12px; text-align:left; font-weight:700; width:130px; border:1px solid #e0f2fe;">Cognitive</th>
        <td style="padding:8px 12px; border:1px solid #e0f2fe;">${obj.Cognitive}</td>
      </tr>
      <tr>
        <th style="padding:8px 12px; text-align:left; font-weight:700; background:#f0fdf4; border:1px solid #dcfce7;">Psychomotor</th>
        <td style="padding:8px 12px; border:1px solid #dcfce7; background:#f0fdf4;">${obj.Psychomotor}</td>
      </tr>
      <tr style="background:#fffbeb;">
        <th style="padding:8px 12px; text-align:left; font-weight:700; border:1px solid #fef9c3;">Affective</th>
        <td style="padding:8px 12px; border:1px solid #fef9c3;">${obj.Affective}</td>
      </tr>
    </table>
    ${materialsHtml}
    ${refsHtml}
  `);
}

/**
 * Builds the LEARNING EXPERIENCE section (L).
 *
 * @param {Object} data - Week curriculum data
 * @param {Object} context - Toggle context
 * @returns {string}
 */
function buildLearningExperienceSection(data, context) {
  const le = data.LearningExperience;

  // In HINGO mode, replace the flow with home-based instructions
  if (context.emergencyTier === 'hinga') {
    return buildSection('L', 'LEARNING EXPERIENCE — Home-Based Mode (HINGA)', `
      <p style="color:#9a3412; font-weight:700; margin-bottom:10px;">🏠 Standard "The Flow" is replaced with Home-Based Activity Sequence. See HINGA Appendix.</p>
      <p style="margin-bottom:10px;"><strong>Pre-Activity Check:</strong> Parent/guardian confirms learner's emotional readiness before beginning academic activity.</p>
      <p><strong>Original Pre-Lesson Hook:</strong> ${le.PreLesson}</p>
    `);
  }

  // In HINTO mode, no academic content
  if (context.emergencyTier === 'hinto') {
    return buildSection('L', 'LEARNING EXPERIENCE — SUSPENDED (HINTO)', `
      <p style="color:#991b1b; font-weight:700;">⛔ Academic learning experience is suspended. Refer to the HINTO PFA Protocol appendix for community check-in procedures.</p>
    `);
  }

  // Build standard flow steps
  const stepsHtml = le.TheFlowSteps.map((step, idx) => {
    const principlesHtml = step.DesignPrinciples
      ? step.DesignPrinciples.map(p => `<span style="background:#eff6ff; color:#1d4ed8; font-size:9pt; padding:1px 8px; border-radius:20px; margin-right:4px; display:inline-block;">${p}</span>`).join('')
      : '';

    const teacherAction = step.TeacherAction
      ? `<p style="margin:6px 0 2px;"><strong style="color:#1e3a5f;">Teacher:</strong> ${step.TeacherAction}</p>`
      : '';

    const learnerAction = step.LearnerAction
      ? `<p style="margin:2px 0 6px;"><strong style="color:#059669;">Learners:</strong> ${step.LearnerAction}</p>`
      : '';

    const duration = step.Duration
      ? `<span style="background:#f1f5f9; color:#64748b; font-size:9pt; padding:1px 8px; border-radius:4px; float:right;">${step.Duration}</span>`
      : '';

    return `
    <div style="border:1px solid #e2e8f0; border-radius:6px; padding:12px 14px; margin-bottom:10px;">
      <p style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:0 0 4px;">
        ${duration}
        Step ${step.Step}: ${step.Title}
      </p>
      <p style="margin:6px 0;">${step.Description}</p>
      ${teacherAction}
      ${learnerAction}
      ${principlesHtml ? `<p style="margin-top:8px;">${principlesHtml}</p>` : ''}
    </div>`;
  }).join('');

  // HINAY mode appends SLP distribution note
  const hinayNote = context.emergencyTier === 'hinay'
    ? `<div style="background:#fefce8; border:1px solid #fde68a; border-radius:6px; padding:10px 14px; margin-top:12px; font-size:10.5pt;">
        <strong style="color:#92400e;">🟡 HINAY Protocol:</strong> Prepare printed Self-Learning Packet (SLP) copies of this lesson for learners with attendance disruptions. Distribute through the Barangay Learning Facilitator. See HINAY Appendix for full protocol.
       </div>`
    : '';

  return buildSection('L', 'LEARNING EXPERIENCE — The Flow', `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px 14px; margin-bottom:14px;">
      <strong style="color:#1e3a5f; font-size:10.5pt;">Pre-Lesson / Hook:</strong>
      <p style="margin:6px 0 0;">${le.PreLesson}</p>
    </div>
    ${stepsHtml}
    ${le.Closure ? `<div style="background:#f0fdf4; border:1px solid #dcfce7; border-radius:6px; padding:10px 14px; margin-top:10px;">
      <strong style="color:#065f46; font-size:10.5pt;">🎯 Closure / Synthesis:</strong>
      <p style="margin:6px 0 0;">${le.Closure}</p>
    </div>` : ''}
    ${hinayNote}
  `);
}

/**
 * Builds the ASSESSING LEARNING section (A).
 *
 * @param {Object} data - Week curriculum data
 * @param {Object} context - Toggle context
 * @returns {string}
 */
function buildAssessingLearningSection(data, context) {
  const assess = data.AssessingLearning;

  // In HINTO mode, no academic assessment
  if (context.emergencyTier === 'hinto') {
    return buildSection('A', 'ASSESSING LEARNING — SUSPENDED (HINTO)', `
      <p style="color:#991b1b; font-weight:700;">⛔ Academic assessment is suspended during HINTO status. Learner wellness check replaces academic formative assessment. Use the PFA Learner Wellness Form (Annex HINTO-2).</p>
    `);
  }

  // Formative check items
  const fc = assess.FormativeCheck;
  const itemsHtml = fc && fc.Items
    ? `<ol style="margin:8px 0; padding-left:20px;">${fc.Items.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join('')}</ol>`
    : '';

  // Rubric table
  const rubric = assess.Rubric;
  let rubricHtml = '';
  if (rubric && rubric.Domains) {
    const domainRows = rubric.Domains.map((domain, i) => `
      <tr style="${i % 2 === 0 ? 'background:#f8fafc;' : ''}">
        <td style="padding:8px 10px; border:1px solid #e2e8f0; font-weight:700; vertical-align:top; width:150px;">${domain.name}</td>
        <td style="padding:8px 10px; border:1px solid #e2e8f0;">
          <ul style="margin:0; padding-left:16px;">${domain.indicators.map(ind => `<li style="margin-bottom:2px;">${ind}</li>`).join('')}</ul>
        </td>
      </tr>`).join('');

    const levelsHtml = rubric.Levels
      ? `<tr style="background:#eff6ff;">
          <td style="padding:6px 10px; border:1px solid #e2e8f0; font-weight:700;">Performance Levels</td>
          <td style="padding:6px 10px; border:1px solid #e2e8f0; font-size:10pt; color:#1d4ed8;">${rubric.Levels.join(' → ')}</td>
         </tr>`
      : '';

    rubricHtml = `
      <h3 style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:14px 0 8px;">${rubric.Title}</h3>
      <table style="width:100%; border-collapse:collapse; font-size:10.5pt;">
        <thead>
          <tr style="background:#1e3a5f; color:white;">
            <th style="padding:8px 10px; text-align:left; border:1px solid #1e3a5f;">Assessment Domain</th>
            <th style="padding:8px 10px; text-align:left; border:1px solid #1e3a5f;">Performance Indicators</th>
          </tr>
        </thead>
        <tbody>
          ${domainRows}
          ${levelsHtml}
        </tbody>
      </table>`;
  }

  return buildSection('A', 'ASSESSING LEARNING — Formative Check & Rubric', `
    <h3 style="font-weight:700; font-size:11pt; color:#1e3a5f; margin:0 0 6px;">${fc ? fc.Title : 'Formative Assessment'}</h3>
    ${fc && fc.Instructions ? `<p style="font-style:italic; color:#64748b; margin:0 0 8px; font-size:10.5pt;">Instructions: ${fc.Instructions}</p>` : ''}
    ${itemsHtml}
    ${rubricHtml}
    ${context.gradingSection || ''}
  `);
}

/**
 * Builds the WAYS FORWARD section (W).
 *
 * @param {Object} data - Week curriculum data
 * @param {Object} context - Toggle context
 * @returns {string}
 */
function buildWaysForwardSection(data, context) {
  const wf = data.WaysForward;

  // In HINTO mode, replace with return-to-learning guidance
  if (context.emergencyTier === 'hinto') {
    return buildSection('W', 'WAYS FORWARD — Return-to-Learning Plan (HINTO)', `
      <p style="color:#991b1b; font-weight:700; margin-bottom:10px;">🔴 Academic remediation and enrichment are suspended. Ways Forward is replaced with Return-to-Learning planning.</p>
      <ul style="padding-left:20px; margin:0;">
        <li>Complete PFA community check-in within 48 hours of HINTO activation.</li>
        <li>Compile and submit the Learner Wellness Monitoring Report to the School Principal.</li>
        <li>Await the Principal's Return-to-Learning Memorandum before resuming academic content.</li>
        <li>Upon return, assess learners' emotional readiness before proceeding with Week ${context.week ? context.week.replace('Week','').trim() : ''} content.</li>
      </ul>
    `);
  }

  const items = [
    { label: '🔁 Remediation', key: 'Remediation' },
    { label: '⭐ Enrichment', key: 'Enrichment' },
    { label: '🏠 Home Opportunity', key: 'HomeOpportunity' },
    { label: '👨‍👩‍👧 Parent Engagement', key: 'ParentEngagement' },
    { label: '➡️ Next Lesson Preview', key: 'NextLesson' }
  ];

  const rowsHtml = items
    .filter(item => wf[item.key])
    .map((item, i) => `
      <tr style="${i % 2 === 0 ? '' : 'background:#f8fafc;'}">
        <td style="padding:8px 12px; border:1px solid #e2e8f0; font-weight:700; width:170px; white-space:nowrap;">${item.label}</td>
        <td style="padding:8px 12px; border:1px solid #e2e8f0;">${wf[item.key]}</td>
      </tr>`).join('');

  return buildSection('W', 'WAYS FORWARD — Differentiation & Home Extension', `
    <table style="width:100%; border-collapse:collapse; font-size:10.5pt;">
      <tbody>${rowsHtml}</tbody>
    </table>
  `);
}

/**
 * Builds an appendix section.
 *
 * @param {string} title - Appendix title
 * @param {string} htmlContent - Inner HTML
 * @returns {string}
 */
function buildAppendixSection(title, htmlContent) {
  return `
<div style="margin-top:24px; border:2px dashed #e2e8f0; border-radius:8px; padding:20px; background:#fafafa;">
  <h2 style="font-size:13pt; font-weight:700; color:#1e3a5f; margin:0 0 14px; padding-bottom:8px; border-bottom:1px solid #e2e8f0;">${title}</h2>
  <div style="font-family:Arial, 'Times New Roman', serif; font-size:11pt; line-height:1.6;">${htmlContent}</div>
</div>`;
}

/**
 * Builds the KS1 PACE grading panel HTML.
 *
 * @param {Object} config - KS1 grading configuration
 * @returns {string}
 */
function buildKS1GradingPanel(config) {
  const descriptors = config.descriptors.map((d, i) => `
    <tr style="${i % 2 === 0 ? 'background:#f8fafc;' : ''}">
      <td style="padding:7px 12px; border:1px solid #e2e8f0; font-weight:700; width:70px; text-align:center;">${d.abbrev}</td>
      <td style="padding:7px 12px; border:1px solid #e2e8f0;">${d.label}</td>
      <td style="padding:7px 12px; border:1px solid #e2e8f0; text-align:center; color:#2563eb; font-weight:600;">${d.range}</td>
    </tr>`).join('');

  return `
    <div class="bg-blue-50 rounded-lg p-4 mb-4 text-sm border border-blue-200">
      <p class="font-bold text-blue-900 mb-1">${config.label}</p>
      <p class="text-blue-700 text-xs">${config.description}</p>
    </div>
    <h4 class="text-sm font-bold text-slate-700 mb-3">PACE Descriptors (Performance and Competency Evaluation)</h4>
    <table class="w-full text-xs border-collapse">
      <thead>
        <tr class="bg-brand-navy text-white">
          <th class="p-2 border border-slate-300 text-center">Code</th>
          <th class="p-2 border border-slate-300 text-left">Descriptor</th>
          <th class="p-2 border border-slate-300 text-center">Score Range</th>
        </tr>
      </thead>
      <tbody>${descriptors}</tbody>
    </table>
    <p class="mt-3 text-xs text-slate-500 italic">Note: Key Stage 1 uses qualitative descriptors — not numerical grades — in accordance with DepEd DO 016, s. 2026.</p>`;
}

/**
 * Builds the KS2–4 numerical grading panel HTML.
 *
 * @param {Object} config - KS2-4 grading configuration
 * @returns {string}
 */
function buildKS2to4GradingPanel(config) {
  const w = config.weights;
  const t = config.transmutation;

  return `
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
        <div class="text-2xl font-black text-blue-600">${w.writtenWorks.percentage}%</div>
        <div class="text-xs font-semibold text-blue-800 mt-1">Written Works</div>
        <div class="text-xs text-blue-500 font-mono">W_W</div>
      </div>
      <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
        <div class="text-2xl font-black text-green-600">${w.performanceTasks.percentage}%</div>
        <div class="text-xs font-semibold text-green-800 mt-1">Performance Tasks</div>
        <div class="text-xs text-green-500 font-mono">P_T</div>
      </div>
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
        <div class="text-2xl font-black text-yellow-600">${w.summativeTests.percentage}%</div>
        <div class="text-xs font-semibold text-yellow-800 mt-1">Summative Tests</div>
        <div class="text-xs text-yellow-500 font-mono">S_T</div>
      </div>
    </div>
    <div class="grade-weight-bar mb-3"></div>
    <div class="bg-slate-50 rounded-lg p-3 border border-slate-200">
      <h4 class="text-xs font-bold text-slate-700 mb-2">📐 Transmutation Scale</h4>
      <p class="text-xs text-slate-600 font-mono mb-1">${t.formula}</p>
      <p class="text-xs text-slate-500">Raw Score Percentage ≥ <strong class="text-brand-sapphire">${t.passingRawScorePercentage}%</strong> → Transmuted Grade ≥ <strong class="text-brand-sapphire">${t.passingGrade}</strong> (Passing)</p>
    </div>
    <div class="mt-3 bg-white rounded-lg border border-slate-200 p-3">
      <h4 class="text-xs font-bold text-slate-700 mb-2">Grade Calculator</h4>
      <div class="grid grid-cols-3 gap-2 mb-2">
        <div>
          <label class="text-xs text-slate-500 block mb-1">WW Score</label>
          <input id="wwScore" type="number" min="0" max="100" class="field-input text-xs" placeholder="0–100" oninput="calculateGrade()" />
        </div>
        <div>
          <label class="text-xs text-slate-500 block mb-1">PT Score</label>
          <input id="ptScore" type="number" min="0" max="100" class="field-input text-xs" placeholder="0–100" oninput="calculateGrade()" />
        </div>
        <div>
          <label class="text-xs text-slate-500 block mb-1">ST Score</label>
          <input id="stScore" type="number" min="0" max="100" class="field-input text-xs" placeholder="0–100" oninput="calculateGrade()" />
        </div>
      </div>
      <div id="gradeResult" class="text-center py-2 bg-slate-50 rounded-md text-sm font-bold text-slate-400">
        Enter scores above to calculate
      </div>
    </div>`;
}

/**
 * Builds the AI compliance declaration text.
 *
 * @param {Object} aiSettings - AI toggle settings from the form
 * @returns {string} Declaration text
 */
function buildAIDeclaration(aiSettings) {
  const uses = [];
  if (aiSettings.grammar) uses.push('grammar and spelling checking');
  if (aiSettings.format) uses.push('formatting and structural organization');
  if (aiSettings.scaffold) uses.push('scaffolding of lesson ideas');
  if (aiSettings.translate) uses.push('translation support');

  if (aiSettings.none || uses.length === 0) {
    return 'The teacher certifies that no artificial intelligence (AI) tools were used in the preparation of this lesson plan. This plan represents the teacher\'s original work in alignment with the MATATAG Curriculum.';
  }

  const toolText = aiSettings.toolName ? ` (Tool used: ${aiSettings.toolName})` : '';
  return `In accordance with DO No. 003, s. 2026, the teacher discloses that AI was used to assist in the following aspects of lesson plan preparation: ${uses.join(', ')}${toolText}. The educational content, pedagogical decisions, and final judgments in this document remain the sole professional responsibility of the teacher. AI-generated content has been reviewed, contextualized, and validated by the teacher prior to use.`;
}
