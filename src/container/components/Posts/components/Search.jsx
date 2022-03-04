import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../../../../client';
import { feedQuery, searchQuery } from '../../../../shared/utils/data';
import Spinner from '../../../../shared/components/Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      console.log(searchTerm);
      const query = searchQuery(searchTerm);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
      )}
    </div>
  );
};

export default Search;
