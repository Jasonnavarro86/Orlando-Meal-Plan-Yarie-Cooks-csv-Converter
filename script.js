let isInitialLoad = true;
const loader = document.getElementById('loader');

setTimeout(() => {
  loader.hidden = true;
}, 1000);
 

 var obj_csv = {
    size:0,
    dataFile:[]
};

const columnHeader = ['Order ID', 'Date', 'Location Name', 'Country/Region', 'State/Province', 'Town/City',  'Address', 'ZIP Code', 'Item Name','Meal Plan', 'QTY', 'Notes']

const weekOf = 'Formated-Week-' + new Date().toLocaleDateString();

const export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
            let header = arrayHeader.join(delimiter) + '\n';
            let csv = header;
            arrayData.forEach( array => {
                csv += array.join(delimiter)+"\n";
            });
 
            let csvData = new Blob([csv.trim()], { type: 'text/csv' });  
            let csvUrl = URL.createObjectURL(csvData);
 
            let hiddenElement = document.createElement('a');
            hiddenElement.href = csvUrl;
            hiddenElement.target = '_blank';
            hiddenElement.download = fileName + '.csv';
            hiddenElement.click();
        }
 
function readImage(input) {
 if (input.files && input.files[0]) {
 let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
 reader.onload = function (e) {
 obj_csv.size = e.total;
 obj_csv.dataFile = e.target.result
            console.log(obj_csv.dataFile)
            parseData(obj_csv.dataFile)
            
  }
 }
}

function parseData(data){
    let csvData = [];
    let lbreak = data.split("\n");
    lbreak.forEach(res => {
        csvData.push(res.split(","));
    });
    let fixedCsvColumns = csvData.slice(1).map(item => [item[0], item[1] + " " + item[2], item[11], item[13], item[14], item[15], item[16], item[17], item[25], item[26], item[28], item[31]]);
    export_csv(columnHeader, fixedCsvColumns,",",weekOf)
    // console.table('columnHeader', columnHeader);
    // console.table('here', fixedCsvColumns);
}