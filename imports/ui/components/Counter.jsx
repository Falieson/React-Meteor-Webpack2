import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  incrementOrDecrement({ increment = true, amount = 1 } = {}) {
    const result = (increment ? 1 : -1) * amount;
    const { count } = this.state;

    this.setState({ count: count + result });
  }

  render() {
    const style = { margin: '10px' };
    return (
      <Row>
        <Col xs={6}>
          Count: {this.state.count}
        </Col>
        <Col xs={3}>
          <RaisedButton
            label="Add 1"
            primary
            style={style}
            onTouchTap={() => this.incrementOrDecrement()}
          />
        </Col>
        <Col xs={3}>
          <RaisedButton
            label="Remove 1"
            primary
            style={style}
            onTouchTap={() => this.incrementOrDecrement({ increment: false })}
          />
        </Col>
      </Row>
    );
  }
}
