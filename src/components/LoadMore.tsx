import React from 'react';
import styles from '../scss/components/loadmore.module.scss';

function LoadMore() {
  return (
    <div className={styles.root}>
      <div className={styles.load}>Load more..</div>
    </div>
  );
}

export default LoadMore;
