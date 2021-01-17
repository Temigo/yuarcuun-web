import React, { Component } from 'react';
import { Container, Header, Accordion, Button, Icon, Divider } from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';

class Symbols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      activeIndex: 0,
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <Container>
        <div style={{justifyContent:'space-between',display:'flex'}}>
          <div>
          <Button primary icon circular onClick={this.props.history.goBack}>
            <Icon name='chevron left' />
          </Button>
          </div>
          <div>
          <Header as='h1'>Caugat symbol-aat?</Header>
          </div>
          <div style={{width:36}} />
        </div>
        <Divider />
<p><em>What are these symbols? Well they are a list of symbols .... From Yup&#39;ik Eskimo Dictionary Second Edition Vol. 2 of 2 </em></p>

<p>The suffixation symbols are as follows:</p>

<Accordion>
  <Accordion.Title
    active={activeIndex === 0}
    index={0}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    + (plus)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 0}>
  <p>+ indicates that the suffix keeps final consonants of bases (and if the base does not end in a consonant, the postbase merely affixes to the base without changing it).</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 1}
    index={1}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    &ndash; (minus)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 1}>
  <p>&ndash; indicates that the suffix drops final consonants from bases.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 2}
    index={2}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    ~ (tilde)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 2}>
  <p>~ indicates that the suffix drops final e from bases.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 3}
    index={3}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    % (percent)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 3}>
<p>% indicates that the suffix keeps &ldquo;strong&rdquo; final consonants (every g, and any r that is preceded by e or that ends a base of the form CVVr- or that is marked with an asterisk), drops &ldquo;weak&rdquo; final consonants. 730 Postbases</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 4}
    index={4}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    : (colon)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 4}>
<p>: indicates that the suffix drops voiced velar continuants (fricatives and nasals, g, r, or ng) if they occur between single vowels of which at least the first is full.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 5}
    index={5}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    &rsquo; (apostrophe)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 5}>
<p>&rsquo; indicates that the suffix causes gemination of the final consonant of a base of the form (C)VCe-.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 6}
    index={6}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    . (period)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 6}>
<p>. indicates that the suffix is affixed with no change to either base or suffix at the juncture.</p>
  </Accordion.Content>

  
  <Accordion.Title
    active={activeIndex === 7}
    index={7}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    @ (at-sign)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 7}>
<p>@ indicates that with te ending bases, after the final e has been dropped (all @ type postbases are also ~ type), the suffix affects the t of the base in some way, depending on whether the te is preceded by a consonant or vowel, and if preceded by a vowel, whether the te is &ldquo;special&rdquo;,1 and also on how the postbase itself begins. (See General Introduction concerning &ldquo;special&rdquo; te.)</p>

<p>If a @ type suffix begins with n, then base final t drops only when preceded by a fricative, which is then devoiced (as is the n, automatically), or by a nasal or stop and then the n is devoiced. Thus, affixing the postbase @~+ni- &lsquo;to say that one is V-ing&rsquo; to kipute- &lsquo;to purchase&rsquo;, ce&divide;irte- &lsquo;to visit&rsquo;, nangte- &lsquo;to torment&rsquo;, and apte- &lsquo;to ask&rsquo; yields kiputnia &lsquo;he says that she is purchasing&rsquo;, ce&divide;irrnia &lsquo;he says that she is visiting&rsquo;, nangn ́gnia &lsquo;he says that she is being tormented&rsquo;, and apnia &lsquo;he says that she asked&rsquo;. (Alternatively the last bases can be treated as being nangete- and apete-, yieldng nangetnia and apetnia, and similarly for others like them.)</p>

