import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';

class About extends Component {
  render() {
    return (
      <Container>
        <Header as='h1'>About the Yuarcuun Initiative</Header>
        <Divider />

<p> Yuarcuun is a Yup'ik-led group with a mission to revitalize Eskimo/Inuit languages using computer science tools.

Current contributors are Christopher Egalaaq Liu, from Mamterilleq (Bethel, Alaska) and <a href="http://temigo.github.io/">Laura Domine</a>, from Paris.
</p>

<p>We would like to properly cite and express gratitude for grammar material from the following books, "<i>A Practical Grammar of the Central Alaskan Yup'ik Eskimo Language</i>" and the "<i><a href="http://www.uaf.edu/anla/item.xml?id=CY972J2012">Yup'ik Eskimo Dictionary</a></i>" compiled by Steven Jacobson and others.</p>


<p>
The Yuarcuun Initiative received financial sponsorship from the following entities to support the Yugtun dictionary website in 2018 (including future plans to develop a similar online dictionary for Inupiatun):
</p>
<ul>
<li>Bethel Native Corporation</li>
<li>Bering Straits Native Corporation</li>
<li>Donlin Gold</li>
<li>Calista Corporation</li>
<li>Alaska Federation of Natives</li>
<li>Sitnasuak Native Corporation</li>
<li>Alaska Native Heritage Center (Non-profit Sponsor)</li>
</ul>


<p>
In addition, the following entities have contributed financially to support interactive educational Yugtun content (stay tuned):
</p>
<ul>
<li>Lower Kuskokwim School District</li>
<li>Bristol Bay Native Corporation Education Foundation</li>
<li>Bethel Native Corporation (in-kind)</li>
</ul>

<p>Please contact us at yuarcuun @ gmail dot com for questions about our projects or to get involved.</p>

<p> Quyana cakneq! </p>

<i>
<p> A note from Egalaaq </p>
<p> Quyavikanka elitnauristet Ayaprun Elitnaurvigmi, aanaka Maklak, maurluqa Narull'aq, apa'urluqa Upay'aq, alqaqa Cungass'aq, ilanka-llu tamalkuita.
</p>
<p> Una yuarcuun Yugtun qantulinek ciulistengqellruuq. Computer science-aakun maaggun nutarat ayuqunrilngutun elicungcaur ellimaksailan computer-aanun caliapellruapuk. Nutaranek cayarakun yugtun qaneryaramta elitnaurcuutii pilingnaqapuk. Quyana naaqiluten.
</p>
</i>





        <Button primary icon circular onClick={this.props.history.goBack}>
          <Icon name='chevron left' />
        </Button>
      </Container>
    );
  }
}
export default About;
