import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import throttle from 'lodash-es/throttle';
// Material-ui:n muotoilut
const styles = theme => ({
	root: {
	  width: '100%',
	  maxWidth: 360,
	  overflow: 'auto',
	  maxHeight: 300,
	},
	winnerList:{
		float:'left',
		width:'40%',
		border: '1px solid grey'
	},
	WinnerListText:{
		padding: '0'
	},
	GameContainer:{
		float:'left',
		width:'60%',
		borderTop: '1px solid grey',
		borderLeft: '1px solid grey',
		borderBottom: '1px solid grey',
	},
	ListTitle:{
		borderBottom: '1px solid grey'
	},
	Container:{
		display: 'flex',
		verticalAlign: 'center',
		margin: '0 auto',
		backgroundColor: '#e0e0e0'
	},
	[theme.breakpoints.down('sm')]: {
		Container:{
			display: 'block',
		},
		winnerList:{
			float:'none',
			width:'100%',
			border: '1px solid grey'
		},
		GameContainer:{
			float:'none',
			width:'100%',
			borderTop: '1px solid grey',
			borderLeft: '1px solid grey',
			borderRight: '1px solid grey',
		},
	}
});

// Pelaajalle annetun palautteen määrittäminen klikkausluvun perusteella
function Palkinto (props){
	let palkintoteksti;
	let palkinto;
	if((props%500) === 0){
		palkintoteksti = <h1>ISO palkinto!</h1>;
		palkinto = 1;
	}
	else if((props%200) === 0){
		palkintoteksti = <h1>Keskikokoinen palkinto!</h1>;
		palkinto = 1;
	}
	else if((props%100) === 0){
		palkintoteksti = <h1>Pieni palkinto!</h1>;
		palkinto = 1;
	}
	else{
		palkintoteksti = <p>Seuraavaan palkintoon {100-(props%100)} klikkausta</p>;
		palkinto = 0;
	}
	return [palkintoteksti, palkinto];
}


class Game extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		klikkaus: [], 
		voittajalista: [], 
		voittajat: [],
		countRequestFailed: false,
		disabled : false
	};
	// Klikkaustoiminnon rajoittaminen, jotta http requestit pysyvät klikkauksissa mukana
	this.handleClick = throttle(this.handleClick.bind(this), 400);
	}
	// Voittajalistan lataaminen tietokannasta ja sen uudelleen lataamisen määrittäminen
	componentDidMount() {
		fetch('/winners')
		.then((response) => {
			if(!response.ok) throw new Error(response.status);
			else return response.json();
		}).then((data) => {
			this.setState({ voittajat: data });
		}).catch((error) => {
			console.log('error: ' + error);
		});

		this.timerID = setInterval(
			() => this.tick(),
			10000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	// Voittajalistan hakeminen uudelleen tietokannasta
	tick() {
		fetch('/winners')
		.then((response) => {
			if(!response.ok) throw new Error(response.status);
			else return response.json();
		}).then((data) => {
			this.setState({ voittajat: data });
		}).catch((error) => {
			console.log('error: ' + error);
		});
		klikattu = 0;
	}

	// Klikkauksen käsittely, joka hakee tietokannasta klikkausluvun
	handleClick() {
		klikattu = 1;
		let data1 = {
			nimi: this.props.nimi
		}
		fetch("/count/click", {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(data1)
		}).then((response) => {
			if(!response.ok) throw new Error(response.status);
			else return response.json();
		}).then((data) => {
			this.setState({ countRequestFailed: false, klikkaus: data });
		}).catch((error) => {
			console.log('error: ' + error);
			this.setState({ countRequestFailed: true });
		});
		

	}

	render() {
		// Lisää pelaajan klikkauksen klikkauslukuun ja kutsuu tarvittavia funktioita
		if(klikattu === 1 && this.state.klikkaus.luku !== undefined && this.state.countRequestFailed === false){
			palkinnot = Palkinto(this.state.klikkaus.luku);
			klikattu = 0;
		}
		const { classes } =  this.props;

		return (
			<div className={classes.Container}>
				<div className={classes.GameContainer}>
					<h3>Nimimerkkisi on {this.props.nimi}</h3>
					<Button variant="contained" color="primary" size="large" onClick={this.handleClick} disabled={this.state.disabled}>
					Klikkaa ja voita
					</Button>
					{palkinnot[0]}
				</div>
				<div className={classes.winnerList}>
					<div className={classes.ListTitle}>
						<h2>Edelliset voittajat:</h2>
					</div>
					<List className={classes.root}>
						{this.state.voittajat.map(voittajat =>
						<ListItemText key={voittajat.id} className={classes.WinnerListText}>{voittajat.nimi}</ListItemText>
						)}
					</List>
				</div>
				
			</div>
		);
	}
}

let palkinnot = [];
let klikattu = 0;

Game.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Game);

