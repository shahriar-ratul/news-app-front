import React from 'react';
import ReactLoading from 'react-loading';

const ReactLoader = ({ type, color,height,width}) => (
	<ReactLoading type={type ? type : 'bars'} color={color ? color : '#808080'} height={height? height :'20%'} width={width ? width : '20%'} />
);

export default ReactLoader;