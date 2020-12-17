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
        <Header as='h1'>About Us</Header>
        <Divider />

<p> <i>Quyana tailuci!</i> </p>

<p>
<i> Una yuarcuun website-aq computer science-aakun caliaqellruaput. Wangkuk Egalaaq Alaskuk-llu anglillruukuk Qusquqviim nuniini. Una caliaput piurtesciigacartuq ikayuqsaitellrukatkut amlleret yuut. Quyavikaput elitnauristeput, Yugtun igatulit, ilaput-llu tamalkuita.</i>
</p>

<p>
We are proud to be a team of Yup'ik developers. Current contributors are Christopher Egalaaq Liu, from Mamterilleq (Bethel, Alaska), <a href="http://temigo.github.io/">Laura Domine</a> from Paris, and Lonny Alaskuk Strunk from Kuinerraq (Quinhagak, Alaska).
</p>

<p>We would like to properly cite and express gratitude for grammar material from the following books, "<i>A Practical Grammar of the Central Alaskan Yup'ik Eskimo Language</i>" and the "<i><a href="http://www.uaf.edu/anla/item.xml?id=CY972J2012">Yup'ik Eskimo Dictionary</a></i>" compiled by Steve Jacobson, Anna Jacobson, and others. Their work made all of this possible. <i> Quyavikamceci. </i></p>

<p>
{'The first release of this website (Oct 2018) was supported through the Yuarcuun Initiative and received financial sponsorship. At that time, the initiative was financially supported by the\xa0'}
<span style={{textDecoration:'underline'}} onClick={()=>{this.setState({show:!this.state.show})}}>{'following entities'}</span>.
</p>
{this.state.show ?
<ul>
<li>Bethel Native Corporation</li>
<li>Bering Straits Native Corporation</li>
<li>Donlin Gold</li>
<li>Calista Corporation</li>
<li>Alaska Federation of Natives</li>
<li>Alaska Native Heritage Center (Non-profit Sponsor)</li>
</ul>
:
null
}

<p>For this new update (Dec 2020), we integrated a <a href="https://digital.lib.washington.edu/researchworks/bitstream/handle/1773/46496/Strunk_washington_0250O_22260.pdf?sequence=1&isAllowed=y">Yugtun morphological parser</a> created by Lonny Alaskuk Strunk. Please contact us at yuarcuun @ gmail dot com for questions about our projects or to discuss any new projects.</p>

<p> <i> Quyana cakneq! </i> </p>






        <Button primary icon circular onClick={this.props.history.goBack}>
          <Icon name='chevron left' />
        </Button>
      </Container>
    );
  }
}
export default About;
