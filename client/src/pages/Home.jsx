import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl text-center">
          This is Nix!
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          <span className="font-bold text-black dark:text-white">
            Unleash your voice and share your ideas!
          </span>{" "}
          This blog is a vibrant community space where anyone can create, share,
          and discover. Craft insightful articles, post captivating stories, or
          simply engage in discussions. We welcome all perspectives and
          encourage you to contribute your unique voice to the conversation.
          Let's explore the power of shared knowledge together!
        </p>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts &rarr;
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
