import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointColumnsObj = {
  default: 3,
  3000: 4,
  2000: 3,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => (
  <Masonry className=" flex animate-slide-fwd " breakpointCols={breakpointColumnsObj}>
    {pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max" />)}
  </Masonry>
);

export default MasonryLayout;
