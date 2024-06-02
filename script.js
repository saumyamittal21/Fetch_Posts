const fetchs = document.getElementById('fetch-post');
fetchs.addEventListener('click', fetchPost);

function fetchPost() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json())
    ]).then(([posts, users,comments]) => {
        const usersMap = users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});

        const commentsMap = comments.reduce((acc, comment) => {
            acc[comment.postId] = comment;
            return acc;
        }, {});

        const postsContainer = document.getElementById('post-container');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            loader.style.display = 'none';
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const user = usersMap[post.userId];
            const comment=commentsMap[post.id]
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p><strong>User Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Comments:</strong> ${comment.body}</p>
            `;

            postsContainer.appendChild(postElement);
        });
    }).catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching posts or users', error);
    });
}
