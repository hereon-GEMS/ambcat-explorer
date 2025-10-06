import React, { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface PostViewerProps {
  path: string; // path to markdown in /public
}

const PostViewer: React.FC<PostViewerProps> = ({ path }) => {
  const [content, setContent] = useState<string>("Loading...");

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent("⚠️ Unable to load markdown file at " + path));
  }, [path]);

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <MarkdownRenderer markdown={content} />
    </div>
  );
};

export default PostViewer;
