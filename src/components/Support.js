import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  render() {
    return (
      <Container>
        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>
          <Button primary icon circular onClick={this.props.history.goBack}>
            <Icon name='chevron left' />
          </Button>
          </div>
          <div>
          <Header as='h1'>Ikayungcaraq / Support</Header>
          </div>
          <div style={{width:36}} />
        </div>
        <Divider />

<p> 

Apyutkangqerquvci e-mail-aryugngaavkut uuggun, yuarcuun@gmail.com .

If you have any questions about LKSD apps or would like to share your experiences please send us an e-mail to yuarcuun@gmail.com . If you have any technical issues with the app, please report them to us using the following Google Form link .

LKSD apps are free and available for download on Android devices through the Google Play store, or on iOS (iPhone or iPad) devices through the Apple Store .

Currently our LKSD apps include a library of children's books and language arts curriculum intended for students at the 2nd, 3rd and 4th grade level.

</p>

      </Container>
    );
  }
}
export default About;
