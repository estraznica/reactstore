import styles from './loader.module.scss';

function Loader() {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.loader}></div>
      </div>
    </>
  );
}

export default Loader;
