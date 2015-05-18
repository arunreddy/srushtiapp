//Router.route('/', function () {
//    this.render('Home', {
//        data: function () { return Items.findOne({_id: this.params._id}); }
//    });
//});

Router.route('/',function(){
   this.render('Welcome');
});

Router.route('/dashboard',function(){
    this.render('Dashboard');
});

Router.route('/today',function(){
    this.render('Today');
});

Router.route('/inbox',function(){
    this.render('Inbox');
});


Router.route('/tasks');
Router.route('/events');
Router.route('/reference');
Router.route('/completed');
Router.route('/someday');
Router.route('/lockItUp');

