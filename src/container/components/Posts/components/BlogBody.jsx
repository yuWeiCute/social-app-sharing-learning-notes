import React from 'react'
import { sanityConfig, urlFor } from '../../../../client';
import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vs';
import { getImage, getImageDimensions } from '@sanity/asset-utils';

const myPortableTextComponents = {
  block: {
    // normal: ({ children }) => <p  className="c">{children}</p>,
    h1: ({ children }) => <h1 className="mt-4 mb-2 font-semibold text-3xl lg:text-4xl ">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-4 mb-2 font-semibold text-2xl lg:text-3xl ">{children}</h2>,
    h3: ({ children }) => <h2 className="mt-4 mb-2 font-semibold text-xl lg:text-2xl ">{children}</h2>,
    h4: ({ children }) => <h2 className="mt-4 mb-2 font-semibold text-lg lg:text-xl ">{children}</h2>,
    blockquote: ({ children }) => <blockquote className="leading-normal pl-3 pr-3 p-1.5 border-2 border-light-blue-500 border-opacity-100">{children}</blockquote>
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="list-disc list-inside mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => <ol className="m-auto text-lg">{children}</ol>,
  },
  marks: {
    link: props => (
      <a href={props.value.href}
        onClick={(e) => {
          e.stopPropagation();
        }}
        target="_blank"
        rel="noreferrer"
        className="text-navColor underline cursor-pointer transition-all duration-300 hover:text-secColor">
        {String(props.children).replace(/\n$/, '')}
      </a>
    ),
  },
  types: {
    customCode: ({ value }) => (
      <SyntaxHighlighter
        style={theme}
        language={value.code.language}
        className="bodyCode"
      >
        {String(value.code.code).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ),
    customImage: ({ value }) => {
      const imageData = getImage(value.asset, sanityConfig).asset;
      return (
        <img
          src={(imageData.url)}
          alt={value.alt}
        />
      );
    },
  }
}

const BlogBody = ({ pinDetail }) => {
  const blog = pinDetail.body;
  return (
      <PortableText 
        value={blog}
        components={myPortableTextComponents}
      />
  )
}

export default BlogBody