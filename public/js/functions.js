function openTab(evt, tab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
}
    
$('#submit-button').on("click", function(e) {
    e.preventDefault(); // Do not submit until I am ready
    
    $.ajax({
        type: "POST",
        url: "/new-asset",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "category" : $('#category').val(), 
            "manufacturer" : $('#manufacturer').val(), 
            "model" : $('#model').val(), 
            "acquired" : $('#acquired-date').val(), 
            "paid" : $('#purchase-price').val(), 
            "condition" : $('#condition').val(), 
            "warrenty" : $('#warrenty-expiration').val(), 
            "located" : $('#location').val(), 
            "retired" : $('#retired-date').val(), 
            "description" : $('#description').val()
        }),
        success: function(result, status) {
            if (result.successful) {
                window.location.href = '/'; // This will navigate to wherever i say...
            }
            else {
                // Show an error message or something and stay here
                $('#message').html(result.message).css("color", "red");
                $('#message').show();
            }
        }, 
        error: function(xhr, status, message) {
            console.log("error: ", xhr.responseText); 
        }
    });
}); 