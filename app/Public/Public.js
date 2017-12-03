import React from 'react';
import SiteHeader from './Header';
import SiteFooter from './Footer';

import { Segment, Header, Grid, Image, Container, Divider, List } from 'semantic-ui-react'

class App extends React.Component {
    render() {
        return (
            <div>
                <SiteHeader />
                <Container fluid>{this.props.children}</Container>
                <SiteFooter />
            </div>
        );
    }
}

export default App;
