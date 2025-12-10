// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Menu Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        tabBtns.forEach(b => b.classList.remove('active'));
        menuCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding category
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Set minimum date for reservation to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Reservation Form Submission
const reservationForm = document.getElementById('reservationForm');
const confirmationModal = document.getElementById('confirmationModal');
const confirmationMessage = document.getElementById('confirmationMessage');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    
    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Format time for display
    const timeObj = new Date(`2000-01-01T${time}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    // Set confirmation message
    confirmationMessage.innerHTML = `
        Thank you, <strong>${name}</strong>!<br><br>
        Your table for <strong>${guests} ${guests === '1' ? 'person' : 'people'}</strong> 
        has been reserved for<br>
        <strong>${formattedDate}</strong> at <strong>${formattedTime}</strong>.<br><br>
        We'll send a confirmation email shortly.
    `;
    
    // Show modal
    confirmationModal.classList.add('active');
    
    // Reset form
    reservationForm.reset();
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    
    confirmationMessage.innerHTML = `
        Thank you, <strong>${name}</strong>!<br><br>
        Your message has been sent successfully.<br>
        We'll get back to you within 24 hours.
    `;
    
    confirmationModal.classList.add('active');
    contactForm.reset();
});

// Close Modal
function closeModal() {
    confirmationModal.classList.remove('active');
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmationModal.classList.contains('active')) {
        closeModal();
    }
});


// Google Maps Integration
function initMap() {
    // Restaurant coordinates (example: Times Square, NYC)
    const restaurantLocation = { lat: 40.758896, lng: -73.985130 };
    
    // Create map
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: restaurantLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{ "weight": "2.00" }]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{ "color": "#9c9c9c" }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{ "visibility": "on" }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{ "visibility": "simplified" }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{ "color": "#D4A574" }, { "visibility": "on" }]
            }
        ]
    });
    
    // Custom marker
    const marker = new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: 'Brew & Bites',
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                    <path fill="#8B4513" d="M20 0C9 0 0 9 0 20c0 15 20 30 20 30s20-15 20-30C40 9 31 0 20 0z"/>
                    <circle fill="#FDF8F3" cx="20" cy="18" r="10"/>
                    <text x="20" y="22" text-anchor="middle" fill="#8B4513" font-size="12">☕</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 50)
        }
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Poppins', sans-serif;">
                <h3 style="margin: 0 0 5px; color: #8B4513; font-family: 'Playfair Display', serif;">Brew & Bites</h3>
                <p style="margin: 0; color: #6B5B4F; font-size: 14px;">123 Coffee Street<br>New York, NY 10001</p>
                <p style="margin: 10px 0 0; font-size: 13px;">
                    <a href="https://www.google.com/maps/dir/?api=1&destination=40.758896,-73.985130" 
                       target="_blank" 
                       style="color: #8B4513; text-decoration: none; font-weight: 500;">
                       Get Directions →
                    </a>
                </p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
}

// Fallback if Google Maps fails to load
window.addEventListener('load', () => {
    setTimeout(() => {
        const mapElement = document.getElementById('map');
        if (mapElement && !mapElement.hasChildNodes()) {
            mapElement.innerHTML = `
                <div style="
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #F5E6D3 0%, #D4A574 100%);
                    color: #5D2E0C;
                    text-align: center;
                    padding: 20px;
                ">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <h3 style="margin-bottom: 10px; font-family: 'Playfair Display', serif;">Find Us Here</h3>
                    <p style="margin-bottom: 15px;">123 Coffee Street, New York, NY 10001</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=Times+Square+New+York" 
                       target="_blank"
                       style="
                           background: #8B4513;
                           color: white;
                           padding: 12px 25px;
                           border-radius: 25px;
                           text-decoration: none;
                           font-weight: 500;
                       ">
                       Open in Google Maps
                    </a>
                </div>
            `;
        }
    }, 2000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Hero section should be visible immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';
