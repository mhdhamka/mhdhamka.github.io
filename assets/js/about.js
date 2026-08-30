/**
 * About section interactivity: the "Approach / Focus Areas / Beyond Code" tab panel.
 *
 * Like hero.html, about.html is injected asynchronously by component-loader.js,
 * so this follows the same pattern as hero.js: a named, idempotent init function
 * hooked to both DOMContentLoaded and the custom "componentsLoaded" event.
 */
function initAboutPulse() {
  "use strict";

  const pulse = document.getElementById("aboutPulse");
  if (!pulse) return; // about markup not injected yet (or not on this page)

  if (pulse.dataset.pulseInitialized === "true") return;
  pulse.dataset.pulseInitialized = "true";

  const tabs = pulse.querySelectorAll(".pulse__tab");
  const panels = pulse.querySelectorAll(".pulse__panel");

  function activate(key) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.pulse === key;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.pulsePanel === key);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.pulse));
  });
}

document.addEventListener("DOMContentLoaded", initAboutPulse);
document.addEventListener("componentsLoaded", initAboutPulse);