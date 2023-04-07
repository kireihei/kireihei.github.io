  const apiKey = "AIzaSyCv7WBhGTDfNhRfPmh4DttQtvdKSOhb-rU";
  const blogId = "6443783516671868516";

  async function fetchLatestPost() {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const post = data.items[0];
      const postElement = document.createElement("div");

      const title = document.createElement("h3");
      title.innerHTML = post.title;
      postElement.appendChild(title);

      const content = document.createElement("div");
      content.innerHTML = post.content;
      postElement.appendChild(content);

      document.getElementById("latest-post").appendChild(postElement);
    } else {
      console.error("No posts found");
    }
  }

  fetchLatestPost();
