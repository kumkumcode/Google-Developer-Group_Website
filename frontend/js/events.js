const allEvents = [
    { title: "Hackniche 2026", date: "25 March 2026", loc: "SVKM’s DJ Sanghvi", type: "hackathon", desc: "A 24-hour coding challenge with prizes and mentorship for innovators." },
    { title: "Android Workshop", date: "10 April 2026", loc: "GDG Lab, CSMU Campus", type: "workshop", desc: "Hands-on workshop on modern Android app development with Kotlin." },
    { title: "AI Bootcamp", date: "15 May 2026", loc: "Online & Onsite", type: "ai", desc: "Learn AI concepts, build projects, and get professional mentorship." },
    { title: "Web Dev 101", date: "20 May 2026", loc: "GDG Lab, CSMU Campus", type: "web", desc: "Build modern websites using HTML, CSS, and JS from scratch." }
];

const eventGrid = document.getElementById('eventGrid');

function renderEvents(filterType = 'all') {
    eventGrid.innerHTML = ''; 
    const filtered = allEvents.filter(event => filterType === 'all' || event.type === filterType);

    filtered.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div style="color: #4285F4; font-weight: bold; font-size: 12px; margin-bottom: 5px;">${event.type.toUpperCase()}</div>
            <h2 style="margin: 0 0 10px 0;">${event.title}</h2>
            <p style="color: #4285F4; margin-bottom: 10px;">📅 ${event.date} | 📍 ${event.loc}</p>
            <p style="color: #aaa; line-height: 1.5;">${event.desc}</p>
            <div class="button-group">
                <button class="secondary-btn">View Details</button>
                <button class="primary-btn">Register Now</button>
            </div>
        `;
        eventGrid.appendChild(card);
    });
}

// Filter Logic
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.option-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderEvents(btn.dataset.type);
    });
});

renderEvents();