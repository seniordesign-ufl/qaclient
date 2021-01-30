import React from "react";
import axios from "axios";

class Posts extends React.Component
{
    state = {
        posts: [],
        id: '',
        score: 0,
        creator: '',
        subject: '',
        content: '',
        date_created: '',
        last_update: ''
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
            console.log(res);
            this.setState({posts: res.data});
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.posts.map(post => <li key={post.id}>{post.name}</li>)}
                </ul>
            </div>
        );
    }
}

export default Posts;