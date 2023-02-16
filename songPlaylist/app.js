const albums = [
  {
    song: "song/glatt.mp3",
    title: "Kyo Nay Say Chi tal",
    photo: "img/glatt.jpg",
    singer: "G-Latt",
  },
  {
    song: "song/yingo.mp3",
    title: "A Taung Pan Pr Yin Min Si Ko ",
    photo: "img/yingo.jpg",
    singer: "Yin Go",
  },
  {
    song: "song/zawwin.mp3",
    title: "A Chit Myar Thuu Si Mar",
    photo: "img/zawwinhtut.jpg",
    singer: "Zaw Win Htut",
  },
  {
    song: "song/linlin.mp3",
    title: "A Chit Ye Ya latt",
    photo: "img/linlin.jpg",
    singer: "Lin Lin",
  },
  {
    song: "song/yonekyiyar.mp3",
    title: "Yone Kyi Yar",
    photo: "img/layphyu.jpg",
    singer: "Lay Phyu",
  },
  {
    song: "song/ngathumoh.mp3",
    title: "Nga Thu Moh",
    photo: "img/soelwinlwin.jpg",
    singer: "Soe Lwin Lwin",
  },
  {
    song: "song/nightchange.mp3",
    title: "NightChanges",
    photo: "img/nightchanges.jpg",
    singer: "One Direction",
  },
  {
    song: "song/cheatingonyou.mp3",
    title: "Cheating On you",
    photo: "img/charlieputh.jpg",
    singer: "Charlie Puth",
  },
  {
    song: "song/thenight.mp3",
    title: "The Night",
    photo: "img/avicii.jpg",
    singer: "Avicii",
  },
];

const currentProgress = document.querySelector(".currentProgress");
const currentAndPlay = document.querySelector(".currentAndPlay");
const previousBtn = document.querySelector(".previousBtn");
const nextBtn = document.querySelector(".nextBtn");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const changeImg = document.querySelector(".changeImg");
const songName = document.querySelector(".songName");
const singerName = document.querySelector(".singerName");
const audio = document.querySelector("audio");
const display = document.querySelector(".display");
const playIndex = 0;
let isPlaying = true;
let i = 0;
let songTime = "00:00";
let durationFull = 0;

const working = function () {
  i += 1;
  if (i === albums.length) {
    i = 0;
  }
  changeImg.src = albums[i].photo;
  songName.textContent = `Song Name : "${albums[i].title}"`;
  singerName.textContent = `Singer : ${albums[i].singer}`;
  audio.src = albums[i].song;
  audio.play();
};
const previous = function () {
  if (i === 0) {
    i = albums.length;
  }
  i -= 1;
  changeImg.src = albums[i].photo;
  songName.textContent = `Song Name : "${albums[i].title}"`;
  singerName.textContent = `Singer : ${albums[i].singer}`;
  audio.src = albums[i].song;
  audio.play();
};
nextBtn.addEventListener("click", working);
previousBtn.addEventListener("click", previous);
audio.addEventListener("loadeddata", function () {
  durationFull = Math.floor(audio.duration);
  songTime = createMinAndSecond(durationFull);
});
const updateProgress = (duration) => {
  const progress = (500 / durationFull) * duration;
  currentProgress.style.width = `${progress}px`;
};

audio.addEventListener("timeupdate", () => {
  const duration = Math.floor(audio.currentTime);
  let playtime = createMinAndSecond(duration);
  const showTime = `${playtime} / ${songTime}`;
  currentAndPlay.textContent = showTime;
  updateProgress(duration);
});

const createMinAndSecond = function (total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  const min = minutes < 10 ? "0" + minutes.toString() : minutes;
  const sec = seconds < 10 ? "0" + seconds.toString() : seconds;
  return `${min}:${sec}`;
};

playBtn.addEventListener("click", () => {
  const currentTime = Math.floor(audio.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    const index = albums[playIndex].song;
    audio.src = index;
    audio.play();
    updatePlayAndPause();
  } else {
    audio.play();
    updatePlayAndPause();
  }
});
const updatePlayAndPause = () => {
  if (isPlaying) {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  }
};
pauseBtn.addEventListener("click", () => {
  isPlaying = false;
  audio.pause();
  if (!isPlaying) {
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
});
