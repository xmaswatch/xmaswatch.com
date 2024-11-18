// Countdown Timer
function updateTimer() {
    const christmas = new Date('Dec 25, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = christmas - now;

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
