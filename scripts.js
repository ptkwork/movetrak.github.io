// JavaScript for Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle'); // Select the hamburger menu
    const navbar = document.getElementById('navbar'); // Select the navbar

    if (!menuToggle || !navbar) {
        return;
    }

    // Add event listener to menu toggle for click event
    menuToggle.addEventListener('click', function () {
        // Toggle 'open' class to display or hide the navbar
        navbar.classList.toggle('open');
        // Toggle 'active' class to change hamburger icon to a cross and back
        menuToggle.classList.toggle('active');
    });
});

//below dynamically changing background

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById("background-video");
    if (!video) {
        return;
    }

    const videoSources = [
        "images/background15.mp4",
        "images/background12.mp4",
        "images/background14.mp4"
    ];
    const playbackRate = 1.15;

    let currentVideoIndex = 0;

    function applyPlaybackSettings() {
        // Keep the background motion feeling a little less sluggish.
        video.defaultPlaybackRate = playbackRate;
        video.playbackRate = playbackRate;
    }

    function playVideo() {
        applyPlaybackSettings();

        const playPromise = video.play();
        if (playPromise) {
            playPromise.catch(() => {});
        }
    }

    function changeVideo() {
        video.classList.add("video-hidden");

        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        video.addEventListener("canplay", () => {
            playVideo();
            video.classList.remove("video-hidden");
        }, { once: true });

        video.src = videoSources[currentVideoIndex];
        video.load();
    }

    video.preload = "auto";
    applyPlaybackSettings();
    video.addEventListener("ended", changeVideo);
    video.addEventListener("loadedmetadata", applyPlaybackSettings);
});
