
export const userQuery = (userId) => {
  //try to get a document of type equal to user and underscore id is equal to user id
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};


export const categories = [
  {
    name: 'UI&UX',
    image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
  },
  {
    name: 'Javascript',
    image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
  },
  {
    name: 'Web App',
    image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
  },
  {
    name: 'Mobile App',
    image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
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
  const query = `*[_type == "pin" && pt::text(body) match '${searchTerm}*' || title match '${searchTerm}*' || categories[] match '${searchTerm}*']{
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

