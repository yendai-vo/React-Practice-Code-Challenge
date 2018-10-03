import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    eatenSushi: [],
    sushiIndexPosition: 0,
    moneyRemaining: 100,
    sushiCost: 0,
  }

  componentDidMount = () => {
    this.fetchSushis()
  }

  fetchSushis = () => {
    fetch(API)
    .then(res => res.json())
    .then(sushis => {
       this.addSushisToPage(sushis)
    })
  }

  addSushisToPage = (sushis) => {
    this.setState({
      sushis: sushis
    })
  }

  sushiGroup = () => {
    return this.state.sushis.slice(this.state.sushiIndexPosition, this.state.sushiIndexPosition + 4)
  }

  setPosition = () => {
    this.setState({
      sushiIndexPosition: (this.state.sushiIndexPosition + 4)
    })
  }

  handleClick = (sushi) => {
    //add to eatenSushi array
    if(!this.state.eatenSushi.includes(sushi) && this.state.moneyRemaining >= sushi.price){
      this.eSushi(sushi)
      //deduct money
      this.deductMoneyAmount(sushi)
    }
  }

  eSushi = (sushi) => {
    this.setState({
      eatenSushi: [...this.state.eatenSushi, sushi]
    })
  }

  deductMoneyAmount = (sushi) => {
    let sushiCost = this.state.moneyRemaining - sushi.price
    this.setState({
      moneyRemaining: sushiCost
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer  sushis={this.sushiGroup()} handleClick={this.handleClick} eatenSushi={this.state.eatenSushi} moreSushi={this.setPosition}/>
          
        <Table money={this.state.moneyRemaining} handleClick={this.handleClick} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;