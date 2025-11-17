// Identify which page we are on
const playlistPage = document.querySelector("#playlist-container");
const musicPadPage = document.querySelector(".music-container");

// ======================================================
// PAGE 1 — PLAYLIST PAGE
// ======================================================
if (playlistPage) {
    const playlistCards = document.querySelectorAll(".playlist-cards");

    playlistCards.forEach(card => {
        card.addEventListener("click", () => {
            const imgSrc = card.querySelector("#music-cover img").src;
            const title = card.querySelector(".music-info h4").innerText;
            const artist = card.querySelector(".music-info p").innerText;

            // Save to localStorage
            localStorage.setItem("selectedImg", imgSrc);
            localStorage.setItem("selectedTitle", title);
            localStorage.setItem("selectedArtist", artist);

            // Navigate to music pad screen
            window.location.href = "Music Pad.html";
        });
    });
}


// ======================================================
// PAGE 2 — MUSIC PAD PAGE
// ======================================================
if (musicPadPage) {
    const bannerImg = document.querySelector("#music-banner img");
    const musicTitle = document.querySelector("#info-container h3");
    const musicArtist = document.querySelector("#info-container p");
    const backArrow = document.querySelector(".fa-arrow-left");
   
    const playBtn = document.querySelector(".control-btn-play i");
    const prevBtn = document.querySelector(".fa-backward-step");
    const nextBtn = document.querySelector(".fa-forward-step");

    // Load from localStorage
    const savedImg = localStorage.getItem("selectedImg");
    const savedTitle = localStorage.getItem("selectedTitle");
    const savedArtist = localStorage.getItem("selectedArtist");

    if (savedImg && savedTitle && savedArtist) {
        bannerImg.src = savedImg;
        musicTitle.innerText = savedTitle;
        musicArtist.innerText = savedArtist;
    }

    // Back button → return to playlist
    backArrow.addEventListener("click", () => {
        window.location.href = "Music Pad.html";
    });
}

    // PLAY MUSIC
function playMusic() {
    audio.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
}
// PAUSE MUSIC
function pauseMusic() {
    audio.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
}


// TOGGLE PLAY / PAUSE
if (playBtn) {
    playBtn.addEventListener("click", () => {
        if (audio.paused) playMusic();
        else pauseMusic();
    });
}


// NEXT SONG
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % musicData.length;
        loadSong(currentIndex);
        playMusic();
    });
}

// PREVIOUS SONG
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + musicData.length) % musicData.length;
        loadSong(currentIndex);
        playMusic();
    });
}