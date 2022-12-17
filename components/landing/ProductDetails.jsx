import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import ProductDescription from './ProductDescription';


const ProductDetails = ({data,getImages}) => {

  const [item, setItem] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
      setImages(getImages);
      setItem(data);
  }, [data,getImages]);


  

    return (
        <>
        <div className='flex flex-col px-6 pt-5 lg:flex-row min-h-min'>
    
          <div className='w-full lg:w-1/2 h-fit whitespace-pre-wrap'>
             <ImageGallery
              items={images} 
              thumbnailClass='whitespace-pre-wrap'
              />
          </div>
          <div className='w-full lg:w-1/2'>
            <ProductDescription item={item} />
        </div>
        </div>
    </>
    );
}

export default ProductDetails;
