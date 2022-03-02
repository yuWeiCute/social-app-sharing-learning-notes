import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
  //https://www.npmjs.com/package/@sanity/client?source=post_page---------------------------
  //api参考网站
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-02-02',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
