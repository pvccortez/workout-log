import React from 'react'

export const SingleProduct = (props) =>
{

  // console.log(props.info);

  return(
    <article className="single-product">
      <span className="product-name">{props.info.name}</span>

      <div className="single-product-center">
        <img src={props.info.img} className="single-product-img" alt="" />

        {/* <div className="info-div">
          
          <span className="product-desc">{props.info.desc}</span>
          <span className='product-level'>
            <span className="bold-span">Level:</span> {props.info.level}
          </span>
          <span className="product-notes">
            <span className="bold-span">Notes: </span> {props.info.notes}
          </span>
          
        </div> */}

        <a href={props.info.url} target='_blank' className="product-btn">Amazon</a>
      </div>
      
    </article>
  )
}