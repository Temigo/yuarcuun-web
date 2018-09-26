import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';

class About extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>About the Yuarcuun Initiative</Header>
        <Divider />
        
Waqaa!
<p> quyavikanka elitnauristet ayaprun elitnaurvigmi, aanaka maklak, maurluqa narull’aq, apa’urluqa upay’aq, alqaqa cungass’aq, ilanka-llu tamalkuita. 
</p>
<p> una yuarcuun yugtun qantulinek ciulistengqellruuq. computer science-aakun maaggun nutarat 
</p>
<p> ayuqunrilngutun elicungcaur ellimaksailan computer-aanun caliapellruapuk 
</p>
<p> nutaranek cayarakun yugtun qaneryaramta elitnaurcuutii pilingnaqapuk. wiinga egalaaruunga, mamterillermiunguunga, yugnikekngaqa-llu laura, france-amiunguuq, wangkuk pilillruapuk una yuarcuun.
</p>

<p> Yuarcuun is a Yup'ik-led group with a mission to revitalize Eskimo/Inuit languages using computer science tools. 

Current contributors are Christopher Egalaaq Liu, from Mamterilleq (Bethel, Alaska) and <a href="http://temigo.github.io/">Laura Domine</a>, from Paris.
</p>

<p>We would like to properly cite and express gratitude for grammar material from the following books, "<i>A Practical Grammar of the Central Alaskan Yup'ik Eskimo Language</i>" and the "<i><a href="http://www.uaf.edu/anla/item.xml?id=CY972J2012">Yup'ik Eskimo Dictionary</a></i>" compiled by Steven Jacobson and others.</p>


<p>
The Yuarcuun Initiative has received financial sponsorship to support a couple of ongoing projects. At the time this dictionary was implemented, the initiative was financially supported by the following entities:
</p>
<ul>
<li>Bethel Native Corporation</li>
<li>Bering Straits Native Corporation</li>
<li>Alaska Federation of Natives</li>
<li>Donlin Gold</li>
<li>Alaska Native Heritage Center (Non-profit Sponsor)</li>
</ul>

<p>Yuarcuun has many on-going plans over the next year. Please contact us at contact@yugtun.com for questions about our projects or to be involved with any new projects on Eskimo/Inuit/Aleut languages.</p>

<p> Quyana cakneq! </p>





        <Button primary icon circular onClick={this.props.history.goBack}>
          <Icon name='chevron left' />
        </Button>
      </Container>
    );
  }
}
export default About;
