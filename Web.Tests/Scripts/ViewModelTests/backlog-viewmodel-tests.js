define(['backlogViewModel'],
	function (backlogViewModel) {
		var test = this;

		module('Backlog View Model - ');

		QUnit.testStart(function (details) {
			test.item1 = { "BugTrackerCaseId": 11, "Name": "Test 1", "Ordinal": 1 }
			test.item2 = { "BugTrackerCaseId": 22, "Name": "Test 2", "Ordinal": 2 }
			test.item3 = { "BugTrackerCaseId": 33, "Name": "Test 3", "Ordinal": 3 }

			var fakeGetItems = function (successCallback) {
				successCallback([test.item1, test.item3, test.item2]);
			};

			var fakeSaveItems = function (items) {
				return;
			};

			var fakeGetCaseName = function (id, successCallback) {
				successCallback('New item');
			};

			test.viewModel = new backlogViewModel(fakeGetItems, fakeSaveItems, fakeGetCaseName);
		});

		QUnit.test('Initialized backlog view has correct values', function () {
		    equal(viewModel.Backlog.Items()[0].Name, 'Test 1', 'Item 1 should be first');
		    equal(viewModel.Backlog.Items()[2].Name, 'Test 3', 'Item 3 should be last');

		    equal(viewModel.NewItemId(), '', 'New item id should be empty');
		    equal(viewModel.NewItemName(), '', 'New item name should be empty');
		    equal(viewModel.CanAdd(), false, 'Item adding should be disabled');
		});
	});
