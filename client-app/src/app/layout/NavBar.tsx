import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
    handleFormOpen: () => void;
}

export default function NavBar({handleFormOpen}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="assets/logo.png" alt="logo" style={{marginRight: "10px"}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button positive content='Create activity' onClick={handleFormOpen}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
