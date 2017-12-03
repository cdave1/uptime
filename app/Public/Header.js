import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth';

import { Container } from 'semantic-ui-react'
import { Menu, Segment, Image, Button, Form, Label, Dropdown } from 'semantic-ui-react'

class Header extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Segment basic clearing>
                        <Menu secondary>
                            <Menu.Item href='/'><Image height='50px' src='/images/logo2a.svg' /></Menu.Item>
                            <Menu.Item>APP UPTIME LIST</Menu.Item>
                        </Menu>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Header;
