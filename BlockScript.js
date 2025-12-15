// =========================================================================
// blockscript.js - FINAL ASSET-SAFE MASTER SECURITY SCRIPT
// =========================================================================

// --- CONFIGURATION ---
const ALLOWED_DOMAIN = 'mohid0x01-portfolio.vercel.app'; 
const ALLOWED_PROTOCOL = 'https:';
const WIPE_THRESHOLD = 150; // Pixel change sensitivity for DevTools detection
const SHUTDOWN_MESSAGE = '<h1>ACCESS DENIED</h1><p>Inspection tools detected. Page content disabled. Assets are safe.</p>';

// Global flag to stop initialization and traps when DevTools is detected
let isLocked = false; 

// =========================================================================
// LAYER 1: USER ACTION AND SHORTCUT BLOCKING
// =========================================================================

document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
document.addEventListener('dragstart', function(e) { e.preventDefault(); });

document.addEventListener('keydown', function(e) {
    const isCtrlCmd = e.ctrlKey || e.metaKey; 
    const isShift = e.shiftKey;

    // Block F12, Ctrl/Cmd+Shift+I/J, Ctrl/Cmd+U/P/S
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); }
    if (isCtrlCmd && isShift && (e.key === 'I' || e.key === 'J')) { e.preventDefault(); }
    if (isCtrlCmd && (e.key === 'u' || e.key === 'p' || e.key === 's')) { e.preventDefault(); }
});

// =========================================================================
// LAYER 2: ADVANCED DEVTOOLS TRAPS (ASSET-SAFE WIPE)
// =========================================================================

// Function to immediately wipe the page content
function wipePageContent() {
    if (!isLocked) {
        isLocked = true;
        document.body.innerHTML = SHUTDOWN_MESSAGE;
        console.error("CRITICAL: DevTools detected. Content wipe initiated. Assets are safe.");
    }
}

// A. The Continuous Debugger Loop
(function devToolsDebuggerTrap() {
    if (!isLocked) {
        try { (function () { debugger; })(); } catch (err) {}
        setTimeout(devToolsDebuggerTrap, 500); 
    }
})();

// B. The Console Terminator
(function consoleTerminator() {
    if (typeof console !== 'undefined' && console.clear && !isLocked) {
        console.clear(); 
    }
    setTimeout(consoleTerminator, 1500);
})();

// C. The DevTools Size Check and Content Wiper
function checkAndWipe() {
    const isDetected = (window.outerWidth - window.innerWidth > WIPE_THRESHOLD || 
                        window.outerHeight - window.innerHeight > WIPE_THRESHOLD);
    
    if (isDetected) {
        // ACTION: Immediately wipe the page content without triggering a network request
        wipePageContent();
        return; // Stop the checker
    }

    // If not detected, keep monitoring
    if (!isLocked) {
        setTimeout(checkAndWipe, 500); // Check every half second
    }
}

// =========================================================================
// LAYER 3: CODE INTEGRITY & EXECUTION CONTROL
// =========================================================================

function initializeSecurely() {
    
    const isAllowedDomain = window.location.hostname === ALLOWED_DOMAIN;
    const isAllowedProtocol = window.location.protocol === ALLOWED_PROTOCOL;
    
    // Logic: Must be HTTPS AND the hostname must be an exact match
    if (isAllowedProtocol && isAllowedDomain) {
        
        // Start the asset-safe DevTools monitoring (Wipe Check)
        checkAndWipe();

        // --- PLACE YOUR MAIN 3D WEBSITE INITIALIZATION CODE HERE ---
        console.log("Security Check Passed. Main site code is running.");
        // Example: startThreeJSRendering();
        
    } else {
        // Block execution if run from an unauthorized location
        document.body.innerHTML = '<h1>UNAUTHORIZED LOCATION</h1><p>This code must be run from ' + ALLOWED_PROTOCOL + '//' + ALLOWED_DOMAIN + '.</p>';
        console.error("Security violation: Code running outside of authorized domain.");
    }
}

// Initialize the whole security and application system
window.onload = initializeSecurely;
