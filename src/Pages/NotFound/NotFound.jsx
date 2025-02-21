import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center ">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl font-semibold mt-10">File not found</p>
      <p className="text-gray-600 mt-10">
        The site configured at this address does not contain the requested file.
      </p>
      <p className="text-gray-600 mt-10">
        If this is your site, make sure that the filename case matches the URL
        as well as any file permissions.
      </p>
      <p className="text-gray-600 mt-10">
        For root URLs <small className="text-sm">(like <small> http://example.com/</small> )</small> you must provide an <small> index.html</small> file.
      </p>
      <p className=" mt-10 "><a className="text-blue-500 hover:text-blue-500 hover:underline" href="https://docs.github.com/en/pages">Read the full documentation</a> for more information about using GitHub Pages.</p>
      <p className="text-gray-700 mt-10 text-sm"> <a href="https://www.githubstatus.com/">GitHub Status</a> — @<a href="https://x.com/githubstatus?mx=2">githubstatus</a></p>
    </div>
  );
}