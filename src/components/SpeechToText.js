import React, { Component } from 'react';
import { Container, Header, Accordion, Button, Icon, Divider, Grid, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../semantic/dist/semantic.min.css';
import Dropzone from 'react-dropzone';

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"

const styles = {
  dropzoneBox: {
    border: '2px dashed #0087F7',
    borderRadius: '5px',
    padding: '30px',
    textAlign: 'center',
    background: '#f9f9f9',
    cursor: 'pointer',
  }
};


class Symbols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
      // activeIndex: -1,
      files: [],
      serverBusy: true,
      submittingAudio: false,
      submittedAudioWithEmail: false,
      filesSubmittable: false,
    }
  }

  // handleClick = (e, titleProps) => {
  //   const { index } = titleProps
  //   const { activeIndex } = this.state
  //   const newIndex = activeIndex === index ? -1 : index
  //   this.setState({ activeIndex: newIndex })
  // }

  handleOnDrop = (acceptedFiles) => {
    let filesAccepted = true
    if (filesAccepted) {
      this.setState({ files: acceptedFiles, filesSubmittable: true });
      console.log('Uploaded files:', acceptedFiles);
    }
  };

  submitAudio = () => {
    this.setState({submittedAudio:true})
  }

  submitAudioWithEmail = () => {
    this.setState({submittedAudioWithEmail:true})
  }

  render() {
    // const { activeIndex } = this.state
    return (

      <Container style={{ margin: 0, padding: 0 }} text>

        <div style={{fontFamily:customFontFam}}>

          <Grid textAlign='center'>
            <Grid.Row  style={{height:40,paddingBottom:0}}>
              <Grid.Column style={{ maxWidth: 800, padding: 0 }} textAlign='left'>

                <Link to={{pathname: "/"}}>
                <Icon circular style={{margin:0,marginLeft:5,color:'#B1B1B1',cursor:'pointer',fontSize:'22px'}} name='chevron left' />
                </Link>     

                  <div style={{border:'1px solid #E3E3E3',marginTop:'20px'}}>

                    <div className='hierarchymain'>
                    <span className='span1'>Upload Yugtun Audio</span>
                    </div>

                  </div>

                <Dropzone onDrop={this.handleOnDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <section className="container">
                      {/* Bind the root dropzone event handlers */}
                      <div {...getRootProps({ className: 'dropzone' })} style={styles.dropzoneBox}>
                        {/* Bind hidden native file selection inputs */}
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>Drag 'n' drop files here, or click to select files</p>
                        )}
                      </div>
                      
                      {/* Displaying file details */}
                      <aside>
                        <h4>Files</h4>
                        <ul>
                          {this.state.files.map((file) => (
                            <li key={file.path || file.name}>
                              {file.name} - {file.size} bytes
                            </li>
                          ))}
                        </ul>
                      </aside>
                    </section>
                  )}
                </Dropzone>


                {this.state.filesSubmittable ?
                  (!this.state.serverBusy ?
                    <div>
                      <Button primary disabled={this.state.submittedAudio} onClick={()=>{this.submitAudio()}}>{'Submit Audio'}</Button>
                    </div>
                    :
                    <div>
                      <div style={{marginTop:'20px'}}>{'The server is busy processing several recordings, please include your email here and the transcript will be emailed to you.'}</div>
                      <div style={{margin:'20px 0px'}}><Input disabled={this.state.submittedAudioWithEmail} placeholder='example@domain.com' /></div>
                      <Button primary disabled={this.state.submittedAudioWithEmail} onClick={()=>{this.submitAudioWithEmail()}}>{'Submit Audio'}</Button>
                    </div>
                  )
                  :
                  <Button disabled>{'Submit Audio'}</Button>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>

    );
  }
}
export default Symbols;
