"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
interface news {
  title: string;
  url: string;
  uploadedAt: Date;
  userId: number;
  upvotes: number;
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
      setnews(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function isValidUrl(string:string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  function extractBaseUrl(url:string) {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }
  return (
    // <div className = {styles.main}></div>
    <main className={styles.newpage}>
      {news.map((item, index) => {
        return (
          <div className={styles.news_item}>
            <div className={styles.news_index}>{index + 1}.</div>
            <Image
              src={"/upvote-svgrepo-com.svg"}
              alt="upvote"
              height={12}
              width={12}
              className={styles.upvote}
            />
            <div>
              <div className={styles.top}>
                <span className={styles.news_title}>{item.title}</span>
                {/* <span className={styles.website}>{item.website}</span>
              </div>
              <div className={styles.bottom}>
                <span>
                  {item.point} points by {item.username} {item.uploadTime}{" "}
                  minutes ago{" "}
                </span> */}
                <span>unvote</span>
                <span>hide</span>
                <span>comments</span>
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/y18.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
