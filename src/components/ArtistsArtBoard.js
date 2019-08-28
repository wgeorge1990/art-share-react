import React from 'react'
import { Card, Container, Menu, Button, Dropdown } from 'semantic-ui-react'
import ArtCard from './ArtCard';
import { connect } from 'react-redux'
import { userFetchArt } from '../actions/art';
import ArtDetail from './ArtDetail';
import { Redirect } from 'react-router-dom';


class ArtistsArtBoard extends React.Component {
  state = {
    rowCount: 3,
    searchterm: ""
  }

  maximizeView = (e) => {
   if  (this.state.rowCount > 1) {
    this.setState({
      rowCount: this.state.rowCount - 1
    }) }
  }

  minimizeView = (e) => {
    if (this.state.rowCount >= 1 && this.state.rowCount < 6) {
      this.setState({
        rowCount: this.state.rowCount + 1
      })
    }
  }
  searchTerm = (e, data) => {
    this.setState({
      searchterm: data.value
    })
  }

  filterArtByCategory = () => {
    this.props.art.filter(art => art.category === this.state.searchTerm)
  }

  render(){ 
   const yourArt = this.props.art.filter(art => art.user_id === parseInt(localStorage.getItem('user_id')))
   const filteredForBoard = yourArt.filter(art => art.category !== 'profile')
   console.log(yourArt, filteredForBoard)
    const options = [
      { key: 1, text: 'painting', value: "painting" },
      { key: 2, text: 'drawing', value: 'drawing' },
      { key: 3, text: 'digital', value: 'digital' },
      { key: 4, text: 'photography', value: 'photo'},
    ]
       return(
         <Container className="CardContainer" style={{ 'width': "1600px" }}>
             <Card centered>
               <Button.Group>
                 <Button onClick={(e) => this.maximizeView(e)} >
                   Maximize
              </Button>
                 <Button.Or />
                 <Button onClick={(e) => this.minimizeView(e)}>
                   Minimize
              </Button>
               </Button.Group>
             <Dropdown
               clearable
               options={options}
               selection
               onChange={this.searchTerm}
               placeholder="Filter Art By Category" />
             </Card>
           {this.props.showDetail ? <ArtDetail fetchArt={this.props.fetchArt}/> :
             <Container className="CardContainer" style={{ 'width': "1600px" }}>
                <Card.Group itemsPerRow={this.state.rowCount}>
                 <ArtCard 
                 images={
                   this.state.searchterm === "" ?  
                      filteredForBoard : 
                      filteredForBoard.filter(art => art.category === this.state.searchterm)}
                 fetchArt={this.props.fetchArt} />
                </Card.Group>
             </Container>}
         </Container>
       
        )
    }
  }

  const mapStateToProps = (state) => {
    return { art: state.art, showDetail: state.showDetail}
  }

export default connect(mapStateToProps, {userFetchArt})(ArtistsArtBoard)