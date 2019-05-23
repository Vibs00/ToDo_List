import React from 'react';
//import './../node_modules/bootstrap/dist/css/bootstrap.css'
import './paper.css';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.state.detail = [];
    this.state.i = {}; //right now string will be changed to object
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    //this.printValue = this.printValue.bind(this);
  }

  getValue(event){
    let k = this.state.i;
    k.name = event.target.value;
    k.flag = false;
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
        i : {name:"", flag:false}
      });
    }
  }

  printValue = () =>{
    let arr = [];
    this.state.detail.map((value) => {arr.push(<li className="paper-btn btn-block">{value.name}</li>)});
    return arr;       
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
        <h4 className="row flex-center">Number of items: {this.state.detail.length}</h4>
        <input type="text" className="row flex-center" onChange={this.getValue} onKeyDown={this.keyPress} value={this.state.i.name}></input>
        <button className="row flex-center" onClick={this.setValue}>CLICK</button>
        <ul>
          {this.printValue()}
        </ul>
      </div>
    );
  }
}

export default App;