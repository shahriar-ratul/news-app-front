const CardTextItem = ({field,value,className}) => {
    return (
         <p className={`${className} text-gray-700`}>
            <span className="font-bold">{field}</span> : {value}
        </p>  
    );
}

export default CardTextItem;