class AudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
  }

  async playAlert(soundUrl) {
    if (this.isPlaying) {
      await this.stop();
    }
    
    try {
      this.audio = new Audio(soundUrl);
      this.audio.loop = false;
      
      await this.audio.play();
      this.isPlaying = true;
      
      this.audio.onended = () => {
        this.isPlaying = false;
        this.audio = null;
      };
    } catch (error) {
      console.error('Audio playback failed:', error);
      this.isPlaying = false;
      this.audio = null;
    }
  }

  async stop() {
    if (this.audio && this.isPlaying) {
      try {
        await this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.audio = null;
      } catch (error) {
        console.error('Failed to stop audio:', error);
      }
    }
  }
}

export default new AudioManager();
