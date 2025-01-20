let json_filename = "data.json";

function createCard(area){
    let card = document.createElement('div');
    let card_span = document.createElement('span');
    card.classList.add('list-element');
    card_span.classList.add('list-elem-content');
    card_span.setAttribute("data-after", area.defaultSku);
    card_span.innerHTML=area.sku;
    card.appendChild(card_span);
    return card;
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
                    // group_row.append(area.sku);

                    //for every entry that has joinedWith as null, add it to the group and add all of the elements that follow it as well
                    if(area.joinedWith==null){
                        let card = createCard(area); //create the first element in the Chain
                        group_row.appendChild(card);

                        let chain_status_counter=0; // 0 - every entry has status of 'open', 0< - at least one is 'closed', 
                        let amount_of_entries=0;    //  == Number of entries in chain - all are closed 
                        let previous_card = card;

                        if(area.status=='closed') chain_status_counter++;
                        $.each(areas[key], function(i,next_area){
                            if(next_area.joinedWith == area.id){
                                let new_card = createCard(next_area);
                                group_row.appendChild(new_card);

                                previous_card.classList.add('isConected');
                                previous_card=new_card;                         //apply the connection styling to the previous card

                                //console.log(next_area.id+" is with "+area.id);
                                if(next_area.status=='closed') chain_status_counter++; //count the entries that are closed
                                amount_of_entries++;
                            }
                        });


                        if(chain_status_counter==amount_of_entries+1)
                            card.classList.add('indicator-closed');
                        else if(chain_status_counter>0)
                            card.classList.add('indicator-warn');
                        else
                            card.classList.add('indicator-open');
                    }
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