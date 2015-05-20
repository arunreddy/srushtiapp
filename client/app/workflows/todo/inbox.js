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


	currentInboxId= "";
	var currentInboxTaskDep = new Tracker.Dependency;
	Template.Inbox.helpers({

			inboxTasks: function () {
				return InboxList.find();
			},
			inboxTask: function () {
				currentInboxTaskDep.depend();
				if(currentInboxId===""){
					return InboxList.findOne();
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
			}
		}
	);
}

