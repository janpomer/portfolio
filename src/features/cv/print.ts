// "Download PDF" → open the browser print dialog (Save as PDF).
  document
    .querySelector<HTMLButtonElement>("[data-print]")
    ?.addEventListener("click", () => window.print());

  // Allow arriving with ?print to auto-open the dialog (e.g. a "Download CV"
  // link elsewhere can deep-link straight into printing).
  if (new URLSearchParams(window.location.search).has("print")) {
    window.addEventListener("load", () => window.print());
  }
