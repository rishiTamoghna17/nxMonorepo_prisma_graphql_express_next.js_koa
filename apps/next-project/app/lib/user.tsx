
function user() {
    const url = "http://localhost:3000/user"
    return (
      fetch(url).then(res=>res.json())
    )
}

export default user