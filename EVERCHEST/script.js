// Remove the <script> tags as they are not needed in a .js file
function openTab(evt, tabName) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
    
    // Close sidebar after selecting a tab on mobile devices
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.add('active');
    });

    document.getElementById('close-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });

    // Load dark mode preference from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Save dark mode preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Prevent scrolling on the body when the sidebar is open
    document.getElementById('sidebar').addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Allow scrolling within the sidebar content
    document.getElementById('sidebar-content').addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });
});

function toggleDetails(heroId) {
    var details = document.getElementById(heroId);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

fetch('heroes.json')
    .then(response => response.json())
    .then(data => {
        // Sort the companions by tier
        const tierOrder = ['S', 'A', 'B', 'C'];
        data.sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));

        const heroContainer = document.getElementById('hero-container');
        data.forEach((hero, index) => {
            if (hero.name) {
                const heroSection = document.createElement('div');
                heroSection.className = 'hero-section';
                heroSection.innerHTML = `
                    <div class="hero-card">
                        <img src="${hero.image}" alt="${hero.name}" class="hero-image">
                        <div class="hero-info">
                            <div class="hero-name">${hero.name}</div>
                            <div class="hero-rating">Tier: ${hero.tier}</div>
                        </div>
                        <button class="detail-button" onclick="toggleDetails('hero${index}')">Details</button>
                    </div>
                    <div id="hero${index}" class="hero-details">
                        <h3 class="hero-details-heading">Stats</h3>
                        <ul class="hero-stats-list">
                            <li><span class="stat-label">VIT:</span> <span class="stat-value">${hero.stats.VIT}</span></li>
                            <li><span class="stat-label">STR:</span> <span class="stat-value">${hero.stats.STR}</span></li>
                            <li><span class="stat-label">INT:</span> <span class="stat-value">${hero.stats.INT}</span></li>
                            <li><span class="stat-label">DEX:</span> <span class="stat-value">${hero.stats.DEX}</span></li>
                            <li><span class="stat-label">PDEF:</span> <span class="stat-value">${hero.stats.PDEF}</span></li>
                            <li><span class="stat-label">MDEF:</span> <span class="stat-value">${hero.stats.MDEF}</span></li>
                            <li><span class="stat-label">MAS:</span> <span class="stat-value">${hero.stats.MAS}</span></li>
                            <li><span class="stat-label">RES:</span> <span class="stat-value">${hero.stats.RES}</span></li>
                        </ul>
                        <h3 class="hero-details-heading">Story Info</h3>
                        <p class="hero-description">${hero.description}</p>                        
                    </div>
                `;
                heroContainer.appendChild(heroSection);
            }
        });
    }).then(() => {
        // Add data-tier attribute to companion-rating elements
        const heroRatings = document.querySelectorAll('.hero-rating');
        heroRatings.forEach(rating => {
            const tier = rating.textContent.split(': ')[1];
            rating.setAttribute('data-tier', tier);
        });
    });

function showUpgradeImage(imagePath) {
    const overlay = document.getElementById('upgrade-image-overlay');
    const image = document.getElementById('upgrade-image');
    image.src = imagePath;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeUpgradeImage() {
    const overlay = document.getElementById('upgrade-image-overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showTalismanImage(imagePath) {
    const overlay = document.getElementById('upgrade-image-overlay');
    const image = document.getElementById('upgrade-image');
    image.src = imagePath;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTalismanImage() {
    const overlay = document.getElementById('upgrade-image-overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add click event listeners to talisman images
document.querySelectorAll('.talisman-images img').forEach(img => {
    img.addEventListener('click', function() {
        showTalismanImage(this.src);
    });
});

// Add event listener to close image when clicking outside
document.getElementById('upgrade-image-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeTalismanImage();
    }
});


// Add event listener to close image when clicking outside
document.getElementById('upgrade-image-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeUpgradeImage();
    }
});

function openTab(event, tabName) {
    event.preventDefault();
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByTagName("a");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
    window.scrollTo(0, 0);
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
}