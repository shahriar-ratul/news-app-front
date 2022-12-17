import Link from 'next/link';
const FooterMenuItem = ({ title, type, url }) => {
  function listItemRender() {
    if (type === 'header') {
      return (
        <div className='text-xl font-semibold uppercase text-sky-300'>
          {title}
        </div>
      );
    } else if (type === 'link') {
      return (
        <Link href={url} className='hover:text-primary'>
          {title}
        </Link>
      );
    } else if (type === 'btnLink') {
      return (
        (<Link
          href={url}
          className='btn btn-outline btn-primary btn-sm text-white rounded'>

          {title}

        </Link>)
      );
    } else if (type === 'extralink') {
      return (
        <a href={url} className='hover:text-primary'>
          {title}
        </a>
      );
    } else if (type === 'title') {
      return <div className='text-base text-white'>{title}</div>;
    } else if (type === 'subtitle') {
      return <div className='text-sm text-gray-200'>{title}</div>;
    } else {
      return null;
    }
  }

  return listItemRender();
};

export default FooterMenuItem;
