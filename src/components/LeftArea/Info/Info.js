import './Info.scss';
import 'react-tabs/style/react-tabs.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Players from './Players/Players';
import React from 'react';

class Info extends React.Component {
    constructor (props) {
        super(props);
        this.state = { tabIndex: 0 };
    }
    render () {
        return (
            <Tabs className='info-tabs' selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                    <Tab>Players</Tab>
                    <Tab>Your stats</Tab>
                    <Tab>Top Players</Tab>
                </TabList>
                <TabPanel>
                    <Players/>
                </TabPanel>
                <TabPanel>
                    <h1>2</h1>
                </TabPanel>
                <TabPanel>
                    <h1>3</h1>
                </TabPanel>
            </Tabs>
        );
    }
}

export default Info;
