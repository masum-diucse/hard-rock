// const searchSong = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const api = `https://api.lyrics.ovh/suggest/:${searchText}`;
//     const res = await fetch(api);
//     const data = await res.json();
//     displaySongs(data.data);
// }

const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    const api = `https://api.lyrics.ovh/suggest/:${searchText}`;
    fetch(api)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(err => displayError(err));

}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                        </audio>    
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')"  class="btn btn-success">Get Lyrics</button>
                    </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const getLyric =  (artist, title) => {
//     const url = `https://api.lyrics.ovh/v/${artist}/${title}`;
//     fetch(url)
//     .then(res=>res.json())
//     .then(data=>displayLyrics(data.lyrics))
//      .catch(err=>displayError(err));

// }

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError(error);
    }

}

const displayError = err => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = "Something went wrong!Please try again later.";
}

const displayLyrics = lyricText => {
    const lyric = document.getElementById('displayLyric');
    lyric.innerText = "";
    lyric.innerText = lyricText;
}
