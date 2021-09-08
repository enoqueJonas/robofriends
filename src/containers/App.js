import React from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import {setSearchField} from '../actions'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return{
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)) 
    }
}

class  App extends React.Component {
    constructor(){
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            return response.json()
            })
        .then(users =>{
            this.setState({robots: users });
        })
    }

    render(){
        const {robots} = this.state
        const {searchField, onSearchChange} = this.props
        const filterRobots = robots.filter(robot => {
            return (
                robot.name.toLowerCase().includes(searchField.toLowerCase())
            )
        })
        return(
            <div className = 'tc '>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                <Cardlist robots = {filterRobots}/>
                </Scroll>
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);