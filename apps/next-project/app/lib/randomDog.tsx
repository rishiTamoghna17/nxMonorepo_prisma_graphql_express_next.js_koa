"use client"

function randomDog() {
  const url = "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1"
  return (
    fetch(url,{cache:"no-cache"})
  )
}

export default randomDog