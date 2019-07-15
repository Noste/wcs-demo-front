import React from 'react'
import axios from 'axios'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core'

import { API_URL, PRIMARY_COLOR, SECONDARY_COLOR } from '../config'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '40px',
        height: '100%'
    },
    centered: {
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250
    },
    cssRoot: {
        color: theme.palette.getContrastText(PRIMARY_COLOR),
        backgroundColor: PRIMARY_COLOR,
        '&:hover': {
            backgroundColor: SECONDARY_COLOR
        }
    },
    margin: {
        margin: theme.spacing.unit
    },
    buttonProgress: {
        color: SECONDARY_COLOR,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative'
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
            favoriteDessert: '',
            isLoading: false
        }
    }

    handleChange = ev => {
        this.setState({ [ev.target.id]: ev.target.value })
    }

    handleCreateStudent = async ev => {
        const { avatarFile, email, firstName, lastName, favoriteDessert } = this.state

        const student = {
            email,
            firstName,
            lastName,
            favoriteDessert
        }

        try {
            this.setState({ isLoading: true })
            const createStudentResult = await axios.post(`${API_URL}/students`, student)
            if (createStudentResult.status === 200) {
                const nStudentId = createStudentResult.data._id
                const params = {
                    operation: 'putObject',
                    keyName: `${nStudentId}/avatar.jpg`
                }
                const getPreSignedUrlResult = await axios.post(`${API_URL}/students/presignedurl`, params)

                if (getPreSignedUrlResult.status === 200) {
                    const preSignedUrl = getPreSignedUrlResult.data
                    const uploadFileResult = await axios.put(preSignedUrl, avatarFile)
                    if (uploadFileResult.status === 200) {
                        console.log('GG')
                    }
                }
            }
        } catch (err) {
            console.log('err : ', err.message)
        } finally {
            this.setState({ isLoading: false })
        }

    }

    handleFileSelection = ev => {
        this.setState({ avatarFile: ev.target.files[0] })
    }

    render() {
        const { classes } = this.props
        const { email, favoriteDessert, firstName, lastName, isLoading } = this.state

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
                    <div className={classes.wrapper}>
                        <Button variant='contained'
                            color='primary'
                            className={classNames(classes.margin, classes.cssRoot)}
                            disabled={isLoading}
                            onClick={this.handleCreateStudent}>
                            Create student
                        </Button>
                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(AddStudentPage)
