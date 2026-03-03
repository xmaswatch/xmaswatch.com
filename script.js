// Countdown Timer
function updateTimer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmasDate = new Date(`Dec 25, ${currentYear} 00:00:00`).getTime();
    
    // If Christmas has already passed this year, target next year
    if (now.getTime() > christmasDate) {
        christmasDate = new Date(`Dec 25, ${currentYear + 1} 00:00:00`).getTime();
    }

    const distance = christmasDate - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = 
        `${days} days&nbsp;&nbsp;&nbsp;${hours} hrs&nbsp;&nbsp;&nbsp;${minutes} mins&nbsp;&nbsp;&nbsp;${seconds} secs`;

    if (distance < 0) {
        document.getElementById("timer").innerHTML = "Merry Christmas!";
    }
}

setInterval(updateTimer, 1000);

// Social Media Sharing
function shareOn(platform) {
    const url = "https://yourchristmascountdownsite.com";
    const text = "Countdown to Christmas! Join me at this festive site!";
    let shareUrl = "";

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
            break;
    }

    window.open(shareUrl, '_blank');
}

// I Feel Lucky - Random Weird Effects
function iFeelLucky() {
    const effects = [
        function() { // Spin the whole page
            document.body.style.transition = "transform 2s";
            document.body.style.transform = "rotate(360deg)";
            setTimeout(() => { document.body.style.transform = "rotate(0deg)"; }, 2000);
        },
        function() { // Rainbow background disco
            let count = 0;
            const interval = setInterval(() => {
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                document.body.style.backgroundColor = colors[count % colors.length];
                count++;
                if (count > 20) {
                    clearInterval(interval);
                    document.body.style.backgroundColor = "#2a0a0a";
                }
            }, 100);
        },
        function() { // Upside down text
            const timer = document.getElementById("timer");
            timer.style.transition = "transform 1s";
            timer.style.transform = timer.style.transform === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
        },
        function() { // Blizzard
            if (window.snowStorm) {
                const oldMax = snowStorm.flakesMaxActive;
                snowStorm.flakesMaxActive = 800;
                snowStorm.createSnow(300);
                setTimeout(() => { snowStorm.flakesMaxActive = oldMax; }, 5000);
            }
        },
        function() { // Grinch Mode
            document.querySelectorAll('*').forEach(el => {
                el.style.color = '#32cd32';
                if (el.tagName === 'H1') el.style.textShadow = '3px 3px 10px #006400';
            });
            setTimeout(() => { location.reload(); }, 3000);
        },
        function() { // Earthquake
            document.body.classList.add('shake');
            setTimeout(() => { document.body.classList.remove('shake'); }, 2000);
        },
        function() { // Comic Sans Apocalypse
            document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
            setTimeout(() => { document.body.style.fontFamily = "'Arial', sans-serif"; }, 5000);
        },
        function() { // Floating Reindeer
            const reindeer = document.createElement('div');
            reindeer.innerHTML = '🦌';
            reindeer.style.position = 'fixed';
            reindeer.style.fontSize = '50px';
            reindeer.style.left = '-100px';
            reindeer.style.top = Math.random() * window.innerHeight + 'px';
            reindeer.style.transition = 'left 3s linear';
            reindeer.style.zIndex = '1000';
            document.body.appendChild(reindeer);
            setTimeout(() => { reindeer.style.left = window.innerWidth + 100 + 'px'; }, 100);
            setTimeout(() => { reindeer.remove(); }, 3500);
        },
        function() { // Giant Timer
            const timer = document.getElementById("timer");
            timer.style.transition = "font-size 0.5s";
            timer.style.fontSize = "10em";
            setTimeout(() => { timer.style.fontSize = "5em"; }, 2000);
        },
        function() { // Tiny Text
            document.body.style.transition = "font-size 0.5s";
            document.body.style.fontSize = "5px";
            setTimeout(() => { document.body.style.fontSize = ""; }, 3000);
        },
        function() { // Reverse Snow (Only if snowstorm supports it easily, else just more colors)
            if (window.snowStorm) {
                snowStorm.snowColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                setTimeout(() => { snowStorm.snowColor = '#fff'; }, 5000);
            }
        },
        function() { // Elf Alert
            alert("🧝 An elf just stole your cookies!");
        }
    ];

    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
}