<p>If a @ type postbase begins with ng, m, or v, then base final t preceded vowel and is the t of a nonspecial te changes to s (y in HBC and EG), but if it is of a &ldquo;special&rdquo; te, it changes to l. If preceded by a fricative, the t is dropped and the fricative is devoiced (as is the ng, m, or v), if by a nasal or stop the t is dropped and the ng, m, or v devoiced. Thus affixing the postbase @~+ngaite- &lsquo; to not be going to V&rsquo; to kipute- &lsquo;to purchase&rsquo;, maan(e)te- &lsquo;to be here&rsquo; (special te), ce&divide;irte- &lsquo;to visit&rsquo;, and nangte- &lsquo;to torment&rsquo;, gives kipusngaituq (kipuyngaituq for HBC and EG) &lsquo;he won&rsquo;t purchase&rsquo;, maanelngaituq &lsquo;he won&rsquo;t be here&rsquo;, ce&divide;irrngaituq &lsquo;he won&rsquo;t visit&rsquo;, nangn ́gaitaa &lsquo;he won&rsquo;t torment him&rsquo;, and apngaituq &lsquo;he won&rsquo;t ask&rsquo;. (Alternatively the last bases can be treated as being nangete- and apete-, yielding nangesngaitaa and apesngaitaa, and similarly for other like them.)</p>

<p>If a @ type postbase begins with y, then a resulting ty (hence ts) becomes c. Affixing the postbase @~+yug- &lsquo;to want to V&rsquo; to kipute- &lsquo;to buy&rsquo; gives *kiputyugaa (hence *kiputsugaa) hence kipucugaa &lsquo;he wants to buy it&rsquo;.</p>

<p>If a @ type postbase begins with (u) and if base final t is preceded by a vowel of a nonspecial te, then that t changes to y (to s if geminated on &ldquo;short&rdquo; base except in HBC and EG), but if is of a &ldquo;special&rdquo; te, to l. If preceded by a fricative, the t is dropped and the fricative remains voiced. If the t is preceded by a nasal or stop, it is treated as though it had e preceding it. Thus, affixing the postbase @~:(u)ciq &lsquo;whether/how one is V&rsquo; to kipute- &lsquo;to purchase&rsquo;, kit&rsquo;e- &lsquo;to sink&rsquo;, maan(e)te- &lsquo;to be here&rsquo;, ce&divide;irte- &lsquo;to visit&rsquo;, nangte- &lsquo;to abuse&rsquo;, and apte- &lsquo;to ask&rsquo; gives kipuyucianek &lsquo;whether he is purchasing&rsquo;, kis&rsquo;ucianek (kiy&rsquo;ucianeng for HBC), maanelucianek, or more commonly, maanlucianek &lsquo;whether he is here&rsquo;, ce&divide;irucianek &lsquo;whether he is visiting&rsquo;, nangyucianek &lsquo;whether he is being tormented&rsquo;, and apyucianek &lsquo;whether he is asking&rsquo;.</p>

<p>If a @ type postbase begins with y, then any base final t combines with the y to yield c. Thus, affixing the postbase @~+yug- &lsquo;to want to V&rsquo;, to kipute-, kit&rsquo;e-, maan(e)te-, ce&divide;irte-, nangte-, and apte-, yields kipucugtuq &lsquo;he want to purchase&rsquo;, kic&rsquo;ugtuq, maancugtuq, ce&divide;ircugtuq, nangcugtuq, and apcugtuq.</p>

<p>Some patterns with @ apply only to endings (derivational suffixes).</p>

<p>If a @ type ending begins with l, then any base-final t combines with l to yield ll. Thus, affixing the ending @~+luk &lsquo;let&rsquo;s2 V&rsquo; to the above set of sample bases yields kipulluk &lsquo;let&rsquo;s2 purchase&rsquo;; kill&rsquo;uk; maanlluk; *ce&divide;irlluk, which, in accordance with the orthographical rules, is respelled ce&divide;irrluk; nanglluk; and *aplluk, which is respelled apluk.</p>

