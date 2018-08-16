// Extremly Basic Model View Controller Javascript Framework
main();

function main() {
    var model = new Model();
    var controller = new Controller(model);
    var view = new View(controller);
}

function View(controller) {
    this.controller = controller;
    this.heading = document.getElementById('heading');
    this.heading.innerText = controller.getModelHeading();
    this.heading.addEventListener('click', controller);
    this.update = function(data) {
        this.heading.innerText = data.heading;
    }
    this.controller.model.registerObserver(this);
}

function Model() {
    var self = this;
    var heading = 'hello';
    // collection of observers
    this.observers = [];
    // add to collection of observers
    this.registerObserver = function(observer) {
        self.observers.concat(observer);
    }
    // Iterate through observers, calling their update method
    this.notifyAll = function() {
        self.observers.forEach(function(observer) {
            observer.update(self);
        });
    }

    // Pass this, as its the object we want to affect. Heading is the   
    // name of the property we want it to be attached to. Then we 
    // define the accessor and assignment functions
    Object.defineProperty(this,"heading",{
        get: function() { return heading; },
        set: function(value) { 
        heading = value; 
        //call notifyAll in the assignment function     
        this.notifyAll();
        }
    });
}

function Controller(model) {
    var self = this;
    this.model = model;

    // Event listener interface
    this.handleEvent = function(e) {
        e.stopPropagation();
        switch(e.type) {
            case 'click':
                self.clickHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }

    // Get Model Heading
    this.getModelHeading = function() {
        return self.model.heading;
    }

    // Change Model
    this.clickHandler = function(target) {
        self.model.heading = 'World';
        // notify all subscriptions
        // self.model.notifyAll();
    }
}