import React from 'react'
import classNames from 'classnames'

import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../config'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    cssRoot: {
        color: theme.palette.getContrastText(PRIMARY_COLOR),
        backgroundColor: PRIMARY_COLOR,
        '&:hover': {
            backgroundColor: SECONDARY_COLOR,
        }
    },
    customLink: {
        textDecoration: 'none'
    }
})

const Navbar = ({ classes }) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Link to='/' className={classes.customLink}>
                    <Button color='primary' className={classNames(classes.margin, classes.cssRoot)}>
                        Home
                    </Button>
                </Link>
                <Link to='/add' className={classes.customLink}>
                    <Button color='primary' className={classNames(classes.margin, classes.cssRoot)}>
                        Create student
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Navbar)
