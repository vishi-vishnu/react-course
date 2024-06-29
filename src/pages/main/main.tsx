import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

export const Main = () => {
  const [postsList, setPostList] = useState<Post[] | null>(null);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const q = query(postRef, limit(10)); // Limit to 10 posts for optimization
    const data = await getDocs(q);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []); // Fetch posts only once on component mount

  return (
    <div>
      {postsList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
export { Post };
