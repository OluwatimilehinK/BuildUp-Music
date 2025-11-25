// SELECTORS
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const progressContainer = document.getElementById("progress-container");
const currentMusicText = document.querySelector("#current-Music .musicProgress p");

let songs = JSON.parse(localStorage.getItem("songs")) || [];
let currentIndex = 0;

playPauseBtn.addEventListener("click", () => {
    if (!audioPlayer.src) return;

    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});

nextBtn.addEventListener("click", () => {
    if (songs.length === 0) return;

    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
});

export function playSong(index) {
    const song = songs[index];
    if (!song) return;

    audioPlayer.src = song.src;
    audioPlayer.play();
    currentMusicText.textContent = `${song.title} - ${song.artist}`;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    currentIndex = index;
}

audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.duration) return;
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const progressBar = progressContainer.querySelector(".progress-bar");
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
});

export function handleCardClick(cardElement) {
    const songSrc = cardElement.dataset.audio;
    const songTitle = cardElement.querySelector(".music-info h4").textContent;
    const songArtist = cardElement.querySelector(".music-info p").textContent;

    const newSong = { title: songTitle, artist: songArtist, src: songSrc };

    let existingIndex = songs.findIndex(s => s.src === songSrc);
    if (existingIndex === -1) {
        songs.push(newSong);
        currentIndex = songs.length - 1;

        localStorage.setItem("songs", JSON.stringify(songs));
    } else {
        currentIndex = existingIndex;
    }

    playSong(currentIndex);
}


if (songs.length > 0) {
    playSong(0); // auto-load first song from stored playlist
}
