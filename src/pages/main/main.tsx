import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
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
  const [postsList, setPostList] = useState<Post[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(false);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    setLoading(true);
    let q = query(postRef, limit(10));
    if (lastVisible) {
      q = query(postRef, limit(10), startAfter(lastVisible));
    }
    const data: QuerySnapshot = await getDocs(q);
    const posts = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Post[];
    setPostList((prevPosts) => [...prevPosts, ...posts]);
    setLastVisible(data.docs[data.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <button onClick={getPosts} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};
