document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundsong');
    const playBtn = document.getElementById('music-play-btn');
    const progressBar = document.getElementById('music-progress-bar');
    const currentTimeEl = document.getElementById('music-current-time');
    const durationEl = document.getElementById('music-duration');
    const titleEl = document.getElementById('music-title');
    const artistEl = document.getElementById('music-artist');

    // set track info (change these to your actual song details)
    titleEl.textContent = 'Lost';
    artistEl.textContent = 'Autumns Grey Solace';

    let isPlaying = false;

    // update progress bar
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    // click on progress bar to seek
    const progressContainer = document.getElementById('music-progress-container');
    progressContainer.addEventListener('click', function(e) {
        if (audio.duration) {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        }
    });

    // format time helper
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // toggle play/pause
    window.toggleMusicPlayer = function() {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>';
        }
    };

    // auto play when overlay is clicked
    document.getElementById('overlay').addEventListener('click', function() {
        audio.play().catch(() => {});
        playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    });

    // update play button when audio ends
    audio.addEventListener('ended', function() {
        playBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>';
        progressBar.style.width = '0%';
    });
});