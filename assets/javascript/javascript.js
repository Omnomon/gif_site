$(document).ready(function(){
	// #buttonGoesHere
	// #gifGoesHere
	// total number of global variables = 2

	$("#searchQueryButton").on("click", grabSearchParameters)

	$(document).keyup(function(event) {
		if (event.keyCode === 13) {
			grabSearchParameters()
		}
	})

	var offsetCounter = 0; // ask how to avoid using these global variable. 
	var temp = "we"; // global
	var searchParameters;

	function comparison(current, previous) {
		this.current = current
		this.previous = previous 
		}

	var compareTo = new comparison(searchParameters, temp)


	function grabSearchParameters() {

		compareTo.current = $("#searchQuery").val() 
		console.log(compareTo.previous)


		console.log(compareTo.current)
		if (compareTo.current === "") {
			alert("Please enter something to search")
		} 

		if (compareTo.current == compareTo.previous) {
    		ajaxCallback()
			offsetCounter +=4
			console.log("search parameter is " + compareTo.current + " and temp is "+ compareTo.previous + " and offsetCounter is" + offsetCounter)

		} else {
			ajaxCallback()
			offsetCounter = 0 
			console.log("search parameter is " + compareTo.current + " and temp is "+ compareTo.previous + " and offsetCounter is" + offsetCounter)


		}

		console.log(typeof $("#searchQuery").val())
		console.log(typeof compareTo.previous)
		console.log(temp)
		console.log(compareTo.current)
		console.log(offsetCounter)

		return compareTo.previous, compareTo.current
		ajaxCallback()

	}

	function ajaxCallback() {
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
		    compareTo.current + "&api_key=dc6zaTOxFJmzC&limit=4&offset=" + offsetCounter;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			results = response.data; 	
			console.log(results)
			createGifAndContainer()
			})		
	}

	function createGifAndContainer() {
		for(var i = 0; i < results.length; i++){
			var gifDiv = $("<div>")
			gifDiv
				.addClass("col-xs-3")
			var rating = results[i].rating;
			var paragraph = $("<p>")
			paragraph
				.text("Rating: " + rating);
			var gifImage = $("<img>");
			gifImage
				.attr("src", results[i].images.fixed_height.url)
				.addClass("gif img-responsive")
			gifDiv.prepend(paragraph).prepend(gifImage);
			$("#gifGoesHere").prepend(gifDiv)
		}
	}



})