"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { TvShowSearchResult } from "@/models/tv-show";

export default function Home() {
  const [query, setQuery] = useState("columbus");
  const [tvShowSearchItems, setTvShowSearchItems] = useState<TvShowSearchResult[]>([]);

  async function GetTvShowResults() {
    // const query = "columbo";

    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const responseData = await response.json();

    setTvShowSearchItems(responseData as TvShowSearchResult[]);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} />
        <button type="button" onClick={() => GetTvShowResults()}>Get TV Shows for [{query}]</button>
        {/* <pre>{JSON.stringify(tvShowSearchItems, null, 2)}</pre> */}
        {/* <ul>
          {tvShowSearchItems.map(item => <li key={item.show.id}>{item.show.name}</li>)}
        </ul> */}

        <table border={1}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Genre</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {tvShowSearchItems.map(item => (
              <tr key={item.show.id}>
                <td>{item.show.name}</td>
                <td>{item.show.genres[0]}</td>
                <td><img src={item.show.image.medium} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Age</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">City</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300 hover:bg-gray-50 transition">
              <td className="px-4 py-2">Alice</td>
              <td className="px-4 py-2">25</td>
              <td className="px-4 py-2">London</td>
            </tr>
            <tr className="border-t border-gray-300 hover:bg-gray-50 transition">
              <td className="px-4 py-2">Bob</td>
              <td className="px-4 py-2">30</td>
              <td className="px-4 py-2">Bristol</td>
            </tr>
          </tbody>
        </table>



        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
