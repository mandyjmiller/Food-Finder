$(document).ready(function () {
  $("#searchBtn").click(function () {
    const location = $("#location").val();
    const cuisine = $("#cuisine").val();
    const price = $("#price").val();

    // Make a request to the The Fork API via RapidAPI
    // Note: You should replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key
    const apiUrl = "https://the-fork-the-spoon.p.rapidapi.com/restaurants-list";
    const rapidApiKey = "c4e6517cfcmsh17d019b6ae2f23dp1d17c4jsn3fc2ba83d947";

    const params = {
      location: location,
      cuisine: cuisine,
      price: price,
      limit: 10
    };

    const headers = {
      "X-RapidAPI-Host": "the-fork-the-spoon.p.rapidapi.com",
      "X-RapidAPI-Key": rapidApiKey
    };

    axios.get(apiUrl, { params, headers })
      .then(function (response) {
        displayResults(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching data from The Fork API via RapidAPI:", error);
      });
  });

  function displayResults(restaurants) {
    const resultsDiv = $("#results");
    resultsDiv.empty();

    if (!restaurants || restaurants.length === 0) {
      resultsDiv.append("<p>No restaurants found.</p>");
      return;
    }

    restaurants.forEach(function (restaurant) {
      const restaurantCard = `
        <div class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">${restaurant.name}</h5>
            <p class="card-text">${restaurant.description}</p>
            <p class="card-text">Reviews: ${restaurant.reviews}</p>
            <p class="card-text">Price Bracket: ${restaurant.price}</p>
            <p class="card-text">Address: ${restaurant.address}</p>
            <p class="card-text">Opening Hours: ${restaurant.openingHours}</p>
            <button class="btn btn-success likeBtn">Like</button>
          </div>
        </div>
      `;
      resultsDiv.append(restaurantCard);
    });
  }

  // Add click event for the like button to store likes in local storage
  $("#results").on("click", ".likeBtn", function () {
    const restaurantName = $(this).closest(".card").find(".card-title").text();
    let likedRestaurants = JSON.parse(localStorage.getItem("likedRestaurants")) || [];

    if (!likedRestaurants.includes(restaurantName)) {
      likedRestaurants.push(restaurantName);
      localStorage.setItem("likedRestaurants", JSON.stringify(likedRestaurants));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  });
});