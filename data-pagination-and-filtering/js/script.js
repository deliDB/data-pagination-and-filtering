/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

document.addEventListener('DOMContentLoaded', () => {
  
   const studentList = document.querySelector('.student-list');
   const linkList = document.querySelector('.link-list');
   const body = document.querySelector('body');

   /**
    * Creates and appends the elements needed to display a page of nine students.
    *
    * @param {array} list - An array of objects param.
    * @param {number} page - A number param
    **/
      
      const showPage = (list, page) => {
         const itemsPerPage = 9;
         const startIndex = (page * itemsPerPage) - itemsPerPage;
         const endIndex = page * itemsPerPage;
         //const studentList = document.querySelector('.student-list');
         let html = '';
         studentList.innerHTML = '';
   
         for (const student of list) {
            if (list.indexOf(student) >= startIndex && list.indexOf(student) < endIndex) {
               html += `
                     <li class="student-item cf">
                       <div class="student-details">
                          <img class="avatar" src=${student.picture.large} alt="${student.name.first} Profile Picture">
                          <h3>${student.name.first} ${student.name.last}</h3>
                          <span class="email">${student.email}</span>
                        </div>
                        <div class="joined-details">
                             <span class="date">${student.registered.date}</span>
                        </div>
                    </li>
                   `;
            }
         }
         studentList.insertAdjacentHTML('beforeend', html);
      };
   
   
   /**
    * Function that adds pagination to the page.
    *
    * @param {array} list - An array of objects param
    * 
    **/
   
      const addPagination = (list) => {
         const numOfButtons = Math.ceil(list.length / 9);
         //const linkList = document.querySelector('.link-list');
         linkList.innerHTML = '';
         for (let i = 1; i <= numOfButtons; i++) {
            linkList.insertAdjacentHTML('beforeend', `
               <li>
                  <button type="button">${i}</button>
               </li>
               `);
         }
   
         let firstButton = document.querySelector('li > button');
         firstButton.className = 'active';
   
         linkList.addEventListener('click', (e) => {
            const button = e.target;
               const pageNum = button.textContent;
               if (button.tagName === 'BUTTON') {
                  let activeButton = document.querySelector('.active');
                  activeButton.className = '';
                  button.className = 'active';
                  showPage(list, pageNum);
               }
         });
   
      };
   /**
    * Function that adds the search bar to the page using vanilla JS.
    **/
   
      const addSearchBar = () => {
         let html = `
               <label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>
            `;
         const header = document.querySelector('header');
         header.insertAdjacentHTML('beforeend', html);
      };
      addSearchBar();
   /**
    * Function that pushes student objects matching the value entered in the search bar into an empty array.
    *
    * @param {string} searchInput - User input into the search bar
    * @param {array} studentArray - Array of student objects that match user input for filtering
    **/
      const searchStudents = (searchInput, studentArray) => {
         let filteredList = [];
         const inputValue = searchInput.value;
         for(const student of studentArray){  
            if(student.name.first.toLowerCase().includes(inputValue.toLowerCase()) || student.name.last.toLowerCase().includes(inputValue.toLowerCase())){
               filteredList.push(student);   
            } 
         } 
         if(filteredList.length !== 0){
            studentList.style.display = '';
            linkList.style.display = '';
            body.lastElementChild.style.display = 'none';
            showPage(filteredList, 1);
            addPagination(filteredList);
         } else {
            studentList.style.display = 'none';
            linkList.style.display = 'none';
            body.lastElementChild.innerText = 'No results found!'
            body.lastElementChild.style.display = '';
         }
      }   

      //Add p element to body for "No results found!"
      body.insertAdjacentHTML('beforeend', `<p></p>`);
     
      const submit = document.querySelector('.student-search');
      const input = document.querySelector('#search')
      submit.addEventListener('click', (e) => {
         const button = e.target;
         if(button.tagName === 'IMG'){
            searchStudents(input, data);
         }
       });

       submit.addEventListener('keyup', () => {
            searchStudents(input, data);
       });
   
   // Call functions
      showPage(data, 1);
      addPagination(data);
   });
   