import React, { Component } from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import './Posts.css';
//import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import FullPost from "../FullPost/FullPost";


class Posts extends Component {

    state = {
        posts: [],
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Aviv'
                    };
                })
                this.setState({posts: updatedPost});
                console.log(updatedPost);
            })
            .catch(error => {
                console.log(error + 'error')
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/posts/' + id });
        //this.props.history.push('/posts/' + id); // will work also
    };

    render() {
        let posts = <p style={{textAlign: "center"}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        //<Link to={'/posts/' + post.id} key={post.id}> removed  just to play with the this.props.history.push history functions
                            <Post
                                title={post.title}
                                key={post.id}
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)}
                                 />
                        //</Link>
                    );
                }
            );
        }

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <Route path={this.props.match.url + '/:id'}  exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;