let ul;
async function quotes() {
  const response = await fetch(`http://localhost:3000/quotes?_embed=likes`);
  const array = await response.json();
  ul = document.querySelector("#quote-list");

  for (const iterator in array) {
      const quote = array[iterator].quote;
      const likes = array[iterator].likes.length;
      const id = array[iterator].id
      cards(quote, likes, id,iterator, array);
    }
}
quotes();

const cards = (quote, likes, id,iterator, array) => {
  const li = document.createElement("li");
  const blockquote = document.createElement("blockquote");
  const p = document.createElement("p");
  const footer = document.createElement("footer");
  const br = document.createElement("br");
  const likesButton = document.createElement("button");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");

  li.className = "quote-card";
  blockquote.className = "blockquote";
  p.className = "mb-0";
  footer.className = "blockquotes-footer";
  likesButton.className = "btn-success";
  deleteButton.className = "btn-danger";

  p.textContent = quote;
  footer.textContent = `Someone famous`;
  likesButton.textContent = `Likes: `;
  span.textContent = `${likes}`;
  deleteButton.textContent = `Delete`;

  blockquote.appendChild(p);
  blockquote.appendChild(footer);
  blockquote.appendChild(br);
  likesButton.appendChild(span);
  blockquote.appendChild(likesButton);
  blockquote.appendChild(deleteButton);
  li.appendChild(blockquote);
  ul.appendChild(li);

  deleteButton.addEventListener('click', () => {
    blockquote.parentElement.remove()
    fetch(`http://localhost:3000/quotes/${id}`, {
      method: 'DELETE'
    })
  })


  likesButton.addEventListener('click', () => {
    span.textContent = ++likes
    const data = {quoteId: array[iterator].id}

    fetch(`http://localhost:3000/likes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })
};

function createdQuotes() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    // event.preventDefault();

    const inputQuote = event.target.new_quote.value;
    const inputAuthor = event.target.author.value;
    
    const formData = {
      quote: inputQuote,
      author: inputAuthor,
    };

     fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(object => {return object})
  })
}
createdQuotes();

