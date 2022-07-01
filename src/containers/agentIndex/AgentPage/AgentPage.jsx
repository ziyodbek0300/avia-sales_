import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function AgentPage() {

    return (
        <div className='lg:max-w-5xl mx-auto lg:px-0 px-8'>
            <Tabs>
                <TabList>
                    <Tab>
                        
                    </Tab>
                    <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default AgentPage