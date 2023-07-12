import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={220}
    height={450}
    viewBox="0 0 220 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="553" cy="275" r="20" />
    <rect x="1" y="3" rx="0" ry="0" width="215" height="290" />
    <rect x="2" y="306" rx="0" ry="0" width="215" height="74" />
    <rect x="51" y="396" rx="0" ry="0" width="120" height="35" />
  </ContentLoader>
);

export default ProductLoader;
