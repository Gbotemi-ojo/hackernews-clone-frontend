"use client";
import { useSearchParams } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
export default function items() {
  const postIdParams = useSearchParams();
  const postId = postIdParams.get("id");
  const [comment, setcomment] = useState("");
  const [allComments, setallComments] = useState<{}[]>([]);
  async function handleComment(event: React.SyntheticEvent) {
    event.preventDefault();
    const formBody = new URLSearchParams();
    formBody.append("comment", comment);
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://localhost:3001/item?id=${postId}`, {
        method: "POST",
        body: formBody.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `bearer ${access_token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setcomment(event.target.value);
  };
  async function getAllComments() {
    try {
      const allComments = await fetch(
        `http://localhost:3001/comments?id=${postId}`
      );
      const data = await allComments.json();
      console.log(data);
      setallComments(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      <form onSubmit={handleComment}>
        <label>
          Title:
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            name="comment"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
