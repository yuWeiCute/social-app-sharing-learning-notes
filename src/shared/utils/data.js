
export const userQuery = (userId) => {
  //try to get a document of type equal to user and underscore id is equal to user id
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};


export const categories = [
  {
    index: '#1',
    name: 'UI&UX',
    image: 'uiux'
  },
  {
    index: '#2',
    name: 'Javascript',
    image: 'javascript'
  },
  {
    index: '#3',
    name: 'Web App',
    image: 'web'
  },
  {
    index: '#4',
    name: 'Mobile App',
    image: 'mobile'
  }
];

//so the newest will show up
export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      title,
      description,
      categories[],
      projectLink,
      codeLink,
      postedBy->{
        _id
      },
      save[]{
        _key,
        postedBy->{
          _id,
        },
      },
    } `;

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && (pt::text(body) match '${searchTerm}*' || title match '${searchTerm}*' || categories[] match '${searchTerm}*')]{
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        categories[],
        projectLink,
        codeLink,
        postedBy->{
          _id
        },
        save[]{
          _key,
          postedBy->{
            _id,
          },
        },
      } `;
  return query;
};


export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    description,
    projectLink,
    codeLink,
    categories[],
    publishedAt,
    body,
    richtext,
    postedBy->{
      _id,
      userName,
      image
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  //alt添加
  return query;
};

export const pinDetailMorePostQuery = (pin) => {
  const query = `*[_type == "pin" && categories[] match '${pin.categories}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        categories[],
        projectLink,
        codeLink,
        postedBy->{
          _id
        },
        save[]{
          _key,
          postedBy->{
            _id,
          },
        },
      } `;
  return query;
};

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}' ] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        categories[],
        projectLink,
        codeLink,
        postedBy->{
          _id
        },
        save[]{
          _key,
          postedBy->{
            _id,
          },
        },
      } `;
  return query;
};

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        title,
        description,
        categories[],
        projectLink,
        codeLink,
        postedBy->{
          _id
        },
        save[]{
          _key,
          postedBy->{
            _id,
          },
        },
      } `;
  return query;
};

