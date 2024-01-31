$(document).ready(function () {
  $("#searchBtn").click(function () {
    const location = $("#location").val();
    const cuisine = $("#cuisine").val();
    const price = $("#price").val();

    // Make a request to the TripAdvisor API
    // Note: You should replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = "https://api.content.tripadvisor.com/v1/restaurant/search";
    const apiKey = "Y72589484094E4284847C4EA40E72D601";

    const params = {
      location: location,
      cuisine: cuisine,
      price: price,
      limit: 10,
      apikey: apiKey
    };

    axios.get(apiUrl, { params })
      .then(function (response) {
        displayResults(response.data.data);
      })
      .catch(function (error) {
        console.error("Error fetching data from TripAdvisor API:", error);
      });
  });

  function displayResults(restaurants) {
    const resultsDiv = $("#results");
    resultsDiv.empty();

    if (restaurants.length === 0) {
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
