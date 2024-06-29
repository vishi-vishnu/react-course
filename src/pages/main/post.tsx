import { useMemo, useState, useEffect } from "react";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[]>([]);
  const [hasUserLiked, setHasUserLiked] = useState(false);

  const likesRef = useMemo(() => collection(db, "likes"), []);
  const likesDoc = useMemo(
    () => query(likesRef, where("postId", "==", post.id)),
    [likesRef, post.id]
  );

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const likesData = data.docs.map((doc) => ({
      userId: doc.data().userId,
      likeId: doc.id,
    }));
    setLikes(likesData);
    setHasUserLiked(likesData.some((like) => like.userId === user?.uid));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      setLikes((prev) => [...prev, { userId: user?.uid!, likeId: newDoc.id }]);
      setHasUserLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      await deleteDoc(doc(db, "likes", likeId));
      setLikes((prev) => prev.filter((like) => like.likeId !== likeId));
      setHasUserLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, [post.id]);

  return (
    <div className="post-container">
      <div className="post-title">
        <h1>{post.title}</h1>
      </div>
      <div className="post-body">
        <p>{post.description}</p>
      </div>
      <div className="post-footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <> &#128078; </> : <> &#128077; </>}
        </button>
        {likes.length > 0 && <p>Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
