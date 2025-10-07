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

        const postImage = document.createElement('img');
        postImage.src = post.cover_image || 'https://via.placeholder.com/150'; // Fallback image
        postImage.alt = post.title;
        postImage.classList.add('dev-feed-image'); // Add a class for styling

        const titleLink = document.createElement('a');
        titleLink.href = post.url;
        titleLink.target = "_blank"; // Open in a new tab
        titleLink.textContent = post.title;

        const publishedDate = document.createElement('small');
        publishedDate.textContent = `Published: ${new Date(post.published_at).toLocaleDateString()}`;

        listItem.appendChild(titleLink);
        listItem.appendChild(postImage);
        listItem.appendChild(publishedDate); // Add the date after the title
        postList.appendChild(listItem);
    });

    targetElement.appendChild(postList);
}

displayDevPosts();

// This paginator script assumes you have a list of items in an element with the ID 'paginated-list'
// Need to save fetched items to array for this to work.

const items = postList ? Array.from(postList.children).map(li => li.textContent) : [];

const itemsPerPage = 5;
let currentPage = 1;

function displayItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);

    const itemListContainer = document.getElementById('item-list');
    itemListContainer.innerHTML = ''; // Clear previous items

    itemsToDisplay.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemListContainer.appendChild(li);
    });

    updatePaginationControls();
}

function setupPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = ''; // Clear previous controls

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
        }
    };
    paginationContainer.appendChild(prevButton);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = () => {
            currentPage = i;
            displayItems(currentPage);
        };
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayItems(currentPage);
        }
    };
    paginationContainer.appendChild(nextButton);
}

function updatePaginationControls() {
    const pageButtons = document.querySelectorAll('.page-button');
    pageButtons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.textContent) === currentPage) {
            button.classList.add('active');
        }
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    displayItems(currentPage);
    setupPagination();
});