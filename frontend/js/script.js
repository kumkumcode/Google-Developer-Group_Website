// ===== 1. EVENT FILTERING LOGIC =====
function filterEvents(category) {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        } else {
            card.style.display = 'none';
        }
    });

    // Update active button visual state
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // MOBILE FIX: Check if event exists before accessing currentTarget
    const currentEvent = window.event || arguments.callee.caller.arguments[0];
    if (currentEvent && currentEvent.currentTarget) {
        currentEvent.currentTarget.classList.add('active');
    }
}

// ===== 2. SCROLL ANIMATION =====
window.addEventListener("scroll", function() {
    const cards = document.querySelectorAll(".event-card");

    cards.forEach(card => {
        if (card.style.display !== 'none') {
            const position = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        }
    });
});

// ===== 3. PASSWORD TOGGLES =====
function togglePassword() {
    const pass = document.getElementById("password");
    if (pass) pass.type = pass.type === "password" ? "text" : "password";
}

function toggleConfirmPassword() {
    const pass = document.getElementById("confirm-password");
    if (pass) pass.type = pass.type === "password" ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.event-row-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});

// Keeping your second filterEvents function exactly as provided but adding the same mobile fix
function filterEvents(category) {
    const cards = document.querySelectorAll('.event-row-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    
    // MOBILE FIX: Check if event exists
    const currentEvent = window.event || (arguments.callee.caller ? arguments.callee.caller.arguments[0] : null);
    if (currentEvent && currentEvent.currentTarget) {
        currentEvent.currentTarget.classList.add('active');
    }

    cards.forEach(card => {
        card.style.display = 'none'; // Hide all
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex'; // Show filtered
            card.classList.remove('reveal'); // Reset animation
            void card.offsetWidth; // Trigger reflow
            card.classList.add('reveal'); // Re-run animation
        }
    });
}