// SELECT ELEMENTS FROM HTML
const addBtn = document.getElementById("addBtn");
const playlistContainer = document.getElementById("playlist-container");
const audioPlayer = document.getElementById("audioPlayer");

// SONG LIST ARRAY (will load from localStorage if available)
let songs = JSON.parse(localStorage.getItem("songs")) || [];

// CURRENTLY PLAYING INDEX
let currentIndex = 0;

//CREATE HIDDEN FILE INPUT (NO NEED TO EDIT YOUR HTML)
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "audio/*";
fileInput.hidden = true;
document.body.appendChild(fileInput);

//CLICK + BUTTON → OPEN FILE PICKER
addBtn.addEventListener("click", () => {
    fileInput.click();
});

//FILE SELECTED → ADD TO ARRAY, SAVE TO LOCAL STORAGE + DISPLAY
fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    // Create a URL for the audio file
    const audioURL = URL.createObjectURL(file);

    // Build song object
    const newSong = {
        title: file.name.replace(".mp3", ""), // remove extension
        artist: "Local File",
        src: audioURL
    };

    // Add to array
    songs.push(newSong);

    // Save to localStorage
    localStorage.setItem("songs", JSON.stringify(songs));

    // Display on the screen
    addSongCard(newSong);
});

//FUNCTION TO CREATE A NEW MUSIC CARD & ATTACH PLAY EVENT
export function addSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("playlist-cards");

    card.innerHTML = `
        <div id="music-cover">
            <img src="https://cdn-icons-png.flaticon.com/512/727/727245.png" alt="">
        </div>
        <div class="music-info">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `;

    // Add audio source as dataset
    card.dataset.audio = song.src;

    // Add card to playlist container
    playlistContainer.appendChild(card);

    // CLICK TO PLAY
    card.addEventListener("click", () => {
        audioPlayer.src = song.src;
        audioPlayer.play();
    });
}

//LOAD SONGS FROM LOCAL STORAGE ON PAGE LOAD
export function loadSongsFromLocal() {
    if (songs.length === 0) return;

    songs.forEach(song => addSongCard(song));
}

// Call this when the page loads
loadSongsFromLocal();
