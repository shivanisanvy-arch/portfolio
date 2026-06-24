/**
 * Eramalla Shivani - Portfolio Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Management (Dark / Light Mode)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // 2. Navigation Scroll Effects & Active States
    // ==========================================
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll Spy: highlight active nav link
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    const toggleMobileMenu = () => {
        mobileMenuBtn.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // ==========================================
    // 4. Interactive Lightbox Modal Data & Logic
    // ==========================================
    const projectsData = {
        p1: {
            title: "Project 01: Studio Apartment (Urban Modern Theme)",
            desc: "An urban modern studio apartment layout designed to maximize space and aesthetics. Highlights custom floor tile arrangements, paint schemes, modular claddings, and complete layouts for the living room, modular kitchen, bedroom, and bathroom.",
            images: [
                "images/page_8_img_2.jpg",
                "images/page_8_img_3.jpg",
                "images/page_9_img_2.jpg",
                "images/page_9_img_3.jpg",
                "images/page_10_img_2.jpg",
                "images/page_10_img_3.jpg",
                "images/page_11_img_2.jpg",
                "images/page_11_img_3.jpg",
                "images/page_12_img_2.jpg",
                "images/page_12_img_3.jpg"
            ]
        },
        p2: {
            title: "Project 02: Luxury Living Villa Design",
            desc: "A sprawling luxury residential villa design with high-end architectural layouts. Features premium wall claddings, custom-made millwork wardrobes, modular kitchen setups, bedroom designs, and a dedicated cozy private lounge.",
            images: [
                "images/page_13_img_2.jpg",
                "images/page_13_img_3.jpg",
                "images/page_14_img_2.jpg",
                "images/page_14_img_3.jpg",
                "images/page_15_img_2.jpg",
                "images/page_15_img_3.jpg",
                "images/page_16_img_2.jpg",
                "images/page_16_img_3.jpg",
                "images/page_17_img_2.jpg",
                "images/page_17_img_4.jpg",
                "images/page_17_img_5.jpg",
                "images/page_18_img_2.jpg",
                "images/page_18_img_3.jpg"
            ]
        },
        p3: {
            title: "Project 03: Villa Design (Modern Elegance)",
            desc: "Focuses on double partition screens, warm wood panelings, and space efficiency in a multi-story layout. Highlights include a custom cosmic-themed kids bedroom and an acoustic home theater layout with comfortable luxury seating.",
            images: [
                "images/page_19_img_2.jpg",
                "images/page_20_img_2.jpg",
                "images/page_20_img_3.jpg",
                "images/page_21_img_2.jpg",
                "images/page_21_img_3.jpg",
                "images/page_22_img_2.jpg",
                "images/page_22_img_3.jpg"
            ]
        },
        p4: {
            title: "Project 04: Villa Design (Double Height Drawing)",
            desc: "Expansive layouts showcasing high-ceiling double-height drawing and dining spaces. Includes detailed 3D visualization of custom stone fireplaces, dry kitchen island layouts, and a modern boutique powder room bathroom setup.",
            images: [
                "images/page_23_img_2.jpg",
                "images/page_23_img_3.jpg",
                "images/page_23_img_4.jpg",
                "images/page_24_img_2.jpg",
                "images/page_24_img_3.jpg",
                "images/page_25_img_2.jpg",
                "images/page_25_img_3.jpg"
            ]
        }
    };

    let currentProjectId = null;
    let currentImageIndex = 0;
    
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const sliderImage = document.getElementById('slider-image');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const thumbContainer = document.getElementById('lightbox-thumbnails');
    const counterDisplay = document.getElementById('lightbox-counter');
    const projectCards = document.querySelectorAll('.project-card');

    // Update Image View in Lightbox
    const updateLightboxImage = () => {
        const project = projectsData[currentProjectId];
        const imageUrl = project.images[currentImageIndex];
        
        // Load main image
        sliderImage.style.opacity = 0;
        setTimeout(() => {
            sliderImage.src = imageUrl;
            sliderImage.style.opacity = 1;
        }, 150);
        
        // Update Counter
        counterDisplay.textContent = `Image ${currentImageIndex + 1} of ${project.images.length}`;
        
        // Update Thumbnails Active Class
        const thumbs = thumbContainer.querySelectorAll('.thumb-item');
        thumbs.forEach((thumb, idx) => {
            if (idx === currentImageIndex) {
                thumb.classList.add('active');
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    };

    // Open Lightbox
    const openLightbox = (projectId) => {
        currentProjectId = projectId;
        currentImageIndex = 0;
        const project = projectsData[projectId];
        
        lightboxTitle.textContent = project.title;
        lightboxDesc.textContent = project.desc;
        
        // Build Thumbnails
        thumbContainer.innerHTML = '';
        project.images.forEach((imgUrl, idx) => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.classList.add('thumb-item');
            if (idx === 0) img.classList.add('active');
            
            img.addEventListener('click', () => {
                currentImageIndex = idx;
                updateLightboxImage();
            });
            thumbContainer.appendChild(img);
        });
        
        updateLightboxImage();
        
        lightboxModal.style.display = 'flex';
        setTimeout(() => {
            lightboxModal.classList.add('open');
            document.body.classList.add('no-scroll');
            lightboxModal.setAttribute('aria-hidden', 'false');
        }, 50);
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightboxModal.classList.remove('open');
        document.body.classList.remove('no-scroll');
        lightboxModal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            lightboxModal.style.display = 'none';
        }, 350);
    };

    // Bind Cards Click Events
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openLightbox(projectId);
        });
    });

    // Prev Button Click
    sliderPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        const project = projectsData[currentProjectId];
        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        updateLightboxImage();
    });

    // Next Button Click
    sliderNext.addEventListener('click', (e) => {
        e.stopPropagation();
        const project = projectsData[currentProjectId];
        currentImageIndex = (currentImageIndex + 1) % project.images.length;
        updateLightboxImage();
    });

    // Close Button Click
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on Background Click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-container')) {
            closeLightbox();
        }
    });

    // Keyboard Events for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('open')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            const project = projectsData[currentProjectId];
            currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            const project = projectsData[currentProjectId];
            currentImageIndex = (currentImageIndex + 1) % project.images.length;
            updateLightboxImage();
        }
    });

    // ==========================================
    // 5. Interactive Blueprint Floor Plan
    // ==========================================
    const blueprintRooms = document.querySelectorAll('.blueprint-room');
    const roomNameDisplay = document.getElementById('blueprint-room-name');
    const roomDetailsDisplay = document.getElementById('blueprint-room-details');
    
    const roomSpecs = {
        living: {
            name: "Living & Dining Area",
            details: "Dimensions: 22'-0\" x 13'-0\" | Area: 286 sq ft. Finishes: Italian marble flooring, custom mahogany wall claddings."
        },
        kitchen: {
            name: "Modular Dry Kitchen",
            details: "Dimensions: 17'-0\" x 11'-0\" | Area: 187 sq ft. Specs: Built-in kitchen island, matte-finished custom cabinetry."
        },
        bedroom: {
            name: "Master Bedroom Suite",
            details: "Dimensions: 17'-0\" x 10'-0\" | Area: 170 sq ft. Finishes: Hardwood oak floor, custom veneered headboard panels."
        },
        bathroom: {
            name: "Boutique Bathroom",
            details: "Dimensions: 17'-0\" x 5'-0\" | Area: 85 sq ft. Specs: Floating marble vanity, custom ceiling spotlights, glass shower partition."
        }
    };
    
    blueprintRooms.forEach(room => {
        room.addEventListener('mouseenter', () => {
            const roomKey = room.getAttribute('data-room');
            const spec = roomSpecs[roomKey];
            if (spec) {
                roomNameDisplay.textContent = spec.name;
                roomNameDisplay.style.color = "var(--accent-color)";
                roomDetailsDisplay.textContent = spec.details;
                
                // Highlight corresponding SVG area
                room.setAttribute('fill', 'rgba(212, 175, 55, 0.12)');
                room.setAttribute('stroke', 'var(--accent-color)');
                room.setAttribute('stroke-width', '1.5');
            }
        });
        
        room.addEventListener('mouseleave', () => {
            roomNameDisplay.textContent = "Interactive CAD Plan";
            roomNameDisplay.style.color = "var(--text-color)";
            roomDetailsDisplay.textContent = "Hover over rooms to inspect spatial specifications.";
            
            room.setAttribute('fill', 'rgba(212, 175, 55, 0)');
            room.setAttribute('stroke', 'none');
        });
    });

});
