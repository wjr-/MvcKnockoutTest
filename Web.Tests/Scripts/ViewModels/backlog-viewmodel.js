define(['knockout', 'jquery', 'backlogModel'],

function (ko, $, backlogModel) {
    return function backlogViewModel(getItems, saveItems, getCaseName) {
        var self = this;

        self.Name = 'Test Backlog';
        self.Backlog = new backlogModel();

        self.UserIsEditingId = ko.observable(false);
        self.NewItemId = ko.observable('');
        self.NewItemName = ko.observable('');
        self.CanAdd = ko.observable(false);

        self.MoveUp = function (item) {
            self.Backlog.MoveUp(item);
            saveItems(self.Backlog.Items());
        };

        self.MoveDown = function (item) {
            self.Backlog.MoveDown(item);
            saveItems(self.Backlog.Items());
        };

        self.Add = function () {
        	if (!self.CanAdd()) {
        		return;
        	}
        	self.CanAdd(false);

        	self.Backlog.Add(self.NewItemId(), self.NewItemName());

        	self.NewItemId('');
        	self.NewItemName('');

        	saveItems(self.Backlog.Items());
        };

        self.Remove = function (item) {
        	self.Backlog.Remove(item);

        	saveItems(self.Backlog.Items());
        };

        self.UserIsEditingId.subscribe(function (editing) {
        	if (!editing) {
        		if (!self.Backlog.Contains(self.NewItemId())) {
        			getItemName();
        		}
        		else {
        			self.NewItemName('Case is already in backlog!');
        		}
        	}
        	else {
        		self.CanAdd(false);
        	}
        });

        var getItemName = function () {
        	if (self.NewItemId() == '') {
        		return;
        	}

        	self.CanAdd(false);
        	self.NewItemName('Fetching from bug tracker...');

        	var successCallback = function (name) {
        		if (name != '') {
        			self.NewItemName(name);
        			self.CanAdd(true);
        		}
        		else {
        			self.NewItemName('Case not found!');
        		}
        	}

        	getCaseName(self.NewItemId(), successCallback);
        };

        // Init
        getItems(function (data) {
            self.Backlog.Items(data);
            self.Backlog.Sort();
        });
	};
});