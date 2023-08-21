import styles from './Overlay.module.css';

const Overlay = () => {
  return (
    <div className={styles.overlayContainer}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Overlay;
