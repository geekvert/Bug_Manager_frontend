import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AppHeader from './header'
import Homepage from './Homepage'
import Projectpage from './Projectpage'
import Mypage from './Mypage'
import Memberspage from './Memberspage'
import Bugpage from './Bugpage'

class Main extends Component {
    render() {
        return (
			<>
			<AppHeader/>
            <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/project' component={Projectpage} />
            <Route exact path='/mypage' component={Mypage} />
            <Route exact path='/members' component={Memberspage} />
            <Route exact path='/bugpage' component={Bugpage} />
            <Redirect to="/" />
            {/* <Projectpage/> */}
            {/* <Mypage/> */}
            {/* <Memberspage/> */}
            {/* <Bugpage/> */}
            </Switch>
			</>
        )
    }
}

export default Main
