define(['knockout', 'jquery'],

function (ko, $) {
    return function backlogViewModel(getItems, saveItems, getCaseName) {
        var self = this;

        self.Name = 'Test Backlog';
        self.BacklogItems = ko.observableArray([]);

        self.UserIsEditingId = ko.observable(false);
        self.NewItemId = ko.observable('');
        self.NewItemName = ko.observable('');
        self.CanAdd = ko.observable(false);

        self.MoveUp = function (item) {
        	if (item.Ordinal == 1) {
        		return;
        	}
        	switchItems(item, self.BacklogItems()[item.Ordinal - 2]);
        };

        self.MoveDown = function (item) {
        	if (item.Ordinal == (self.BacklogItems().length)) {
        		return;
        	}
        	switchItems(item, self.BacklogItems()[item.Ordinal]);
        };

        self.Sort = function () {
        	self.BacklogItems.sort(function (left, right) {
        		return (left.Ordinal < right.Ordinal) ? -1 : 1;
        	});
        };

        self.Add = function () {
        	if (!self.CanAdd()) {
        		return;
        	}
        	self.CanAdd(false);

        	var item = {
        		Name: self.NewItemName(),
        		BugTrackerCaseId: self.NewItemId(),
        		Ordinal: self.BacklogItems().length + 1
        	}

        	self.BacklogItems.push(item);
        	self.Sort();

        	self.NewItemId('');
        	self.NewItemName('');

        	saveItems(self.BacklogItems());
        };

        self.Remove = function (item) {
        	self.BacklogItems.remove(item);
        	$.each(self.BacklogItems(), function (index, item) {
        		item.Ordinal = index + 1;
        	});

        	saveItems(self.BacklogItems());
        };

		// Subscriptions
        self.UserIsEditingId.subscribe(function (editing) {
        	if (!editing) {
        		if (!newItemAlreadyInBacklog()) {
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

        // "Private" functions
        var switchItems = function (item1, item2) {
        	var temp = item1.Ordinal;
        	item1.Ordinal = item2.Ordinal
        	item2.Ordinal = temp;

        	self.Sort();

        	saveItems(self.BacklogItems());
        };       

        var newItemAlreadyInBacklog = function () {
        	var found = false;
        	$.each(self.BacklogItems(), function (index, item) {
        		if (self.NewItemId() == item.BugTrackerCaseId) {
        			found = true;
        		}
        	});
        	return found;
        };

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
        	self.BacklogItems(data);
        	self.Sort();
        });
	};
});