import Layout from "../components/MyLayout";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Markdown from "react-markdown";

const Post = withRouter(({ show }) => (
  <Layout>
    <div className="markdown">
      <Markdown
        escapeHtml={false}
        source={`
# ${show.name}
[tvmaze.com](${show.url})

![Movie Image](${show.image.medium})

## Summary
${show.summary}

## Genres
${show.genres.map(genre => ` ***${genre}***`)}
`}
      />
    </div>
    <style jsx global>{`
      .markdown {
        font-family: "Arial";
      }

      .markdown a {
        text-decorative: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>

    {/* <p>{show.summary.replace(/<[/]?p>/g, "")}</p>
    <img src={show.image.medium} /> */}
  </Layout>
));

Post.getInitialProps = async context => {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
