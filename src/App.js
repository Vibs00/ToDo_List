import React from 'react';
//import './../node_modules/bootstrap/dist/css/bootstrap.css'
import './paper.css';
import './App.css';
//import List from './Connect.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.state.detail = [];
    this.state.i = {}; //right now string will be changed to object
    this.state.detail.styl = "";
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setStatus = this.setStatus.bind(this);
    //this.printValue = this.printValue.bind(this);
  }

  getValue(event){
    let k = this.state.i;
    k.name = event.target.value;
    k.flag = false;
    k.styl = "paper-btn btn-block";
    this.setState({
      i : k
    });
  }

  setValue(event){
    if(this.state.i.name.trim())
    {
        let l = this.state.detail;
      l.push(this.state.i);
      this.setState({
        detail : l,
        i : {name:"", flag:false, styl:"paper-btn btn-block"}
      });
    }
  }

  printValue = () =>{
    let arr = [];
    arr = this.state.detail.map((value) => <List value={value} setFlag={()=>this.setFlag(value)} deleteList={()=>this.deleteList(value)} moveUp={()=>this.moveUp(value)} moveDown={()=>this.moveDown(value)}></List>);
    return arr;       
  }

  setFlag = (val) =>{
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    p[ind].flag = !this.state.detail[ind].flag;
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
    let ind = this.state.detail.indexOf(val);
    let p = this.state.detail;
    p.splice(ind, 1);
    this.setState({
      detail : p
    });
  }

  countStatus = () =>{
    let count = 0;
    this.state.detail.forEach((value, index)=>{
        if(value.flag == true){
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

  keyPress = (e) =>{
    if(e.key == 'Enter'){
      this.setValue();
    }
  }


  render(){
    return (
      <div>
        <h1 className="row flex-center">Dynamic List</h1>
        <h4 className="row flex-center">Completed Tasks: {this.countStatus() + "/" + this.state.detail.length}</h4>
        <input type="text" className="row flex-center" onChange={this.getValue} onKeyDown={this.keyPress} value={this.state.i.name}></input>
        <button className="row flex-center" onClick={this.setValue}>CLICK</button>
        <ul>
          {this.printValue()}
        </ul>
      </div>
    );
  }
}

class List extends React.Component{

  constructor(props){
      super(props);
  }

  render(){
  return(
    <span>
      <li onClick={(e)=>this.props.setFlag(this.props.value)} className={this.props.value.styl}>
          {this.props.value.name}
      </li>
      <button onClick={()=>this.props.moveUp(this.props.value)}>up</button>
      <button onClick={()=>this.props.moveDown(this.props.value)}>down</button>
      <button onClick={()=>this.props.deleteList(this.props.value)}>delete</button>
      </span>
      );
  }

}

export default App;