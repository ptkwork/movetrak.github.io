// JavaScript for Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle'); // Select the hamburger menu
    const navbar = document.getElementById('navbar'); // Select the navbar

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
    const videoSources = [
        "images/background15.mp4",
        "images/background12.mp4",
        "images/background14.mp4"
    ];

    let currentVideoIndex = 0;

/*     function changeVideo() {
        video.classList.add("video-hidden"); // Fade out

        setTimeout(() => {
            currentVideoIndex = (currentVideoIndex + 1) % videoSources.length; // Switch video
            video.src = videoSources[currentVideoIndex];
            video.load();
            video.play();
            video.classList.remove("video-hidden"); // Fade back in
        }, 1000); // Wait for fade-out before switching
    } */

    function changeVideo() {
        video.classList.add("video-hidden");
    
        setTimeout(() => {
            currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
            video.src = videoSources[currentVideoIndex] + "?t=" + new Date().getTime();
            video.load();
            video.play();
    
            // Force reapply dimensions
            video.style.width = "100vw";
            video.style.height = "100vh";
    
            video.classList.remove("video-hidden");
        }, 1000);
    }
    

    video.addEventListener("ended", changeVideo);
});
