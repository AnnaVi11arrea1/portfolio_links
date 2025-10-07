async function getDevPosts(username) {
    const response = await fetch(`https://dev.to/api/articles?username=${annavi11arrea1}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
}