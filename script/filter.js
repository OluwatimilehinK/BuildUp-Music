const searchInput = document.querySelector(".header input");

const songs = document.querySelectorAll(".playlist-cards");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();
    let found = false;

    songs.forEach(song => {
        const title = song.querySelector("h4").textContent.toLowerCase();
        const artist = song.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchText) || artist.includes(searchText)) {
            song.style.display = "flex";
            found = true;
        } else {
            song.style.display = "none";
        }
    });

    showNoResult(found);
});

export function showNoResult(found) {
    let message = document.getElementById("no-result-msg");

    if (found === false) {
        if (message === null) {
            message = document.createElement("p");
            message.id = "no-result-msg";
            message.textContent = "No matching songs found.";
            message.style.color = "var(--textColor)";
            message.style.textAlign = "center";
            message.style.marginTop = "20px";

            document.getElementById("playlist-container").appendChild(message);
        }
    } else {
        if (message !== null) {
            message.remove();
        }
    }
}