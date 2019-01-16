import React from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { API_URL } from '../../config'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 180
    }
}

class StudentCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: ''
        }
    }

    componentDidMount = async () => {
        const avatarUrl = await this.getAvatarUrl(this.props.student._id)
        if (avatarUrl.status === 200) {
            this.setState({ avatarUrl: avatarUrl.data })
        }
    }

    getAvatarUrl = studentId => {
        const params = {
            operation: 'getObject',
            keyName: `${studentId}/avatar.jpg`
        }
        return axios.post(`${API_URL}/students/presignedurl`, params)
    }

    render() {
        const { classes, student } = this.props
        const { avatarUrl } = this.state

        const fullName = `${student.firstName} ${student.lastName}`

        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                        image={avatarUrl}
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
}

export default withStyles(styles)(StudentCard)
