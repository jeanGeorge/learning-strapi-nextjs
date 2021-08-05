import Link from "next/link";

export default function Post({ post }) {
  return (
    <div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <h2>{post.Title}</h2>
    </div>
  );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const result = await fetch("http://localhost:1337/posts");
  const posts = await result.json();

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await fetch(`http://localhost:1337/posts?Slug=${slug}`);
  const data = await result.json();
  const post = data[0];

  return {
    props: { post },
  };
}
