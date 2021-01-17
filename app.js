/*///////////////////////////////////////////////////////////////*/
//Set-up

var storage = 50; 
var currStorage = 0; 
var images= [];
var inputFile = document.getElementById("image-file");
var progressBar = document.querySelector(".progress-bar__used");
var tooltip = document.querySelector(".tooltip");
var table = document.getElementById('myTable');


//update UI elements
function changeUIElement (selector, storage, desc){
    document.querySelector(selector).innerHTML= storage + desc;
}

changeUIElement('.progress-bar__detials > span' , currStorage, ' MB');

 //changeProgressBarUI
 function changeProgressBarUI() {
    progressBar.style.width = ((currStorage / storage) * 100).toFixed(1) + '%';
 };

 function toggle(element){
    
    if (currStorage === 0)  
         element.style.display = 'none';
    else 
         element.style.display = 'inline';
 };

 toggle(tooltip);
 toggle(table);


/*///////////////////////////////////////////////////////////////*/

function showSummery(image){
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    var Row = tbodyRef.insertRow();

    var nameCell = Row.insertCell();
    var sizeCell = Row.insertCell();

    var Text1 = document.createTextNode(image.name);
    var Text2 = document.createTextNode(image.size);
    nameCell.appendChild(Text1);
    sizeCell.appendChild(Text2);
};



function SavePhoto (input){
    
    if ('files' in inputFile) {
            var file = inputFile.files[0];

            if ('name' in file) { 
                var fileName = ('name' in file)? file.name : '';
                var fileSizeinBytes = ('size' in file)? file.size : 0;
                var fileSizeinMB = parseFloat((fileSizeinBytes / (1024*1024)).toFixed(2));

                var image = {}; 
                image['name'] = fileName;

                if (!isNaN(fileSizeinMB) && (fileSizeinMB <= 1.5) && ((storage - fileSizeinMB) > 0) ) { 
                    image['size'] = fileSizeinMB;
                    storage = storage - fileSizeinMB;
                    currStorage += fileSizeinMB;
                    changeUIElement('.cards__right__header p strong', currStorage, ' MB');
                    changeUIElement('.cards__right--text > b',storage, 'MB LEFT');
                    changeUIElement('.progress-bar__detials > span' , currStorage, ' MB');
                    changeProgressBarUI();
                    toggle(tooltip);
                    toggle(table);
                    showSummery(image);

                }
                else 
                    alert('Can\'t upload image. ');
                
                images.push(image);
            }
    }
};