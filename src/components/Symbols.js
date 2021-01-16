import React, { Component } from 'react';
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react';
import '../semantic/dist/semantic.min.css';

class Symbols extends Component {
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
          <Header as='h1'>Caugat symbol-aat?</Header>
          </div>
          <div style={{width:36}} />
        </div>
        <Divider />
<p> <i>What are these symbols? Well they are a list of symbols .... From Yup'ik Eskimo Dictionary Second Edition Vol. 2 of 2 </i> </p>

<p>
The suffixation symbols are as follows:
+ indicates that the suffix keeps final consonants of bases (and if the base does not end in a consonant, the postbase merely affixes to the base without changing it).
– indicates that the suffix drops final consonants from bases.
~ indicates that the suffix drops final e from bases.
% indicates that the suffix keeps “strong” final consonants (every g, and any r that is preceded by e or that ends a base of the form CVVr- or that is marked with an asterisk), drops “weak” final consonants.
730
Postbases
: indicates that the suffix drops voiced velar continuants (fricatives and nasals, g, r, or ng) if they occur between single vowels of which at least the first is full.
’ indicates that the suffix causes gemination of the final consonant of a base of the form (C)VCe-. . indicates that the suffix is affixed with no change to either base or suffix at the juncture.
@ indicates that with te ending bases, after the final e has been dropped (all @ type postbases are also ~ type), the suffix affects the t of the base in some way, depending on whether the te is preceded by a consonant or vowel, and if preceded by a vowel, whether the te is “special”,1 and also on how the postbase itself begins.
If a @ type suffix begins with n, then base final t drops only when preceded by a fricative, which is then devoiced (as is the n, automatically), or by a nasal or stop and then the n is devoiced. Thus, affixing the postbase @~+ni- ‘to say that one is V-ing’ to kipute- ‘to purchase’, ce÷irte- ‘to visit’, nangte- ‘to torment’, and apte- ‘to ask’ yields kiputnia ‘he says that she is purchasing’, ce÷irrnia ‘he says that she is visiting’, nangn ́gnia ‘he says that she is being tormented’, and apnia ‘he says that she asked’.2
If a @ type postbase begins with ng, m, or v, then base final t preceded vowel and is the t of a nonspecial te changes to s (y in HBC and EG), but if it is of a “special” te, it changes to l. If preceded by a fricative, the t is dropped and the fricative is devoiced (as is the ng, m, or v), if by a nasal or stop the t is dropped and the ng, m, or v devoiced. Thus affixing the postbase @~+ngaite- ‘ to not be going to V’ to kipute- ‘to purchase’, maan(e)te- ‘to be here’ (special te), ce÷irte- ‘to visit’, and nangte- ‘to torment’, gives kipusngaituq (kipuyngaituq for HBC and EG) ‘he won’t purchase’, maanelngaituq ‘he won’t be here’, ce÷irrngaituq ‘he won’t visit’, nangn ́gaitaa ‘he won’t torment him’, and apngaituq ‘he won’t ask’.3
If a @ type postbase begins with y, then a resulting ty (hence ts) becomes c. Affixing the postbase @~+yug- ‘to want to V’ to kipute- ‘to buy’ gives *kiputyugaa (hence *kiputsugaa) hence kipucugaa ‘he wants to buy it’.
If a @ type postbase begins with (u) and if base final t is preceded by a vowel of a nonspecial te, then that t changes to y (to s if geminated on “short” base except in HBC and EG), but if is of a “special” te, to l. If preceded by a fricative, the t is dropped and the fricative remains voiced. If the t is preceded by a nasal or stop, it is treated as though it had e preceding it. Thus, affixing the postbase @~:(u)ciq ‘whether/how one is V’ to kipute- ‘to purchase’, kit’e- ‘to sink’, maan(e)te- ‘to be here’, ce÷irte- ‘to visit’, nangte- ‘to abuse’, and apte- ‘to ask’ gives kipuyucianek ‘whether he is purchasing’, kis’ucianek (kiy’ucianeng for HBC), maanelucianek, or more commonly, maanlucianek ‘whether he is here’, ce÷irucianek ‘whether he is visiting’, nangyucianek ‘whether he is being tormented’, and apyucianek ‘whether he is asking’.
If a @ type postbase begins with y, then any base final t combines with the y to yield c. Thus, affixing the postbase @~+yug- ‘to want to V’, to kipute-, kit’e-, maan(e)te-, ce÷irte-, nangte-, and apte-, yields kipucugtuq ‘he want to purchase’, kic’ugtuq, maancugtuq, ce÷ircugtuq, nangcugtuq, and apcugtuq.
Some patterns with @ apply only to endings (derivational suffixes).
1 See General Introduction concerning “special” te.
2 lternatively the last bases can be treated as being nangete- and apete-, yieldng nangetnia and apetnia, and similarly for
others like them.
3 Alternatively the last bases can be treated as being nangete- and apete-, yielding nangesngaitaa and apesngaitaa, and similarly for other like them.
 731

Postbases
If a @ type ending begins with l, then any base-final t combines with l to yield ll. Thus, affixing the ending @~+luk ‘let’s2 V’ to the above set of sample bases yields kipulluk ‘let’s2 purchase’; kill’uk; maanlluk; *ce÷irlluk, which, in accordance with the orthographical rules, is respelled ce÷irrluk; nanglluk; and *aplluk, which is respelled apluk.
If a @ type ending begins with g, k, or ng, then any base-final t except one that is “special” changes to s (to y in HBC and EG), inserting e before the s to prevent a three-consonant cluster if necessary. Thus, affixing the ending @~+ki ‘(you1) V them’ to kipute-, ce÷irte-, nangte-, and apte- yields kipuski ‘buy them’, ce÷ireski ‘visit them’, nangeski ‘torment them’, and apeski ‘ask them’. When affixing such endings where there is a base-final “special” t, that t changes to l. Thus, with nerenrite- ‘to not eat’, where te is special being from a negative postbase, the result is nerenrilki ‘don’t eat them’.
Postbases and endings marked with @ that affect t in ways other than those listed above are described at the entry for each such postbase.
A long dash, ––, indicates that the base drops both the final consonant and the vowel preceding it. This applies only to shortened forms of consonant-dropping postbases beginning with li. For example, –i- ‘to make’ and angyaq ‘boat’ yields angyi- ‘to make a boat’.
An initial question mark, ?, indicates that the postbase affixes in an irregular way. This applies only to certain nonproductive postbases.
Some suffixes have initial q, k, r, g, rr, or gg. With these and with a base ending in the opposite type of velar (i.e., back as opposed to front, and conversely) the opposite type of velar to that underlined is used. Thus, given the postbase -qatar- ‘to be about to V’, when added to bases ending in a vowel or r, this postbase takes the form -qatar-, but when added to bases ending in g, it takes the form -katar-. Thus, from cali- ‘to work’, qavar- ‘to sleep’, and ayag- ‘to go’ arise caliqatartuq ‘he is about to work’, qavaqatartuq ‘he is about to sleep’, but ayakatartuq ‘he is about to go’. In the rare case in which a suffix has such an initial letter but does not change in this way, this fact is noted in words.
Another process that applies in almost all cases where certain conditions hold and therefore is not specifically noted as such (but is noted in words when it does not happen) is the dropping of a “semi- final” e (e followed by base-final g or r) by a suffix that begins with a vowel in the form which it is used on the base with the semi-final e. For example, when the ending %:(ng)it ‘their Ns’ is used with consonant- ending bases, it takes the form it. When used with bases of words such as yaqulek ‘bird’ and egaleq ‘window’, which have semi-final e, that e is dropped, yielding yaqulgit ‘their birds’ and egalrit ‘their windows’.
The letters in parentheses at the beginnings of postbases are generally used as follows: (g) is used with bases ending in two vowels.
(i) is used with bases ending in te.
(ng) is used with bases ending in a vowel.
(r) is used with bases ending in te, and by some speakers in e not preceded by t.
(s) is used with bases ending in a vowel.
(t) is used with bases ending in a consonant.
(u) is used with bases ending in a consonant or e.
732

Postbases
The use of letters in parentheses in ways not conforming to these patterns is described under the relevant postbase entries.
Such symbols as * following a postbase, and (ar) at the end of a postbase or followed by te at the end of a postbase, are explained in the General Introduction, as is the convention for treating an entry that is both nominal and verbal. In addition, the General Introduction addresses the use of the dialect abbreviations NSU, NSK, NS, Y, HBC, NUN, NI, CAN, K, BB, NR, UK, EG, and LI.

</p>


      </Container>
    );
  }
}
export default Symbols;
