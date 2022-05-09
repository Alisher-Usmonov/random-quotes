mainFunc();

async function mainFunc() {
    let quoteLabel = document.querySelector(".quote-text");
    let quoteTags = document.querySelector(".quote-tags");
    let authorImg = document.querySelector(".author-avatar");
    let authorName = document.querySelector(".author-name");
    let authorUsername = document.querySelector(".author-username");

    let request = await fetch("https://api.quotable.io/random");
    let quote = await request.json();

    const req = await fetch(`https://api.pexels.com/v1/search?query=${quote.author}`, {
        headers: {
            "Authorization": "563492ad6f917000010000010f3aceda3a1c442fb57755a12e29707d"
        }
    });
    const images = await req.json();

    quoteLabel.textContent = quote.content;
    quoteTags.textContent = `${quote.tags.map(el => "#"+el).join(" ")}`;
    authorName.textContent = quote.author;
    authorUsername.textContent = `@${quote.author.replace(/[ ]/g, "")}`;

    if(images.photos.length !== 0) {
        authorImg.src = images.photos[0].src.large2x;
    } else {
        authorImg.src = `https://picsum.photos/300`;
    }
}