<p>If a @ type ending begins with g, k, or ng, then any base-final t except one that is &ldquo;special&rdquo; changes to s (to y in HBC and EG), inserting e before the s to prevent a three-consonant cluster if necessary. Thus, affixing the ending @~+ki &lsquo;(you1) V them&rsquo; to kipute-, ce&divide;irte-, nangte-, and apte- yields kipuski &lsquo;buy them&rsquo;, ce&divide;ireski &lsquo;visit them&rsquo;, nangeski &lsquo;torment them&rsquo;, and apeski &lsquo;ask them&rsquo;. When affixing such endings where there is a base-final &ldquo;special&rdquo; t, that t changes to l. Thus, with nerenrite- &lsquo;to not eat&rsquo;, where te is special being from a negative postbase, the result is nerenrilki &lsquo;don&rsquo;t eat them&rsquo;.</p>

<p>Postbases and endings marked with @ that affect t in ways other than those listed above are described at the entry for each such postbase.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 8}
    index={8}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    &ndash;&ndash; (double minus)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 8}>
<p>A long dash, &ndash;&ndash;, indicates that the base drops both the final consonant and the vowel preceding it. This applies only to shortened forms of consonant-dropping postbases beginning with li. For example, &ndash;i- &lsquo;to make&rsquo; and angyaq &lsquo;boat&rsquo; yields angyi- &lsquo;to make a boat&rsquo;.</p>
  </Accordion.Content>



  <Accordion.Title
    active={activeIndex === 9}
    index={9}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    ? (question mark)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 9}>
<p>An initial question mark, ?, indicates that the postbase affixes in an irregular way. This applies only to certain nonproductive postbases.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 10}
    index={10}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    q̲, k̲, r̲, g̲, r̲r̲, or g̲g̲ (velar underlined)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 10}>
<p>Some suffixes have initial q, k, r, g, rr, or gg. With these and with a base ending in the opposite type of velar (i.e., back as opposed to front, and conversely) the opposite type of velar to that underlined is used. Thus, given the postbase -qatar- &lsquo;to be about to V&rsquo;, when added to bases ending in a vowel or r, this postbase takes the form -qatar-, but when added to bases ending in g, it takes the form -katar-. Thus, from cali- &lsquo;to work&rsquo;, qavar- &lsquo;to sleep&rsquo;, and ayag- &lsquo;to go&rsquo; arise caliqatartuq &lsquo;he is about to work&rsquo;, qavaqatartuq &lsquo;he is about to sleep&rsquo;, but ayakatartuq &lsquo;he is about to go&rsquo;. In the rare case in which a suffix has such an initial letter but does not change in this way, this fact is noted in words. Another process that applies in almost all cases where certain conditions hold and therefore is not specifically noted as such (but is noted in words when it does not happen) is the dropping of a &ldquo;semi- final&rdquo; e (e followed by base-final g or r) by a suffix that begins with a vowel in the form which it is used on the base with the semi-final e. For example, when the ending %:(ng)it &lsquo;their Ns&rsquo; is used with consonant- ending bases, it takes the form it. When used with bases of words such as yaqulek &lsquo;bird&rsquo; and egaleq &lsquo;window&rsquo;, which have semi-final e, that e is dropped, yielding yaqulgit &lsquo;their birds&rsquo; and egalrit &lsquo;their windows&rsquo;.</p>
  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 11}
    index={11}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    (g), (ng), (r), (s), (t), or (u) (parentheses)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 11}>
<p>The letters in parentheses at the beginnings of postbases are generally used as follows:</p>

<p>(g) is used with bases ending in two vowels. (i) is used with bases ending in te.</p>

<p>(ng) is used with bases ending in a vowel.</p>

<p>(r) is used with bases ending in te, and by some speakers in e not preceded by t.</p>

<p>(s) is used with bases ending in a vowel.</p>

<p>(t) is used with bases ending in a consonant.</p>

<p>(u) is used with bases ending in a consonant or e.&nbsp;</p>

