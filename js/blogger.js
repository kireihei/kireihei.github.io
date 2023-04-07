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

    // Limit the content to 60 words
    const content = document.createElement("div");
    const contentText = post.content.replace(/<\/?[^>]+(>|$)/g, "");
    const contentWords = contentText.split(/\s+/);
    if (contentWords.length > 60) {
      contentWords.splice(60, contentWords.length - 60);
      content.innerHTML = contentWords.join(" ") + " ...";
    } else {
      content.innerHTML = post.content;
    }
    postElement.appendChild(content);
    
    // Add hyperlink to Blogger
    const link = document.createElement();
    link.href = "https://kireihei.blogspot.com";
    const heading = document.createElement("h3");
    heading.textContent = "Google Blogger";
    link.appendChild(heading);
    postElement.appendChild(link);

    document.getElementById("latest-post").appendChild(postElement);
  } else {
    console.error("No posts found");
  }
}

fetchLatestPost();
