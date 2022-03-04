import React from 'react';
import Masonry from 'react-masonry-css';
import Post from './Post';
import LazyLoad from 'react-lazyload';

const breakpointColumnsObj = {
  default: 3,
  3000: 4,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => (
  <Masonry className=" flex animate-slide-fwd " breakpointCols={breakpointColumnsObj}>
    {pins?.map((pin) =>
      <LazyLoad
        scrollContainer={document.getElementById('root')}
        scroll={true}
        debounce={300}
        offset={300}
        height={"100px"}
        placeholder={<img width="100%" height="100%" src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016d795b61c8c6a801215c8f918e83.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648967541&t=6a0f18e0bb4a73d9282dc3622c718839'} alt="loading" />}
        key={pin._id}
      >
        <Post  pin={pin} className="w-max " />
      </LazyLoad>
    )}
  </Masonry>
);

export default MasonryLayout;
