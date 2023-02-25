import React, {useState} from 'react';
import { allProducts } from './../functions/data';

export const ProductsFilters = (props) =>
{
  const [searchVal, setSearchVal] = useState('');
  // console.log(allProducts[1]);



  const filterBySearch = (e, searchVal) =>
  {
    e.preventDefault();
    // props.setProductArray(allProducts[1].products)
    // console.log(searchVal.toLocaleLowerCase());

    props.setProductType(searchVal.toLowerCase());
    setSearchVal("");
  }


  return (
    <section className="products-filters">
      <h2 className='filters-header'>Filters</h2>

      <div className="filters-center">
        <div className="product-type-div">
          <span className='product-type-span'>Search Product Type</span>
          <form action="" className="product-filter-form" onSubmit={(e) => filterBySearch(e, searchVal)}>
            <input type="text" className="product-search-filter" value={searchVal} placeholder='e.g. Protien Powder' 
                   onChange={(e) => setSearchVal(e.target.value)} />
            <button className="product-form-btn">Submit</button>
          </form>
        </div>

      </div>
    </section>
  );
}