// Select elements
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const playIcon = playPauseBtn.querySelector("i");

// Online songs (add more if you want)
const playlist = [
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3",
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3",
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3"
];

let currentIndex = 0;
let isPlaying = false;

// Load a song
function loadSong(index) {
    audioPlayer.src = playlist[index];
    audioPlayer.load();
}

// Play music
function playMusic() {
    audioPlayer.play();
    isPlaying = true;
    playIcon.classList.replace("fa-pause", "fa-play");
}

// Pause music
function pauseMusic() {
    audioPlayer.pause();
    isPlaying = false;
    playIcon.classList.replace("fa-play", "fa-pause");
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Next song
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length; // loop playlist
    loadSong(currentIndex);
    playMusic(); // auto-play next song
});

// Load first song on page load
loadSong(currentIndex);