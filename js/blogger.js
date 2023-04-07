const apiKey = "AIzaSyCv7WBhGTDfNhRfPmh4DttQtvdKSOhb-rU";
const blogId = "6443783516671868516";

async function fetchLatestPost() {
  const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const post = data.items[0];
    const postElement = document.createElement("div");

    const title = document.createElement("h2");
    title.innerHTML = post.title;
    postElement.appendChild(title);

    // Limit the content to 120 words
    const content = document.createElement("div");
    const contentText = post.content.replace(/<\/?[^>]+(>|$)/g, "");
    const contentWords = contentText.split(/\s+/);
    if (contentWords.length > 120) {
      contentWords.splice(120, contentWords.length - 120);
      content.innerHTML = contentWords.join(" ") + " ...";
    } else {
      content.innerHTML = post.content;
    }
    postElement.appendChild(content);

    document.getElementById("latest-post").appendChild(postElement);
  } else {
    console.error("No posts found");
  }
}

fetchLatestPost();
