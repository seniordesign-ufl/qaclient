import React from "react";

class Posts extends React.Component {
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
