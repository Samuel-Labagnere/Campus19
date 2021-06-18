$(document).ready(function() {
    const collections = document.querySelectorAll(".taxons-list li"),
    buttonsDiscover = document.querySelectorAll(".discover-button-collection")

    for(let i = 0; i < collections.length; i++) {
        let collection = collections[i]
        let buttonDiscover = buttonsDiscover[i]
        collection.addEventListener("mouseenter", () => {
            buttonDiscover.classList.add("collection-hover")
        })
        collection.addEventListener("mouseleave", () => {
            buttonDiscover.classList.remove("collection-hover")
        })
    }
})