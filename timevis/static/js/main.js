function viewModel(){
    var self = this;

    // ========================================================================
    // Controls
    // ========================================================================
    //
    self.sec = ko.observable('design');  // Active section
    self.opt = ko.observable('exp');     // Active option
    self.fun = ko.observable('exp_old'); // Active function

    self.exp_name = ko.observable();
    self.exp_people = ko.observable();
    self.exp_date = ko.observable();

    self.plate_types = [96, 384];
    self.plate_type = ko.observable();

    self.experiments = ko.observableArray(['AAA', 'BBB']);
    self.layouts = ko.observableArray(['AAA', 'BBB']);

    // Factor (independent variables)
    self.exp_fact = ko.observableArray([new ExpVar()]);

    // Channels (dependent variables)
    self.exp_chnl = ko.observableArray([new ExpVar()]);

    self.var_types = ['Category', 'Integer', 'Decimal'];

    // Add a new dependent
    self.addChnl = function() { self.exp_chnl.push(new ExpVar()) };

    // Remove a channel
    self.delChnl = function(chnl) { self.exp_chnl.remove(chnl) };

    // Add a new independent
    self.addFact = function() { self.exp_fact.push(new ExpVar()) };

    // Remove a factor
    self.delFact = function(fact) { self.exp_fact.remove(fact) };

    // ========================================================================
    // Plates
    // ========================================================================

    // Visualize plate
    self.vis_plate = ko.observable(false);

    // ========================================================================
    // Genes Vis: Factor selection and query
    // ========================================================================
    // Available factor for visualization
    self.factors = getFactors();

    // Factor chosen to be added
    self.factor_chosen = ko.observable();

    // Factor selected
    self.factor_panels = ko.observableArray();

    // Add a factor selection panel
    self.add_panel = function() {
        if (self.factor_chosen()){
            self.factor_panels.push(self.factor_chosen());
            self.factors.remove(self.factor_chosen());
            self.factor_chosen();
        }
    };

    // Remove a factor
    self.del_panel = function(fact) { 
        self.factor_panels.remove(fact);
        self.factors.push(fact);
        self.factors.sort(function(left, right) { 
            return left.name == right.name ? 0 : 
            (left.name < right.name ? -1 : 1) 
        });
        self.factor_chosen();

        // console.log(fact);
        // self.factor_panels.remove(fact) 
    	// fact._destroy = false;
        // self.factors.valueHasMutated();
    };

    // ========================================================================
    // Genes Vis: Time series curve vis
    // ========================================================================
    // vis row
    self.row = ko.observableArray([ ['a', 'b'], ['c', 'd'] ]);

}

// Get Factor for experiment
// return a observableArray of FactorPanel
function getFactors(exp) {
    return ko.observableArray([new FactorPanel('A'),
                               new FactorPanel('B')]);
}

// Search
function searchLevel(val) {
    var self = this;
    // check if string is empty
    console.log(val);
    if (val){
        for (g in self.levels()){
            if (self.levels()[g].name.search(val) === -1){
                self.levels()[g]._destroy = true;
            } else {
                self.levels()[g]._destroy = false;
            }
        }
    } else {
        console.log('Here');
        for (g in self.levels()){
            self.levels()[g]._destroy = false;
        }
    }
    self.levels.valueHasMutated();
}

// Factor class
var FactorPanel = function(name) {
    var self = this;
    self.name = name;
    self.query = ko.observable();
    self.query.subscribe(searchLevel, self);

    self.levels = ko.observableArray([new Level('1'), new Level('2')]);
    self.chosen_levels = ko.observable([]);
}

var Level = function(name){
    var self = this;
    self.name = name;
    self.value = 1;
}

var ExpVar = function() {
    var self = this;
    self.name = ko.observable();
    self.type = ko.observable();
};
var vm = new viewModel();
ko.applyBindings(vm);

var createSetting = function(nRow, nCol, fixRow){
    self.startRows = nRow;
    self.minRows = nRow;
    if (fixRow) {
        self.maxRows = nRow;
    }

    self.startCols = nCol;
    self.minCols = nCol;
    self.maxCols = nCol;

    self.manualColumnResize = true;
    self.manualRowResize = true;
    self.contextMenu = true;

    self.rowHeaders = function(i) { return String.fromCharCode(65 + i); };
    self.colHeaders = function(i) { return i+1; };
};

// TODO oop setting, make it dynamic for all types of tables
var setting = {
    startCols:12,
    minCols:12,
    maxCols:12,
    // colWidths: 28,
    startRows:8,
    manualColumnResize:true,
    manualRowResize:true,
    rowHeaders:function (i) { return String.fromCharCode(65 + i); },
    colHeaders:function (i) { return i+1; },
    contextMenu: true
};

var container1 = document.getElementById("well");
var hot1 = new Handsontable(container1, setting);
var container2 = document.getElementById("data_table");
var hot2 = new Handsontable(container2, setting);

$("#time-slider").slider();
