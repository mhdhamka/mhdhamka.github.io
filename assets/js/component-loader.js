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
                let html = await response.text();
                
                // If we are in a subfolder, fix standard relative link attributes 
                // (href and src) within the loaded component HTML string
                if (isSubfolder) {
                    // Create a temporary container to parse and adjust links
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    
                    tempDiv.querySelectorAll('a, [src]').forEach(element => {
                        const attr = element.hasAttribute('href') ? 'href' : 'src';
                        let val = element.getAttribute(attr);
                        
                        // If it's a relative link/path and doesn't already start with http, ../, or #
                        if (val && !val.startsWith('http') && !val.startsWith('../') && !val.startsWith('#') && !val.startsWith('mailto:')) {
                            element.setAttribute(attr, '../' + val);
                        }
                    });
                    html = tempDiv.innerHTML;
                }

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