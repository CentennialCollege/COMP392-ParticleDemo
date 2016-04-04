/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(public rotationSpeed:number, public goDown:boolean) {

        }
        
        public toggle(){
           this.goDown = this.goDown ? false : true; 
           console.log(this.goDown);
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       
    }
}
