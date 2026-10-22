/*
 * AudioWaveform.
 * Gradio-style waveform: static peaks on canvas, played portion
 * recolored, click-to-seek, play/pause button. Falls back to a
 * plain <audio controls> if decoding fails.
 *
 * props: src (object/blob URL or URL), label (optional)
 */

import React from 'react';
import { Button, Segment, Label } from 'semantic-ui-react';

function decodeAudio(arrayBuffer) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(arrayBuffer, resolve, reject);
  }).finally(() => { if (ctx.close) ctx.close(); });
}

function computePeaks(audioBuffer, numBuckets) {
  const data = audioBuffer.getChannelData(0);
  const bucketSize = Math.max(1, Math.floor(data.length / numBuckets));
  const peaks = [];
  for (let i = 0; i < numBuckets; i++) {
    let max = 0;
    const start = i * bucketSize;
    const end = Math.min(start + bucketSize, data.length);
    for (let j = start; j < end; j++) {
      const v = Math.abs(data[j]);
      if (v > max) max = v;
    }
    peaks.push(max);
  }
  const overall = Math.max.apply(null, peaks) || 1;
  return peaks.map((p) => p / overall);
}

function drawPeaks(canvas, peaks, playedFraction) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const barWidth = 2;
  const gap = 1;
  const n = peaks.length;
  const mid = h / 2;
  const playedBars = Math.floor(n * playedFraction);

  for (let i = 0; i < n; i++) {
    const x = i * (barWidth + gap);
    const barH = Math.max(2, peaks[i] * (h - 4));
    ctx.fillStyle = i < playedBars ? '#f2711c' : '#2185d0'; // SUI orange / blue
    ctx.fillRect(x, mid - barH / 2, barWidth, barH);
  }
}

class AudioWaveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false, duration: 0, decodeFailed: false };
    this.canvasRef = React.createRef();
    this.audioRef = React.createRef();
    this.peaks = null;
    this.cancelled = false;

    this.togglePlay = this.togglePlay.bind(this);
    this.seek = this.seek.bind(this);
    this.redraw = this.redraw.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  componentDidMount() {
    if (this.props.src) this.load(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src && this.props.src) {
      this.load(this.props.src);
    }
  }

  componentWillUnmount() {
    this.cancelled = true;
  }

  load(src) {
    this.peaks = null;
    this.setState({ decodeFailed: false, playing: false, duration: 0 });
    fetch(src)
      .then((r) => r.arrayBuffer())
      .then(decodeAudio)
      .then((audioBuffer) => {
        if (this.cancelled || this.props.src !== src) return;
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const numBuckets = Math.floor(canvas.clientWidth / 3); // bar+gap = 3px
        this.peaks = computePeaks(audioBuffer, numBuckets);
        this.setState({ duration: audioBuffer.duration });
        drawPeaks(canvas, this.peaks, 0);
      })
      .catch(() => {
        if (!this.cancelled) this.setState({ decodeFailed: true });
      });
  }

  redraw() {
    const audio = this.audioRef.current;
    const canvas = this.canvasRef.current;
    if (!audio || !canvas || !this.peaks) return;
    const frac = audio.duration ? audio.currentTime / audio.duration : 0;
    drawPeaks(canvas, this.peaks, frac);
  }

  togglePlay() {
    const audio = this.audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play(); else audio.pause();
  }

  seek(e) {
    const audio = this.audioRef.current;
    const canvas = this.canvasRef.current;
    if (!audio || !canvas || !audio.duration) return;
    const rect = canvas.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    audio.currentTime = frac * audio.duration;
    this.redraw();
  }

  onPlay() { this.setState({ playing: true }); }
  onPause() { this.setState({ playing: false }); }
  onEnded() { this.setState({ playing: false }); this.redraw(); }

  formatTime(s) {
    if (!s || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  render() {
    const { src, label } = this.props;
    const { playing, duration, decodeFailed } = this.state;
    if (!src) return null;

    return (
      <Segment>
        {label && <Label attached="top">{label}</Label>}
        {decodeFailed ? (
          <audio controls src={src} style={{ width: '100%' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              icon={playing ? 'pause' : 'play'}
              circular
              primary
              onClick={this.togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            />
            <canvas
              ref={this.canvasRef}
              onClick={this.seek}
              style={{ flex: 1, height: 64, marginLeft: 12, cursor: 'pointer' }}
            />
            <span style={{ marginLeft: 12, color: '#666', minWidth: 40 }}>
              {this.formatTime(duration)}
            </span>
            <audio
              ref={this.audioRef}
              src={src}
              onTimeUpdate={this.redraw}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onEnded={this.onEnded}
            />
          </div>
        )}
      </Segment>
    );
  }
}

export default AudioWaveform;
