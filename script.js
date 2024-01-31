$(document).ready(function () {
  $("#searchBtn").click(function () {
    const location = $("#location").val();
    const cuisine = $("#cuisine").val();
    const price = $("#price").val();

    // TripAdvisor API request
    const apiUrl = "https://api.content.tripadvisor.com/v1/restaurant/search";
    const apiKey = "72589484094E4284847C4EA40E72D601";

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
;
  });




});

