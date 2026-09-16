/**
 * Interactive VS Code hero mockup.
 * - Clicking a sidebar file or an editor tab opens that file (keeps both in sync).
 * - The integrated terminal panel can be collapsed/expanded.
 * - The terminal "types" a small realistic FastAPI + Next.js dev-server session on a loop.
 *
 * IMPORTANT: hero.html is injected asynchronously by component-loader.js (via
 * fetch + outerHTML), so #vscodeWindow does not exist at parse time. This script
 * follows the same pattern as main.js's initPortfolio(): it's wrapped in a named,
 * idempotent init function and hooked to both DOMContentLoaded (in case the include
 * already resolved) and the custom "componentsLoaded" event (fired after injection).
 *
 * Markup contract (see components/hero.html):
 *   #fileTree  .file-item[data-file]      -> sidebar entries
 *   #fileTabs  .vscode__tab[data-file]    -> open tabs
 *   .code-panel[data-file]                -> one panel per file, toggled via .active
 *   #terminalToggle                       -> collapse/expand button
 *   #vscodeTerminal / #terminalBody       -> terminal panel + typed output target
 */
function initHero() {
  "use strict";

  const vscodeWindow = document.getElementById("vscodeWindow");
  if (!vscodeWindow) return; // hero markup not injected yet (or not on this page)

  // Guard against double-init: componentsLoaded and DOMContentLoaded can both
  // fire and call initHero(), and (until the duplicate loader in main.js is
  // removed) componentsLoaded may even fire twice.
  if (vscodeWindow.dataset.heroInitialized === "true") return;
  vscodeWindow.dataset.heroInitialized = "true";

  const fileTree = document.getElementById("fileTree");
  const fileTabs = document.getElementById("fileTabs");
  const codePanels = vscodeWindow.querySelectorAll(".code-panel");
  const terminalToggle = document.getElementById("terminalToggle");
  const terminal = document.getElementById("vscodeTerminal");
  const terminalBody = document.getElementById("terminalBody");

  /* ---------- File / tab switching ---------- */

  function openFile(filename) {
    if (!filename) return;

    fileTree
      ?.querySelectorAll(".file-item")
      .forEach((el) => el.classList.toggle("active", el.dataset.file === filename));

    fileTabs
      ?.querySelectorAll(".vscode__tab")
      .forEach((el) => el.classList.toggle("active", el.dataset.file === filename));

    codePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.file === filename);
    });

    // If the tab isn't currently visible (overflow-x), scroll it into view.
    const activeTab = fileTabs?.querySelector(`.vscode__tab[data-file="${filename}"]`);
    activeTab?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }

  fileTree?.addEventListener("click", (e) => {
    const item = e.target.closest(".file-item[data-file]");
    if (item) openFile(item.dataset.file);
  });

  fileTabs?.addEventListener("click", (e) => {
    const tab = e.target.closest(".vscode__tab[data-file]");
    if (tab) openFile(tab.dataset.file);
  });

  // "Open Anyway" on the binary preview just opens the image tab's editor state
  // (there's nothing more to reveal — mirrors real VS Code's dead-end here).
  vscodeWindow.querySelector(".binary-preview__btn")?.addEventListener("click", (e) => {
    e.currentTarget.textContent = "Opened (preview unavailable)";
    e.currentTarget.disabled = true;
  });

  /* ---------- Terminal collapse / expand ---------- */

  function setTerminalExpanded(expanded) {
    terminal?.classList.toggle("collapsed", !expanded);
    terminalToggle?.setAttribute("aria-expanded", String(expanded));
  }

  terminalToggle?.addEventListener("click", () => {
    const isExpanded = terminalToggle.getAttribute("aria-expanded") === "true";
    setTerminalExpanded(!isExpanded);
  });

  /* ---------- Animated terminal session ---------- */

  // Each line: { text, cls } — cls maps to a color class in the CSS.
  const SESSION = [
    { text: "$ uvicorn main:app --reload", cls: "line-prompt" },
    { text: "INFO:     Uvicorn running on http://127.0.0.1:8000", cls: "line-info" },
    { text: "INFO:     Application startup complete.", cls: "line-ok" },
    { text: "", cls: "" },
    { text: "$ npm run dev", cls: "line-prompt" },
    { text: "▲ Next.js 15.0.0", cls: "line-info" },
    { text: "- Local:  http://localhost:3000", cls: "line-dim" },
    { text: "✓ Ready in 812ms", cls: "line-ok" },
  ];

  const TYPE_SPEED_MS = 22;
  const LINE_PAUSE_MS = 260;
  const LOOP_PAUSE_MS = 2600;

  let sessionTimer = null;
  let running = false;

  function clearCaret() {
    terminalBody?.querySelector(".terminal-caret")?.remove();
  }

  function typeLine(index) {
    if (!terminalBody) return;

    if (index >= SESSION.length) {
      sessionTimer = setTimeout(() => {
        terminalBody.innerHTML = "";
        typeLine(0);
      }, LOOP_PAUSE_MS);
      return;
    }

    const { text, cls } = SESSION[index];
    const lineEl = document.createElement("div");
    if (cls) lineEl.className = cls;
    terminalBody.appendChild(lineEl);

    const caret = document.createElement("span");
    caret.className = "terminal-caret";
    lineEl.appendChild(caret);

    let charIndex = 0;

    function typeChar() {
      if (!running) return;
      if (charIndex < text.length) {
        caret.insertAdjacentText("beforebegin", text[charIndex]);
        charIndex += 1;
        terminalBody.scrollTop = terminalBody.scrollHeight;
        sessionTimer = setTimeout(typeChar, TYPE_SPEED_MS);
      } else {
        clearCaret();
        sessionTimer = setTimeout(() => typeLine(index + 1), LINE_PAUSE_MS);
      }
    }

    typeChar();
  }

  function startTerminalSession() {
    if (running || !terminalBody) return;
    running = true;
    terminalBody.innerHTML = "";
    typeLine(0);
  }

  function stopTerminalSession() {
    running = false;
    clearTimeout(sessionTimer);
  }

  // Only animate while the hero is actually on screen (saves work when scrolled away).
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startTerminalSession();
          else stopTerminalSession();
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(vscodeWindow);
  } else {
    startTerminalSession();
  }
}

document.addEventListener("DOMContentLoaded", initHero);
document.addEventListener("componentsLoaded", initHero);