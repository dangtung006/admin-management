const fs = require("fs");
const XLSX = require("xlsx");

class EXCEL_HELPER {

    constructor(){
    }

    loadFile(path){
        //file-example.xlsx
        // const workbook = XLSX.read(fs.readFileSync("file-example.xlsx"));
        this.workbook = XLSX.readFile(path);
    }

    convertToJson(){
        let worksheets = {};
        const SheetNames = this.workbook['SheetNames'];
        for (const sheetName of SheetNames) {
            // Some helper functions in XLSX.utils generate different views of the sheets:
            //     XLSX.utils.sheet_to_csv generates CSV
            //     XLSX.utils.sheet_to_txt generates UTF16 Formatted Text
            //     XLSX.utils.sheet_to_html generates HTML
            //     XLSX.utils.sheet_to_json generates an array of objects
            //     XLSX.utils.sheet_to_formulae generates a list of formulae
            worksheets[sheetName] = XLSX.utils.sheet_to_json(this.workbook.Sheets[sheetName]);
        }

        this.worksheets= worksheets;

        console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n");
    }

    appendDataToExcelFile(path){
        // Modify the XLSX
        this.worksheets.Sheet1.push({
            "First Name": "Bob",
            "Last Name": "Bob",
            "Gender": "Male",
            "Country": "United States",
            "Age": 35,
            "Date": "22/09/2020",
            "Id": 1600,
            "New Column": "test"
        });

        // Update the XLSX file
        XLSX.utils.sheet_add_json(this.workbook.Sheets["Sheet1"], this.worksheets.Sheet1)
        XLSX.writeFile(this.workbook, path);
    }

    creatNewFile(path){
        const newBook = XLSX.utils.book_new();
        const newSheet = XLSX.utils.json_to_sheet(this.worksheets.Sheet1);
        XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1");
        //"new-book.xlsx"
        XLSX.writeFile(newBook,"path");
    }
}

module.exports = EXCEL_HELPER;