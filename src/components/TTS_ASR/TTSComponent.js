/*
 * TTSComponent.
 * Textarea + optional .txt upload -> POST API_URL/tts -> waveform player.
 */

import React from 'react';
import {
  Button, Form, TextArea, Icon, Message, Header, Divider, Grid, Container, Input
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AudioWaveform from './AudioWaveform';
import { API_URL } from '../../App.js';

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"


class TTSComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      audioUrl: null,
      loading: false,
      error: null,
      passkey:'pissurtuq',
      inputkey:'',
      visible:false,
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

  checkPassword = () => {
    if (this.state.passkey == this.state.inputkey) {
      this.setState({visible:true})
    }
  }


  render() {
    const { text, audioUrl, loading, error } = this.state;
    return (
      <Container style={{ margin: 0, padding: 0 }} text>
        {!this.state.visible ?
          <div style={{textAlign:'center'}}><Input onChange={(data, entry)=>this.setState({inputkey:entry.value})}placeholder='Passkey'/> <Button onClick={()=>this.checkPassword()}>Submit</Button></div>
          :
          <div style={{fontFamily:customFontFam}}>
            <Grid textAlign='center'>
              <Grid.Row  style={{height:40,paddingBottom:0}}>
                <Grid.Column style={{ maxWidth: 800, padding: 0 }} textAlign='left'>
                  <div style={{justifyContent:'space-between',display:'flex'}}>
                    <div>

                    <Link to={{pathname: "/"}}>
                    <Icon circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />
                    </Link>     

                    </div>

                    <div>
                    <Header as='h2'>Yugtun Text-To-Speech</Header>
                    </div>
                    <div style={{width:36}} />
                  </div>
                    <Divider />
                  <Form error={!!error}>
                    <TextArea
                      disabled={loading}
                      value={text}
                      onChange={this.onTextChange}
                      placeholder="Yugtun text"
                      rows={4}
                    />
                    <div style={{ marginTop: 12 }}>
                      <Button primary loading={loading} disabled={loading} onClick={this.synthesize}>
                        <Icon name="sound" /> Synthesize
                      </Button>
                      <Button basic disabled={loading} onClick={this.openFilePicker}>
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
                  <AudioWaveform src={audioUrl} label="Synthesized Speech" />
                  {audioUrl !== null ?
                    <Button basic href={audioUrl} download="yugtun_tts_clip.mp3">
                      Download Audio
                    </Button>
                    :
                    null
                  }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      }
    </Container>
    );
  }
}

export default TTSComponent;
