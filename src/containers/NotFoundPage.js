import React from 'react'
import Lottie from 'react-lottie'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import animationData from '../animations/a_very_angry_sushi.json'

const styles = () => ({
    centered: {
        textAlign: 'center'
    }
})


const NotFoundPage = ({ classes }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <>
            <Typography variant='h2' className={classes.centered}>
                404 not found, You shouldn't be there !
            </Typography>
            <Lottie options={defaultOptions}
                height={400}
                width={400} />
        </>
    )
}

export default withStyles(styles)(NotFoundPage)
