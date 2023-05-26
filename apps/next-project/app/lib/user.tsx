
function user() {
    const url = "https://jsonplaceholder.typicode.com/users"
    return (
      fetch(url).then(res=>res.json())
    )
}

export default user