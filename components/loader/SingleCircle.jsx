import Lottie from 'react-lottie';
import * as animationData from '../json/singleCIrcle.json'

const SingleCircle = ({height,width}) => {

      const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
          <Lottie options={defaultOptions}
              height={height}
              width={width}
              />
        </div>
    );
}

export default SingleCircle;