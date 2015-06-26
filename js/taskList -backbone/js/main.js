(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id){
		return _.template($('#' + id).html());
	};

    //Task Model
    App.Models.Task = Backbone.Model.extend({
        defaults: {
            taskName: '',
            status: 0
        },
        validate: function (attrs){
            if (attrs.taskName == ''){
                return 'error Name';
            }
        }
    });

    //A list of task
    App.Collections.TaskList = Backbone.Collection.extend({
        model: App.Models.Task
    });

    var taskCollection = new App.Collections.TaskList();

    //View for a task
    App.Views.Task = Backbone.View.extend({
        tagName: 'li',
        template: template('taskTemplate'),
        events: {
            "click .btn-edit": "editTask",
            "click .btn-complete": "completeTask",
            "click .btn-save": "saveTask",
            "click .btn-cansel": "cancelTask"
        },
        initialize: function () {
            this.render();
        },
        render: function (){
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.get('status')==1){
                this.$el.addClass('complete')
            }
            return this;
        },
        editTask: function(e) {
            this.$el.addClass('editing');
            this.template = template('editTemplate');
            this.render();
        },
        completeTask: function(e) {
            this.$el.addClass('complete');
            this.$el.find('button').remove();
            this.model.set({status: 1});
        },
        saveTask: function(e) {
            this.model.set({taskName: this.$el.find('input').val()}, {validate: true});
            this.cancelTask();
        },
        cancelTask: function(e) {
            this.$el.removeClass('editing');
            this.template = template('taskTemplate');
            this.render();
        }

    });

    //View for task list
    App.Views.TaskList = Backbone.View.extend ({
        tagName: 'ul',
        id: 'tasks-list',
        initialize: function () {
           this.collection.on('add', function() {
               this.renderLast();
           }, this);
        },
        render: function (){
           this.collection.each(function(task) {
               var taskView = new App.Views.Task({model: task});
               this.$el.prepend(taskView.el);
           }, this);
            return this;
        },
        renderLast: function() {
            var taskView = new App.Views.Task({model: this.collection.last()});
            this.$el.prepend(taskView.el);
        }
    });

    //View for task list form
    App.Views.TaskForm = Backbone.View.extend({
        template: template('formTemplate'),
        events: {
            "submit #task-form": "addTask"
        },
        initialize: function () {
            this.render();
        },
        render: function (){
            this.$el.html(this.template());
            return this;
        },
        addTask: function(e){
            e.preventDefault();
            var taskName = this.$el.find('#task-name');
            var model = new App.Models.Task({taskName: taskName.val()});
            if(model.isValid()){
                taskCollection.add(model);
                taskName.val('');
            }
        }
    });

    //Create task form and add to the DOM
    var taskForm = new App.Views.TaskForm();
    $(".wrapper").append(taskForm.render().el);

    //Create task list instance and add to the DOM
    var listView = new App.Views.TaskList({collection: taskCollection});
    $(".wrapper").append(listView.render().el);
})();
