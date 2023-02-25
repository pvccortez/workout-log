import React from 'react';
import { ProductsFilters } from './productsfilters';


export const ProductsSidebar = (props) =>
{

  return (
    <aside className="sidebar">
      <ProductsFilters  setProductType={props.setProductType}/>
    </aside>
  );
}