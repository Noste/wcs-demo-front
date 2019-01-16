import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'


import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { PRIMARY_COLOR, SECONDARY_COLOR } from './config'

import MainPage from './containers/MainPage'
import AddStudentPage from './containers/AddStudentPage'
import NotFoundPage from './containers/NotFoundPage'

import Navbar from './components/commons/Navbar'

const theme = createMuiTheme({
    palette: {
        primary: { main: PRIMARY_COLOR },
        secondary: { main: SECONDARY_COLOR }
    }
})

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <>
                        <CssBaseline />
                        <Navbar />
                        <Switch>
                            <Route exact path='/' component={MainPage} />
                            <Route exact path='/add' component={AddStudentPage} />
                            <Route path='*' component={NotFoundPage} />
                        </Switch>
                    </>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

export default App

