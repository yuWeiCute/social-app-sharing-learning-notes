import React, { useState, useEffect } from 'react';
//with this you can find which category been looking at
import { useParams } from 'react-router-dom';

import { client } from '../../../../client';
import { feedQuery, searchQuery } from '../../../../shared/utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from '../../../../shared/components/Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);

  const [pins, setPosts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });

    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);



  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} projects...`} />
    );
  }
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} className="px-5"/>
      )}
    </div>
  );
};

export default Feed;
