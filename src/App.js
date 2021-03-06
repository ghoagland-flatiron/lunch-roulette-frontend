import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router'
import Home from './components/Home'
import Search from './components/Search'
import Restaurant from './components/Restaurant'
import Navbar from './components/Navbar'
import api from './API'
import './App.css'

class App extends Component {
  state = {
    user: {},
    searchParams: {
      term: 'lunch',
      location: '81 Prospect St., Brooklyn NY'
    },
    restaurant: {},
    restaurantLoading: false
  }

  setUser = (user) => this.setState({ user })

  handleSearchParamsChange = (evt) => {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        [evt.target.name]: evt.target.value
      }
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    this.search()
  }

  search = () => {
    console.log('MAKE SEARCH FOR:', this.state.searchParams.term)
    this.setState({ restaurantLoading: true })
    api.get('/search', undefined, this.state.searchParams)
      .then(restaurant => this.setState({ restaurant, restaurantLoading: false }))
    this.props.history.push(`/restaurant`)

  }

  loggedIn = () => !!localStorage.getItem('token')

  logOut = () => {
    this.setState({ user: {} })
    localStorage.removeItem("token")
    this.props.history.push('/')
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      api.reauth().then(({ user }) => this.setUser(user.data))
    }
  }


  render() {
    return (
      <>
        <Navbar loggedIn={this.loggedIn} logOut={this.logOut}/>
        <Switch>
          <Route
            path="/search"
            render={(routerProps) => (
              <Search
                {...routerProps}
                term={this.state.searchParams.term}
                handleSearchChange={this.handleSearchParamsChange}
                handleSearchSubmit={this.handleSearchSubmit}
                location={this.state.searchParams.location}
              />
            )}
          />
          <Route
            path="/restaurant"
            render={(routerProps) => (
              <Restaurant
                {...routerProps}
                restaurant={this.state.restaurant}
                restaurantLoading={this.state.restaurantLoading}
                search={this.search}
              />
            )}
          />
          <Route
            path="/"
            render={(routerProps) => (
              <Home {...routerProps} setUser={this.setUser} loggedIn={this.loggedIn} />
            )}
          />

        </Switch>
      </>
    );
  }
}

export default withRouter(App)
