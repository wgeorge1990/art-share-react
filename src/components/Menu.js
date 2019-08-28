import React from 'react';
import { Button, Menu, Item, Container, Segment} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AppMenu extends React.Component {
  render() {
    return(
      <Menu widths={5}>
        
          <Menu.Item>
            <Link to="/">
              Profile
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/ImageUploads">
              Pin Artwork
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/BrowseAllArt">
              Browse Others
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/Favorites">
              Favorites
            </Link>
          </Menu.Item >
        
          <Menu.Item 
          onClick={(e) => this.props.logOut(e)}>
               Logout
          </Menu.Item>
      </Menu>
      
    )
  }

  
  
      }

export default AppMenu;
