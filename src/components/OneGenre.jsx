import React from "react";
import { Link } from "react-router-dom"


export default class OneGenre extends React.Component {

    state = {
        movies: [],
        isLoaded: false,
        error: null,
        genreName: ""
    }
    componentDidMount() {
        fetch("http://localhost:4000/v1/movies/" + this.props.match.params.genre_id)
            //.then(response => response.json())
            .then(response => {
                console.log("status code:", response.status);
                if (response.status !== "200") {
                    let err = Error;
                    err.message = "Invalid response code " + response.status;
                    this.setState({ error: err });
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    movies: json.movies,
                    isLoaded: true,
                    genreName: this.props.location.genreName,
                },
                    error => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                )
            })
    }
    render() {
        let { movies, isLoaded, error, genreName } = this.state;


        if (!movies) {
            movies = [];
        }

        if (error) {
            return <div>Error: {error.message}</div>
        }
        if (!isLoaded) {
            return <p>Loading...</p>
        }
        else {
            return (
                <>
                    <h2>Genre: {genreName} </h2>
                    <div className="li-group">
                        {movies.map(m => (
                            <Link key={m.id} className="list-group-item list-group-item-action" to={'/movies/' + m.id}>{m.title}</Link>

                        ))}
                    </div>
                </>
            );
        }

    }
}