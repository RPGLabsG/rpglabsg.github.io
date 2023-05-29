import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import format from "date-fns/format";

export const FeaturedPosts = ({ data }) => {

  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        const date = new Date(post.date);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM dd, yyyy");
        }
        console.log('post: ', post)
        return (
          <div className="px-4 w-1/2 pb-8">
            
          <Link
            key={post._sys.filename}
            href={`/posts/` + post._sys.filename}
            passHref
          >
            
            <a
              key={post.id}
              className="group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800 h-full"
            >
              {/* POst image */}
    
              <img src={post?._values.heroImg} alt="" />



              <h3
                className={`text-gray-700 dark:text-white text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out bg-gold`}
              >
                {post._values.title}{" "}
                <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" />
                </span>
              </h3>
              <div className="prose dark:prose-dark w-full max-w-none mb-5 opacity-70">
                <TinaMarkdown content={post._values.excerpt} />
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-2">
                  <img
                    className="h-10 w-10 object-cover rounded-full shadow-sm"
                    src={post?.author?.avatar}
                    alt={post?.author?.name}
                  />
                </div>
                <p className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white">
                  {post?.author?.name}
                </p>
                {formattedDate !== "" && (
                  <>
                    <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                      —
                    </span>
                    <p className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                      {formattedDate}
                    </p>
                  </>
                )}
              </div>
            </a>
          </Link>
          
          </div>
        );
      })}
    </>
  );
};
