// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.scss';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>YalerProxy</h2>
          <div className={styles.typeSelect}>
            <p>Would you like to run as a Yaler or Relay?</p>

            <Link className={styles.typeYaller}>
              Yaller
            </Link>

            <Link className={styles.typeRelay}>
              Relay
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
