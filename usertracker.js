/**
 * User Event Tracking Script
 * Captures clicks and pageviews for analytics
 */

// Initialize tracking when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Log page view immediately when page loads
    logEvent('view', 'page', getElementDetails(document.body));
    
    // Set up click event listener for the entire document
    document.addEventListener('click', function(event) {
        // Get the clicked element
        const clickedElement = event.target;
        
        // Determine the type of element clicked
        const elementType = getElementType(clickedElement);
        
        // Get additional details about the element
        const elementDetails = getElementDetails(clickedElement);
        
        // Log the click event
        logEvent('click', elementType, elementDetails);
    });
    
    // Track navigation between sections (for single-page apps)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Extract section ID from href
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                // Log section view after a small delay to ensure the section is visible
                setTimeout(() => {
                    const sectionName = targetId.substring(1); // Remove # symbol
                    logEvent('view', 'section', { id: sectionName, name: `${sectionName} section` });
                }, 100);
            }
        });
    });
    
    // Observer for tracking when elements come into view
    setupViewportTracking();
});

/**
 * Identifies the type of element that was interacted with
 * @param {HTMLElement} element - The DOM element
 * @return {string} Description of the element type
 */
function getElementType(element) {
    // Check for common element types
    if (!element) return 'unknown';
    
    // Get element tag and classes
    const tag = element.tagName.toLowerCase();
    
    // Check for specific elements
    if (tag === 'a') return 'link';
    if (tag === 'button') return 'button';
    if (tag === 'input') {
        const inputType = element.getAttribute('type');
        return `input-${inputType || 'text'}`;
    }
    if (tag === 'select') return 'dropdown';
    if (tag === 'img') return 'image';
    if (tag === 'video') return 'video';
    if (tag === 'audio') return 'audio';
    
    // Check parent elements for context (for elements like icons inside buttons)
    let parent = element.parentElement;
    let depth = 0;
    const maxDepth = 3; // Limit how far up we check
    
    while (parent && depth < maxDepth) {
        if (parent.tagName && parent.tagName.toLowerCase() === 'nav') return 'navigation-item';
        if (parent.tagName && parent.tagName.toLowerCase() === 'button') return 'button-child';
        if (parent.tagName && parent.tagName.toLowerCase() === 'a') return 'link-child';
        if (parent.classList && parent.classList.contains('gallery')) return 'gallery-item';
        if (parent.classList && parent.classList.contains('slideshow-container')) return 'slideshow-item';
        
        parent = parent.parentElement;
        depth++;
    }
    
    // Check for sections and containers
    if (tag === 'section') return 'section';
    if (tag === 'div' || tag === 'span') {
        if (element.classList.contains('slide')) return 'slideshow-slide';
        if (element.classList.contains('dot')) return 'slideshow-control';
        if (element.classList.contains('prev') || element.classList.contains('next')) return 'slideshow-navigation';
        return 'container';
    }
    
    // Default fallback using tag name
    return tag;
}

/**
 * Extracts useful information about the element for logging
 * @param {HTMLElement} element - The DOM element
 * @return {Object} Object containing element details
 */
function getElementDetails(element) {
    if (!element) return { info: 'unknown element' };
    
    const details = {
        tag: element.tagName ? element.tagName.toLowerCase() : 'unknown',
    };
    
    // Get element ID if available
    if (element.id) {
        details.id = element.id;
    }
    
    // Get element classes if available
    if (element.classList && element.classList.length > 0) {
        details.classes = Array.from(element.classList).join(' ');
    }
    
    // For links, get href
    if (element.tagName && element.tagName.toLowerCase() === 'a' && element.href) {
        details.href = element.href;
    }
    
    // For images, get src and alt
    if (element.tagName && element.tagName.toLowerCase() === 'img') {
        if (element.src) details.src = element.src;
        if (element.alt) details.alt = element.alt;
    }
    
    // For text content, get a snippet (truncated if too long)
    if (element.textContent) {
        const text = element.textContent.trim();
        if (text.length > 0) {
            details.text = text.length > 50 ? text.substring(0, 47) + '...' : text;
        }
    }
    
    // Get element dimensions and position if relevant
    const rect = element.getBoundingClientRect();
    if (rect) {
        details.position = {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        };
    }
    
    return details;
}

/**
 * Logs the event to the console in the required format
 * @param {string} eventType - Type of event (click or view)
 * @param {string} elementType - Type of element interacted with
 * @param {Object} details - Additional details about the element
 */
function logEvent(eventType, elementType, details) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${elementType}`, details);
}

/**
 * Sets up tracking for elements entering viewport
 */
function setupViewportTracking() {
    // Track main sections as they come into view
    const sections = document.querySelectorAll('section');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    logEvent('view', 'section', getElementDetails(section));
                    
                    // Optionally stop observing after first view
                    // sectionObserver.unobserve(section);
                }
            });
        }, { threshold: 0.3 }); // Consider visible when 30% in view
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Also track images and other media
        const mediaElements = document.querySelectorAll('img, video, .slide');
        const mediaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const elementType = element.tagName ? element.tagName.toLowerCase() : 'element';
                    logEvent('view', elementType, getElementDetails(element));
                    
                    // Optionally stop observing after first view
                    // mediaObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 }); // Consider visible when 50% in view
        
        mediaElements.forEach(element => {
            mediaObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        console.log("Your browser doesn't support IntersectionObserver. Some view events won't be tracked.");
    }
}