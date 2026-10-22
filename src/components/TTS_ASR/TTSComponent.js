/*
 * TTSComponent.
 * Textarea + optional .txt upload -> POST API_URL/tts -> waveform player.
 */

import React from 'react';
import {
  Button, Form, TextArea, Icon, Message,
} from 'semantic-ui-react';
import AudioWaveform from './AudioWaveform';
import { API_URL } from '../../App.js';

class TTSComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      audioUrl: null,
      loading: false,
      error: null,
    };
    this.fileInputRef = React.createRef();

    this.onTextChange = this.onTextChange.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.loadTextFile = this.loadTextFile.bind(this);
    this.synthesize = this.synthesize.bind(this);
  }

  componentWillUnmount() {
    if (this.state.audioUrl) URL.revokeObjectURL(this.state.audioUrl);
  }

  onTextChange(e, data) {
    this.setState({ text: data.value });
  }

  openFilePicker() {
    this.fileInputRef.current.click();
  }

  loadTextFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.setState({ text: String(reader.result) });
    reader.onerror = () => this.setState({ error: 'Could not read the text file.' });
    reader.readAsText(file, 'utf-8');
    e.target.value = ''; // allow re-selecting the same file
  }

  synthesize() {
    const trimmed = this.state.text.trim();
    if (!trimmed) {
      this.setState({ error: 'Enter some text first.' });
      return;
    }
    this.setState({ loading: true, error: null });

    fetch(API_URL + '/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed }),
    })
      .then((r) => {
        if (!r.ok) {
          return r.text().then((t) => { throw new Error(t || 'Synthesis failed'); });
        }
        return r.blob();
      })
      .then((blob) => {
        if (this.state.audioUrl) URL.revokeObjectURL(this.state.audioUrl);
        this.setState({ audioUrl: URL.createObjectURL(blob) });
      })
      .catch((err) => this.setState({ error: err.message }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { text, audioUrl, loading, error } = this.state;
    return (
      <div>
        <Form error={!!error}>
          <TextArea
            value={text}
            onChange={this.onTextChange}
            placeholder="Yugtun text"
            rows={4}
          />
          <div style={{ marginTop: 12 }}>
            <Button primary loading={loading} disabled={loading} onClick={this.synthesize}>
              <Icon name="sound" /> Synthesize
            </Button>
            <Button basic onClick={this.openFilePicker}>
              <Icon name="file text" /> Load .txt file
            </Button>
            <input
              ref={this.fileInputRef}
              type="file"
              accept=".txt,text/plain"
              style={{ display: 'none' }}
              onChange={this.loadTextFile}
            />
          </div>
          {error && <Message error content={error} />}
        </Form>
        <AudioWaveform src={audioUrl} label="Synthesized speech" />
      </div>
    );
  }
}

export default TTSComponent;
