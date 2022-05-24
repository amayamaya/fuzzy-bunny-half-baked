import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    familiesEl.textContent = '';
    const data = await getFamilies();
    for (let family of data) {
        const div = document.createElement('div');
        div.classList.add('family');
    
        const h3 = document.createElement('h3');
        h3.textContent = family.name;
    
        const div2 = document.createElement('div');
        div2.classList.add('bunnies');

        for (let bunny of family.fuzzy_bunnies) {
            const div3 = document.createElement('div');
            div3.textContent = bunny.name;
            div3.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });
            div2.append(div3);
        }     
        div.append(h3, div2);
        familiesEl.append(div);
                
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        // put the family name in the name element
        // for each of this family's bunnies
        //    make an element with the css class 'bunny', and put the bunny's name in the text content
        //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
        // append this bunnyEl to the bunniesEl
    }

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}
displayFamilies();
