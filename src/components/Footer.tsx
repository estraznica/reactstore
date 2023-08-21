import React from 'react';
import styles from '../scss/components/footer.module.scss';

const Footer: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.footer}>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nesciunt veniam
            accusantium quis dignissimos tempora nam quaerat porro, voluptates necessitatibus eaque
            totam. Sequi beatae voluptatem qui quod sed quisquam commodi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Excepturi corporis obcaecati molestias repudiandae quo
            minus quae exercitationem accusantium odio error, earum maxime hic consectetur, expedita
            quas natus deleniti dicta aliquid.
          </div>
          <div className={styles.text}>2023</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
