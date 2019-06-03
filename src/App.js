import React from 'react';
import './paper.css';
import './App.css';
import axios from 'axios'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.state.render = false;
    this.state.detail = [];
    this.state.right = [];
    this.state.order = true;
    this.state.delete = false;
    this.state.detail.pin = {flag: false, value: 0}
    this.state.i = {}; //right now string will be changed to object
    this.state.i.name = "";
    this.state.i.daiet = "";
    this.state.i.date = "";
    this.state.i.time = "";
    this.state.i.flag = false;
    this.state.i.pin = {flag: false, valu: 0}
    this.state.detail.styl = "";
    this.state.progress = "bar w-0";
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  getValue(event){
    let k = this.state.i;
    k.name = event.target.value;
    k.flag = false;
    k.styl = "paper-btn btn-block";
    k.pin.flag = false;
    k.pin.valu = this.state.detail.length;
    k.daiet = "";
    this.setState({
      i : k
    });
  }

  setValue(event){
    if(this.state.i.name.trim())
    {
      let l = this.state.detail;
      let date1 = this.state.i;
      let date2 = this.state.i;
      date1.daiet = new Date();
      date2.daiet = date1.daiet.toDateString();
      
      axios.post('http://localhost:8080/task',date2)
      .then((res)=>{
        //do something with response
        console.log(res.data);
      });

      l.push(date2);
      this.setState({
        detail : l,
        i : {name:"", flag:false, styl:"paper-btn btn-block", pin : {flag: false, }, date:"", daiet:"", time:""}
      });
    }
  }

  getDate = (event) =>{
    let k = this.state.i;
    k.date = event.target.value;
    let p1 = k.date.splice(0, 2);
    let p11 = "20".concat(p1);
    let p2 = k.splice(0, 3);
    let p3 = k;
    let d = new Date();
    k.date = event.target.value;
    if((p11 >= d.getFullYear()) && (p2.splice(0, 1) === '/') && (p2 >= d.getMonth()) && (p3.splice(0, 1) === '/') && (p3 >= d.getDate())){
      k.date = event.target.value;
      this.setState({
        i : k
      });
    }
    else{
      k =  d.toDateString();
      this.setState({
        i : k
      });
      // window.alert("Enter Correct Date");
    }
  }


  getTime = (event) =>{
    let k = this.state.i;
    k.time = event.target.value;
    let p1 = k.time.splice(0, 2);
    let p2 = k.splice(0, 3);
    let d = new Date();
    if((p1 >= d.getHours()) && (p2.splice(0, 1) === '/') && (p2 >= d.getMinutes())){
      k.time = event.target.value;
      this.setState({
        i : k
      })
    }
    else{
      k =  d.toDateString();
      this.setState({
        i : k
      })
      window.alert("Enter Correct Time");
    }
  }

  printNotDoneValue = () =>{
    let arr = [];
    arr = this.state.detail.map((value) => {
    return <List empty={()=>this.empty()} value={value} delete={this.state.delete} setFlag={()=>{this.setFlag(value)}} deleteList={()=>this.deleteList(value)} moveUp={()=>this.moveUp(value)} moveDown={()=>this.moveDown(value)} pinTask={()=>this.pinTask(value)}  styl={this.state.style}></List>});
    return arr;       
  }

  printDoneValue = () =>{
    let arr = [];
    arr = this.state.detail.map((value) =>  { if((value.flag === true))
    return  <List empty={()=>this.empty()} value={value} delete={this.state.delete} setFlag={()=>{this.setFlag(value)}} deleteList={()=>this.deleteList(value)} moveUp={()=>this.moveUp(value)} moveDown={()=>this.moveDown(value)} pinTask={()=>this.pinTask(value)} styl={this.state.style}></List>});
    return arr;       
  }

  empty = () =>{

  }

  setFlag = (val) =>{
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    p[ind].flag = !this.state.detail[ind].flag;

    axios.put('http://localhost:8080/task/'+p[ind]._id,p[ind])  // assuming 123 is id of task record
    .then((res)=>{
      //do something with response

    })
    this.setState({
      detail : p
    });


    this.setStatus(ind);
  }

  setStatus = (ind) =>{
    let h = this.state.detail;
    if(this.state.detail[ind].flag == true){
      h[ind].styl = "paper-btn btn-block alert-success";

      this.setState({
        detail : h
      })

   }
    else{
      h[ind].styl = "paper-btn btn-block";
      this.setState({
        detail : h
      })
    }
  }

  deleteList = (val) =>{
      // setTimeout(()=> {
      // }, 4000);
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;

    axios.delete('http://localhost:8080/task/'+p[ind]._id)
    .then((res)=>{
      //do something with response
    })

    p.splice(ind, 1);
    this.setState({
      detail : p
    });
  }

  countStatus = () =>{
    let count = 0;
    this.state.detail.forEach((value, index)=>{
        if(value.flag === true){
          ++count;
        }
    }) 
    return count;
  }

  moveUp = (val) =>{
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    if(ind != 0)
    {
      [p[ind], p[ind-1]] = [p[ind-1], p[ind]];
      this.setState({
        detail : p
      });
    }
  }

  moveDown =(val) =>{
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    if(ind != (this.state.detail.length-1))
    {
      [p[ind], p[ind+1]] = [p[ind+1], p[ind]];
      this.setState({
        detail : p
      });
    }
  }
