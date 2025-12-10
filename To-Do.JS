let input = document.querySelector("#add-item");
let ul = document.querySelector('#item-list');

input.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        let value = this.value;

        if (input.value === "") {
            alert("Please write something")
        }
        else {
            let text = value.trim();
            text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

            addItem(text);   //text used to capital the 1st later of sentance
            saveItem()
            this.value = "";
        }
    }
})

const addItem = (item) => {

    const listItem = document.createElement("li");
    listItem.innerHTML = `${item}  <i class="fas fa-times"></i> `;

    listItem.addEventListener('click', function () {
        this.classList.toggle("done")
    });

    listItem.querySelector("i").addEventListener('click', function () {
        listItem.remove();
        saveItem()
    })


    ul.appendChild(listItem); 
    console.log("object");
    saveItem()
}

const saveItem = () => {
    let items = document.querySelectorAll('#item-list li');
    const data = [];
    items.forEach((item) => {
        data.push(item.textContent.trim())
    })
    if (data.length === 0) {
        localStorage.removeItem("items")
    }
    else {
        localStorage.setItem("items", JSON.stringify(data));
    }
}

(function () {
    const lsItems = JSON.parse(localStorage.getItem("items") || "[]");
    lsItems.forEach((lsItem) => {
        addItem(lsItem);
    });
})();