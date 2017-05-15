$(document).ready(function(){
	// #buttonGoesHere
	// #gifGoesHere

	function grabSearchParameters() {
		searchParameters = $("#searchQuery").val()
		console.log(searchParameters)
		if (searchParameters === "") {
			alert("Please enter something to search")
		} else {
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		        searchParameters + "&api_key=dc6zaTOxFJmzC&limit=3";
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response){
				results = response.data;
				console.log(results)
				createGifAndContainer()


			})		    
		}


	}

	function createGifAndContainer() {
		for(var i = 0; i < results.length; i++){
			var gifDiv = $("#gifGoesHere")
			var rating = results[i].rating;
			var paragraph = $("<p>").text("Rating: " + rating);
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_width.url);
			gifDiv.append(paragraph).append(gifImage);
			$("#gifGoesHere").append(gifDiv)
		}
	}



	$("#searchQueryButton").on("click", grabSearchParameters)

	$(document).keyup(function(event) {
		if (event.keyCode === 13) {
			grabSearchParameters()
		}
	})




})