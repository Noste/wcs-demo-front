import React from 'react'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField, Typography } from '@material-ui/core'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../config'


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '40px',
        height: '100%',
    },
    centered: {
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    cssRoot: {
        color: theme.palette.getContrastText(PRIMARY_COLOR),
        backgroundColor: PRIMARY_COLOR,
        '&:hover': {
            backgroundColor: SECONDARY_COLOR,
        }
    },
    margin: {
        margin: theme.spacing.unit,
    }
})

class AddStudentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarFile: null,
            email: '',
            firstName: '',
            lastName: '',
            favoriteDessert: ''
        }
    }

    handleChange = ev => {
        this.setState({ [ev.target.id]: ev.target.value })
    }

    handleCreateStudent = ev => {
        console.log('click :', this.state)

    }

    handleFileSelection = ev => {
        this.setState({ avatarFile: ev.target.files[0] })
    }

    render() {
        const { classes } = this.props
        const { email, favoriteDessert, firstName, lastName } = this.state

        return (
            <Grid container spacing={24} className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant='h2' className={classes.centered}>
                        Add new student
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.centered}>
                        <Grid item xs={12}>
                            <TextField id='firstName' label='First name :' className={classes.textField} value={firstName} onChange={this.handleChange} margin='normal' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='lastName' label='Last name :' className={classes.textField} value={lastName} onChange={this.handleChange} margin='normal' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='email' label='Email :' className={classes.textField} value={email} onChange={this.handleChange} margin='normal' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id='favoriteDessert' label='Favorite dessert :' className={classes.textField} value={favoriteDessert} onChange={this.handleChange} margin='normal' />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} className={classes.centered}>
                        <Grid item xs={12}>
                            <TextField id='avatar' type='file' label='Avatar : ' className={classes.textField} onChange={this.handleFileSelection} margin='normal' />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.centered}>
                    <Button color='primary' onClick={this.handleCreateStudent} className={classNames(classes.margin, classes.cssRoot)}>
                        Create student
                    </Button>
                </Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(AddStudentPage)
