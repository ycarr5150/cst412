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
            "serial" :$('#serial-number').val(), 
            "acquired" : $('#acquired-date').val(), 
            "paid" : $('#purchase-price').val(), 
            "condition" : $('#condition').val(), 
            "warrenty" : $('#warrenty-expiration').val(), 
            "located" : $('#location').val(), 
            "descrip" : $('#description-box').val(), 
            "comment" : $('#comment-box').val()
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

