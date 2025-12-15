// --- 1. Smooth Scroll Setup (Lenis) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- 2. Advanced Custom Cursor Logic (Squeeze & Trail & Flashlight) ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
const root = document.documentElement; // For CSS variables

let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
let vel = { x: 0, y: 0 };
let scale = { x: 1, y: 1 };
let angle = 0;

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Update CSS variables for flashlight effect
    root.style.setProperty('--cursor-x', mouse.x + 'px');
    root.style.setProperty('--cursor-y', mouse.y + 'px');

    // Immediate update for dot
    cursor.style.left = mouse.x + 'px';
    cursor.style.top = mouse.y + 'px';
});

// Physics loop for follower
function animateCursor() {
    // Lerp position - smoother (0.08)
    const diffX = mouse.x - pos.x;
    const diffY = mouse.y - pos.y;

    pos.x += diffX * 0.08;
    pos.y += diffY * 0.08;

    // Calculate velocity for squeeze effect
    vel.x = diffX * 0.08;
    vel.y = diffY * 0.08;

    // Stretch based on velocity speed
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    const maxStretch = 1.5; // Slightly reduced max stretch for elegance
    const stretch = Math.min(1 + speed * 0.01, maxStretch);

    scale.x = stretch;
    scale.y = 1 / stretch;

    // Rotate towards movement direction
    angle = Math.atan2(vel.y, vel.x) * (180 / Math.PI);

    follower.style.left = pos.x + 'px';
    follower.style.top = pos.y + 'px';

    // Handle transformation based on state
    if (!cursor.classList.contains('arrow')) {
        follower.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale.x}, ${scale.y})`;
    } else {
        // In arrow state, remove rotation/scale from physics so it stands up straight
        // The CSS rule with !important might override specific scale/rotate, but we reset here for cleanliness
        follower.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for links
const interactiveElements = document.querySelectorAll('a, .swiper-slide, button, .skill-bubble');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        // Check for specific cursor type
        if (el.getAttribute('data-cursor') === 'arrow') {
            cursor.classList.add('arrow');
            follower.classList.add('arrow');
        }
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursor.classList.remove('arrow');
        follower.classList.remove('arrow');
    });
});

// --- 3. Three.js 'Tech' Background with LIGHT TOOL ---
const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 50); // White light, intensity 2, distance 50
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

// Group
const group = new THREE.Group();
scene.add(group);

// 1. Central Complex Shape (Torus Knot) - Solid Metallic to catch light
const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
const material = new THREE.MeshStandardMaterial({
    color: 0x222222,
    wireframe: true,
    roughness: 0.1,
    metalness: 0.8,
    emissive: 0x111111
});
const torusKnot = new THREE.Mesh(geometry, material);
group.add(torusKnot);

// 2. Surrounding Particles (Data stream look)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.6
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
group.add(particlesMesh);

// 3. Floating Debris - Standard Material
for (let i = 0; i < 20; i++) {
    const geo = new THREE.IcosahedronGeometry(Math.random() * 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x555555,
        wireframe: false, // Solid to catch light shadows
        roughness: 0.1,
        metalness: 0.9
    });
    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
    );

    mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.02
    };

    group.add(mesh);
}

camera.position.z = 6;

// Mouse interaction
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    targetX = (event.clientX - windowHalfX);
    targetY = (event.clientY - windowHalfY);

    // Update Light Position based on mouse (normalized)
    // Map mouse X/Y to scene coordinates roughly
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    // Move light to mouse position (slightly in front of objects)
    pointLight.position.x = pos.x;
    pointLight.position.y = pos.y;
    pointLight.position.z = 2; // Keep it in front
});

const clock = new THREE.Clock();

function animateThree() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate main group
    group.rotation.y += 0.002;
    group.rotation.x += 0.001;

    // Smooth follow mouse
    group.rotation.y += 0.01 * (targetX * 0.0005 - group.rotation.y);
    group.rotation.x += 0.01 * (targetY * 0.0005 - group.rotation.x);

    // Animate torus specifically
    torusKnot.rotation.z = elapsedTime * 0.1;

    // Animate floating debris
    group.children.slice(2).forEach(child => {
        child.rotation.x += child.userData.rotX;
        child.rotation.y += child.userData.rotY;
        child.position.y += Math.sin(elapsedTime + child.position.x) * 0.005;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animateThree);
}
animateThree();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 4. GSAP Animations ---

gsap.registerPlugin(ScrollTrigger);

// Loader Animation
const loaderTl = gsap.timeline();

document.body.classList.add('loading');

loaderTl.to('.letter', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
})
    .to('.letter', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.in",
        delay: 0.5
    })
    .to('#loader', {
        height: 0,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
            document.body.classList.remove('loading');
        }
    });

// Hero Reveal
loaderTl.to('.reveal-text', {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power4.out'
}, "-=0.5");

// Marquee Animation
gsap.to('.marquee-track', {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1
});

// Image Parallax for About Section
gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
    },
    y: 50,
    opacity: 0
});

// Flashlight Section Text Reveal (Subtle)
gsap.from('.hidden-wrapper h2', {
    scrollTrigger: {
        trigger: '.hidden-content',
        start: 'top 70%'
    },
    opacity: 0,
    y: 20,
    duration: 1
});

// Skills Bubbles Stagger - Ensure Visibility
gsap.fromTo('.skill-bubble',
    {
        y: 50,
        opacity: 0
    },
    {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 90%', // Trigger earlier
            toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }
);

// --- 5. Swiper Initialization ---
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
});
