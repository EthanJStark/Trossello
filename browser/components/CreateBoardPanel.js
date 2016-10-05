import React, {Component} from 'react'
import Link from './Link'
import Icon from './Icon'
import './CreateBoardPanel.sass'


class CreateBoardPanel extends Component{
  render(){
    return <div className='CreateBoardPanel'>
      <div className='CreateBoardPanel-header'>
        <span>
          Create Board
        </span>
        <Link to='/'>
          <Icon type="close" />
        </Link>
      </div>
      <div className='CreateBoardPanel-body'>
        <form>
          <label>Title</label>
          <input type='text' name='name' placeholder='New board title'></input>
          <button type='submit'>Create</button>
        </form>
      </div>
    </div>
  }
}

export default CreateBoardPanel
