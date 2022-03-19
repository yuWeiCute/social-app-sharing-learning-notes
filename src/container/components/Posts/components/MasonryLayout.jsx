import React, { FC, useCallback, useState, useReducer, useRef, useEffect } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import Masonry from 'masonry-layout'  //实现瀑布流
import Post from './Post';

const MasonryLayout = ({ pins }) => {

  const clientRef = useRef(null);
  const scrollRef = useRef(null);

  const curPageSize = 10 < pins.length ? 10 : pins.length   //一页多少项 需大于一面可以展示的项数

  const initState = {
    curPage: 2,
    noData: false,
    listDataNum: curPageSize,
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'APPEND':
        return {
          listData: action.payload.listData,
        };
      default:
        return { ...state, ...action.payload };
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const getPageData = (page, pageSize) => {
    let number = page * pageSize
    number = number >= pins.length ? state.listDataNum : number
    return number;
  };

  /**
   * @method handleScroll
   * @description: 滚动事件监听
   */
  const handleScroll = () => {
    const { clientHeight: wrapperHeight } = scrollRef.current;   // 内容详细
    const { scrollTop, clientHeight } = clientRef.current;  //页面信息
    // 当临界元素进入可视范围时,加载下一页数据
    console.log('handleScroll');
    if (!state.noData && wrapperHeight - scrollTop <= clientHeight) {
      console.log(state.curPage);
      const newData = getPageData(state.curPage, curPageSize);
      dispatch({
        payload: {
          curPage: state.curPage + 1,
          noData: newData == state.listDataNum,
        },
      });
      dispatch({
        type: 'APPEND',
        payload: { listDataNum: newData },
      });

    }
  }


  return (
    <div
      className="pb-2 flex-1 w-full h-screen overflow-y-scroll"
      ref={clientRef} onScroll={handleScroll}>
      <ul ref={scrollRef} >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 780: 2, 1080: 3, 1980: 4 }}>
          <Masonry className=" animate-slide-fwd">
            {pins?.slice(0, state.listDataNum).map((pin) => <Post key={pin._id} pin={pin} className="w-max" />)}
          </Masonry>
        </ResponsiveMasonry>
      </ul>
    </div >
  );
}

export default MasonryLayout;
