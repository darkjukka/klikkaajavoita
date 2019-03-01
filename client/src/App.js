import React, { Component } from 'react';
import Name from './Name';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    App:{
		width: '50%',
		margin: '0 auto',
		backgroundColor: '#e0e0e0',
		textAlign: 'center',
    }
});

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			NamePage:[],
			GameScreen:[]
		}
	}
	componentWillMount(){
		let NamePage =[];
		NamePage.push(<Name key='Name' appContext={this}/>);
		this.setState({NamePage:NamePage});
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.App}>
			{this.state.NamePage}
			{this.state.GameScreen}
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
