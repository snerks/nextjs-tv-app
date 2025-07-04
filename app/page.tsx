"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { TvShowSearchResult } from "@/models/tv-show";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Define a custom theme
const theme = createTheme({
  palette: {
    mode: "dark", // or 'light'
    primary: { main: "#1976d2" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#fff" },
  },
});

export default function Home() {
  const [query, setQuery] = useState("columbus");
  const [tvShowSearchItems, setTvShowSearchItems] = useState<
    TvShowSearchResult[]
  >([]);

  async function GetTvShowResults() {
    // const query = "columbo";

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );
    const responseData = await response.json();

    setTvShowSearchItems(responseData as TvShowSearchResult[]);
  }

  return (
    <ThemeProvider theme={theme}>
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

          <ol className="hidden-mobile">
            <li>
              Enter a search term in the <code>Search</code> box.
            </li>
            <li>
              Hit the <code>Search</code> button and see your results instantly.
            </li>
          </ol>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              GetTvShowResults();
            }}
          >
            <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                // className={styles.tableContainer}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "var(--foreground)", // Text color
                    backgroundColor: "var(--background)", // Background color
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--foreground)", // Border color
                    },
                    "&.Mui-focused": {
                      backgroundColor: "var(--background)", // Background when focused
                      borderColor: "var(--background)",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "var(--foreground)", // Label color
                  },
                }}
              />

              {/* <div style={{ backgroundColor: "var(--background-color)", color: "var(--primary-color)" }}> */}
              {/* <TextField
          label="Custom TextField"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "var(--foreground)", // Text color
              backgroundColor: "var(--background)", // Background color
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--foreground)", // Border color
              },
              "&.Mui-focused": {
                backgroundColor: "var(--background)", // Background when focused
                borderColor: "var(--background)",
              },
            },
            "& .MuiInputLabel-outlined": {
              color: "var(--foreground)", // Label color
            },
          }}
        /> */}

              <Button
                type="submit"
                variant="contained"
                aria-label="Search TV Shows"
              >
                Search TV Shows
              </Button>
              {/* <pre>{JSON.stringify(tvShowSearchItems, null, 2)}</pre> */}
            </Stack>
          </form>

          {tvShowSearchItems && tvShowSearchItems.length > 0 && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 200 }}
                aria-label="simple table"
                className={styles.tableContainer}
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.tableContainer}>
                      Name
                    </TableCell>
                    <TableCell className={styles.tableContainer}>
                      Genre
                    </TableCell>
                    <TableCell className={styles.tableContainer}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tvShowSearchItems.map((item) => (
                    <TableRow
                      key={item.show.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={styles.tableContainer}
                      >
                        {item.show.name}
                      </TableCell>
                      <TableCell className={styles.tableContainer}>
                        {item.show.genres[0]}
                      </TableCell>
                      <TableCell>
                        {item.show.image && (
                          // <img src={item.show.image.medium} />
                          <Image
                            aria-hidden
                            src={item.show.image.medium}
                            alt="TV show image"
                            width={96}
                            height={144}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </main>

        <footer className={styles.footer}>
          <div className={styles.item}>
            Illustration by
            <a href="https://unsplash.com/@wwllaaddaa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Vladimir Nikolic
            </a>
            on{" "}
            <a href="https://unsplash.com/illustrations/a-black-and-white-drawing-of-a-tv-ZII9ZhonGZU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </a>
          </div>

          <div className={styles.item}>
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
              <span style={{ marginLeft: 5 }}>Go to tvmaze.com →</span>
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
