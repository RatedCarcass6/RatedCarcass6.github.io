
/**
 * Name: Salvador Macias
  Date: 09.25.24
  CSC 372-01

  This is the java script for both the index and the meal plan page.
 */
const gallery = document.querySelectorAll('.dish img');

for (let index = 0; index < gallery.length; index++) {
    let element = gallery[index];
    element.addEventListener('click', expand);
}

/**
 * Expands the clicked image by making it larger, collapsing any previously expanded image,
 * and showing the corresponding description of the selected dish.
 * @param {Event} event - The click event triggered by the image.
 */
function expand(event) {
    let smallImage = event.currentTarget;
    let bigImage = document.querySelector(".big");

    // If there's a big image, revert it to small
    if (bigImage) {
        bigImage.classList.remove('big');
        bigImage.classList.add('small');
    }

    // Make the clicked image bigger
    smallImage.classList.remove('small');
    smallImage.classList.add('big');

    // Show the description
    const dishDescriptions = {
        'Chick-fil-A Sandwich': {
            description: 'A delicious chicken sandwich served on a toasted bun. Cost: 3.50',
        },
        'Chick-fil-A Nuggets': {
            description: 'Bite-sized pieces of chicken fried to perfection. Cost: 4.99',
        },
        'Waffle Fries': {
            description: 'Crispy waffle-shaped fries, perfect for dipping. Cost: 2.50',
        },
        'Yum-Yum hotdogs': {
            description: 'Hot dogs served fast and hot, comes with many options for toppings. Cost: 1.50',
        },
        'icecream': {
            description: 'Ice cream either in a cone or cup with many different flavors to choose from. Cost: 2.25',
        },
        'Mountain dew': {
            description: 'A nice can of Mountain Dew goes nicely with a hot dog from Yum Yum\'s. Cost: 1.00',
        },
        'Cheese pizza': {
            description: 'A plain Italian-style cheese pizza if you aren\'t feeling too adventurous. Cost: 11.39',
        },
        'Margharita pizza': {
            description: 'A more exciting pizza, this Margharita pizza is a classic and sure to fill you up. Cost: 14.24',
        },
        'Chicken Salad': {
            description: 'If you are looking for something more healthy but still delicious. Cost: 7.59',
        }
    };

    let dishName = smallImage.alt; 
    let descriptionId = `description-dish${Array.from(gallery).indexOf(smallImage) + 1}`;
    let description = document.querySelector(`#${descriptionId}`);

    // Hide all descriptions before showing the new one
    const allDescriptions = document.querySelectorAll('.description');
    allDescriptions.forEach(desc => {
        desc.innerHTML = ''; 
        desc.classList.remove('show'); 
    });

    // Update and show the new description
    let descriptionText = document.createTextNode(dishDescriptions[dishName].description);
    description.appendChild(descriptionText);
    description.classList.add('show');
}


// Meal Plan Section
let total = 0;

/**
 * Adds event listeners to the "Add" buttons in the dish list.
 */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#dish-list button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            addToMealPlan(button);
        });
    });
});

/**
 * Adds a selected dish to the meal plan list, along with the dish name, price,
 * and options to remove or add more. Updates the total cost.
 * @param {HTMLElement} button - The button that triggered the event.
 */
function addToMealPlan(button) {
    let li = button.closest('li');
    let name = li.getAttribute('data-name');
    let price = parseFloat(li.getAttribute('data-price'));
    total += price;

    let mealPlanList = document.getElementById('meal-plan-list');

    // Create the list item for the meal plan
    let mealItem = document.createElement('li');
    
    let itemText = document.createTextNode(`${name} - ${price.toFixed(2)} `);
    mealItem.appendChild(itemText);

    // Create "Remove" button
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeFromMealPlan);
    mealItem.appendChild(removeButton);

    // Create "Add More" button
    let addMoreButton = document.createElement('button');
    addMoreButton.textContent = 'Add More';
    addMoreButton.addEventListener('click', addMore);
    mealItem.appendChild(addMoreButton);

    // Append the new meal item to the list
    mealPlanList.appendChild(mealItem);

    updateTotal();
}

/**
 * Removes a selected dish from the meal plan list and updates the total cost.
 * @param {Event} event - The click event triggered by the "Remove" button.
 */
function removeFromMealPlan(event) {
    let button = event.currentTarget;
    let mealItem = button.closest('li');
    let price = parseFloat(mealItem.firstChild.nodeValue.split('- ')[1]);
    total -= price;
    mealItem.remove();
    updateTotal();
}

/**
 * Adds another instance of a selected dish to the meal plan list and updates the total cost.
 * @param {Event} event - The click event triggered by the "Add More" button.
 */
function addMore(event) {
    let button = event.currentTarget;
    let mealItem = button.closest('li');
    let price = parseFloat(mealItem.firstChild.nodeValue.split('- ')[1]);
    total += price;
    updateTotal();
}

/**
 * Updates the total displayed amount in the meal plan based on selected dishes.
 */
function updateTotal() {
    let totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = total.toFixed(2);
}
