import React from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Post from './Post';
import LazyLoad from 'react-lazyload';


const MasonryLayout = ({ pins }) => (
  <ResponsiveMasonry
    columnsCountBreakPoints={{ 350: 1, 780: 2, 1080: 3, 1980: 4 }}
  >
    <Masonry className=" animate-slide-fwd"
    // imagesLoadedOptions={breakpointColumnsObj}
    >
      {pins?.map((pin) =>
/*         <LazyLoad
          // scrollContainer={document.getElementById('root')}
          // scroll={true}
          // debounce={300}
          // offset={100}
          // height={200}
          // placeholder={<img width="100%" height="100%" src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016d795b61c8c6a801215c8f918e83.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648967541&t=6a0f18e0bb4a73d9282dc3622c718839'} alt="loading" />}
          key={pin._id}
        > */
          <Post key={pin._id} pin={pin} />
      )}
    </Masonry>
  </ResponsiveMasonry>
);

export default MasonryLayout;
