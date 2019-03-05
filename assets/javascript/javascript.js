$(document).ready(function() {

    // An array of actions, new actions will be pushed into this array;
    var actions = ["Horror", "Scary", "Zombies", "Mummy", "Werewolf", "Vampire", "Ghost", "Devil", "Exorcism", "Possesion", "The Nun", "It", "Alien"];

    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons() {
        // erasing anything in this div id so that it doesnt duplicate the results
        $("#gifButtonsView").empty();
        for (var i = 0; i < actions.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-dark")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    // Function to add a new action button
    function addNewButton() {
        $("#addGif").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action == "") {
                // added so user cannot add a blank button
                return false;
            }
            actions.push(action);
            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
    function removeLastButton() {
        $("removeGif").on("click", function () {
            actions.pop(action);
            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=UKtay6Vuf9zxVUev7VOetaATpqCheKXg&limit=10";

        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'

        }).then(function (response) {
            console.log(response); // console test to make sure something returns
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            if (results == "") {
                alert("There isn't a gif for this selected button");
            }

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");

                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.prepend(gifRating);

                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);

            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();

    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});