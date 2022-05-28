import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';
import { categories } from '../../../shared/utils/data';

const Searchbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [inputWithDelay, setInputWithDelay] = useState("");
  // const [update, setUpdate] = useState(true);
  // const firstUpdate = useRef(true);

  //debounce 延迟显示
  useEffect(() => {
    // if (firstUpdate.current) {
    //   setInputWithDelay(input)
    //   firstUpdate.current = false;
    //   return;
    // }
    const handler = window.setTimeout(() => {
      const { options } = categories;
      const newFilteredoptions = options.filter(
        option =>
          option.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
      //将筛选后的列表放入state
      setFiltered(newFilteredoptions);
      setInputWithDelay(searchTerm)
      console.log(inputWithDelay);
    }, 200)
    return () => {
      clearTimeout(handler);
    }
  }, [searchTerm])

  //输入改变时
  const onChange = e => {
    setIsShow(true);
    setsearchTerm(e.currentTarget.value)
  };

  //下拉框选择 填充至输入框
  const onClick = e => {
    setFiltered([]);
    setIsShow(false);
    setsearchTerm(e.currentTarget.innerText)
  };

  //提示的文本列表中，将输入框中的文字高亮显示
  const filterHighlighter = (option, searchTerm) => {
    const arr = option.toLowerCase().split(searchTerm.toLowerCase())
    const viewArr = new Array()
    let startIndex = 0, endIndex = 0
    for (let i = 0; i < arr.length; i++) {
      endIndex += arr[i].length
      viewArr.push([option.substring(startIndex, endIndex)])
      startIndex = endIndex
      endIndex += searchTerm.length
      viewArr[i].push(option.substring(startIndex, endIndex))
      startIndex = endIndex
    }
    return viewArr
  }

  //所提示的文字以列表形式呈现
  const renderdemo = () => {
    if (isShow && searchTerm) {
      if (filtered.length) {
        return (
          <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
            {filtered.map((option, index) => {
              const viewArr = filterHighlighter(option, inputWithDelay)
              // console.log(viewArr);
              return (
                <li className="mr-3 flex-1" key={option} onClick={onClick}>
                  {viewArr.map((_, index) => {
                    return (
                      <span key={index}>
                        {viewArr[index][0]}
                        <span className="text-blue">{viewArr[index][1]}</span>
                      </span>
                    )
                  })}
                </li>
              );
            })}
          </ul>
        );
      } else {
        {
          return (
            <div className="no-demo">
              <em>Not found</em>
            </div>
          );
        }
      }
    }
  }

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-2 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={onChange}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/work/search')}
          className="p-2 w-full bg-white outline-none"
        />
        {renderdemo()}
      </div>
      <div className="flex gap-3 ">


        <Link to="/create-post"
          className="rounded-lg w-10 h-10 flex justify-center items-center shadow text-white bg-secondaryColor hover:bg-transparent transition-all duration-500 hover:text-secColor font-bold"
        // className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <p data-tip="add post for demo version (will be be invisible to unauthorized users later)" >
            <IoMdAdd />
          </p>
          <ReactTooltip />
        </Link>
      </div>
    </div>
  );
};

export default Searchbar;
