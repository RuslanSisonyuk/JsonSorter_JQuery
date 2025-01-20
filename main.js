let json_filename = "data.json";

function import_json(filename){
    $.getJSON(filename, function(data){
        console.log(data);
    });
    // return json_list;
}


$('.btn').on("click",function(event){
    import_json(json_filename);
});