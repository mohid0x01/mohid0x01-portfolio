import { NextResponse } from 'next/server';

// Configuration
const REDIRECT_URL = 'https://www.kali.org/';

// Common signatures used by programmatic scraping tools
const SCRAPER_SIGNATURES = [
    'curl/',
    'Wget/',
    'python-requests',
    'Go-http-client',
    'HeadlessChrome', // Can catch some headless bots
    'bot' // Generic search for "bot"
];

// This configuration tells Vercel which paths to check
export const config = {
    // Matcher ensures this middleware runs on all paths, 
    // but excludes static assets like /_next/static, /images, etc., for performance.
    matcher: [
        '/',
        // Exclude paths starting with /_ and common static file extensions
        '/((?!_next|static|favicon.ico|manifest.json|robots.txt|images|icons).*)',
    ],
};

export default function middleware(request) {
    // 1. Get the User-Agent header
    const userAgent = request.headers.get('user-agent');
    
    // Check 1: No User-Agent header (Highly suspicious)
    if (!userAgent) {
        console.warn("BLOCKED: Missing User-Agent");
        return NextResponse.redirect(REDIRECT_URL);
    }
    
    // Check 2: Check for known scraper signatures
    const isScraper = SCRAPER_SIGNATURES.some(signature => 
        userAgent.toLowerCase().includes(signature.toLowerCase())
    );

    if (isScraper) {
        console.warn(`BLOCKED: Identified Scraper: ${userAgent}`);
        
        // This is the server-side action: redirect before sending your source code.
        return NextResponse.redirect(REDIRECT_URL);
    }

    // If the check passes, continue to the original requested page.
    return NextResponse.next();
}
