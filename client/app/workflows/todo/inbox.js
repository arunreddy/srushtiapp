$(document).ready(function () {

	$('.task-check').click(function () {
		$(this).toggleClass("icon-check-empty");
		$(this).toggleClass("icon-check");
	});

	$('.action-item').click(function () {
		console.log('Clicked..');
		obj = $(this);
		obj.parent("div").children().each(function () {
			$(this).removeClass('action-item-active');
			data = $(this).attr('data');
			$('#task-' + data).hide();
		});

		obj.addClass('action-item-active');
		data = obj.attr('data');
		$('#task-' + data).show(1000);
	});
});

if (Meteor.isClient) {


	var currentInboxId= "";
	var currentInboxTaskDep = new Tracker.Dependency;
	Template.Inbox.helpers({

			inboxTasks: function () {
				return InboxList.find({'completed': {$exists : false }});
			},
			inboxTask: function () {
				currentInboxTaskDep.depend();
				if(currentInboxId===""){
					var inbox = InboxList.findOne();
					currentInboxId = inbox._id;
					return inbox;
				}else{
					return InboxList.findOne(currentInboxId);
				}

			}
		}
	);

	Template.Inbox.events({

			"blur .editable": function (event) {
				$obj = $(event.target);
				var updateObject = {};
				updateObject[$obj.attr('name')] = $obj.val();
				console.log($obj.attr('name'));
				InboxList.update(this._id, {$set: updateObject}, { upsert: true });
			},
			"click .taskDescription": function(event){
				currentInboxId = this._id;
				currentInboxTaskDep.changed();
			},
			"click .task-check": function(event){
				$obj = $(event.target);
				$obj.toggleClass("icon-check-empty");
				$obj.toggleClass("icon-check");
			},
			"click .trashTask": function(event){
				InboxList.remove(this._id);
			},
			"click .markComplete": function(event){
				InboxList.update(this._id, {$set: {'completed':true}}, { upsert: true });
			},
			"click .action-item": function(event){
				$obj = $(event.target);
				$obj.parent("div").children().each(function () {
					$(this).removeClass('action-item-active');
					data = $(this).attr('data');
					$('#task-' + data).hide();
				});

				$obj.addClass('action-item-active');
				data = $obj.attr('data');
				$('#task-' + data).show(1000);
			},
			"keyup #subTaskAdd": function(event){
				if (event.keyCode == 13) {
					console.log('Entered..');
					event.stopPropagation();
					$obj = $(event.target);
					var actionObject = {};
					actionObject['text'] = $obj.val();
					actionObject['completed'] = false;
					InboxList.update({ _id: this._id },{ $push: { actions: actionObject }});
					$obj.val('');
				}
			},
			"click .deleteSubTask":function(event){
				InboxList.update({ _id: currentInboxId },{ $pull: { actions: this }});
			}
		}
	);
}

