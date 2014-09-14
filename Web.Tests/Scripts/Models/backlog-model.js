define(['knockout', 'jquery'],

function (ko, $) {
    return function backlogModel(items) {
        var self = this;

        self.Items = ko.observableArray(items);

        self.MoveUp = function (item) {
            if (item.Ordinal == 1) {
                return;
            }
            switchItems(item, self.Items()[item.Ordinal - 2]);
        };

        self.MoveDown = function (item) {
            if (item.Ordinal == (self.Items().length)) {
                return;
            }
            switchItems(item, self.Items()[item.Ordinal]);
        };

        self.Sort = function () {
            self.Items.sort(function (left, right) {
                return (left.Ordinal < right.Ordinal) ? -1 : 1;
            });
        };

        self.Add = function (bugTrackerCaseId, name) {
            var item = {
                Name: name,
                BugTrackerCaseId: bugTrackerCaseId,
                Ordinal: self.Items().length + 1
            }

            self.Items.push(item);
            self.Sort();
        };

        self.Remove = function (item) {
            self.Items.remove(item);
            $.each(self.Items(), function (index, item) {
                item.Ordinal = index + 1;
            });
        };

        self.Contains = function (bugTrackerCaseId) {
            var found = false;
            $.each(self.Items(), function (index, item) {
                found = (item.BugTrackerCaseId == bugTrackerCaseId);
            });
            return found;
        };

        // "Private" functions
        var switchItems = function (item1, item2) {
            var temp = item1.Ordinal;
            item1.Ordinal = item2.Ordinal
            item2.Ordinal = temp;

            self.Sort();
        };
    };
});