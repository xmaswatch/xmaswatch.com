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
