import React, { Component } from 'react';
import ListAside from '../components/ListAside';
import DrawerList from '../components/DrawerList'
class List extends Component {
    state = {  }
    render() {
        return (
            <div>
            <ListAside />
            <DrawerList />
            </div>
        );
    }
}

export default List;