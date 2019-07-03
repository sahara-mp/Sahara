$(function () {
    
    $(".category").on("click", function (event) {
        event.preventDefault();
        var category = $(this).text().trim();
        console.log(category);
        window.location.replace(`/categories/${category}`);        
    });
    
});


