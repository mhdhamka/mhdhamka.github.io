document.addEventListener("DOMContentLoaded", async () => {
    const includeElements = document.querySelectorAll("[data-include]");
    
    const isSubfolder = window.location.pathname.includes('/src/');
    const pathPrefix = isSubfolder ? "../" : "";

    for (const el of includeElements) {
        const file = el.getAttribute("data-include");
        const fullPath = pathPrefix + file;

        try {
            const response = await fetch(fullPath);
            if (response.ok) {
                const html = await response.text();
                el.outerHTML = html;
            } else {
                console.error(`Error loading component: ${fullPath}`);
            }
        } catch (error) {
            console.error(`Network error loading ${fullPath}:`, error);
        }
    }

    // Give the browser one animation frame to render the injected components
    requestAnimationFrame(() => {
        document.dispatchEvent(new Event("componentsLoaded"));
    });
});