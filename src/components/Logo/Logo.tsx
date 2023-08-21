import logo from '../../assets/leaflogo.png';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className="logoContainer">
      <img src={logo} alt="Logo" className={styles.logoImage} />
    </div>
  );
};

export default Logo;
