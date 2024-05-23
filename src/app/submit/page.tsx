"use client";
import React, { useState, ChangeEvent, SyntheticEvent } from "react";

export default function MyForm() {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    // Create URL-encoded string
    const formBody = new URLSearchParams();
    formBody.append("title", title);
    formBody.append("url", url);
    const access_token: string | null = localStorage.getItem("access_token");
    console.log(access_token);

    try {
      const response = await fetch("http://localhost:3001/submit", {
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
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          name="title"
        />
      </label>
      <br />
      <label>
        URL:
        <input type="text" value={url} onChange={handleUrlChange} name="url" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
