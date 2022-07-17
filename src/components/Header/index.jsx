import React from 'react';
import styles from './Header.module.scss';
function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.leftPart}>
          <img src='/img/logo.svg' alt='logo' />
          <div className={styles.logoText}>
            <h1>В ДОБРЫЕ РУКИ</h1>
            <p>БЕЗВОВЗМЕЗДНАЯ ПЕРЕДАЧА ВЕЩЕЙ</p>
          </div>
        </div>
        <div className={styles.rightPart}>
          <ul>
            <li>
              <button>
                <img src='/img/favoriteBtn.svg' alt='favorite' />
                Избранное
              </button>
            </li>
            <li>
              <button>
                <img src='/img/user.svg' alt='profile' />
                Профиль
              </button>
            </li>
            <li>
              <img src='' />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
