import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-75353-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

console.log(add(1, 2))
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const shoppingListEl = document.getElementById("shopping-list")


const addBtn = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")

addBtn.addEventListener("click", function () {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInputField()





    console.log(inputValue)
})

onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {

        console.log(snapshot.val());
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingListEl();
        console.log(itemsArray);
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            // console.log(itemsArray[i])
            addItem(currentItem);
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet";
    }


});

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""

}
function clearInputField() {
    inputField.value = ""
}
function addItem(item) {

    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    shoppingListEl.append(newEl);
    newEl.addEventListener("click", function () {
        console.log(itemId);
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);
        remove(exactLocationOfItemInDB);
    });
}

