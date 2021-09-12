import { Component } from "react";



export default class GraphQl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            isLoaded: false,
            error: null,
            alert: {
                type: "d-none",
                message: "",
            }
        }
    }

    componentDidMount() {
        const payload = `
        {
            list {
                id
                title
                runtime
                description
                year
            }
        }
        `

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            body: payload,
            headers: myHeaders
        }

        fetch("http://localhost:4000/v1/graphql/list", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let theList = Object.values(data.data.list);
                return theList;
            })
            .then((theList) => {
                console.log(theList);
                this.setState({
                    movies: theList
                })
            })
    }
    render() {
        return (
            <>
                <h2>Graphql</h2>
                <hr />
                <div className="list-group">
                    {this.state.movies.map((m) => (
                        <a key={m.id} className="list-group-item list-group-item-action" href="#">
                            <strong>{m.title} </strong>
                            <small className="text-muted">
                                {m.year} - {m.runtime} minutes
                            </small>
                            <br />
                            {m.description.slice(0, 100)}...
                        </a>
                    ))}
                </div>
            </>
        );
    }
}