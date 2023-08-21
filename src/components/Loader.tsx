import styles from '../scss/components/loader.module.scss';

const Loader: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.loader}></div>
      </div>
    </>
  );
};

export default Loader;
