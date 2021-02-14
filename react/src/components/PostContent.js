import React from "react";
import axios from "axios";

class Posts extends React.Component
{
    state = {
        id: '',
        score: 0,
        creator: '',
        subject: '',
        content: '',
        date_created: '',
        last_update: ''
    }

    handleAddChange = (e) => {
        this.setState({creator: e.target.value});
    }

    handleDeleteChange = (e) => {
        this.setState({id: e.target.value});
    }

    handleAdd = (e) => {
        e.preventDefault();

        const post = {
            creator: this.state.creator,
            score: this.state.score
        }

        axios.post(`https://jsonplaceholder.typicode.com/users`, { post })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    handleDelete = (e) => {
        e.preventDefault();
        
        axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAdd}>
                    <label>
                        Post:
                            <input type="text" name="name" onChange={this.handleAddChange} />
                    </label>
                    <button type="submit">Add</button>
                </form>
                <br />
                <form onSubmit={this.handleDelete}>
                    <label>
                        Delete This ID:
                            <input type="text" name="name" onChange={this.handleDeleteChange} />
                    </label>
                    <button type="submit">Delete</button>
                </form>
            </div>
        );
    }
}

export default Posts;