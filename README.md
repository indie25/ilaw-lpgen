# ILAW Lesson Plan Generator
## DepEd Philippines — DO No. 016, s. 2026

> **Offline-first PWA for generating MATATAG-aligned ILAW lesson plans.**

---

## 📁 File Structure

```
ilaw-app/
├── index.html          # Main app shell & three-panel layout
├── styles.css          # Tailwind + custom component styles
├── app.js              # Core logic: dropdowns, generation, export, PWA
├── curriculum.js       # MATATAG curriculum JSON database + rule content
├── templates.js        # ILAW HTML template assembly engine
├── service-worker.js   # PWA offline cache worker
├── manifest.json       # PWA install manifest
└── icons/
    ├── icon-192.png    # PWA app icon (192×192)
    └── icon-512.png    # PWA app icon (512×512)
```

---

## 🚀 Deployment (Free Static Hosting)

### Option 1 — Netlify (Recommended)
1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop this entire `ilaw-app/` folder into the Netlify dashboard
3. Done — your app is live at a `*.netlify.app` URL

### Option 2 — GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository root
3. Go to Settings → Pages → Source → `main` branch
4. Your app will be at `https://yourusername.github.io/repo-name`

### Option 3 — Vercel
1. Create a free account at [vercel.com](https://vercel.com)
2. Click "Add New Project" → Import the GitHub repository
3. No build settings needed — it's pure static HTML

> **⚠️ IMPORTANT:** The service worker and PWA features **only work on HTTPS**. All three platforms above serve HTTPS automatically. Do not run this on plain `http://`.

---

## 📴 Offline Use

Once a teacher opens the app while online, the service worker automatically caches all files. After that, the app works **with zero internet connection** — ideal for teachers in remote barangays with no stable connectivity.

To install on mobile/tablet:
1. Open in Chrome or Edge browser
2. Tap the browser menu → "Add to Home Screen" / "Install App"
3. The ILAW Generator appears as a standalone app

---

## 🧩 Extending the Curriculum Database

To add more grade levels, subjects, and weeks, edit `curriculum.js`:

```javascript
const CURRICULUM = {
  Grade4: {                          // New grade level
    label: "Grade 4",
    keyStage: 2,                     // Determines grading panel type
    subjects: {
      Science: {
        label: "Science",
        quarters: {
          Quarter1: {
            label: "Quarter 1",
            weeks: {
              Week1: {
                label: "Week 1 — Your Topic",
                CompetencyCode: "S4FE-Ia-1.1",
                CompetencyText: "...",
                Intentions: { Objectives: { Cognitive: "...", Psychomotor: "...", Affective: "..." } },
                LearningExperience: { PreLesson: "...", TheFlowSteps: [...], Closure: "..." },
                AssessingLearning: { FormativeCheck: { Title: "...", Items: [...] }, Rubric: {...} },
                WaysForward: { Remediation: "...", Enrichment: "...", HomeOpportunity: "..." }
              }
            }
          }
        }
      }
    }
  }
};
```

---

## 🔧 Technical Stack

| Component | Library | Version |
|---|---|---|
| CSS Framework | Tailwind CSS | CDN latest |
| Rich Text Editor | Quill.js | 1.3.7 |
| PDF Export | html2pdf.js | 0.10.1 |
| Word Export | docx.js (Volkov) | 8.5.0 |
| File Download | FileSaver.js | 2.0.5 |
| Fonts | Inter (Google Fonts) | Variable |
| Offline PWA | Service Worker API | Native |
| Storage | localStorage | Native |

---

## 📋 ILAW Framework Sections

| Letter | Section | Purpose |
|---|---|---|
| **I** | Intentions | Learning objectives (Cognitive, Psychomotor, Affective) + competency mapping |
| **L** | Learning Experience | Pre-lesson hook + The Flow (step-by-step) + closure |
| **A** | Assessing Learning | Formative check + rubric (PACE for KS1, graded for KS2–4) |
| **W** | Ways Forward | Remediation, enrichment, home opportunity, parent engagement |

---

## 🆘 Emergency Tier System

| Tier | Status | Academic Delivery |
|---|---|---|
| 🟢 Normal | Standard | Full face-to-face class |
| 🟡 Hinay | Ease-in | Hybrid + Self-Learning Packets |
| 🟠 Hinga | Check-in | Fully home-based modular |
| 🔴 Hinto | Stop | Academic suspended — PFA protocol active |

---

*Generated with ILAW Lesson Plan Generator v1.0 | DepEd Philippines*
