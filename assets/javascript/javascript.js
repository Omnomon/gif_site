$(document).ready(function() {
    // #buttonGoesHere
    // #gifGoesHere
    // total number of global variables = 2
    // to do list == make form input buttons // sort of check 
    //               write a function that if index[i] = -1, go to index[0]
    // 			     make preset buttons with array // to do 
    //               make gif pause // check 

    // -------------------------------------------------------------------------------------------------------------------------
    //
    //  Define shared global variables here 
    //
    //--------------------------------------------------------------------------------------------------------------------------

    var offsetCounter = 0; // ask how to avoid using these global variable. 
    var temp = "string";
    var searchParameters;
    var testArray = ["birds", "cats", "dogs"]
    var compare = new comparison(searchParameters, temp)
    var entry = [];



    // -------------------------------------------------------------------------------------------------------------------------
    //
    //  Grab events and call functions to load on page 
    //
    //--------------------------------------------------------------------------------------------------------------------------


    $("#searchQueryButton").on("click", grabSearchParameters)

    $(document).keyup(function(event) {
        if (event.keyCode === 13) {
            grabSearchParameters()
        }
    })

    createDynamicButtons(testArray)

    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Create comparison object for OffsetCounter 
    //
    //--------------------------------------------------------------------------------------------------------------------------


    function comparison(currentEntry, previousEntry) {
        this.currentEntry = currentEntry
        this.previousEntry = previousEntry
    }


    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Grab search parameters with call to change the offset count && and call function to add compare.currentEntry to testArray 
    //
    //--------------------------------------------------------------------------------------------------------------------------


    function grabSearchParameters() {

        compare.currentEntry = $("#searchQuery").val()
        console.log("current search parameter is " + compare.currentEntry + " and temp is " + compare.previousEntry + " and old offsetCounter is " + offsetCounter)
        changeOffsetCounter()
        appendEntryToButtonsDiv()


    }


    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Append current entry to buttons div 
    //
    //--------------------------------------------------------------------------------------------------------------------------

    function appendEntryToButtonsDiv() {
    	if (compare.currentEntry === "") {
            alert("Please enter something to search");
            return console.log("blank query")
        } else if (compare.currentEntry === entry[entry.length-1]){
        	return console.log("already searched")
        } else {
        	entry.push(compare.currentEntry)
	    	var passEntry = [entry[entry.length-1]]
	    	createDynamicButtons(passEntry)
        }

    }


    //--------------------------------------------------------------------------------------------------------------------------
    //
    // If the current entry is the same as the previous entry, the offset counter is +4, then call ajax. Else, offset counter is 0, then call ajax
    //
    //--------------------------------------------------------------------------------------------------------------------------

    function changeOffsetCounter() {

        console.log(compare.currentEntry)


        if (compare.currentEntry == compare.previousEntry) {
            offsetCounter += 4
            ajaxCallback()
            console.log("search parameter is " + compare.currentEntry + " and temp is " + compare.previousEntry + " and offsetCounter is" + offsetCounter)

        } else {
            offsetCounter = 0
            ajaxCallback()
            compare.previousEntry = compare.currentEntry
            console.log("search parameter is " + compare.currentEntry + " and temp is " + compare.previousEntry + " and new offsetCounter is" + offsetCounter)


        }

        return compare.previousEntry, compare.currentEntry
    }


    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Get info from ajax and create the gif and gif container. 
    //
    //--------------------------------------------------------------------------------------------------------------------------

    function ajaxCallback() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            compare.currentEntry + "&api_key=dc6zaTOxFJmzC&limit=4&offset=" + offsetCounter;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            results = response.data;
            console.log(results)
            createGifAndContainer()
        })
    }

    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Create gif image from callback and put it into a container for CSS formatting 
    //
    //--------------------------------------------------------------------------------------------------------------------------


    function createGifAndContainer() {
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>")

            var rating = results[i].rating;
            var paragraph = $("<p>")
            paragraph
                .text("Rating: " + rating);
            var gifImage = $("<img>");
            gifImage
                .attr("src", results[i].images.fixed_width.url)
                .attr("data-still", results[i].images.fixed_width_still.url) // keep data- attr for old code even thought freezeframe does not need it 
                .attr("data-animate", results[i].images.fixed_width.url)
                .attr("data-state", "still")
                .addClass("gif image")
            gifDiv
                .prepend(paragraph)
                .prepend(gifImage)
                .attr("id", "placeGifInCol_" + i)

            $("#col_" + i).prepend(gifDiv.attr("id", "placeGifInCol_" + i)) // ask how I could do this more efficiently rather than running 3 loops (3* 4 images/column  for 12 pictures?)

            //lets have some fun with this opensource javascript. This could be replaced with the click function commented out below. 
            $(".image").freezeframe()


        }
    }

    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Create dynamic buttons from global testArray as argument 
    //
    //--------------------------------------------------------------------------------------------------------------------------


    function createDynamicButtons(array) {
    	var createButtons = [];
        for (var i = 0; i < array.length; i++) {
            createButtons[i] = $("<button>")
                .addClass("button is-primary is-outlined buttonSpacer")
                .html(array[i])
                .attr("queryIs", array[i])
                .click(function() {
                    compare.currentEntry = $(this).attr("queryIs")
                    changeOffsetCounter()
                })
        }

        $("#createButtonsContainer").append(createButtons)
    }




    //--------------------------------------------------------------------------------------------------------------------------
    //
    // Click on gif to animate it. Click again to return it to still. 
    //
    //--------------------------------------------------------------------------------------------------------------------------
    /*		$(".is-narrow").click(function(event) {
                var state = $(event.target).attr("data-state")
                console.log(state)

                if (state === "still") {
                    $(event.target)
                        .attr("data-state", "animate")
                        .html($(event.target)
                            .attr("src", $(event.target)
                                .attr("data-animate")))
                } else {
                    $(event.target)
                        .attr("data-state", "still")
                        .html($(event.target)
                            .attr("src", $(event.target)
                                .attr("data-still")))
                }

    		}) */

    /// this code works, but I want to try to make it on hover

    /*	$(".is-narrow:last-child").hover(
    	    function() {
    	        console.log(event.target)
    	        $(event.target)
    	            .attr("data-state", "animate")
    	            .html($(event.target)
    	                .attr("src", $(event.target)
    	                    .attr("data-animate")))
    	    },
    	    function() {
    	        console.log(event.target)
    	            .attr("data-state", "still")
    	            .html($(event.target)
    	                .attr("src", $(event.target)
    	                    .attr("data-still")))
    	    })
    	// hover breaks flexbox dynamic columns ...why? 
    */
    //--------------------------------------------------------------------------------------------------------------------------




    //--------------------------------------------------------------------------------------------------------------------------





})
