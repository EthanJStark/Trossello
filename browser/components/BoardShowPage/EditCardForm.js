import React, { Component } from 'react'
import Form from '../Form'
import Link from '../Link'
import Icon from '../Icon'
import Card from './Card'
import Button from '../Button'
import ArchiveButton from './ArchiveButton'
import $ from 'jquery'
import boardStore from '../../stores/boardStore'
import autosize from 'autosize'

export default class EditCardForm extends Component {

  static propTypes = {
    card: React.PropTypes.object,
    onCancel: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    submitButtonName: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string,
    hideCloseX: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      content: this.initialContentValue(props),
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onContentChange = this.onContentChange.bind(this)
  }

  initialContentValue(props){
    return props.defaultValue || (props.card && props.card.content) || ''
  }

  componentDidMount() {
    autosize(this.refs.content)
    this.refs.content.focus()
  }

  onKeyUp(event) {
    if (!event.shiftKey && event.keyCode === 13) {
      event.preventDefault()
      this.save()
    }
    if (event.keyCode === 27) {
      event.preventDefault()
      this.cancel()
    }
    autosize(this.refs.content)
  }

  onContentChange(event){
    this.setState({content: event.target.value})
  }

  save(event){
    if (event) event.preventDefault()
    this.props.onSave({
      content: this.state.content.replace(/[\n\s]+$/, ''),
    })
    this.setState({
      content: this.initialContentValue(this.props)
    })
  }

  cancel(){
    this.props.onCancel()
  }


  render() {
    const closeX = this.props.hideCloseX ? null :
      <Link onClick={this.cancel}>
        <Icon type="times" />
      </Link>

    return <Form className="BoardShowPage-EditCardForm" onSubmit={this.save}>
      <textarea
        className="BoardShowPage-Card"
        onKeyUp={this.onKeyUp}
        ref="content"
        value={this.state.content}
        onChange={this.onContentChange}
      />
      <div className="BoardShowPage-EditCardForm-controls">
        <Button type="primary" submit>{this.props.submitButtonName}</Button>
        {closeX}
      </div>
    </Form>
  }
}
