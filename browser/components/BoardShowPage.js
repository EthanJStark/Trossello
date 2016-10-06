import React, { Component } from 'react'
import './BoardShowPage.sass'
import Layout from './Layout'
import Link from './Link'
import Icon from './Icon'
import PresentationalComponent from './PresentationalComponent'
import $ from 'jquery'
import CreateCard from './CreateCard'

class BoardProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      board: null
    }
    this.loadBoard(props.params.boardId)
  }


  loadBoard(boardId){
    $.getJSON('/api/boards/'+boardId)
      .then(board => {
        this.setState({board})
      })
  }

  componentWillReceiveProps(nextProps){
    if (this.props.params.boardId !== nextProps.params.boardId){
      this.loadBoard(nextProps.params.boardId)
    }
  }

  render(){
    return <BoardShowPage board={this.state.board} />
  }

}

export default BoardProvider

const BoardShowPage = ({board}) => {
  if (!board) return <Layout className="BoardShowPage" />

  const lists = board.lists.map(list => {
    const cards = board.cards.filter(card => card.list_id === list.id)
    return <List key={list.id} list={list} cards={cards} />
  })

  const style = {
    backgroundColor: board.background_color
  }

  return <Layout className="BoardShowPage" style={style}>
    <div className="BoardShowPage-Header">
      <h1>{board.name}</h1>
    </div>

    <div className="BoardShowPage-lists">{lists}</div>
  </Layout>
}

class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      creatingCard: false
    }
    this.creatingCard = this.creatingCard.bind(this)
    this.cancelCreatingCard = this.cancelCreatingCard.bind(this)
    this.saveCard = this.saveCard.bind(this)
  }

  creatingCard() {
    this.setState({creatingCard: true})
  }

  cancelCreatingCard() {
    this.setState({creatingCard: false})
  }

  saveCard(content) {
    console.log("would save card", content);
  }

  render(){
    const { list, cards } = this.props
    const cardNodes = cards.map(card => {
      return <Card key={card.id} card={card} />
    })

    let createCardForm, createCardLink
    if (this.state.creatingCard) {
      createCardForm = <CreateCardForm
        onCancel={this.cancelCreatingCard}
        onSave={this.saveCard}
      />
    } else {
      createCardLink = <Link onClick={this.creatingCard} >Add a card...</Link>
    }

    return <div className="BoardShowPage-List">
      <div className="BoardShowPage-ListHeader">{list.name}</div>
      <div className="BoardShowPage-cards">
        {cardNodes}
        {createCardForm}
      </div>
      {createCardLink}
    </div>
  }
}

class CreateCardForm extends Component {

  constructor(props) {
    super(props)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  componentDidMount() {
    this.refs.content.focus()
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.createCard()
    }
  }

  createCard() {
    this.props.onSave(this.refs.content.value)
    this.refs.content.value = ""
  }

  render() {
    return <div>
      <textarea className="BoardShowPage-Card" onKeyUp={this.onKeyUp} ref="content"/>
      <button onClick={this.createCard}>Add</button>
      <button onClick={this.props.onCancel}><Icon type="times" /></button>
    </div>
  }
}

const Card = ({ card }) => {
  return <div className="BoardShowPage-Card">
    <pre>{card.content}</pre>
  </div>
}
