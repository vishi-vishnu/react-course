import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface props {
  post: IPost;
}

interface like {
  userId: string | undefined;
}

export const Post = (props: props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likeDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likeDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const addlike = async () => {
    try {
      await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userID", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addlike}>
          {hasUserLiked ? <>&#128078; </> : <>&#128077;</>}
        </button>
        {likes && <p>Likes:{likes?.length}</p>}
      </div>
    </div>
  );
};
