import React, { Component } from 'react';
import { Segment, Button, Header, Grid, Container, Dropdown, Divider, Menu, Accordion, Icon, Card } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import { Link } from 'react-router-dom';

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
                    <Button toggle >Common postbase 1</Button>
                  </Card>
                  <Card>
                    <Button toggle >Common postbase 2</Button>
                  </Card>
                  <Card>
                    <Button toggle >Common postbase 3</Button>
                  </Card>
                  <Card>
                    <Button toggle >Common postbase 4</Button>
                  </Card>
                </Card.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          <div>
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
