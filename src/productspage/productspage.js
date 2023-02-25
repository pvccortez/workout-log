import React, {useState} from 'react';
import { SingleProduct } from './singleproduct.js';
import {allProducts} from './../functions/data.js'

export const ProductsPage = (props) =>
{
  const [productArrays, setProductArray] = useState(allProducts);

  // console.log("rerendering products page");
  // console.log(props.productType);

  


  const displayProducts = (searchVal) => 
  {
    let newArray =[];
    console.log(searchVal);
    if(searchVal === 'All')
    {
      newArray = allProducts;
    }

    else
    {
      newArray = allProducts.filter((array) =>
      {
        console.log(array.type, searchVal);
        if(array.type.includes(searchVal))
        {
          return array;
        }
      });
    }


    return newArray.map(array =>
        {
          return array.products.map(item =>
            {
              return <SingleProduct info={item}/>
            })
        })
  }

  return (
    <section className="products-page">
      <h1 className='products-header'>Featured Products</h1>

      <div className="products-page-center" >
        {displayProducts(props.productType)}
      </div>
      
      
    </section>
  )
}