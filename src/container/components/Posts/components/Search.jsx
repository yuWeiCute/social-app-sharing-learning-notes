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


  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      fetchData(query)
    } else {
      fetchData(feedQuery)
    };
    return function cleanup() {

    };
  }, [searchTerm]);


  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
