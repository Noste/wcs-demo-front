import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { S3_BUCKET_URL } from '../../config'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 180,
    }
}

const StudentCard = ({ classes, student }) => {
    const fullName = `${student.firstName} ${student.lastName}`
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media}
                    image={`${S3_BUCKET_URL}/${student._id}/avatar.jpg`}
                    title={fullName}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {fullName}
                    </Typography>
                    <Typography component='p'>
                        {`Email : ${student.email}`}
                    </Typography>
                    <Typography component='p'>
                        {`Favorite Dessert : ${student.favoriteDessert}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withStyles(styles)(StudentCard)
