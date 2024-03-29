var topics = ["Queen", "Nirvana", "Misfits", "Drake"];
// there are not enough gifs for Nirvana or Misfits to even populate 10 :( sooooo, Drake?

function renderButtons() {
    $("#band-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button data-bands='" + topics[i] + "'>");
        a.addClass("band");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#band-buttons").append(a);
        console.log(a);
        console.log(i);
    }
}
// I can't get the new button to search and it actually breaks all other buttons in the process
$("#add-band").on("click", function (event) {
    event.preventDefault();
    var bandInput = $("#band-input").val().trim();
    topics.push(bandInput);
    renderButtons();
    $("button").on("click", function () {
        $(".bandGifs").empty();
        var bands = $(this).attr("data-bands");

        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q=" + bands + "&api_key=JnGmCnV1TZYxyeo7aniDfwJIqUqB8wDX";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifSpace = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var bandImage = $("<img>");
                        bandImage.attr("src", results[i].images.fixed_height.url);
                        bandImage.attr("src", results[i].images.original_still.url);
                        bandImage.attr("data-still", results[i].images.original_still.url);
                        bandImage.attr("data-animate", results[i].images.original.url);
                        bandImage.attr("data-state", "still");
                        bandImage.addClass("band-Image");
                        gifSpace.append(p);
                        gifSpace.append(bandImage);
                        $(".bandGifs").prepend(gifSpace);
                    }
                }
            });
    });
});
renderButtons();

$("button").on("click", function () {
    $(".bandGifs").empty();
    var bands = $(this).attr("data-bands");

    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&q=" + bands + "&api_key=JnGmCnV1TZYxyeo7aniDfwJIqUqB8wDX";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifSpace = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var bandImage = $("<img>");
                    bandImage.attr("src", results[i].images.fixed_height.url);
                    bandImage.attr("src", results[i].images.original_still.url);
                    bandImage.attr("data-still", results[i].images.original_still.url);
                    bandImage.attr("data-animate", results[i].images.original.url);
                    bandImage.attr("data-state", "still");
                    bandImage.addClass("band-Image");
                    gifSpace.append(p);
                    gifSpace.append(bandImage);
                    $(".bandGifs").prepend(gifSpace);
                }
            }
        });
});
// I can't get gifs to change state on click
$(document).on("click", ".band-Image", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

