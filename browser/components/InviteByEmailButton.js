import React, { Component } from 'react'
import Form from './Form'
import Layout from './Layout'
import Link from './Link'
import Icon from './Icon'
import Button from './Button'
import $ from 'jquery'
import './InviteByEmailButton.sass'
import boardStore from '../stores/boardStore'
import InviteByEmailPopover from './InviteByEmailPopover'
import ToggleComponent from './ToggleComponent'

class InviteByEmailButton extends ToggleComponent {

  constructor(props){
    super(props)
  }

  render(){
    const inviteByEmail = this.state.open ?
      <InviteByEmailPopover onClose={this.close} boardId={this.props.boardId} /> :
      null

    return <span ref="root" className="InviteByEmailButton">
      <Button type="invisible" className="InviteByEmailButton-button" onClick={this.toggle}>
        Invite By Email
      </Button>
      {inviteByEmail}
    </span>
  }
}

export default InviteByEmailButton
