import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown, Divider, Menu, Accordion, Icon, Card } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';
import { postbases } from './constants.js';

class YupikModifyVerb extends Component {
  constructor(props) {
    super(props);
    console.log("YupikModifyVerb props: ", props);

  }


      render() {
        console.log("YupikModifyVerb state: ", this.state);

        return (
          <div>

            <Grid>
              <Grid.Row>
                <Grid.Column>
                <Card.Group itemsPerRow={3} stackable>
                  <Card>
                    <Button onClick={(event) => this.props.setPostbase(5, event)} toggle active={this.props.currentPostbases.indexOf(5) >= 0}>{postbases[5].description}</Button>
                  </Card>
                  <Card>
                    <Button onClick={(event) => this.props.setPostbase(7, event)} toggle active={this.props.currentPostbases.indexOf(7) >= 0}>{postbases[7].description}</Button>
                  </Card>
                  <Card>
                    <Button onClick={(event) => this.props.setPostbase(25, event)} toggle active={this.props.currentPostbases.indexOf(25) >= 0}>{postbases[25].description}</Button>
                  </Card>
                  <Card>
                    <Button onClick={(event) => this.props.setPostbase(27, event)} toggle active={this.props.currentPostbases.indexOf(27) >= 0}>{postbases[27].description}</Button>
                  </Card>
                </Card.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          <div style={{marginTop: '1em'}}>
          {this.props.advancedMode ?
          <Link to={`${this.props.match.url}/all`}>
          <Button primary fluid attached='bottom' icon >
            <Icon name='plus' />
            More
          </Button>
          </Link>
          :
          <Link to={`${this.props.match.url}/ending`}>
          <Button primary fluid attached='bottom' icon >
            <Icon name='plus' />
            More
          </Button>
          </Link>
          }
          </div>
          </div>
        );
      }
    };


export default YupikModifyVerb;
