// Select elements
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const playIcon = playBtn.querySelector("i");

// Playlist
const playlist = [
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3",
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3",
    "https://cdn.trendybeatz.com/audio/Davido-Ft-Omah-Lay-With-You-(TrendyBeatz.com).mp3"
];

let currentIndex = 0;
let isPlaying = false;

// Load song function
export function defaultLoadSong(index) {
    audioPlayer.src = playlist[index];
    audioPlayer.load();
}

// Play music
export function defaultPlayMusic() {
    audioPlayer.play();
    isPlaying = true;

    // Switch icon to pause
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

// Pause music
export function defaultPauseMusic() {
    audioPlayer.pause();
    isPlaying = false;

    // Switch icon to play
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

// Toggle Play/Pause
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        defaultPauseMusic();
    } else {
        defaultPlayMusic();
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    defaultLoadSong(currentIndex);
    playMusic(); // auto-play next
    defaultPlayMusic(); // auto-play next
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    defaultLoadSong(currentIndex);
    playMusic(); // auto-play prev
});

// Load first song on page load
defaultLoadSong(currentIndex);