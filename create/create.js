import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    const bunnyForm = new FormData(form);
    // console.log(bunnyForm.get('family_id'));
    await createBunny({
        // get the name and family id from the form
        name: bunnyForm.get('bunny-name'),
        family_id: bunnyForm.get('family-id'),
    });
    // use createBunny to create a bunny with this name and family id
    window.location.href = '/families';
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const familyId = document.getElementById('family-id');
    const families = await getFamilies();
    // go get the families from supabase
    for (let family of families) {
        const option = document.createElement('option');
        option.value = family.id;
        option.textContent = family.name;
        familyId.append(option);
    }
    // for each family

    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
