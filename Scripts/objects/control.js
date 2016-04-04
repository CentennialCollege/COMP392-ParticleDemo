/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, goDown) {
            this.rotationSpeed = rotationSpeed;
            this.goDown = goDown;
        }
        Control.prototype.toggle = function () {
            this.goDown = this.goDown ? false : true;
            console.log(this.goDown);
        };
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
