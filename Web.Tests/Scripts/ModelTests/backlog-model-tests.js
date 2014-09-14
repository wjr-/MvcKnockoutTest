define(['backlogModel'],
	function (backlogModel) {
		var test = this;

		module('Backlog Model - ');

		QUnit.testStart(function (details) {
			test.item1 = { "BugTrackerCaseId": 11, "Name": "Test 1", "Ordinal": 1 }
			test.item2 = { "BugTrackerCaseId": 22, "Name": "Test 2", "Ordinal": 2 }
			test.item3 = { "BugTrackerCaseId": 33, "Name": "Test 3", "Ordinal": 3 }            

			test.backlog = new backlogModel([item1, item2, item3]);
		});

		QUnit.test('Initialized backlog has correct values', function () {
		    equal(backlog.Items()[0].Name, 'Test 1', 'Item 1 should be first');
		    equal(backlog.Items()[2].Name, 'Test 3', 'Item 3 should be last');
		});

		QUnit.test('MoveUp - Item order updated', function () {
			backlog.MoveUp(item2);
			
			equal(backlog.Items()[0].Name, 'Test 2', 'Item 2 should be first');
			equal(backlog.Items()[1].Name, 'Test 1', 'Item 1 should be second');
		});

		QUnit.test('MoveUp - First item, nothing happens', function () {
			backlog.MoveUp(item1);

			equal(backlog.Items()[0].Name, 'Test 1', 'Item 1 should be first');
			equal(backlog.Items()[1].Name, 'Test 2', 'Item 2 should be second');
		});

		QUnit.test('MoveDown - Item order updated', function () {
			backlog.MoveDown(item2);

			equal(backlog.Items()[1].Name, 'Test 3', 'Item 3 should be second');
			equal(backlog.Items()[2].Name, 'Test 2', 'Item 2 should be last');
		});

		QUnit.test('MoveDown - Last item, nothing happens', function () {
			backlog.MoveDown(item3);

			equal(backlog.Items()[1].Name, 'Test 2', 'Item 2 should be second');
			equal(backlog.Items()[2].Name, 'Test 3', 'Item 3 should be last');
		});

		QUnit.test('Remove - Remaining items\' ordinals are updated', function () {
		    backlog.Remove(item1);

		    equal(backlog.Items()[0].Ordinal, 1, 'First item should have ordinal 1');
		    equal(backlog.Items()[1].Ordinal, 2, 'Second item should have ordinal 2');
		});

		QUnit.test('Remove - Item not found in collection', function () {
		    backlog.Remove(item1);

            equal(backlog.Contains(item1), false, 'Item 1 should not be in backlog')
		});

		QUnit.test('Add - New item is last', function () {
		    backlog.Add(44, "New item");

		    equal(backlog.Items()[3].Name, 'New item', 'New item should be last');
		    equal(backlog.Items()[3].BugTrackerCaseId, 44, 'New item should be last');
		});
	});
