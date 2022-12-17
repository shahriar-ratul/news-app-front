import React from 'react';

const TitleBar = ({ title }) => {
  return (
    <div className='container text-xl rounded bg-sky-600 mx-auto text-white font-semibold px-6 py-1 mb-2'>
      {title}
    </div>
  );
};

export default TitleBar;
