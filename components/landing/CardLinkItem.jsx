import Link from "next/link";

const CardLinkItem = ({field,value,name,className}) => {
    return (
        <p className={`${className} text-gray-700`}>
           <span className="font-bold">{field}</span> :
           <Link href={value} passHref target="_blank" className=" ml-5 btn btn-primary">
               {name}
           </Link>
       </p>
    );
}

export default CardLinkItem;