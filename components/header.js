import React, { Component } from 'react';
import { Button, Icon, Menu, Container, Divider, Dropdown, Grid, Header, Image, List, Segment, Input } from 'semantic-ui-react';
import { Link } from '../routes';

class header extends Component {
    render() {
        return (
            <Grid stackable style={ { marginBottom: '30px' } }>
                <Grid.Column>
                <Menu fixed='top' inverted style= { { background: '#3574D4' } } stackable>
                <Container>
                    <Menu.Item as='a' header>
                        <Image size='mini' src='./www.png' style={{ marginRight: '1.5em' }} />
                        Project Name
                    </Menu.Item>
                    <Menu.Item as='a' href={ '/App' } header>
                        <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                        Upload
                    </Menu.Item>
                    <Menu.Item as='a'>Home</Menu.Item>
                    <Dropdown item simple text='Dropdown'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
          </Menu>
                </Grid.Column>
            </Grid>
        );
    }
}

export default header;