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
}

function Model() {
    this.heading = 'hello';
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
        target.innerText = self.getModelHeading();
    }
}