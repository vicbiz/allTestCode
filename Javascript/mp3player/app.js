function _(query) {
  return document.querySelector(query);
}
function _all(query) {
  return document.querySelectorAll(query);
}
let songList = [
  {
    thumbnail: "default.jpg",
    audio: "0001.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0002.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0003.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0004.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0005.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0006.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0007.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0008.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0009.mp3",
    songname: "",
    artistname: "",
  },

  {
    thumbnail: "default.jpg",
    audio: "0010.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0011.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0012.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0013.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0014.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0015.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0016.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0017.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0018.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0019.mp3",
    songname: "",
    artistname: "",
  },

  {
    thumbnail: "default.jpg",
    audio: "0020.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0021.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0022.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0023.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0024.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0025.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0026.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0027.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0028.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0029.mp3",
    songname: "",
    artistname: "",
  },

  {
    thumbnail: "default.jpg",
    audio: "0030.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0031.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0032.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0033.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0034.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0035.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0036.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0037.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0038.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0039.mp3",
    songname: "",
    artistname: "",
  },

  {
    thumbnail: "default.jpg",
    audio: "0040.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0041.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0042.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0043.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0044.mp3",
    songname: "",
    artistname: "",
  },
  {
    thumbnail: "default.jpg",
    audio: "0045.mp3",
    songname: "",
    artistname: "",
  },
];

let currentSongIndex = 0;

let player = _(".player"),
  toggleSongList = _(".player .toggle-list");

let main = {
  audio: _(".player .main audio"),
  thumbnail: _(".player .main img"),
  seekbar: _(".player .main input"),
  songname: _(".player .main .details h2"),
  artistname: _(".player .main .details p"),
  prevControl: _(".player .main .controls .prev-control"),
  playPauseControl: _(".player .main .controls .play-pause-control"),
  randomControl: _(".player .main .controls .random-control"),
  nextControl: _(".player .main .controls .next-control"),
  fakeAudio: _(".fakeAudio"),
  songListItems: _(".player-list .list"),
};

let isRandom = false;
var jsmediatags = window.jsmediatags;

function getimage(tag) {
  var picture = tag.tags.picture; // create reference to track art
  var base64String = "";
  for (var i = 0; i < picture.data.length; i++) {
    base64String += String.fromCharCode(picture.data[i]);
  }
  var imageUri =
    "data:" + picture.format + ";base64," + window.btoa(base64String);
  return imageUri;
}

// helper function to get tag info and return promise that resolves with the base64 result
function getTags(song) {
  main.fakeAudio.setAttribute("src", "./mp3/" + song.audio);
  return new Promise((resolve, reject) => {
    new jsmediatags.Reader(main.fakeAudio.src).read({
      onSuccess: (tag) => {
        song.thumbnail = getimage(tag);
        song.songname = tag.tags.title;
        song.artistname = tag.tags.artist;
        resolve(tag);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}

// create array of getTags() promises
let promises = songList.map((song) => getTags(song));

Promise.all(promises)
  .then((results) => {
    _(".player .player-list .list").innerHTML = songList
      .map(function (song, songIndex) {
        let active = "";
        if (main.audio.src.indexOf(song.audio) > -1) {
          active = "active";
        }
        return `
          <div class="item ${active}" songIndex="${songIndex}">
            <div class="thumbnail">
              <img src="${song.thumbnail}">
            </div>
            <div class="details">
              <h2>${song.songname}</h2>
              <p>${song.artistname}</p>
            </div>
          </div>
          `;
      })
      .join("");

    toggleSongList.addEventListener("click", function () {
      toggleSongList.classList.toggle("active");
      player.classList.toggle("activeSongList");
    });

    let songListItems = _all(".player .player-list .list .item");
    for (let i = 0; i < songListItems.length; i++) {
      songListItems[i].addEventListener("click", function () {
        currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
        loadSong(currentSongIndex);
        player.classList.remove("activeSongList");
      });
    }
  })
  .catch((err) => console.log("One of the requests failed"));

function loadSong(songIndex) {
  let song = songList[songIndex];
  main.audio.setAttribute("src", "./mp3/" + song.audio);
  main.seekbar.setAttribute("value", 0);
  main.seekbar.setAttribute("min", 0);
  main.seekbar.setAttribute("max", 0);
  main.audio.addEventListener("canplay", function () {
    // var jsmediatags = window.jsmediatags;
    jsmediatags.read(main.audio.src, {
      onSuccess: function (tag) {
        main.thumbnail.setAttribute("src", song.thumbnail);
        document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), url("${song.thumbnail}") center no-repeat`;
        document.body.style.backgroundSize = "cover";
        main.songname.innerText = tag.tags.title;
        main.artistname.innerText = tag.tags.artist;

        let currentActive = document
          .querySelector(".item.active")
          .classList.remove("active");

        let selectedItem = document.querySelector(
          "div[songindex='" + songIndex + "'"
        );

        selectedItem.classList.add("active");
      },
      onError: function (error) {
        console.log(error);
      },
    });

    main.audio.muted = false;
    main.audio.play();
    if (!main.audio.paused) {
      main.playPauseControl.classList.remove("paused");
    }
    main.seekbar.setAttribute("max", parseInt(main.audio.duration));
    main.audio.onended = function () {
      main.nextControl.click();
    };
  });
}
setInterval(function () {
  main.seekbar.value = parseInt(main.audio.currentTime);
}, 1000);

main.prevControl.addEventListener("click", function () {
  if (isRandom) {
    currentSongIndex = Math.floor(Math.random() * songList.length);
  } else {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songList.length + currentSongIndex;
    }
  }
  loadSong(currentSongIndex);
});

main.nextControl.addEventListener("click", function () {
  if (isRandom) {
    currentSongIndex = Math.floor(Math.random() * songList.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
  }
  loadSong(currentSongIndex);
});

main.playPauseControl.addEventListener("click", function () {
  if (main.audio.paused) {
    main.playPauseControl.classList.remove("paused");
    main.audio.play();
  } else {
    main.playPauseControl.classList.add("paused");
    main.audio.pause();
  }
});

main.randomControl.addEventListener("click", function () {
  if (main.audio.paused) {
    main.randomControl.classList.remove("randomOff");
    main.randomControl.classList.add("randomOn");
    isRandom = true;
  } else {
    main.randomControl.classList.remove("randomOn");
    main.randomControl.classList.add("randomOff");
    isRandom = false;
  }
});

main.seekbar.addEventListener("change", function () {
  main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);
