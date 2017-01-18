import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {	
		this.props.fetchPost(this.props.params.id);
	}

	deletePost() {
		this.props.deletePost(this.props.params.id)
			.then(()=> {
				this.context.router.push('/')
			});
	}

	render() {
		const { post } = this.props;
		// equivalent to const post = this.props.post 

		if (!this.props.post) {
			return <div> Loading ... </div>
		}

		return (
			<div>
				<h3> {this.props.post.title }</h3>
				<h6> {this.props.post.categories} </h6>
				<p> {this.props.post.content }</p>
				<Link to="/" className="btn btn-success">
					Back to Home
				</Link>
				<button onClick={this.deletePost.bind(this)} className="btn btn-warning">
					Delete Post
				</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect ( mapStateToProps , { fetchPost, deletePost })(PostsShow);
//this.props.params.id
