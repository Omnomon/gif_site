$(document).ready(function() {
    // #buttonGoesHere
    // #gifGoesHere
    // total number of global variables = 2

    // grab events -------------------------------------------------------------------------------------------------------------
    $("#searchQueryButton").on("click", grabSearchParameters)

    $(document).keyup(function(event) {
            if (event.keyCode === 13) {
                grabSearchParameters()
            }
        })
        //--------------------------------------------------------------------------------------------------------------------------

    var offsetCounter = 0; // ask how to avoid using these global variable. 
    var temp = "string";
    var searchParameters;

    function comparison(currentEntry, previousEntry) {
        this.currentEntry = currentEntry
        this.previousEntry = previousEntry
    }

    var compare = new comparison(searchParameters, temp)

    //--------------------------------------------------------------------------------------------------------------------------


    function grabSearchParameters() {

        compare.currentEntry = $("#searchQuery").val()
        console.log("current search parameter is " + compare.currentEntry + " and temp is " + compare.previousEntry + " and old offsetCounter is " + offsetCounter)



        console.log(compare.currentEntry)
        if (compare.currentEntry === "") {
            alert("Please enter something to search")
        }

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
        ajaxCallback()

    }


    //--------------------------------------------------------------------------------------------------------------------------

    function ajaxCallback() {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
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


    function createGifAndContainer() {
        for (var i = 0; i < results.length; i++) {
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

    //--------------------------------------------------------------------------------------------------------------------------


})
