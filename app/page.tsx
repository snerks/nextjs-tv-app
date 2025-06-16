"use client";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { TvShowSearchResult } from "@/models/tv-show";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
          src="/vladimir-nikolic-ZII9ZhonGZU-unsplash.svg"
          alt="TV logo"
          width={76}
          height={76}
          priority
        />
        <Typography variant="h4" gutterBottom>
          TV Show Search
        </Typography>
        <ol>
          <li>
            Enter a search term in the <code>Search</code> box.
          </li>
          <li>Hit the <code>Search</code> button and see your results instantly.</li>
        </ol>

        {/* <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} />
        <button type="button" onClick={() => GetTvShowResults()}>Get TV Shows for [{query}]</button> */}

        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setQuery(e.target.value)} value={query} />
        <Button variant="contained" onClick={() => GetTvShowResults()}>Search TV Shows</Button>
        {/* <pre>{JSON.stringify(tvShowSearchItems, null, 2)}</pre> */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tvShowSearchItems.map(item => (
                <TableRow
                  key={item.show.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.show.name}
                  </TableCell>
                  <TableCell>{item.show.genres[0]}</TableCell>
                  <TableCell>{item.show.image && (
                    // <img src={item.show.image.medium} />
                    <Image
                      aria-hidden
                      src={item.show.image.medium}
                      alt="TV show image"
                      width={96}
                      height={144}
                    />
                  )}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <div className={styles.ctas}>
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
        </div> */}
      </main>
      <footer className={styles.footer}>
        {/* <a
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
        </a> */}
        Illustration by
        <a href="https://unsplash.com/@wwllaaddaa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Vladimir Nikolic</a>
        on <a href="https://unsplash.com/illustrations/a-black-and-white-drawing-of-a-tv-ZII9ZhonGZU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

        <a
          href="https://www.tvmaze.com"
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
          Go to tvmaze.com →
        </a>
      </footer>
    </div>
  );
}
