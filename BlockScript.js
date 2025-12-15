// =========================================================================
// blockscript.js - ULTIMATE POWER: STEALTH + REDIRECTION
// =========================================================================

// --- CONFIGURATION ---
const ALLOWED_DOMAIN = 'mohid0x01-portfolio.vercel.app'; 
const ALLOWED_PROTOCOL = 'https:';

// TARGET: Redirects the user to Kali.org upon detection (Restored Action)
const REDIRECT_URL = 'https://www.kali.org/'; 
const REDIRECT_THRESHOLD = 150; // Pixel change sensitivity
const INTEGRITY_CHECK_INTERVAL = 5000; // Time (ms) between self-defense checks

// Global flag to stop initialization and traps when DevTools is detected
let isLocked = false; 

// Function to trigger the final action (Redirection)
function triggerFinalAction() {
    if (!isLocked) {
        isLocked = true;
        console.error("CRITICAL: DevTools detected. Initiating immediate redirection to Kali.org.");
        // This is the core action: replace the current page with the redirect URL
        window.location.replace(REDIRECT_URL); 
    }
}

// =========================================================================
// LAYER 2: ADVANCED DEVTOOLS TRAPS (Stealth & Redirection Focus)
// =========================================================================

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

// C. The DevTools Size Check and Redirector (Core Check)
function checkAndRedirect() {
    const isDetected = (window.outerWidth - window.innerWidth > REDIRECT_THRESHOLD || 
                        window.outerHeight - window.innerHeight > REDIRECT_THRESHOLD);
    
    if (isDetected) {
        triggerFinalAction(); // Redirect on size change
        return; 
    }

    if (!isLocked) {
        setTimeout(checkAndRedirect, 500); 
    }
}

// D. Stealth Scope Pane Trap (NEW: Detects inspection of variables/objects)
(function scopePaneAbuseTrap() {
    let checkElement = new Image(); 
    
    Object.defineProperty(checkElement, "id", {
        get: function() {
            if (!isLocked) {
                console.warn("STEALTH DETECT: Scope/Object Property Accessed!");
                triggerFinalAction(); // Redirect on stealth detection
            }
            return 'dummy_id_value'; 
        }
    });
    document.body.appendChild(checkElement);
})();

// E. Anti-Tamper Check (NEW: Placeholder for periodic self-defense)
function antiTamperCheck() {
    if (!isLocked) {
        // This timer runs to confirm that the security script itself is still operating
        // and hasn't been disabled by an attacker.
        console.log("Integrity Check Active: Self-defense running.");

        // NOTE: If the integrity check detects tampering, it should call triggerFinalAction().
        
        setTimeout(antiTamperCheck, INTEGRITY_CHECK_INTERVAL); 
    }
}

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
// LAYER 3: CODE INTEGRITY & EXECUTION CONTROL
// =========================================================================

function initializeSecurely() {
    
    // Domain Check
    const isAllowedDomain = window.location.hostname === ALLOWED_DOMAIN;
    const isAllowedProtocol = window.location.protocol === ALLOWED_PROTOCOL;
    
    if (isAllowedProtocol && isAllowedDomain) {
        
        // Start ALL detection and defense layers
        checkAndRedirect();          
        antiTamperCheck();      

        // --- PLACE YOUR MAIN 3D WEBSITE INITIALIZATION CODE HERE ---
        console.log("Security Check Passed. All defense layers active.");
        
    } else {
        // Block execution if run from an unauthorized location
        document.body.innerHTML = '<h1>UNAUTHORIZED LOCATION</h1><p>This code must be run from ' + ALLOWED_PROTOCOL + '//' + ALLOWED_DOMAIN + '.</p>';
        console.error("Security violation: Code running outside of authorized domain.");
    }
}

// Initialize the whole security and application system
window.onload = initializeSecurely;
