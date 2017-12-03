import React from 'react';
import superagent from 'superagent';
import { connect } from 'react-redux'

import { Container } from 'semantic-ui-react'
import { Step, Grid, Menu, Segment, Header, Image, Icon, Card } from 'semantic-ui-react'
import { Button, Form, TextArea, Label } from 'semantic-ui-react'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true
        };
    }

    componentDidMount() {
        superagent.get('/items')
            .accept('json')
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    var list = JSON.parse(res.text);
                    this.setState({list: list, loading: false});
                }
            }.bind(this));
    }

    onClickDesigner(api_name) {
        this.props.router.push({
            pathname: '/' + api_name
        });
    }

    render() {
        var upCount = 0;
        var prod = this.state.list.map((app, index) => {
            if (app.stage === 'Production') {
                var color = app.response === "OK" ? 'green' : (app.response === "NOTFOUND") ? 'red' : 'orange';
                if (app.response === "OK") {
                    upCount++;
                }
                return (
                    <Segment>
                        <Header color={color}>
                            [{app.stage}] {app.name}
                        </Header>
                        <Header as="h4" href={app.url}>{app.url}</Header>
                        <p>{app.response}</p>
                        <p>{app.error}</p>
                    </Segment>
                )
            } else {
                return null;
            }
        });

        var staging = this.state.list.map((app, index) => {
            if (app.stage === 'Staging') {
                var color = app.response === "OK" ? 'green' : (app.response === "NOTFOUND") ? 'red' : 'orange';
                if (app.response === "OK") {
                    upCount++;
                }
                return (
                    <Segment>
                        <Header color={color}>
                            [{app.stage}] {app.name}
                        </Header>
                        <Header as="h4" href={app.url}>{app.url}</Header>
                        <p>{app.response}</p>
                        <p>{app.error}</p>
                    </Segment>
                )
            } else {
                return null;
            }
        });

        return (
            <Container fluid>
                <Segment basic loading={this.state.loading}>
                    <Header>{upCount} out of {this.state.list.length}</Header>
                    <Grid columns="equal">
                        <Grid.Column>
                            <Header>Production</Header>
                            {prod}
                        </Grid.Column>
                        <Grid.Column>
                            <Header>Staging</Header>
                            {staging}
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}

export default Home;
