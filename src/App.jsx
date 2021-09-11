
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Admin from './components/Admin'
import EditMovie from './components/EditMovie'
import Genres from './components/Genres'
import Home from './components/Home'
import Login from './components/Login'
import Movies from './components/Movies'
import OneGenre from './components/OneGenre'
import OneMovie from './components/OneMovie'

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
    }
    this.handleJWTChange(this.handleJWTChange.bind(this));
  }


  handleJWTChange = (jwt) => {
    this.setState({ jwt: jwt });
  }


  logout = () => {
    this.setState({ jwt: "" })
  }


  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = <Link to="/login">Login</Link>
    }
    else {
      loginLink = <Link to="/logout" onClick={this.logout}>Logout</Link>
    }

    return (
      <Router>
        <div className="container" >
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">Go Watch a Movie!</h1>
            </div>
            <div className="col mt-3 text-end">
              {loginLink}
            </div>
            <hr className="mb-3"></hr>
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">

                    <Link to='/'>Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to='/movies'>Movies</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to='/genres'>Genres</Link>
                  </li>


                  {this.state.jwt !== "" &&
                    <>
                      <li className="list-group-item">
                        <Link to='/admin'>Manage Catalog</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to='/admin/movie/0'>Add movie</Link>
                      </li>
                    </>
                  }
                  <pre>
                    {JSON.stringify(this.state, null, 3)}
                  </pre>
                </ul>
              </nav>

            </div>
            <div className="col-md-10">
              <Switch>

                <Route path='/movies/:id' component={OneMovie} />

                <Route path='/movies' component={Movies} />

                <Route path='/genre/:genre_id' component={OneGenre} />
                <Route exact path='/genres' component={Genres} />


                <Route exact path='/admin' component={Admin} />

                <Route path='/admin/movie/:id' component={(props) => (
                  <EditMovie {...props} jwt={this.state.jwt} />
                )} />
                <Route exact path='/' component={Home} />

                <Route path="/login" component={(props) => <Login {...props} handleJWTChange={this.handleJWTChange} />} />

              </Switch>
            </div>
          </div>

        </div>
      </Router >

    );
  }
}