/*ToDo: Add double click to remove pined*/
//add a property in this.state.detail[].pin
//set initial pin = false
//if pin true run the code on 128 and 127 line
//else return the element to thier original positions
  pinTask = (val) =>{
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    p[ind].pin.flag = !this.state.detail[ind].pin.flag;
    let t = [];
    if(p[ind].pin.flag == true)
    {
      p[ind].styl = "paper-btn btn-block alert-secondary";
      t = p.splice(0, ind);
      t.reverse().forEach((value, index)=>p.splice(1, 0, value));
      
    }
    else{
      // let indx = this.findPin();
      // let u = [];
      // let y =[];
      // t = p.splice(0, indx);
      // u = t.splice(ind, 1);
      // y = t.concat(u, p);
      // p = y.map((v)=>v);
      // console.log(indx);
      // t.splice(indx-1, 0, p);
      t = p.splice(ind, 1);
      let k = p.concat(t);
      p = k;
    }
    
    this.setState({
      detail : p
    });
  }

  findPin = () =>{
    let indx;
    this.state.detail.forEach((value, index)=>{
      if(value.pin.flag == false){
        indx = index;
        console.log(indx);
        return indx;
      }
    });

  }

  completed = () =>{
    let o = this.state.detail;
    o.forEach((value, index)=>{
      if(value.flag == true){
        [o[index], o[o.length-1]] = [o[o.length-1], o[index]];
      }
    });
    this.setState({
      detail : o
    })
  }

  newestFirst = (ord) =>{
    let r = this.state.detail;
    let o = this.state.order;
    if(((o == true) && (ord === 'O')) || ((o == false) && (ord == 'N'))){
      //everything same
    }
    else{
       o = !this.state.order;
      r.reverse();
      this.setState({
        detail : r,
        order :o
      })
    }
  }

  sort_by_name = () =>{
    let s = this.state.detail;
    let arr = s.map((value)=>value.name);
    arr.sort();
    arr.forEach((valu, indx)=>{
      s.forEach((v, i)=>{ 
        if(valu.toString().toLowerCase() === v.name.toString().toLowerCase()){
          //console.log(valu);
          [s[i], s[indx]] = [s[indx], s[i]];
        }
      })
    })
   //console.log(s);
   this.setState({
     detail : s
   })
  }

  keyPress = (e) =>{
    if(e.key == 'Enter'){
      this.setValue();
    }
  }

  componentWillUpdate(){
    setTimeout(function() { //Start the timer
      this.setState({render: true}) //After 1 second, set render to true
    }.bind(this), 0)
    // setTimeout(()=>{
    //   this.setState({})
    // })
  }

  componentDidMount(){
    axios.get('http://localhost:8080/task')
    .then((res)=>{
        //do something with response
      this.setState({
        detail : res.data
      })
    })
  }

  

  // componentWillUpdate(nextState) {
  //   if (nextState.visible !== this.State.visible) {
  //     if (nextState.visible) {
  //         (findDOMNode(this)).stop( true, true ).fadeIn('fast');
  //     } else {
  //         (findDOMNode(this)).stop( true, true ).fadeOut('fast');
  //     }
  //   }
  // }

  

  render(){
    let renderContainer = false 
    if(this.state.render){
      renderContainer = this.printNotDoneValue();
      this.state.style = "element";
    }
    return (
      <div>
        <h3 className="row margin-left-small margin-top-small">ToDo List</h3>
        <h4 className="row flex-center margin-top-small bring-fornt progress margin-bottom xs-5 sm-5 md-5 lg-5">
        {/* <div className="progress margin-bottom xs-5 sm-5 md-5 lg-5"> */}
          <div className={"bar w-" + ((this.countStatus()/this.state.detail.length)*100).toFixed(0)}></div>
        {/* </div> */}
          <strong className="position">Completed Tasks: {this.countStatus() + "/" + this.state.detail.length}</strong>
        </h4>
        
         <div className="row stisky">
           <div className="xs-3 sm-3 md-3 lg-3 flex-right margin-right-small">
                <div className="row margin-top-small">
                  <div className="collapsible row flex-right margin-right-small">
                    <input id="collapsible1" type="checkbox" name="collapsible"></input>
                    <label for="collapsible1">Order By</label>
                    <div className="collapsible-body">
                      <div className="xs-3 sm-3 md-3 lg-3">
                       <button onClick={()=>{this.sort_by_name()}}>Name</button>
                      </div>
                      <div className="xs-3 sm-3 md-3 lg-3">
                       <button onClick={()=>{this.newestFirst('N')}}>Newest First(date)</button>
                     </div>
                      <div className="xs-3 sm-3 md-3 lg-3">
                        <button onClick={()=>this.completed()}>Completed</button>
                      </div>
                      {/* <div className="xs-3 sm-3 md-3 lg-3">
                        <button >Deadline</button>
                      </div> */}
                      <div className="xs-3 sm-3 md-3 lg-3">
                        <button onClick={()=>{this.newestFirst('O')}}>Default(Oldest First)</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        <div className="row">
          <div className="card xs-6 sm-6 md-6 lg-6">
              <div className="card-body">
                <div className="row flex-spaces child-borders">
                  <input type="text" className="xs-12 sm-12 md-6 lg-6 padding-left-large margin-my margin-left-none margin-top-small" onChange={this.getValue} onKeyDown={this.keyPress} value={this.state.i.name} placeholder="Input tasks here"></input>
                  <input type = "text" className="xs-4 sm-4 md-2 lg-2 margin-top-small margin-left-none margin-my" placeholder="dd/mm/yy" onChange={()=>this.getDate} onKeyDown={this.keyPress} value={this.state.i.date}></input>
                  <input type = "text" className="xs-4 sm-4 md-1 lg-1 margin-top-small margin-left-none margin-my" placeholder="hh/mm"onChange={()=>this.getTime} onKeyDown={this.keyPress} value={this.state.i.time}></input>
                  <button className="xs-12 sm-12 md-2 lg-2 col margin-left-none background-my text-my margin-my margin-top-small" onClick={this.setValue}>ADD</button>
                </div>
                <ul>
                  {renderContainer}
                </ul>  
              </div>
            </div>
            <div className="card xs-6 sm-6 md-6 lg-6">
              <div className="card-body">
                <ul>
                  <h2 className="row flex-center margin-top-none">Completed</h2>
                  {this.printDoneValue()}
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

class List extends React.Component{

  constructor(props){
      super(props);
      this.state = {};
      this.state.render = false;
      this.state.delete = this.props.delete;
      
      this.state.element = "element";
      this.state.rC = this.props.value;
  }

  componentWillUpdate(){
    setTimeout(function() {
      if(this.state.delete){ //Start the timer
      this.setState((state, props)=>{
        this.state.render= true;
        this.state.element = "element2";
        this.state.rC.renderContainer = this.props.deleteList(this.props.value);
        this.state.delete = false;
      })
     }
     else
      this.setState((state, props)=>{
        this.state.render= false;
        this.state.element= "element";
        this.state.rC.renderContainer = this.props.empty();
      }) //After 1 second, set render to true
    }.bind(this), 0)
    // setTimeout(()=>{
    //   this.setState({})
    // })
  }


  render(){
    // let renderContainer = false; 
    // if(this.state.render){
    //   renderContainer = this.props.deleteList(this.props.value); 
    // }
  return(
    <span>
          <div className="row">
            <div className="card1 xs-9 sm-9 md-9 lg-9 margin-top-none">
              <div className="card1-body msg-content">
                <div id="msg1" className="msg-receive dib mb4 bg-message br4 pv2 ph3 white measure-narrow">
                    <div className={this.state.element}>
                      <li onClick={(e)=>this.props.setFlag(this.props.value)} onDoubleClick={()=>this.props.pinTask(this.props.value)} className={this.props.value.styl}>
                          {this.props.value.name}<span>{" (" + this.props.value.daiet.toString() + ") "}</span>
                      </li>
                    </div>
                </div>
              </div>
            </div>
            <div className="xs-1 sm-1 md-1 lg-1">
              <button className="em em-arrow_up" onClick={()=>this.props.moveUp(this.props.value)}></button>
            </div>
            <div className="xs-1 sm-1 md-1 lg-1">
              <button className="em em-arrow_down" onClick={()=>this.props.moveDown(this.props.value)}></button>
            </div>
            <div className="xs-1 sm-1 md-1 lg-1">
              <button className="em em-negative_squared_cross_mark" onClick={()=>{this.setState({
                delete : true
              })
                return this.state.rC.renderContainer}}></button>
            </div>
          </div>
      </span>
      );
  }

}



export default App;