async function loadBlogPosts() {
    const response = await fetch("blog/sample-post.md");
    const text = await response.text();
    document.getElementById("posts").innerHTML = `<pre>${text}</pre>`;
}

loadBlogPosts();
