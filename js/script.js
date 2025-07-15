// ELEMENT SELECTORS
const authorContainer = document.querySelector('#authorContainer')
const paginationList = document.querySelector('#paginationList')

// console.log(authors);
const authorsPerPage = 3

/* This function will handle calculating how many buttons are
needed and dynamically add them to the page */

function handlePagination(array) {
  // 1. Create a variable to store the number of buttons needed.
  const btnNumber = Math.ceil(array.length / 3) // 11/3 = 3.3333333 -> 4
  //    The math should be (the length of the array divided by the authorsPerPage) rounded up
  //    Hint: Math.ceil()
  // 2-a. Start a loop to the length of the number of buttons calculated above.
  for (let i = 1; i <= btnNumber; i++) {
    // 2-b. Inside, create a variable storing a template literal of the HTML markup of a button
    //      (see example in index.html lines 34 - 36).
    const btnMarkUp = `<li><button>${i}</button></li>`
    // 2-c. Then add this variable to the paginationList element
    //      Hint: insertAdjacentHTML()
    paginationList.insertAdjacentHTML('beforeend', btnMarkUp)
  }
  // 3. Add the `active` class to the first button
  //    Hint: querySelector()
  const firstButton = document.querySelector('button')
  firstButton.className = 'active'
}

/* This function will handle calculating how many and which
authors to show on the current page and dynamically add them */

function showPage(array, page) {
  // 4. Create a variable to represent which author to start with on the page.
  //    The math should be (the page multiplied by the authorsPerPage) minus the authorsPerPage
  const startAuthor = page * authorsPerPage - authorsPerPage //original is index 0
  // 5. Create a variable to represent which author to end with on the page.
  //    The math should be (the page multiplied by the authorsPerPage) minus one
  const endAuthor = page * authorsPerPage - 1 //original index is 2
  // 6. Reset the authorContainer's content to nothing to prevent previous cards staying on the page
  authorContainer.innerHTML = ''
  // 7-a. Start a loop to the length of the array's length
  for (let i = 0; i < array.length; i++) {
    // 7-b. Inside, create a conditional checking if `i` is...
    //      - greater than or equal to the start variable
    //      - less than or equal to the end variable
    if (i >= startAuthor && i <= endAuthor) {
      // 7-c. If true, create a variable storing a template literal of the HTML markup of an author card.
      //      (see example in index.html lines 17 - 28).
      //      Hint: You'll need to dynamically add each author's information
      const author = array[i]
      const authorCard = `
    <li class='author-card'>
      <div class='card-header'>
        <img src='${author.image}' alt='photo of ${author.name}'>
      </div>
      <div class='card-content'>
        <h2 class='title'>${author.name}</h2>
        <p>${author.text}</p>
      </div>
    </li>
    `
      // 7-d. Then add this variable to the authorContainer element
      //      Hint: insertAdjacentHTML()
      authorContainer.insertAdjacentHTML('beforeend', authorCard)
    }
  }
}

/* This event listener will handle calling our function
above to change the page & add the `active` class  */

paginationList.addEventListener('click', (e) => {
  // 8. Create a variable to store the button which currently has the `active` class
  const targetButton = e.target
  const activeButton = document.querySelector('button.active')
  // 9-a. Make sure the user has clicked a `button`
  //      Hint: e.target
  if (targetButton.tagName === 'BUTTON') {
    // 9-b. If true...
    //      - Remove the `active` class from the currently active button
    if (activeButton) {
      activeButton.classList.remove('active')
    }
    //      - Add the `active` class to the button just clicked
    targetButton.classList.add('active')
    //      - Call showPage() passing it `authors` and the content of the button just clicked.
    const newPage = parseInt(targetButton.textContent)
    showPage(authors, newPage)
  }
})

/* These function calls are needed to initialize the page */

handlePagination(authors)
showPage(authors, 1)
