import React from 'react';

import { Segment, Header, Grid, Image, Container, Divider, List } from 'semantic-ui-react'

class Footer extends React.Component {
    render() {
        return (
            <Segment basic padded='very' inverted className="footer" style={{'marginTop': 0, 'backgroundColor': '#212121'}}>
                <Container textAlign="center">
                    <Grid stackable inverted divided>
                        <Grid.Column width={8} textAlign="center">
                            <Image centered height='40px' src='/images/logo2.svg' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header inverted as="h4">About</Header>
                            <p>A web app to determine uptime.</p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
