const EventEmitter  = require('events');
const define        = Object.defineProperty;

const createOutputs = (outputsArray)=>{
    return outputsArray.reduce((obj, output)=>{
        obj[output] = output;
        return obj;
    }, Object.create(null));
}

class Operation extends EventEmitter {

    static setOutputs(outputs) {
        define(this.prototype, 'outputs', {
            value: createOutputs(outputs),
        });
    }

    on(output, handler){
        if(!this.outputs[output]) 
            throw new Error(`Invalid output "${output}" to operation ${this.constructor.name}.`);

        this.addListener(output, handler);
        return this;
    }
}

class Myhandle extends Operation {
    excute(){
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
        const result = "2";

        if(result == '1') {
            return this.emit(VALIDATION_ERROR, new Error('test'));
        }

        if(result == '2') {
            return this.emit(SUCCESS, result);
        }

    }
}

Myhandle.setOutputs([
    'SUCCESS',
    'ERROR',
    'VALIDATION_ERROR',
]);

const triggerDemo = new Myhandle();

triggerDemo
    .on('VALIDATION_ERROR' , function(e){
        console.log("validate errr", e);
    })
    .on('ERROR', function(){

    })
    .on('SUCCESS', function(result){
        console.log(result);
    });

triggerDemo.excute();

  