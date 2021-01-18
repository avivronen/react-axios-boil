import React, { Component, Suspense } from 'react';
//import axios from 'axios';
//import axios from '../../axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from "./Posts/Posts";
import asyncComponent from "../../components/hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
    return import("./NewPost/NewPost");
});

// wont work for server side rendering.
// const Posts = React.lazy(() => import('./Posts/Posts'));

class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName="my-active" to="/posts/" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/*<Route path="/" exact render={ () => <h1>Home</h1>} />*/}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null }
                    {/* wont work for server side rendering yet.  <Route path="/posts" render={()=> <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense> }/> */ }
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                    { /*<Route render={() => <h1>Not Found</h1>} />*/}
                    { /*<Route path="/" component={Posts} /> */ }
                </Switch>
            </div>
        );
    }
}

export default Blog;