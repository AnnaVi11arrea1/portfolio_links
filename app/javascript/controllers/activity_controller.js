async function getDevPosts(annavi11arrea1) {
    const response = await fetch(`https://dev.to/api/articles?username=${annavi11arrea1}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
}

async function displayDevPosts(targetElementId, username, numberOfPosts = 100) {
    const posts = await getDevPosts('annavi11arrea1');
    const targetElement = document.getElementById('dev-posts-container');

    if (!targetElement) {
        console.error(`Element with ID '${targetElementId}' not found.`);
        return;
    }

    const postList = document.createElement('ul');
    postList.classList.add('dev-feed-list'); // Add a class for styling

    posts.slice(0, numberOfPosts).forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('dev-feed-item'); // Add a class for styling

        const titleLink = document.createElement('a');
        titleLink.href = post.url;
        titleLink.target = "_blank"; // Open in a new tab
        titleLink.textContent = post.title;

        const publishedDate = document.createElement('small');
        publishedDate.textContent = `Published: ${new Date(post.published_at).toLocaleDateString()}`;

        listItem.appendChild(titleLink);
        listItem.appendChild(publishedDate); // Add the date after the title
        postList.appendChild(listItem);
    });

    targetElement.appendChild(postList);
}

displayDevPosts();;