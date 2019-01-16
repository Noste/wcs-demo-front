import React from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { API_URL } from '../config'
import StudentCard from '../components/main/StudentCard'

const styles = () => ({
    root: {
        flexGrow: 1,
        padding: '40px',
        height: '100%',
    },
    title: {
        textAlign: 'center'
    },
    errorTitle: {
        textAlign: 'center',
        color: '#ff3333'
    }
})

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studentList: [],
            errorMessage: ''
        }
    }

    componentDidMount = async () => {
        try {
            const listStudentsResult = await axios.get(`${API_URL}/students`)
            if (listStudentsResult.status === 200) {
                this.setState({ studentList: listStudentsResult.data })
            }
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
    }

    render() {
        const { classes } = this.props
        const { errorMessage, studentList } = this.state

        return (
            <Grid container spacing={24} className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant='h2' className={classes.title}>
                        2018 - 2019 Wild code school students
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {studentList.length === 0 &&
                        <Typography variant='h3' className={classes.title}>
                            No students yet... Watch out for the angry sushi...
                        </Typography>
                    }
                </Grid>
                {studentList.map(student => {
                    return (
                        <Grid key={student._id} item xs={3}>
                            <StudentCard student={student} />
                        </Grid>
                    )
                })}
                {errorMessage !== '' &&
                    <Grid item xs={12}>
                        <Typography variant='h4' className={classes.errorTitle}>
                            {`Oops, an error occured : ${errorMessage}`}
                        </Typography>
                    </Grid>
                }
            </Grid>
        )
    }
}


export default withStyles(styles)(MainPage)
