// App component - represents the whole app
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

// import Layout from './layouts/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      shell: {
        minWidth : '100%',
        minHeight: '100%'
      },
      container: {
        padding  : '5px',
        border   : '1px solid rgb(1, 27, 38)',
        boxShadow: '2px 2px rgb(1, 27, 38)'
      },
      link: {
        color         : 'white',
        textDecoration: 'none'
      }
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Grid style={this.styles.shell}>
          <Row>
            <Col style={this.styles.shell} xs={12}>
              <Paper zDepth={0} style={this.styles.container}>
                {this.props.children}
              </Paper>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}
