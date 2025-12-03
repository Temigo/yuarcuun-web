import React, { Component } from 'react';
import '../App.css';
import '../semantic/dist/semantic.min.css';
import { Container, Dropdown, Icon, Button, Divider, Segment, Dimmer, Loader, Modal, ModalContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App.js';
import YupikEntry from './YupikEntry.js';
import Recorder from './Recorder.js';
import {withRouter} from 'react-router';
import StickyMenu from './common/StickyMenu.js';
import {nounOptionsMVPossessors,colorsList, mvSubject4thPersonCalls, mvObject4thPersonCalls,nObject4thPersonCalls, nounOptionsMVPossessorsThe, mvSubjectOptionsWho, mvSubjectOptionsWhat, mvObjectOptionsWhom, mvObjectOptionsWhomAbl, mvObjectOptionsWhat, mvObjectOptionsWhatAbl,retrieveMoodEnglish, nounOptionsPossessorsNo4th, mvSubjectOptionsOnly2nd, nounOptionsNumbers, nounoptionsmodalis, mvSubjectOptions, mvObjectOptions, mvSubjectOptionsEnglish, verbPostbases, nounPostbases, VVpostbases, NNpostbases} from './constants/newconstants.js'

let customFontFam = "Roboto,'Helvetica Neue',Arial,Helvetica,sans-serif"
const options = [
  { key: 1, text: 'it', value: 1 },
  { key: 2, text: 'you', value: 2 },
]

let peopleDict = {
  '1':"Sg",
  '2':"Du",
  '3':"Pl",
}


let vOptions = [
  'vBase',
  'nsBases',
  'noBases',
  'no',
  'ns',
  'vMood',
  'vs',
  'vo',
  'nObliques',
  'qWord',
  'vType',
]

let nOptions = [
  'n',
  'nBases',
  'nCase',
  'nType',
]

let vEnglish = [
  'mvEnglish1',
  'mvEnglish2',
  'mvEnglish3',
  'mvEnglishAbl',
  'mvnsEnglish1',
  'mvnsEnglish2',
  'mvnoEnglish1',
  'mvnoEnglish2',
  'cvnsEnglish1',
  'cvnsEnglish2',
  'cvnoEnglish1',
  'cvnoEnglish2',
  'svnoEnglish1',
  'svnoEnglish2',
  'cvEnglish1',
  'cvEnglish2',
  'cvEnglish3',
  'cvEnglishAbl',
  'svEnglish1',
  'svEnglish2',
  'svEnglishAbl',
  'npnEnglish1',
  'npnEnglish2',
  'mvnObliquesEnglish1',
  'mvnObliquesEnglish2',
  'cvnObliquesEnglish1',
  'cvnObliquesEnglish2',
  'svnObliquesEnglish1',
  'svnObliquesEnglish2',
]



class SimpleWordBuilderUpdated extends Component {
  constructor(props) {
    super(props);
    // console.log("YupikDetails props: ", props);
    // console.log(props.entry)
    // console.log(props.entry[5][0])
    this.state = {
      showModal:false,
      mvEnglish1: [],
      mvEnglish2: [],
      mvEnglish3: [],
      mvEnglishAbl: [],
      mvvs:[],
      mvvo:[],
      mvvBase:[],
      mvvMood:"",
      mvvSegments:"",
      colorScheme:0,
      colorsList: {
        'mvv.b':'#000000',
        'mvv.e':'#852828',
        'mvv.s':'#852828',
        'mvv.o':'#961616',
        'mvv.m':'#838383',
        'mvv.1':'#3455b5',
        'mvv.2':'#d3741e',
        'mvv.3':'#c062c3',
        'mvv.4':'#008000',
        'mvv.5':'#69b4b4',
        'mvv.6':'#e02323',

        'npn00.b':'#000000',
        'npn00.1':'#e02323',
        'npn00.2':'#69b4b4',
        'npn00.pd':'#961616',
        'npn00.ps':'#852828',
        // 'mvns00.b':'#852828',
        // 'mvns00.1':'#b53434',
        // 'mvns00.2':'#578f7f',
        // 'mvns00.e':'#f29090',
        // 'mvns10.b':'#852828',
        // 'mvv.4':'#000000',
      },

      npnEnglish1: [],
      npnEnglish2: [],

      npn:[],
      npnBases:[],
      npnCase:[],
      npnSegments:[],
      npnType:[], 

      // mvSubjectOptions:mvSubjectOptions,
      // mvObjectOptions:mvObjectOptions,

      mvSubjectOptions1:mvSubjectOptions,
      mvObjectOptions1:mvObjectOptions,

    }
  }

  componentDidMount() {
    // backEndCall()
    console.log(this.props)
    let initializedCall
    if (this.props.entry[0] == 'n') {
      initializedCall = [["Insert",["np"],[[[this.props.word,0,this.props.index,this.props.definitionIndex]],[0,0,0,1],"Abs"]]]
    } else {
      initializedCall = [["Insert",["mv"],[[[this.props.word,0,this.props.index,0]],this.props.entry[0],"Ind"]]]
    }

    // [["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]]]
    this.backEndCall(initializedCall, true)
  }

  componentWillReceiveProps(nextProps) {
    // backEndCall()
    // console.log(nextProps)
    let initializedCall
    if (nextProps.entry[0] == 'n') {
      initializedCall = [["Insert",["np"],[[[nextProps.word,0,nextProps.index,nextProps.definitionIndex]],[0,0,0,1],"Abs"]]]
    } else {
      initializedCall = [["Insert",["mv"],[[[nextProps.word,0,nextProps.index,0]],nextProps.entry[0],"Ind"]]]
    }

    // [["Insert", ["mv"], [[["nere-", 0, 0, 0]], "i", "Ind"]]]]
    this.backEndCall(initializedCall, true)
  }


  backEndCall(keyChanged, eraseExisting) {
    // console.log('backend',this.state)
    // console.log(keyChanged)

    let mv = {}
    let cv = {}
    let sv = {}
    let np = {}

    if (eraseExisting) {

    } else {
      if (this.state.mvvBase.length > 0) {mv['vBase']=this.state.mvvBase}

      if (this.state.mvvMood.length > 0) {mv['vMood']=this.state.mvvMood}
      if (this.state.mvvs.length > 0) {mv['vs']=this.state.mvvs}
      if (this.state.mvvo.length > 0) {mv['vo']=this.state.mvvo}

      if (this.state.npn.length > 0) {np['n']=this.state.npn}
      if (this.state.npnBases.length > 0) {np['nBases']=this.state.npnBases}
      if (this.state.npnCase.length > 0) {np['nCase']=this.state.npnCase}

    }

    // console.log(keyChanged,mv)
    axios
      .post(API_URL + "/sentencebuilder", {
        keyChanged:keyChanged,
        mv:mv,
        cv:cv,
        sv:sv,
        np:np,
      })
      .then(response => {
        // console.log(response.data)
        let vkey, nkey
        let updateDict = {}
        if ("english" in response.data) {
          vEnglish.map((k)=>{
            if (k in response.data['english']) {
              updateDict[[k]] = response.data['english'][k]
            } else {
              updateDict[[k]] = []
            }
          })

        }

        if ("mv" in response.data) {
          updateDict['mv'] = response.data['mv']
          vOptions.map((k)=>{
            vkey = 'mv'+k
            if (k in response.data['mv']) {
              // this.setState({
                // [vkey]: response.data['mv'][k],
              // })

              updateDict[[vkey]] = response.data['mv'][k]
              // if (k == 'qWord') {
              //  updateDict[['interCase']] = response.data['mv'][k][0]           
              // }
            } else {

              updateDict[[vkey]] = []

              // this.setState({
                // [vkey]: [],
              // })             
            }
          })
        } else {
          this.initialize('mv')
        }

        if ("np" in response.data) {
          updateDict['np'] = response.data['np']

          nOptions.map((k)=>{
            nkey = 'np'+k
            if (k in response.data['np']) {
              updateDict[[nkey]] = response.data['np'][k]
            } else {
              updateDict[[nkey]] = []           
            }
          })
        } else {
          this.initialize('np')
        }

        if ("segments" in response.data) {
          if ("mv" in response.data.segments) {
            if ("v" in response.data.segments.mv) {
              // this.setState({
                // mvvSegments: response.data.segments.mv.v,
              // })             
              updateDict['mvvSegments'] = response.data.segments.mv.v
            } else {
              // this.setState({
                // mvvSegments: "",
              // })                     
              updateDict['mvvSegments'] = ""
            }       
          }

          if ("np" in response.data.segments) {
            if ("n" in response.data.segments.np) {
              // this.setState({
                // npnSegments: response.data.segments.np.n,
              // })             
              updateDict['npnSegments'] = response.data.segments.np.n
            } else {
              // this.setState({
                // npnSegments: [],
              // })                     
              updateDict['npnSegments'] = []
            }
          }
        }


        this.setState(updateDict)



      })

  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.mv !== this.state.mv || prevState.np !== this.state.np) {
      this.updateAllowableOptions()
    }

  }

  updateAllowableOptions = () => {

    let mvSubjectOptions1 = []
    let mvObjectOptions1 = []
    // let nounOptionsSVPossessors1 
    // let nounOptionsCVPossessors1 
    // let nounOptionsMVPossessors1 
    // let nounOptionsCVAblPossessors1
    // let nounOptionsMVAblPossessors1 
    // let nounOptionsSVAblPossessors1

    if (this.state.mvvs.length > 0 && this.state.mvvo.length > 0) {
      if (this.state.mvvs[0] == 1) {
        mvObjectOptions.map((k)=>{
          if (![0,6,10].includes(k['id'])) {
            mvObjectOptions1 = mvObjectOptions1.concat(k)
          }
        })
      } else if (this.state.mvvs[0] == 2) {
        mvObjectOptions.map((k)=>{
          if (![1,7,11].includes(k['id'])) {
            mvObjectOptions1 = mvObjectOptions1.concat(k)
          }
        })
      } else {
        mvObjectOptions1 = mvObjectOptions
      }

      if (this.state.mvvo[0] == 1) {
        mvSubjectOptions.map((k)=>{
          if (![0,6,10].includes(k['id'])) {
            mvSubjectOptions1 = mvSubjectOptions1.concat(k)
          }
        })
      } else if (this.state.mvvo[0] == 2) {
        mvSubjectOptions.map((k)=>{
          if (![1,7,11].includes(k['id'])) {
            mvSubjectOptions1 = mvSubjectOptions1.concat(k)
          }
        })
      } else {
        mvSubjectOptions1 = mvSubjectOptions
      }
      
    } else {
      mvSubjectOptions1 = mvSubjectOptions
    }

    this.setState({
      mvSubjectOptions1:mvSubjectOptions1,
      mvObjectOptions1:mvObjectOptions1,
    })
    
  }

  recordClip = (sentence, siteLocation) => {
        return <Modal
            trigger={<Button circular basic style={{marginLeft:10}} onClick={()=>{this.setState({showModal:true})}} icon='microphone' />}
            on='click'
            open={this.state.showModal}
            style={{
              maxWidth:500,
              marginTop:(window.innerWidth < 480 ? 10 : 10),
            }}
            closeOnDimmerClick={false}
            onOpen={()=>{
            }}
            onClose={()=>{
              this.setState({showModal:false,wordsList:[],searchQuery:''})
            }}
          >
          <ModalContent>
            <Icon circular style={{margin:0,color:'#B1B1B1',cursor:'pointer',position:'relative',float:'right'}} size='large' onClick={()=>{this.setState({showModal:false})}} name='x' />
            <Recorder sentence={sentence} siteLocation={siteLocation} />          
          </ModalContent>
          </Modal>
  }


  render() {
    // console.log(this.state)

    // console.log(mvSubjectOptions)
    // console.log(mvObjectOptions)

    // let numEntries = Object.keys(this.state.fullWord).filter((entryNumber) => {
    //   return entryNumber !== 'english' && entryNumber !== 'yupik';
    // }).length;
    let newWord = '';
    return (
      <div>
      {this.state.npnSegments.length === 0 && this.state.mvvBase.length === 0 ?
        <Segment basic style={{height:171}} />     
        :
        null
      }

      {this.state.mvvBase.length > 0 && this.state.mvvSegments.length > 0 ?
        <div style={{marginTop:'13px', marginBottom:'20px',marginLeft:'15px'}}>
        <div style={{marginBottom:10,fontSize:'22px',color:'#000000',fontWeight:'400'}}>
          <div style={{cursor:'pointer',lineHeight:'35px',marginLeft:'2px'}}>
            {this.state.mvvSegments.map((t)=>
              <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]}</span>
            )}
            {this.state.mvvSegments.map((t)=>{newWord+=t[0]})}
            {this.recordClip(newWord,'entryUsage')}
          </div>
        </div>

        <div style={{marginTop:'10px', marginBottom:'20px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>          
        {this.state.mvEnglish1.map((w,wind)=>{
          return <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
        })}
        {this.state.mvvs.length > 0 ?
          <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#852828',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vs"],data.value.split('').map(Number)]])}}  value={this.state.mvvs.join("")} options={this.state.mvSubjectOptions1} />
          :
          null
        }
        {this.state.mvEnglish2.map((w,wind)=>{
          return <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
        })}   

        {this.state.mvvo.length > 0 ?
          (this.state.mvvBase[1] == 'it' ?
            (this.state.mvEnglishAbl.map((w,wind)=>
              <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]}</span>
            ))
            :
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#c84141',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["mv","vo"],data.value.split('').map(Number)]])}}  value={this.state.mvvo.join("")} options={this.state.mvObjectOptions1} />
          )
          :
          null
        }

        {this.state.mvEnglish3.map((w,wind)=>{
          return <span style={{marginLeft:(this.state.mvvo.length > 0 ? (this.state.mvvBase[1] == 'it' ? '4px' : '0px') :'0px')}}>
                  <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
                </span>
        })}
        </div>

        <div style={{}}>
        <Link to={{pathname: '/sentencebuilder/2', state: { mv: this.state.mv }}}>
          <Button basic compact style={{fontSize:'16px',fontWeight:'300'}}>
          <div style={{display:'flex',flexDirection:'column',fontFamily:customFontFam}}>
          Try Word Builder
          </div>
          </Button>
        </Link>
        </div>

        </div>
        :
        null
      }


      {this.state.npnSegments.length > 0 && this.state.npnSegments.length === this.state.npn.length ?
        <div style={{marginTop:'13px', marginBottom:'20px',marginLeft:'15px'}}>
          <div style={{marginBottom:10,fontSize:'22px',fontWeight:'400'}}>
            <div style={{lineHeight:'35px',marginLeft:'2px'}}>

              {this.state.npnSegments.slice().reverse()[0][0].map((t)=>
                <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]}</span>
              )}

            </div>
          </div>



          <span>
            <div style={{marginTop:'10px', marginBottom:'20px',fontSize:'18px',color:'#0D0D0D',fontWeight:'300'}}>          
            {this.state.npnEnglish1.map((w,wind)=>
              <span style={{color:colorsList[this.state.colorScheme][w[1]]}}>{w[0]+" "}</span>
              )}
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#5c5c5c',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],(data.value+this.state.npn[this.state.npnSegments.length-1][0].slice(-1).toString()).split('').map(Number)]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).join("")} options={nounOptionsMVPossessorsThe} />
            <Dropdown inline scrolling style={{border:'solid 1px #22242626',color:'#852828',fontSize:'18px',padding:'5px',borderRadius:'5px',marginRight:'4px'}} onChange={(event,data)=>{this.backEndCall([["Update",["np","n",this.state.npnSegments.length-1,0],this.state.npn[this.state.npnSegments.length-1][0].slice(0, -1).concat(data.value.split('').map(Number))]])}} value={this.state.npn[this.state.npnSegments.length-1][0].slice(-1).join("")} options={nounOptionsNumbers} />                                
            {this.state.npnEnglish2[0].map((w,wind)=>
              (w.map((t)=> <span style={{color:colorsList[this.state.colorScheme][t[1]]}}>{t[0]+" "}</span>))
              )}
            </div>
          </span>

          <div style={{}}>
          <Link to={{pathname: '/sentencebuilder/2', state: { np: this.state.np }}}>
            <Button basic compact style={{fontSize:'16px',fontWeight:'300'}}>
            <div style={{display:'flex',flexDirection:'column',fontFamily:customFontFam}}>
            Try Word Builder
            </div>
            </Button>
          </Link>
          </div>
        </div>

          :
          null
      }



      </div>
    );
  }
}

export default withRouter(SimpleWordBuilderUpdated);
