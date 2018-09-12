import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';

class About extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>About</Header>
        <Divider />
        <p>Credits go here.</p>
        <Button primary icon circular onClick={this.props.history.goBack}>
          <Icon name='chevron left' />
        </Button>
      </Container>
    );
  }
}
export default About;
