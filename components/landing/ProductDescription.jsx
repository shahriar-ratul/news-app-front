import CardTextItem from './CardTextItem';
import CreateForm from '../forms/inquiryForm/CreateForm';
import EmailForm from '../forms/inquiryForm/EmailForm';
import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  EmailShareButton,
} from 'react-share';
import { sanitize } from 'isomorphic-dompurify';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";
import { useEffect, useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import axios from 'axios';
import createAuthStore from '../../store/authStore';
import { success } from 'daisyui/src/colors';
import Cookies from 'js-cookie';
import CardLinkItem from './CardLinkItem';

const ProductDescription = ({ item }) => {

  const MySwal = withReactContent(Swal);
  const [manufacture, setManufacture] = useState([]);
  const [ref, setRef] = useState([]);
  const [langYear, setlangYear] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [format, setFormat] = useState([]);
  const [videoLabel, setVideoLabel] = useState([]);
  const [locationLabel, setLocationLabel] = useState([]);
  const [deliveryLabel, setDeliveryLabel] = useState([]);
  const [priceLabel, setPriceLabel] = useState([]);

  const [convertPrice, setConvertPrice] = useState(null);

  const [message, setMessage] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();

  const token = Cookies.get('token');

  async function handleClick(e) {

    try {
      let result = await MySwal.fire({
        title: "Are you sure?",
        text: "You want to add this product to your Favorite?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, Add it!",
      });

      if (result.isConfirmed) {
        if (!token) {
          router.push('/login');
        }
        if(token){
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`/api/user/fav/machine/${item.id}`);
          if (response.data.success) {
            setMessage(response.data.message);
            setFavorite(true);
          }
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error) {
      MySwal.fire("Error", "Something went wrong", "error");
    }
  }

  
  async function handleRemoveFav(e) {

    try {
      let result = await MySwal.fire({
        title: "Are you sure?",
        text: "You want to remove this product from your Favorite?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#570DF8",
        cancelButtonColor: "#EB0808",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        if (!token) {
          router.push('/login');
        }
        if(token){
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`/api/user/fav/machine/remove/${item.id}`);
          if (response.data.success) {
            setMessage(response.data.message);
            setFavorite(false);
          }
        }
      } else if (result.isDismissed) {
        MySwal.fire("Cancelled", "Your Data is safe :)", "error");
      }
    } catch (error) {
      MySwal.fire("Error", "Something went wrong", "error");
    }
  }

  

  useEffect(() => {
      if(item){
        setFavorite(item.favorite);
        if(item.currency){
          setConvertPrice(item.price +" " + item.currency);
        }else{
          setConvertPrice(item.price);
        }
        
      }
  }, [item]);


  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const shareUrl = `${origin}/${asPath}`;
  // console.log(shareUrl);

  return (
    <div className='mx-5'>
      <article className='prose py-4 border-b-2 border-slate-200'>
        <h1>{item.title}</h1>
      </article>

      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={ref && !isNull(ref.value) ? ref.value : ref.value_en}
          value={item?.ref_no}
        />
      </article>

      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            manufacture && !isNull(manufacture.value)
              ? manufacture.value
              : manufacture.value_en
          }
          value={item.manufacturer_name}
        />
      </article>

      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            langYear && !isNull(langYear.value)
              ? langYear.value
              : langYear.value_en
          }
          value={item.year_of_manufacture}
        />
      </article>

      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            availability && !isNull(availability.value)
              ? availability.value
              : availability.value_en
          }
          value={item.status}
        />
      </article>

      {item.display_price == true ? (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            priceLabel && !isNull(priceLabel.value)
              ? priceLabel.value
              : priceLabel.value_en
          }
          // field={'Price'}
          value={convertPrice}
        />
      </article>
      ): null}

      {item.location && (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            locationLabel && !isNull(locationLabel.value)
              ? locationLabel.value
              : locationLabel.value_en
          }
          value={item.location}
        />
      </article>
      )}

      
      {item.format && (
      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            format && !isNull(format.value)
              ? format.value
              : format.value_en
          }
          value={item.format}
        />
      </article>
      )}

      {item.delivery_terms && (
      <article className='prose py-4 border-b-2 border-slate-200'>
        <CardTextItem
          className='text-lg'
          field={
            deliveryLabel && !isNull(deliveryLabel.value)
              ? deliveryLabel.value
              : deliveryLabel.value_en
          }
          value={item.delivery_terms}
        />
      </article>
      )}

      {item?.video_1 && (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardLinkItem
          className='text-lg'
          field={
            videoLabel && !isNull(videoLabel.value)
              ? videoLabel.value
              : videoLabel.value_en
          }
          name="click here"
          value={item.video_1}
        />
      </article>
      )}
        
      {item?.video_2 && (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardLinkItem
          className='text-lg'
          field={
            videoLabel && !isNull(videoLabel.value)
              ? videoLabel.value
              : videoLabel.value_en
          }
          name="click here"
          value={item.video_2}
        />
      </article>
      )}
      {item?.video_3 && (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardLinkItem
          className='text-lg'
          field={
            videoLabel && !isNull(videoLabel.value)
              ? videoLabel.value
              : videoLabel.value_en
          }
          name="click here"
          value={item.video_3}
        />
      </article>
      )}
      {item?.video_4 && (
        <article className='prose py-4 border-b-2 border-slate-200'>
        <CardLinkItem
          className='text-lg'
          field={
            videoLabel && !isNull(videoLabel.value)
              ? videoLabel.value
              : videoLabel.value_en
          }
          name="click here"
          value={item.video_4}
        />
      </article>
      )}

      <div className="space-y-2 font-normal text-lg font-sans text-gray-500 mt-4"
                dangerouslySetInnerHTML={{ __html: sanitize(item?.description)}} >
          </div>

      {message && (
        <article className='prose py-4 border-b-2 border-slate-200'>
          <h3 className='text-green-600'>{message}</h3>
        </article>
      )}

      <article className='prose py-4 border-b-2 border-slate-200 flex justify-start'>
        <div className='Demo__some-network'>
          <FacebookShareButton
            url={shareUrl}
            quote={item.title}
            className='Demo__some-network__share-button'
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={item.title}
            body={`Hello Here is machine Details Check this out`}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>

        {favorite  ? (
        <HiHeart
          className='h-7 w-7 text-green-600 cursor-pointer'
          onClick={e => handleRemoveFav()}
        /> ): (
        <HiHeart
        className='h-7 w-7 text-red-600 cursor-pointer'
        onClick={e => handleClick()}
      /> 
        )}
      
      </article>

      <article className='prose py-4 border-b-2 border-slate-200 flex justify-around'>
        {item && <CreateForm item={item} />}
        {item && <EmailForm item={item} />}
      </article>
    </div>
  );
};

export default ProductDescription;
