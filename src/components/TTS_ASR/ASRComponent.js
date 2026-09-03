/*
 * ASRComponent.
 * Mic recording or audio file upload -> waveform preview ->
 * POST API_URL/asr -> confidence-colored transcript + .txt download.
 */

import React from 'react';
import {
  Button, Segment, Label, Icon, Message,
} from 'semantic-ui-react';
import AudioWaveform from './AudioWaveform';
import { API_URL } from '../../App.js';

function confidenceColor(p) {
  if (p == null) return '#999999';
  if (p > 0.8) return '#1a7f37'; // high
  if (p > 0.6) return '#9a6700'; // medium
  if (p > 0.4) return '#bc4c00'; // low
  return '#cf222e';              // very low
}

/* Stateless helper; fine to keep as a function even in a class codebase. */
function ConfidenceTranscript({ segments }) {
  if (!segments || !segments.length) return null;
  return (
    <Segment>
      <Label attached="top">Transcription (color = confidence)</Label>
      <div style={{ fontSize: '1.1em', lineHeight: 1.8, padding: 8 }}>
        {segments.map((seg, si) => (
          <div key={si} style={{ marginBottom: 6 }}>
            {(seg.tokens || []).map((tok, ti) => {
              const text = tok.text || '';
              if (text.indexOf('[_') === 0 && text.charAt(text.length - 1) === ']') {
                return null; // skip whisper meta tokens like [_BEG_]
              }
              return (
                <span
                  key={ti}
                  title={tok.p != null ? 'p=' + tok.p.toFixed(3) : ''}
                  style={{ color: confidenceColor(tok.p) }}
                >
                  {text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ fontSize: '0.8em', color: '#666', padding: '4px 8px' }}>
        Confidence:{' '}
        <span style={{ color: '#1a7f37' }}>■ high</span>{' '}
        <span style={{ color: '#9a6700' }}>■ medium</span>{' '}
        <span style={{ color: '#bc4c00' }}>■ low</span>{' '}
        <span style={{ color: '#cf222e' }}>■ very low</span>
      </div>
    </Segment>
  );
}

class ASRComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audioUrl: null,
      audioName: 'recording.webm',
      segments: null,
      loading: false,
      error: null,
    };
    this.audioBlob = null;       // not needed for rendering -> not in state
    this.mediaRecorder = null;
    this.chunks = [];
    this.fileInputRef = React.createRef();

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.onFileChosen = this.onFileChosen.bind(this);
    this.transcribe = this.transcribe.bind(this);
    this.downloadTranscript = this.downloadTranscript.bind(this);
  }

  componentWillUnmount() {
    if (this.state.audioUrl) URL.revokeObjectURL(this.state.audioUrl);
    if (this.mediaRecorder && this.state.recording) this.mediaRecorder.stop();
  }

  setAudio(blob, name) {
    if (this.state.audioUrl) URL.revokeObjectURL(this.state.audioUrl);
    this.audioBlob = blob;
    this.setState({
      audioUrl: URL.createObjectURL(blob),
      audioName: name,
      segments: null,
      error: null,
    });
  }

  startRecording() {
    this.setState({ error: null });
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mr = new MediaRecorder(stream);
        this.chunks = [];
        mr.ondataavailable = (e) => this.chunks.push(e.data);
        mr.onstop = () => {
          stream.getTracks().forEach((t) => t.stop()); // release mic
          const type = mr.mimeType || 'audio/webm';
          const ext = type.indexOf('mp4') !== -1 ? '.m4a' : '.webm';
          this.setAudio(new Blob(this.chunks, { type }), 'recording' + ext);
        };
        mr.start();
        this.mediaRecorder = mr;
        this.setState({ recording: true });
      })
      .catch(() => this.setState({ error: 'Microphone access was denied.' }));
  }

  stopRecording() {
    if (this.mediaRecorder) this.mediaRecorder.stop();
    this.setState({ recording: false });
  }

  openFilePicker() {
    this.fileInputRef.current.click();
  }

  onFileChosen(e) {
    const file = e.target.files && e.target.files[0];
    if (file) this.setAudio(file, file.name);
    e.target.value = '';
  }

  transcribe() {
    if (!this.audioBlob) {
      this.setState({ error: 'Record or upload audio first.' });
      return;
    }
    this.setState({ loading: true, error: null });

    const form = new FormData();
    form.append('audio', this.audioBlob, this.state.audioName);

    fetch(API_URL + '/asr', { method: 'POST', body: form })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((t) => { throw new Error(t || 'Transcription failed'); });
        }
        return r.json();
      })
      .then((data) => this.setState({ segments: data.segments || [] }))
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ loading: false }));
  }

  getPlainText() {
    return (this.state.segments || [])
      .map((s) => s.text || '')
      .join('')
      .trim();
  }

  downloadTranscript() {
    const blob = new Blob([this.getPlainText() + '\n'], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  render() {
    const {
      recording, audioUrl, audioName, segments, loading, error,
    } = this.state;

    return (
      <div>
        <Button
          color={recording ? 'red' : 'green'}
          onClick={recording ? this.stopRecording : this.startRecording}
          disabled={loading}
        >
          <Icon name={recording ? 'stop' : 'microphone'} />
          {recording ? 'Stop recording' : 'Record'}
        </Button>
        <Button basic disabled={recording || loading} onClick={this.openFilePicker}>
          <Icon name="upload" /> Upload audio
        </Button>
        <input
          ref={this.fileInputRef}
          type="file"
          accept="audio/*"
          style={{ display: 'none' }}
          onChange={this.onFileChosen}
        />

        <AudioWaveform src={audioUrl} label={'Input: ' + audioName} />

        {audioUrl && (
          <Button
            primary
            loading={loading}
            disabled={loading || recording}
            onClick={this.transcribe}
          >
            <Icon name="font" /> Transcribe
          </Button>
        )}

        {error && <Message error content={error} />}

        <ConfidenceTranscript segments={segments} />

        {segments && segments.length > 0 && (
          <Button basic size="small" onClick={this.downloadTranscript}>
            <Icon name="download" /> Download transcript (.txt)
          </Button>
        )}
      </div>
    );
  }
}

export default ASRComponent;
