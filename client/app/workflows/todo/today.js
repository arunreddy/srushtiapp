if (Meteor.isClient) {
	//Helpers.
	Template.Today.helpers({

	});

	//Events
	Template.Today.events({

	});

	//JS Calls post rendering.
	Template.Today.rendered = function(){
			console.log('Rendered');
	}

}