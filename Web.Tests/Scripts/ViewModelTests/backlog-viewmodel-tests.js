define(['backlogViewModel'],
	function (backlogViewModel) {
		var self = this;

		module('Backlog View Model - ');

		QUnit.testStart(function (details) {
			self.item1 = { "BugTrackerCaseId": 11, "Name": "Test 1", "Ordinal": 1 }
			self.item2 = { "BugTrackerCaseId": 22, "Name": "Test 2", "Ordinal": 2 }
			self.item3 = { "BugTrackerCaseId": 33, "Name": "Test 3", "Ordinal": 3 }

			var fakeGetItems = function (successCallback) {
				successCallback([self.item1, self.item3, self.item2]);
			};

			var fakeSaveItems = function (items) {
				return;
			};

			var fakeGetCaseName = function (id, successCallback) {
				successCallback('New item');
			};

			self.backlog = new backlogViewModel(fakeGetItems, fakeSaveItems, fakeGetCaseName);
		});

		QUnit.test('Initialized backlog has correct values', function () {
			equal(backlog.BacklogItems()[0].Name, 'Test 1', 'Item 1 should be first');
			equal(backlog.BacklogItems()[2].Name, 'Test 3', 'Item 3 should be last');
			equal(backlog.NewItemId(), '', 'New item id should be empty');
			equal(backlog.NewItemName(), '', 'New item name should be empty');
			equal(backlog.CanAdd(), false, 'Item adding should be disabled');
		});

		QUnit.test('MoveUp - Item order updated', function () {
			backlog.MoveUp(item2, 1);
			
			equal(backlog.BacklogItems()[0].Name, 'Test 2', 'Item 2 should be first');
			equal(backlog.BacklogItems()[1].Name, 'Test 1', 'Item 1 should be second');
		});

		QUnit.test('MoveUp - First item, nothing happens', function () {
			backlog.MoveUp(item1, 0);

			equal(backlog.BacklogItems()[0].Name, 'Test 1', 'Item 1 should be first');
			equal(backlog.BacklogItems()[1].Name, 'Test 2', 'Item 2 should be second');
		});

		QUnit.test('MoveDown - Item order updated', function () {
			backlog.MoveDown(item2, 1);

			equal(backlog.BacklogItems()[1].Name, 'Test 3', 'Item 3 should be second');
			equal(backlog.BacklogItems()[2].Name, 'Test 2', 'Item 2 should be last');
		});

		QUnit.test('MoveDown - Last item, nothing happens', function () {
			backlog.MoveDown(item3, 2);

			equal(backlog.BacklogItems()[1].Name, 'Test 2', 'Item 2 should be second');
			equal(backlog.BacklogItems()[2].Name, 'Test 3', 'Item 3 should be last');
		});
	});
