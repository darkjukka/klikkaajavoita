import React from 'react';
import Game from './Game';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// Modaalin muotoilut
function getModalStyle() {
	const top = 50;
	const left = 50;
  
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}
// Material-ui muotoilut
const styles = theme => ({
	Button: {
		marginBottom: '7px',
		marginLeft: '5px',
		verticalAlign: 'bottom'
	},
	Icon: {
		float: 'right'
	},
	Modal: {
		position: 'absolute',
		width: '350px',
		height: '150px',
		background: '#e0e0e0',
		boxShadow: theme.shadows[5],
		textAlign: 'center',
		outline: 'none',
		borderStyle: 'solid',
		borderColor: 'red',
	},
	Warning: {
		padding: '30px'
    },
    Container:{
		width: '50%',
		margin: '0 auto',
		backgroundColor: '#e0e0e0',
		textAlign: 'center',
	},
	Nick:{
		margin: '0px'
	},
	[theme.breakpoints.down('xs')]: {
        Nick: {
            fontSize: '1em'
        }
    }
});

class Name extends React.Component {
    constructor(props) {
		super(props);
		this.state={
			value:'',
			open:false
		}
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
	// Käsittelee muutokset pelaajan syöttämässä arvossa ja poistaa välilyönnit nimimerkistä
    handleChange(event) {
		this.setState({value: event.target.value.replace(/\s/g, '')});
	}
	// Sulkee modaalin
    handleClose = () => {
		this.setState({ open: false });
    };
	// Käsittelee pelaajan syötteen. Palauttaa virheen, jos arvo on tyhjä. Alustaa siirtymisen pelinäkymään.
    handleSubmit(event) {
        var self = this;
        if(self.state.value === ''){
			this.setState({ open: true });
			event.preventDefault();
        }
        else{
            event.preventDefault();
            var GameScreen=[];
            GameScreen.push(<Game key='Game' appContext={self.props.appContext} nimi={self.state.value}/>)
            self.props.appContext.setState({NamePage:[],GameScreen:GameScreen})
        }
    }
  
    render() {
		const { classes } = this.props;
		return (
			<div className={classes.Container}>
				<CssBaseline />
				<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={this.state.open}
				onClose={this.handleClose}
				>
				<div style={getModalStyle()} className={classes.Modal}>
					<IconButton className={classes.Icon} onClick={this.handleClose}>
						<CloseIcon  />
					</IconButton>
					<div className={classes.Warning}>
						<h2>Syötä nimimerkki</h2>
					</div>
				</div>
				</Modal>
				<h2 className={classes.Nick}>Aloita antamalla nimimerkkisi</h2>
				<div>
					<form onSubmit={this.handleSubmit}>
						<TextField
						id="nimi"
						label="Nimimerkki"
						inputProps={{
						maxLength: 15
						}}
						value={this.state.value}
						onChange={this.handleChange}
						margin="normal"
						/>
						<Button className={classes.Button} type="submit" value="Submit" variant="contained" color="primary">Lähetä</Button>
						
					</form>
				</div>
			</div>
		);
	}
}

Name.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Name);