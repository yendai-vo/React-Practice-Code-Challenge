import React, { Fragment } from 'react'
import Sushi from "../components/Sushi";
import MoreButton from '../components/MoreButton'

const SushiContainer = (props) => {
  // console.log(props)
  
  const displaySushis = () => {
    return props.sushis.map(sushi => 
    <Sushi key={sushi.id} sushi={sushi} eatenSushi={props.eatenSushi} handleClick={props.handleClick} />)}

  return (
    <Fragment>
      <div className="belt">
        {displaySushis()}
        <MoreButton moreSushi={props.moreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer