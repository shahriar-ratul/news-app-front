import BreadItem from './BreadItem';
import { HiHome, HiChevronRight } from 'react-icons/hi';

const HomeBreadCrumbs = () => {
  return (
    <>
      <div className='bg-gray-200 dark:bg-gray-800 rounded mr-2'>
        <div className='container flex items-center px-6 py-2 mx-auto overflow-y-auto whitespace-nowrap'>
          <BreadItem icon={<HiHome />} link='/'  onlyicon={false} />

          <BreadItem icon={<HiChevronRight />} onlyicon={true} />
        </div>
      </div>
    </>
  );
};

export default HomeBreadCrumbs;
