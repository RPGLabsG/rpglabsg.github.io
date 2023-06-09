/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  Youtube: {
    embedSrc: string;
    width: number;
    height: number;
  };
  Iframe: {
    iframeSrc: string;
    height: number;
  };
  video: {
    url: string;
  };
}> = {
  code_block: (props) => <Prism {...props} />,
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{dt.toISOString()}</span>;
      case "utc":
        return <span>{dt.toUTCString()}</span>;
      case "local":
        return <span>{dt.toLocaleDateString()}</span>;
      default:
        return <span>{dt.toLocaleDateString()}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-[700px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 ">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => {
    const ext = props?.url?.split(".")?.pop();
    if (["mp4", "avi", "webm"].includes(ext)) {
      return (
        <div className="flex items-center justify-center">
          <video width="100%" height="100%" controls>
            <source src={props.url} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <img src={props.url} alt={props.alt} />
      </div>
    );
  },
  video: (props) => {
    const ext = props?.url?.split(".")?.pop();
    if (!["mp4", "avi", "webm"].includes(ext)) {
      return (
        <div className="flex items-center justify-center">
          <img src={props.url} />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center">
        <video width="100%" height="100%" controls>
          <source src={props.url} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  },
  Iframe: ({ iframeSrc, height }) => {
    return <iframe width="100%" height={`${height}px`} src={iframeSrc} />;
  },
  Youtube: ({ embedSrc, width, height }) => (
    <iframe
      style={{ margin: "auto" }}
      width={width ? `${width}px` : `560`}
      height={height ? `${height}px` : `315`}
      src={embedSrc}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    ></iframe>
  ),
};

export const Post = (props) => {
  const theme = useTheme();

  const date = new Date(props.date);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy");
  }

  return (
    <Section className="flex-1 max-w-[900px] mx-auto">
      <Container width="small" className={`flex-1 pb-2`} size="large">
        {/* title */}
        <h2
          data-tinafield="title"
          className={`w-full relative	mb-8 text-6xl tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r bg-neutral-900`}
          >
            {props.title}
          </span>
        </h2>

        <h4 className="text-center">{props.category?.name}</h4>

        {/* Author */}
        <div
          data-tinafield="author"
          className="flex items-center justify-center mb-16"
        >
          {props.author && (
            <>
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-14 w-14 object-cover rounded-full shadow-sm"
                  src={props.author.avatar}
                  alt={props.author.name}
                />
              </div>
              <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                {props.author.name}
              </p>
              <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                —
              </span>
            </>
          )}
          <p
            data-tinafield="date"
            className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
          >
            {formattedDate}
          </p>
        </div>
      </Container>

      {/* Image */}
      {props.heroImg && (
        <div className="px-4 w-full">
          <div
            data-tinafield="heroImg"
            className="relative max-w-4xl lg:max-w-5xl mx-auto"
          >
            {(props.heroImg.endsWith("mp4") ||
              props.heroImg.endsWith("avi") ||
              props.heroImg.endsWith("webm")) && (
              <div>
                <video
                  src={props.heroImg}
                  width="100%"
                  height="100%"
                  className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                  aria-hidden="true"
                  controls
                >
                  <source src={props.heroImg} />
                  Your browser does not support the video tag.
                </video>
                <video
                  src={props.heroImg}
                  width="100%"
                  height="100%"
                  className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
                  controls
                >
                  <source src={props.heroImg} />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {!(
              props.heroImg.endsWith("mp4") ||
              props.heroImg.endsWith("avi") ||
              props.heroImg.endsWith("webm")
            ) && (
              <div>
                <img
                  src={props.heroImg}
                  className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                  aria-hidden="true"
                />
                <img
                  src={props.heroImg}
                  alt={props.title}
                  className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Line */}
      <div className="w-full h-[1px] bg-neutral-900 my-8"></div>

      {/* Content */}
      <Container className={`flex-1 pt-4`} width="small" size="large">
        <div className="prose dark:prose-dark w-full max-w-none font-sans">
          <TinaMarkdown components={components} content={props._body} />
        </div>
      </Container>
    </Section>
  );
};
