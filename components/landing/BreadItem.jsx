import Link from "next/link";

const BreadItem = ({icon,link,onlyicon,TextOnly,text,active,current}) => {
    return <>
    {
        TextOnly &&
        <Link
          href={link}
          className={`text-gray-600 dark:text-gray-200 hover:underline ${active} && text-blue-600`}>

          {text}

        </Link>
  }
      
  {
      current &&
    
      <span className={`text-gray-600 dark:text-gray-200 hover:underline ${active} && text-blue-600 disabled`} >
        {text}
      </span>
     

    }

    {!onlyicon ?(
     (<Link href={link} className="text-gray-600 dark:text-gray-200">

       {icon}

     </Link>)
    ) : (
        <span className='mx-5 text-gray-500 dark:text-gray-300'>
        {icon}
        </span>
    )
    }
    </>;
}

export default BreadItem;