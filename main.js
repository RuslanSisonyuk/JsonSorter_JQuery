let json_filename = "data.json";

function assignDataToCard(data){

}

$('.btn').on("click",function(event){
    $.ajax({
        type: 'GET',
        url: json_filename,
        success: function(response){
            //create new areas and assign them elements based on area id
            let areas = new Array;
            $.each(response, function(i,response){
                if(Object.keys(areas).includes(response.areaId+"b")) {  //creates a new entry in the dictionary if finds a new areaId and 
                    console.log(response.id+" - I'm in "+response.areaId);  // and adds each json element with the same area id to it
                    areas[response.areaId+"b"].push(response);
                }
                else {
                    console.log(response.id+" - I'm a new "+response.areaId+"!");
                    areas[response.areaId+"b"] = new Array;
                    areas[response.areaId+"b"].push(response);
                }
            });
            console.log(areas);
            $('.list-container').html("");

            //creates a group, assigns all classes to elements, sorts the elements and
            //then appends the new group to the document
            for(let key of Object.keys(areas)){
                console.log(key);
                let group = document.createElement('section');
                let title = document.createElement('span');
                let group_row = document.createElement('div');

                $.each(areas[key], function(i,area){
                    console.log(area);
                    group_row.append(area.sku);
                });

                //add clases and innerhtml to the title and group row
                title.classList.add('zona');
                title.innerHTML = "Zona "+key;
                group.appendChild(title);

                group_row.classList.add('list-row');
                group.appendChild(group_row);
                $('.list-container').append(group);
            };
        }
    });
});

//-get list of elements
//-group the elements by area id
//-group elements by joined with id
//-create group sections 
//       <section>
//           <span class="zona">zona 1</span>
//-create 