import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMyBugs } from '../redux/ActionCreator'
import { Table, Header, Container } from 'semantic-ui-react'

const mapStateToProps = (state) => ({
    myBugs: state.myBugs,
    thisUser: state.thisUser
})

const mapDispatchToProps = (dispatch) => ({
	fetchMyBugs: (enr_no) => {dispatch(fetchMyBugs(enr_no))}
})

class Mypage extends Component {
	componentDidMount() {
		this.props.fetchMyBugs('1234567890')
	}

    render() {
		const {myBugs} = this.props
		const thisUser = 'aditya'

		const assigned_bugs = myBugs.myBugs.filter((bug) => bug.assigned_to === thisUser).map((bug) => (
			<Table.Row>
				<Table.Cell>
					{bug.heading}
				</Table.Cell>
				<Table.Cell>
					{bug.project}
				</Table.Cell>
			</Table.Row>
		))

		const reported_bugs = myBugs.myBugs.filter((bug) => bug.reported_by === thisUser).map((bug) => (
			<Table.Row>
				<Table.Cell>
					{bug.heading}
				</Table.Cell>
				<Table.Cell>
					{bug.project}
				</Table.Cell>
			</Table.Row>
		))

        return (
            <>
            <Container style={{ marginTop: '7em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs assigned to me</Header>
                <Table>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={12}>
                            Bug
                        </Table.HeaderCell>
                        <Table.HeaderCell width={4}>
                            Project
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {assigned_bugs}
                    </Table.Body>
                </Table>
            </Container>

            <Container style={{ marginTop: '7em' }}>
                <Header as='h1' style={{borderBottom: '1px solid darkgrey'}}>Bugs reported by me</Header>
                <Table>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={12}>
                            Bug
                        </Table.HeaderCell>
                        <Table.HeaderCell width={4}>
                            Project
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {reported_bugs}
                    </Table.Body>
                </Table>
            </Container>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage)

/*
self user ko integrate krna h bas yaha
*/