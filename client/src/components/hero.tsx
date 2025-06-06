import styles from "./hero.module.css";

export function Hero() {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Вечная Элегантность</h2>
          <p className={styles.subtitle}>Отреставрированный антиквариат с историей</p>
          <button 
            onClick={scrollToCatalog}
            className={styles.button}
          >
            Изучить Коллекцию
          </button>
        </div>
      </div>
    </section>
  );
}
