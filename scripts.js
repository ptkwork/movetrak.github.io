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
    const primaryVideo = document.getElementById("background-video");
    if (!primaryVideo) {
        return;
    }

    const videoSources = [
        "images/background15.mp4",
        "images/background12.mp4",
        "images/background14.mp4"
    ];
    const playbackRate = 1.15;
    const transitionDurationMs = 320;

    const secondaryVideo = primaryVideo.cloneNode(false);
    secondaryVideo.removeAttribute("id");
    secondaryVideo.setAttribute("aria-hidden", "true");
    primaryVideo.insertAdjacentElement("afterend", secondaryVideo);

    const videos = [primaryVideo, secondaryVideo];
    let activeVideoSlot = 0;
    let currentSourceIndex = 0;
    let nextSourceIndex = 1;
    let isTransitioning = false;

    function applyPlaybackSettings(videoElement) {
        // Keep the background motion feeling a little less sluggish.
        videoElement.muted = true;
        videoElement.defaultMuted = true;
        videoElement.defaultPlaybackRate = playbackRate;
        videoElement.playbackRate = playbackRate;
        videoElement.preload = "auto";
    }

    function playVideo(videoElement) {
        applyPlaybackSettings(videoElement);

        const playPromise = videoElement.play();
        if (playPromise) {
            playPromise.catch(() => {});
        }
    }

    function loadVideo(videoElement, sourceIndex) {
        if (videoElement.dataset.sourceIndex === String(sourceIndex)) {
            return;
        }

        videoElement.dataset.sourceIndex = String(sourceIndex);
        videoElement.src = videoSources[sourceIndex];
        videoElement.load();
    }

    function whenReady(videoElement, callback) {
        if (videoElement.readyState >= 3) {
            callback();
            return;
        }

        videoElement.addEventListener("canplay", callback, { once: true });
    }

    function preloadHiddenVideo() {
        const hiddenVideo = videos[1 - activeVideoSlot];
        loadVideo(hiddenVideo, nextSourceIndex);
        applyPlaybackSettings(hiddenVideo);
    }

    function finishTransition() {
        const previousVideo = videos[activeVideoSlot];
        const nextVideoSlot = 1 - activeVideoSlot;
        const activeVideo = videos[nextVideoSlot];

        previousVideo.pause();
        previousVideo.currentTime = 0;
        previousVideo.classList.remove("is-visible");

        activeVideoSlot = nextVideoSlot;
        currentSourceIndex = Number(activeVideo.dataset.sourceIndex);
        nextSourceIndex = (currentSourceIndex + 1) % videoSources.length;
        isTransitioning = false;

        preloadHiddenVideo();
    }

    function startTransition() {
        if (isTransitioning) {
            return;
        }

        const currentVideo = videos[activeVideoSlot];
        const nextVideo = videos[1 - activeVideoSlot];

        isTransitioning = true;
        whenReady(nextVideo, () => {
            nextVideo.currentTime = 0;
            playVideo(nextVideo);

            window.requestAnimationFrame(() => {
                nextVideo.classList.add("is-visible");

                window.requestAnimationFrame(() => {
                    currentVideo.classList.remove("is-visible");
                    window.setTimeout(finishTransition, transitionDurationMs);
                });
            });
        });
    }

    primaryVideo.dataset.sourceIndex = String(currentSourceIndex);
    primaryVideo.classList.add("is-visible");

    videos.forEach((videoElement) => {
        applyPlaybackSettings(videoElement);
        videoElement.addEventListener("loadedmetadata", () => applyPlaybackSettings(videoElement));
        videoElement.addEventListener("ended", () => {
            if (videoElement === videos[activeVideoSlot]) {
                startTransition();
            }
        });
        videoElement.addEventListener("timeupdate", () => {
            if (videoElement !== videos[activeVideoSlot] || isTransitioning || !videoElement.duration) {
                return;
            }

            if (videoElement.duration - videoElement.currentTime <= transitionDurationMs / 1000) {
                startTransition();
            }
        });
    });

    playVideo(primaryVideo);
    preloadHiddenVideo();
});
