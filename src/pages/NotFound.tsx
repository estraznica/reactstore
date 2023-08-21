import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/pages/notfound.module.scss';

const Notfound: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div>Page 404 is not found :(</div>
          <Link to="/" className={styles.back}>
            back to reactStore
          </Link>
        </div>
      </div>
    </>
  );
};

export default Notfound;
