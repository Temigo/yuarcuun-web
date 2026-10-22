/*
 * ASRComponent.
 * Mic recording or audio file upload -> waveform preview ->
 * POST API_URL/asr -> confidence-colored transcript + downloads.
 *
 */

import React from 'react';
import {
  Button, Segment, Label, Icon, Message, Checkbox, Input, Form,
} from 'semantic-ui-react';
import AudioWaveform from './AudioWaveform';
import { API_URL } from '../../App.js';

const FORMATS = {
  srt: { mime: 'application/x-subrip', ext: 'srt' },
  vtt: { mime: 'text/vtt', ext: 'vtt' },
  txt: { mime: 'text/plain;charset=utf-8', ext: 'txt' },
};

function confidenceColor(p) {
  if (p == null) return '#999999';
  if (p > 0.8) return '#1a7f37'; // high
  if (p > 0.6) return '#9a6700'; // medium
  if (p > 0.4) return '#bc4c00'; // low
  return '#cf222e';              // very low
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function countCues(fmt, s) {
  if (fmt === 'srt') return (s.match(/^\d+$/gm) || []).length;
  if (fmt === 'vtt') return (s.match(/-->/g) || []).length;
  return s.split('\n').filter((l) => l.trim()).length;
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

/* Tabbed preview of whichever subtitle formats the server returned. */
function SubtitlePreview({ outputs, previewFmt, onSelect }) {
  const present = Object.keys(FORMATS).filter((f) => typeof outputs[f] === 'string');
  if (!present.length) return null;
  const fmt = present.indexOf(previewFmt) !== -1 ? previewFmt : present[0];
  return (
    <Segment>
      <Label attached="top">Subtitle output</Label>
      <Button.Group size="mini" style={{ marginBottom: 8 }}>
        {present.map((f) => (
          <Button
            key={f}
            active={f === fmt}
            onClick={() => onSelect(f)}
          >
            {f.toUpperCase()} ({countCues(f, outputs[f])} {f === 'txt' ? 'lines' : 'cues'})
          </Button>
        ))}
      </Button.Group>
      <pre
        style={{
          fontSize: '0.85em', maxHeight: 320, overflow: 'auto',
          whiteSpace: 'pre-wrap', background: '#f6f8fa',
          padding: 8, borderRadius: 4, margin: 0,
        }}
      >
        {outputs[fmt]}
      </pre>
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
      outputs: null,       // full server response (text, segments, srt, vtt, txt)
      previewFmt: 'srt',
      loading: false,
      error: null,
      // Output options
      wantSrt: true,
      wantVtt: false,
      wantTxt: false,
      useMaxLen: false,
      maxLen: 42,
      splitOnWord: true,
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
    this.downloadFormat = this.downloadFormat.bind(this);
    this.toggle = this.toggle.bind(this);
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
      outputs: null,
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

  toggle(key) {
    this.setState((s) => ({ [key]: !s[key] }));
  }

  /* Query string for /asr. Returns '' when no options are set, so the
   * request is identical to the pre-v3 behavior. */
  buildQuery() {
    const {
      wantSrt, wantVtt, wantTxt, useMaxLen, maxLen, splitOnWord,
    } = this.state;
    const formats = ['json'];
    if (wantSrt) formats.push('srt');
    if (wantVtt) formats.push('vtt');
    if (wantTxt) formats.push('txt');

    const q = new URLSearchParams();
    if (formats.length > 1) q.set('formats', formats.join(','));
    if (useMaxLen && parseInt(maxLen, 10) > 0) {
      q.set('max_line_length', String(parseInt(maxLen, 10)));
      q.set('split_on_word', splitOnWord ? 'true' : 'false');
    }
    const s = q.toString();
    return s ? '?' + s : '';
  }

  transcribe() {
    if (!this.audioBlob) {
      this.setState({ error: 'Record or upload audio first.' });
      return;
    }
    this.setState({ loading: true, error: null });

    const form = new FormData();
    form.append('audio', this.audioBlob, this.state.audioName);

    fetch(API_URL + '/asr' + this.buildQuery(), { method: 'POST', body: form })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((t) => { throw new Error(t || 'Transcription failed'); });
        }
        return r.json();
      })
      .then((data) => this.setState({ segments: data.segments || [], outputs: data }))
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ loading: false }));
  }

  getPlainText() {
    return (this.state.segments || [])
      .map((s) => s.text || '')
      .join('')
      .trim();
  }

  baseName() {
    return (this.state.audioName || 'transcript').replace(/\.[^.]+$/, '') || 'transcript';
  }

  /* Legacy button: unwrapped plain transcript, built client-side. */
  downloadTranscript() {
    downloadBlob(this.getPlainText() + '\n', this.baseName() + '.txt', FORMATS.txt.mime);
  }

  downloadFormat(fmt) {
    const content = this.state.outputs && this.state.outputs[fmt];
    if (typeof content !== 'string') return;
    downloadBlob(content, this.baseName() + '.' + FORMATS[fmt].ext, FORMATS[fmt].mime);
  }

  renderOptions() {
    const {
      wantSrt, wantVtt, wantTxt, useMaxLen, maxLen, splitOnWord, loading, recording,
    } = this.state;
    const disabled = loading || recording;
    return (
      <Segment>
        <Label attached="top">Output options</Label>
        <Form size="small">
          <Form.Group inline>
            <label>Subtitle formats</label>
            <Form.Field>
              <Checkbox label="srt" checked={wantSrt} disabled={disabled}
                onChange={() => this.toggle('wantSrt')} />
            </Form.Field>
            <Form.Field>
              <Checkbox label="vtt" checked={wantVtt} disabled={disabled}
                onChange={() => this.toggle('wantVtt')} />
            </Form.Field>
            <Form.Field>
              <Checkbox label="txt" checked={wantTxt} disabled={disabled}
                onChange={() => this.toggle('wantTxt')} />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Form.Field>
              <Checkbox label="Max line length" checked={useMaxLen} disabled={disabled}
                onChange={() => this.toggle('useMaxLen')} />
            </Form.Field>
            <Form.Field>
              <Input
                type="number" min={1} size="mini" style={{ width: 80 }}
                value={maxLen}
                disabled={disabled || !useMaxLen}
                onChange={(e, { value }) => this.setState({ maxLen: value })}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label="Split on word" checked={splitOnWord}
                disabled={disabled || !useMaxLen}
                onChange={() => this.toggle('splitOnWord')} />
            </Form.Field>
          </Form.Group>
        </Form>
        <div style={{ fontSize: '0.8em', color: '#666' }}>
          Wrapping affects only the subtitle outputs; the colored transcript is never changed.
          Request: <code>POST /asr{this.buildQuery()}</code>
        </div>
      </Segment>
    );
  }

  render() {
    const {
      recording, audioUrl, audioName, segments, outputs, previewFmt, loading, error,
    } = this.state;
    const present = outputs
      ? Object.keys(FORMATS).filter((f) => typeof outputs[f] === 'string')
      : [];

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

        {this.renderOptions()}

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

        {outputs && (
          <SubtitlePreview
            outputs={outputs}
            previewFmt={previewFmt}
            onSelect={(f) => this.setState({ previewFmt: f })}
          />
        )}

        {segments && segments.length > 0 && (
          <div>
            <Button basic size="small" onClick={this.downloadTranscript}>
              <Icon name="download" /> Transcript (.txt, unwrapped)
            </Button>
            {present.map((f) => (
              <Button key={f} basic size="small" onClick={() => this.downloadFormat(f)}>
                <Icon name="download" /> .{FORMATS[f].ext}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ASRComponent;
