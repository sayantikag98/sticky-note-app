const btn = document.querySelector("#display-note-button-delete");
btn.addEventListener("click", (event) => {
    fetch(`/notes/${btn.dataset.id}`,{
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => window.location.href = data.redirect)
    .catch(error => {
        console.log(error.message);
    }); 
});