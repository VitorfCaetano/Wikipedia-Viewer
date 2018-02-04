
//Function that get the articles from the API
function getArticles(searchTerm){
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm,
    type: "GET",
    dataType: "jsonp",

    success: function(data){
      var result = [];

      //Iterate the whole array and add to another one
      for(var i = 0; i < data[1].length; i++) {
        result.push('<div class="articles-div"><a href="' + data[3][i] + '" target="_blank"><h2>' + data[1][i] + '</h2> <p>' + data[2][i] + '</p></a></div>');
      }
      //Display the new array in the HTML
      $("#articles").html(result.join(""));
    }
  });
}

$(document).ready(function() {
  $("#searchInput").on('keydown', function(event) {
    //Verify if the user has pressed enter
    if(event.which == 13 || event.keyCode == 13){
      event.preventDefault();

      //Verify if there is a value inside the input
      if($("#searchInput").val() === ""){
        alert("Input is blank, write something!");
      }else{

        var searchTerm = $("#searchInput").val();
        getArticles(searchTerm);

        //Show the return button
        $("#btn-back").show(500);
        //Set the width of the search bar to 90%
        $("input[name=search]").css('width', '90%');
        //Hide the title
        $(".title").hide(400);
      }
    }
  });

  // this function will be executed on click of the return button
  $('#btn-back').on('click', function () {
    //Reload the page
    window.location.reload();
  });
});
