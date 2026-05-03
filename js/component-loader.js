/**
 * Component Loader Script
 * Dynamically loads all HTML section components into their respective containers
 *
 * This modular approach allows for:
 * - Easy maintenance of individual sections
 * - Better code organization and scalability
 * - Simple reusability of components across multiple pages
 * - Cleaner separation of concerns
 */

const COMPONENTS = [
    { id: 'navbar-container', path: 'sections/navbar.html' },
    { id: 'hero-container', path: 'sections/hero.html' },
    { id: 'trust-bar-container', path: 'sections/trust-bar.html' },
    { id: 'about-container', path: 'sections/about.html' },
    { id: 'before-after-container', path: 'sections/before-after.html' },
    { id: 'services-container', path: 'sections/services.html' },
    { id: 'why-us-container', path: 'sections/why-us.html' },
    { id: 'cta-container', path: 'sections/cta-banner.html' },
    { id: 'gallery-container', path: 'sections/gallery.html' },
    { id: 'testimonials-container', path: 'sections/testimonials.html' },
    { id: 'contact-container', path: 'sections/contact-appointment.html' },
    { id: 'map-container', path: 'sections/map.html' },
    { id: 'footer-container', path: 'sections/footer.html' },
    { id: 'floating-elements-container', path: 'sections/floating-elements.html' }
];

/**
 * Loads a single component HTML file and inserts it into the DOM
 * @param {string} containerId - The ID of the container element
 * @param {string} filePath - The path to the HTML component file
 * @returns {Promise}
 */
async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}

/**
 * Loads all components in order
 */
async function loadAllComponents() {
    for (const component of COMPONENTS) {
        await loadComponent(component.id, component.path);
    }

    // Dispatch custom event after all components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Load all components when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
