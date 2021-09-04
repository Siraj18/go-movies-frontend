
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import Admin from './components/Admin'
import EditMovie from './components/EditMovie'
import Genres from './components/Genres'
import Home from './components/Home'
import Movies from './components/Movies'
import OneGenre from './components/OneGenre'
import OneMovie from './components/OneMovie'

function App() {
  return (
    <Router>
      <div className="container" >
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
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
                <li className="list-group-item">
                  <Link to='/admin'>Manage Catalog</Link>
                </li>
                <li className="list-group-item">
                  <Link to='/admin/add'>Add movie</Link>
                </li>
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

              <Route path='/admin/add' component={EditMovie} />
              <Route path='/' component={Home} />

            </Switch>
          </div>
        </div>

      </div>
    </Router >

  );
}

export default App;

function Movie() {
  let { id } = useParams();

  return <h2>Movie id:{id}</h2>
}
