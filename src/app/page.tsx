"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import items from "./item/page";
interface news {
  id: number;
  title: string;
  url: string;
  username: string;
  uploadedAt: string;
  userId: number;
  upvotes: number;
  comments: number;
}
export default function Home() {
  const [news, setnews] = useState<news[]>([]);
  const url = "http://localhost:3001";
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const getNews = await fetch(`${url}/news`);
      const data = await getNews.json();
      let convertedData = convertOldArrayToNewestArray(data);
      setnews(convertedData);
      console.log(data);
      console.log(convertedData);
    } catch (error) {
      console.log(error);
    }
  }

  function isValidUrl(string: string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  function extractBaseUrl(url: string) {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }
  function convertOldArrayToNewestArray(oldArray: any) {
    return oldArray.map((item: any) => ({
      id: item.id,
      upvotes: item.upvotes,
      title: item.title,
      url: item.url,
      username: item.user.username,
      userId: item.userId,
      comments: item._count.comment,
      uploadedAt: moment(item.uploaded_At).fromNow(),
    }));
  }
  return (
    <ul className={styles.newslist}>
      {news.map((item, index) => (
        <li key={item.id} className={styles.newsitem}>
          <span className={styles.rank}>{index + 1}.</span>
          <span className={ styles.vote}>
            <a href="#">▲</a>
          </span>
          <div className={styles.details}>
            <a href={item.url} className={ styles.title}>
              {item.title}
            </a>
            <span className={styles.source}> ({item.url})</span>
            <br />
            <span className={styles.subtext}>
              {item.upvotes} points by <a href="#">{item.username}</a>{" "}
              {item.uploadedAt} | <a href="#">{item.comments} comments</a>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
