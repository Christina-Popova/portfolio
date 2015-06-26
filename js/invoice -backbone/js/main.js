(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id){
		return _.template($('#' + id).html());
	};

    //Item Model
    App.Models.Item = Backbone.Model.extend({
        defaults: {
            title: '',
            quantity: null,
            price: null,
            subtotal: ''
        },
        validate: function (attrs){
            if (isNaN(attrs.quantity)){
                return 'error quantity';
            }
            if (isNaN(attrs.price)){
                return 'error price';
            }
            if (isNaN(attrs.subtotal)){
                return 'error subtotal';
            }
        }
    });

    //Collection of item
    App.Collections.ItemCollection = Backbone.Collection.extend({
        model: App.Models.Item
    });

    var itemCollection = new App.Collections.ItemCollection();
    var model = new App.Models.Item();
    itemCollection.add(model);

    //View for a item
    App.Views.Item = Backbone.View.extend({
        tagName: 'tr',
        template: template('itemTemplate'),
        events: {
            "click .btn-remove": "onRemoveItem",
            "keyup input[name^='price']": "calcSubTotal",
            "keyup input[name^='quantity']": "calcSubTotal",
            "keyup input.title": "saveTitle"
        },
        initialize: function () {
            this.model.on('change', this.updateFieldsFromModel, this);
            this.model.on('invalid', this.updateFieldsFromModel, this);
        },
        calcSubTotal: function (){
            var total = this.$el.find(".price").val() * this.$el.find(".quantity").val();
            this.model.set({
                subtotal: total.toFixed(2),
                price: this.$el.find(".price").val(),
                quantity: this.$el.find(".quantity").val()
            }, {validate: true});
        },

        saveTitle : function() {
            this.model.set({title: this.$el.find(".title").val()});
        },

        updateFieldsFromModel : function() {
            _.each(this.model.attributes, function(attr, k) {
                this.$el.find("." + k).val(this.model.get(k));
            }, this);
        },

        render: function (){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onRemoveItem: function(e) {
            this.model.destroy();
            this.$el.remove();
        }
    });

    //View for item collection
    App.Views.ItemCollection = Backbone.View.extend ({
        el: '#data',

        initialize: function () {
            this.collection.on('add', this.renderOne, this );
        },
        render: function (){
           this.collection.each(function(item) {
               this.renderOne(item)
           }, this);
            return this;
        },
        renderOne: function(item) {
            var itemView = new App.Views.Item({model: item});
            this.$el.append(itemView.render().el);
        }
    });

    //View for invoice form
    App.Views.InvoiceForm = Backbone.View.extend({
        el: '#invoice-form',
        events: {
            "click .btn-add": "onAddItem"
        },

        initialize : function() {
            this.collection.on('change:subtotal', this.recalculateTotal, this);
            this.collection.on('destroy', this.recalculateTotal, this);
        },

        onAddItem: function(e){
            e.preventDefault();
            var model = new App.Models.Item();
            this.collection.add(model);
        },
        recalculateTotal: function() {
            var total = 0;
            this.collection.each(function(item) {
                if (item.get('subtotal') != 0) {
                    total += parseFloat(item.get('subtotal'));
                }
            }, this);
           this.$el.find('#total').html(total);
        }
    });

    //Create invoice form
    new App.Views.InvoiceForm({collection: itemCollection});


    //Create item collection instance and add to the DOM
    var itemCollectionView = new App.Views.ItemCollection({collection: itemCollection});
    $("#data").append(itemCollectionView.render().el);
})();
