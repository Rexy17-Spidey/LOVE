/**
 * ==============================================================================
 * THE ART OF HER — AUDIO CONTROLLER
 * Ambient Atmospheric Sound (Strictly Opt-in, NO Autoplay)
 * ==============================================================================
 */

class ExhibitionAudio {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.toggleButton = document.getElementById("audio-toggle-btn");
    this.statusText = document.getElementById("audio-status-label");
    this.config = window.EXHIBITION_CONFIG?.audio || { enabled: false, autoplay: false, volume: 0.35 };

    this.init();
  }

  init() {
    if (!this.toggleButton) return;

    // Create audio element if src is provided
    if (this.config.src) {
      this.audioElement = new Audio();
      this.audioElement.src = this.config.src;
      this.audioElement.loop = true;
      this.audioElement.volume = this.config.volume || 0.35;

      // Handle file not found gracefully (optional ambient track)
      this.audioElement.addEventListener("error", () => {
        console.info("Ambient audio track file not provided in assets/audio/ yet. Audio controller will remain silent.");
      });
    }

    this.toggleButton.addEventListener("click", () => this.togglePlayback());
  }

  togglePlayback() {
    if (!this.audioElement || !this.audioElement.src) {
      this.showAudioNotice("Ambient track can be placed in assets/audio/ambient-piano.mp3");
      return;
    }

    if (this.isPlaying) {
      this.fadeOut();
    } else {
      this.fadeIn();
    }
  }

  fadeIn() {
    if (!this.audioElement) return;

    this.audioElement.volume = 0;
    const playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.toggleButton.classList.add("playing");
          this.toggleButton.setAttribute("aria-label", "Mute ambient sound");
          if (this.statusText) this.statusText.textContent = "Sound: On";

          let vol = 0;
          const targetVol = this.config.volume || 0.35;
          const step = targetVol / 20;
          const fadeInterval = setInterval(() => {
            if (vol < targetVol) {
              vol = Math.min(targetVol, vol + step);
              if (this.audioElement) this.audioElement.volume = vol;
            } else {
              clearInterval(fadeInterval);
            }
          }, 50);
        })
        .catch(err => {
          console.warn("Audio playback prevented:", err);
          this.showAudioNotice("Click again to play audio");
        });
    }
  }

  fadeOut() {
    if (!this.audioElement) return;

    let vol = this.audioElement.volume;
    const step = vol / 15;
    const fadeInterval = setInterval(() => {
      if (vol > 0.02) {
        vol -= step;
        this.audioElement.volume = vol;
      } else {
        clearInterval(fadeInterval);
        this.audioElement.pause();
        this.isPlaying = false;
        this.toggleButton.classList.remove("playing");
        this.toggleButton.setAttribute("aria-label", "Play ambient sound");
        if (this.statusText) this.statusText.textContent = "Sound: Off";
      }
    }, 40);
  }

  showAudioNotice(message) {
    let toast = document.getElementById("audio-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "audio-toast";
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(2, 26, 23, 0.95);
        border: 1px solid #C5A46D;
        color: #FFF9EF;
        padding: 10px 18px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.82rem;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        transition: opacity 0.4s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3500);
  }
}

window.ExhibitionAudio = ExhibitionAudio;
