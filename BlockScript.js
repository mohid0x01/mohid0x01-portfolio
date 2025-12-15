// =========================================================================
// blockscript.js - CONSOLIDATED MASTER SECURITY SCRIPT
// =========================================================================

// --- CONFIGURATION ---
const ALLOWED_DOMAIN = 'mohid0x01-portfolio.vercel.app'; 
const ALLOWED_PROTOCOL = 'https:';
const RELOAD_THRESHOLD = 150; // Pixel change sensitivity for DevTools detection

// Global state flag to ensure we only trigger the loop once
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
// LAYER 2: ADVANCED DEVTOOLS TRAPS (REVISED FOR RELOAD ACTION)
// =========================================================================

// A. The Continuous Debugger Loop (still active)
(function devToolsDebuggerTrap() {
    // Only run the debugger if the lock is not engaged (page is functioning normally)
    if (!isLocked) {
        try { (function () { debugger; })(); } catch (err) {}
        setTimeout(devToolsDebuggerTrap, 500); 
    }
})();

// B. The Console Terminator (still active)
(function consoleTerminator() {
    if (typeof console !== 'undefined' && console.clear && !isLocked) {
        console.clear(); 
    }
    setTimeout(consoleTerminator, 1500);
})();

// C. The Persistent Reload Loop (New, integrated DevTools check)
function checkAndReload() {
    const isDetected = (window.outerWidth - window.innerWidth > RELOAD_THRESHOLD || 
                        window.outerHeight - window.innerHeight > RELOAD_THRESHOLD);
    
    // ACTION: If detected AND the lock is not already engaged
    if (isDetected && !isLocked) {
        isLocked = true;
        console.error("CRITICAL: DevTools detected. Initiating infinite reload sequence.");
        
        // Start the aggressive reload loop (closest to closing DevTools)
        setInterval(function() {
            window.location.reload(true); // Forces a hard reload
        }, 500); // Reload every half-second
        
        return; // Stop checking
    }

    // If not detected, keep monitoring
    if (!isLocked) {
        setTimeout(checkAndReload, 1000); // Check every 1 second
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
        
        // Start the aggressive DevTools monitoring (Reload Loop)
        checkAndReload();

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
