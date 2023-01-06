import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>Next Chat App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <Script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></Script>
    </>
  );
}
