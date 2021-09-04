import React from "react";
import Input from "./form-components/Input";
import Select from "./form-components/Select";
import TextArea from "./form-components/TextArea";

//TODO Переделать все под функциональную компоненту
//TODO с использованием хуков
export default class EditMovie extends React.Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    }


    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: "",

            },
            mpaaOptions: [
                { id: "G", value: "G" },
                { id: "PG", value: "PG" },
                { id: "PG13", value: "PG13" },
                { id: "R", value: "R" },
                { id: "NC17", value: "NC17" },

            ],
            isLoaded: false,
            error: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        console.log("Form was submitted");
        evt.preventDefault();
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value,
            }
        }));
    }


    render() {
        let { movie } = this.state;
        return (
            <>
                <h2>Add/Edit Movie</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" id="id" value={movie.id} onChange={this.handleChange} />

                    <Input
                        name="title"
                        title="Title"
                        type="text"
                        value={movie.title}
                        handleChange={this.handleChange}
                    />

                    <Input
                        name="release_date"
                        title="Release date"
                        type="text"
                        value={movie.release_date}
                        handleChange={this.handleChange}
                    />

                    <Input
                        name="runtime"
                        title="Runtime"
                        type="text"
                        value={movie.runtime}
                        handleChange={this.handleChange}
                    />


                    <Select
                        title="MPAA Rating"
                        name="mpaa_rating"
                        options={this.state.mpaaOptions}
                        value={movie.mpaa_rating}
                        handleChange={this.handleChange}
                        placeholder="Choose..."
                    />

                    <Input
                        name="rating"
                        title="Rating"
                        type="text"
                        value={movie.rating}
                        handleChange={this.handleChange}
                    />
                    <TextArea
                        name="description"
                        title="Description"
                        value={movie.description}
                        handleChange={this.handleChange}
                        rows="3"
                    />
                    <hr />
                    <button className="btn btn-primary" >Save</button>
                </form>

                <div className="mt-3">
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>
                </div>
            </>
        )
    }
}