const path          = require("path");
const fs            = require("fs");
const json_db_path  = path.join(__dirname, "../db/");

module.exports = {

    async saveObj2JsonDB(folderName, fileName, ObjContent) {

        let isExisted = await this.isExistFile(folderName, fileName);
        if(isExisted){
            return {
                message : "exist account",
                data : null
            };
        }
        
        try{
            await this.creatObj2JsonDB(folderName, fileName, ObjContent);
            let createdData = await this.loadObjsFromJsonDb(folderName, fileName);
            return { message : "success" , data : createdData};
        }catch(err){
            console.log("saveObj2JsonDB ERR :" , err);
            return null;
        }

    },

    async creatObj2JsonDB(folderName, fileName, ObjContent){
        let dir = this.makeDir(folderName, fileName);
        try{
            await fs.writeFileSync(dir, `${JSON.stringify(ObjContent)}`, 'utf-8');
        }catch(e){
            console.log("creatObj2JsonDB Err :" , e.toString());
        }
    },

    async appendObj2JsonDB(folderName, fileName, ObjContent){
        let dir = this.makeDir(folderName, fileName);
        try{
           return  await fs.appendFileSync(dir, `${JSON.stringify(ObjContent)}` + "\n");
        }catch(e){
            console.log("appendObj2JsonDB Err :" , e.toString());
        }
    },

    async loadObjsFromJsonDb(folderName, fileName){
        let dir = this.makeDir(folderName, fileName);
        try {
			let data  = await fs.readFileSync(dir, "utf8");
            return JSON.parse(data);

		} catch(Err) {
			console.log("loadObjsFromJsonDb Err :" , Err.toString());
            return null;
		}
    },

    async loadObjInfoByKeyValue(folderName, fileName, key, value){
        let dir = this.makeDir(folderName, fileName);

        try {
			let data  = await fs.readFileSync(dir, "utf8");
			let lines = data.split('\n');

            return lines.map( (line) =>{
                let obj = JSON.parse(line);
                if(obj && obj[key] && obj[key] == value) return obj;
            }).filter(item=> item);

		} catch(Err) {
			console.log("loadObjInfoByKeyValue Err :" , Err.toString());
            return null;
		}
    },

    async isExistFile(folderName, fileName){
        let dir = this.makeDir(folderName, fileName);
        try{
            return await fs.existsSync(dir);
        }catch(Err){
            console.log("isExistFile Err: " , Err);
            return null
        }
    },

    makeDir(folderName, fileName){
        let paths = [];
        if(folderName) {
            paths.push(folderName);
        }
        paths.push(`${fileName}.json`);
        return `${json_db_path}${paths.join('/')}` ;
    }
}