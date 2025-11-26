const STORAGE_KEY_INDEX = 'playlist_last_index';
const STORAGE_KEY_TIME = 'playlist_last_time';

export default function initPlaylist(audioSources = []) {
    const cards = Array.from(document.querySelectorAll('.playlist-cards'));
    const currentMusic = document.querySelector('#current-Music');
    const titleEl = currentMusic.querySelector('.musicProgress p');
    const progressContainer = currentMusic.querySelector('#progress-container .progress-container');
    const progressBar = currentMusic.querySelector('.progress-bar');
    const playPauseBtn = currentMusic.querySelector('.music-controls .control-btn i');

    const audio = new Audio();

    function saveLastIndex(i) {
        localStorage.setItem(STORAGE_KEY_INDEX, i);
    }

    function loadLastIndex() {
        const v = localStorage.getItem(STORAGE_KEY_INDEX);
        if (v === null) return null;
        const i = parseInt(v, 10);
        return Number.isInteger(i) && i >= 0 && i < cards.length ? i : null;
    }

    function saveLastTime(t) {
        localStorage.setItem(STORAGE_KEY_TIME, t);
    }

    function loadLastTime() {
        const v = localStorage.getItem(STORAGE_KEY_TIME);
        return v ? parseFloat(v) : 0;
    }

    function highlightCard(index) {
        cards.forEach((card, i) => card.classList.toggle('active', i === index));
    }

    function updateCurrentMusicDisplay(index) {
        const card = cards[index];
        if (!card) return;
        const title = card.querySelector('h4')?.textContent.trim() || "";
        const artist = card.querySelector('p')?.textContent.trim() || "";
        titleEl.textContent = `${title} - ${artist}`;
    }

    function loadSong(index) {
        const src = audioSources[index] || null;
        if (!src) return;
        audio.src = src;
    }

    function playSong(index) {
        saveLastIndex(index);
        updateCurrentMusicDisplay(index);
        highlightCard(index);
        loadSong(index);
        const lastTime = loadLastTime();
        audio.currentTime = lastTime;
    }

    function onCardClick(e) {
        const card = e.target.closest('.playlist-cards');
        if (!card) return;
        const index = cards.indexOf(card);
        if (index === -1) return;
        playSong(index);
    }

    function updateProgress() {
        const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        progressBar.style.width = percent + '%';
        saveLastTime(audio.currentTime);
    }

    function onProgressClick(e) {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        audio.currentTime = ratio * audio.duration;
        saveLastTime(audio.currentTime);
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.remove('fa-play');
            playPauseBtn.classList.add('fa-pause');
        } else {
            audio.pause();
            playPauseBtn.classList.remove('fa-pause');
            playPauseBtn.classList.add('fa-play');
        }
    }

    function init() {
        cards.forEach(card => card.addEventListener('click', onCardClick));
        audio.addEventListener('timeupdate', updateProgress);
        progressContainer.addEventListener('click', onProgressClick);
        playPauseBtn.addEventListener('click', togglePlayPause);

        const lastIndex = loadLastIndex();
        if (lastIndex !== null) {
            playSong(lastIndex);
        }
    }

    init();
}
