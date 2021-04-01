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

const weekOf = 'Orders-Week-Of-' + new Date().toLocaleDateString();

const export_csv = (arrayHeader, arrayData, delimiter, fileName) => {
            let header = arrayHeader.join(delimiter) + '\n';
            let csv = header;
            arrayData.forEach( array => {
                csv += array.join(delimiter)+"\n";
            });
 
            let csvData = new Blob([csv], { type: 'text/csv' });  
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
            parseData(obj_csv.dataFile)       
  }
 }
}


function parseData(data){
    
    let csvData = [];
    let lbreak = data.split("\n").slice(1);

    lbreak.forEach(res => {
        csvData.push(res.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g));
    });

    let fixedCsvColumns = csvData.map(item => [item[0], item[1], item[10], item[12], item[13], item[14], item[15], item[16], item[24], item[25], item[27], item[30]]);
    export_csv(columnHeader, fixedCsvColumns,",",weekOf);
    // console.table('columnHeader', columnHeader);
    // console.table('here', fixedCsvColumns);
}