<p>The use of letters in parentheses in ways not conforming to these patterns is described under the relevant postbase entries.</p>  </Accordion.Content>


  <Accordion.Title
    active={activeIndex === 12}
    index={12}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    * (asterisk)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 12}>
<p>* is used after q on a noun to indicate that the base for that noun ends in an (unpredictably) strong r, that is, in an r that is retained before so-called half-retaining endings (marked with %).18 Thus, the word maurluq* ‘grandmother’ has an asterisk indicating that when the half-retaining ending %mi is added to it, the result is maurlurmi ‘at grandmother’s’. On the other hand, angyaq has no asterisk because the final r of its base is weak, so that when %mi is added, the result is angyami ‘in the boat’ with the r of the base dropped. Nouns ending in eq or k have no asterisks because all such nouns have a (predictably) strong final consonant on the base. Thus, even though qaneq ‘mouth’ and kanaqlak ‘muskrat’ do not have asterisks, one knows that the results of adding %mi are qanermi ‘in the mouth’ and kanaqlagmi ‘on the muskrat’. It should be understood that most of the words marked with asterisks are treated by some speakers as if they ended in weak rather than strong consonants. There is a great deal of individual variation in such words, but if a significant number of speakers treat the final consonant of a word as strong, we have marked it with an asterisk. </p>
</Accordion.Content>


  <Accordion.Title
    active={activeIndex === 13}
    index={13}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    (aq*) and (ar) (ar-dropping)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 13}>
  <p>(aq*) or (ar)- indicates that this segment of the word or base is deleted if it occurs at the end of the word, or before a consonant-retaining suffix that starts with a consonant.19 Thus, the cited form qimugkauyar(aq*) ‘puppy’ will be realized in most dialect areas as qimugkauyar ‘a puppy’ with the final aq dropped and r not changed to q, and the underlying ar (equal to aq) dropped in such forms as qimugkauyartangqertuq ‘there are puppies’, from underlying qimugkauyarartangqertuq. However, the a of that aq will appear in such forms as qimugkauyaranguq ‘he got a puppy’, where the suffix added is not a consonant-retaining suffix that starts with a consonant.</p>
  </Accordion.Content>

  <Accordion.Title
    active={activeIndex === 14}
    index={14}
    onClick={this.handleClick}
  >
    <Icon name='dropdown' />
    [e] (weak initial e)
  </Accordion.Title>
  <Accordion.Content active={activeIndex === 14}>
  <p>Weak initial e: Some bases have an initial e that drops in some or all forms of the word. This is what Practical Grammar of ... Yup’ik calls ‘weak initial e’.48 A weak initial e should not be written in a form in which it is not heard lest a misrepresentation of the pronunciation of the word be given. For example, the word for ‘house’ has a weak initial e, which is dropped in such forms as nerpak, i.e., [nerpak] ‘big house’, and nen’i, i.e., [nen:i] ‘his own house’, which contrast with enerpak, i.e., [enerpak] ‘big bone’, and eneni, i.e., [enen:i] ‘his own bone’, from a base where the initial e is not weak.49 We know that the base for ‘house’ does have an initial e, albeit a weak initial e, because this e is preserved in forms of the word where the following consonant is in turn followed by a prime vowel, such as ena, i.e., [ena] ‘a house’, and enii, i.e., [en:i:] ‘his (another’s) house’. The case of a word that has dropped a weak initial e differs from the case of a word that has an inaudible initial e that must still be written. Compare the discussion above of weak initial e in the word for ‘house’ with the earlier discussion of the initial e of the base emute- ‘to seek medical aid’; in words based on emute-, the initial e, though inaudible, must be written for the sake of rhythmic length in the word. Weak initial e occurs on some bases that have e as their second vowel. For some bases that have a weak initial e in General Central Yup’ik (abbreviated GCY henceforth), HBC has an initial e that is not weak. In NUN, no initial e is weak.</p>
  </Accordion.Content>

</Accordion>

</Container>

    );
  }
}
export default Symbols;
