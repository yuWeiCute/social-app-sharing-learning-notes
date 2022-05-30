import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../../../../client';
import { feedQuery, searchQuery } from '../../../../shared/utils/data';
import Spinner from '../../../../shared/components/Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async (postsQuery) => {
    try {
      const data = await client.fetch(postsQuery);
      if (data) {
        setPins(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }


  //debounce 延迟显示
  useEffect(() => {
    // if (firstUpdate.current) {
    //   setInputWithDelay(input)
    //   firstUpdate.current = false;
    //   return;
    // }
    let isUnmounted = false;

    const handler = window.setTimeout(() => {
      //将筛选后的列表放入state
      if (searchTerm !== '') {
        setLoading(true);
        if (!isUnmounted) {
          const query = searchQuery(searchTerm.toLowerCase());
          fetchData(query)
        }
      } else {
        fetchData(feedQuery)
      };
    }, 200)
    return () => {
      clearTimeout(handler);
      isUnmounted = true;
    }
  }, [searchTerm])


  return (
    <div>
      {loading && <Spinner message="Searching for you..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Project Found!</div>
      )}
    </div>
  );
};

export default Search;
