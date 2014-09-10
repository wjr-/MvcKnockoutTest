requirejs.config({
	baseUrl: '../Scripts',
	paths: {
		knockout: 'Lib/knockout/knockout',
		knockoutMapping: 'Lib/knockout/knockout.mapping',
		ko: 'Lib/knockout/ko',
		jquery: 'Lib/jquery/jquery-2.1.1.min',
		domReady: 'Lib/require/domReady',

		// View Models
		backlogViewModel: 'ViewModels/backlog-viewmodel'
	}
});