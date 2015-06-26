var myModule = (function () {

    var _createTask = function (text, param) {
        var newLi = $('<li>');
        var span = $('<span>', {
            text: text
        });

        var btnEdit = _createBtn (param.editText, param.editClass);
        var btnComplete = _createBtn (param.completeText, param.completeClass);
        var btnSave = _createBtn (param.saveText,param.saveClass);
        var btnCancel = _createBtn (param.cancelText, param.cancelClass);

        newLi.append(span, btnEdit, btnComplete, btnSave, btnCancel);
        return newLi;
    };

   var _createBtn = function (text, className){
       return $('<button>', {
           text: text,
           class: className
       })
   };

    var _createInput = function (value){
        return $('<input>', {
            type: 'text',
            value: value
        })
    };

    var _getTask = function(btn){
        return {
            li: btn.parent(),
            span: btn.siblings('span'),
            inpt: btn.siblings('input'),
            btns: btn.parent().find('button')
        }
    };

    var _edit = function (task, param) {
        var inputEdit = _createInput(task.span.text());
        task.li.addClass(param.liEditingClass);
        task.li.prepend(inputEdit);
        task.span.css('display', 'none');
    };

    var _complete = function(task, param){
        task.li.addClass(param.liCompletedClass);
        task.btns.remove();
    };

    var _save =  function(task, param){
        task.span.text(task.inpt.val());
        _disableEditMode(task, param);
    };

    var _disableEditMode = function(task, param){
        task.span.css('display', '');
        task.inpt.remove();
        task.li.removeClass(param.liEditingClass);
    };


    var initList = function (param) {
        var formBlock = $('#' + param.formId);
        var taskText = $('#' + param.textareaId);
        var ulTasks =  $('#' + param.ulId);

        formBlock.on('click', '[value=' + param.submitVal + ']', function(e){
            e.preventDefault();
            if (taskText.val()){
                var liTask = _createTask(taskText.val().trim(), param);
                ulTasks.prepend(liTask);
                taskText.val('');
            }
        });

        ulTasks
            .on('click', '.' + param.editClass, function(){
                _edit(_getTask($(this)), param);
            })
            .on('click', '.' + param.completeClass, function(){
                _complete(_getTask($(this)), param);
            })
            .on('click', '.' + param.saveClass, function(){
                _save(_getTask($(this)), param);
            })
            .on('click', '.' + param.cancelClass, function(){
                _disableEditMode(_getTask($(this)), param);
            })
    };

    return {
        initList: initList
    }

})();


myModule.initList({
    formId: 'task-form',
    textareaId: 'task-name',
    ulId: 'tasks-list',
    submitVal: 'Add',
    editText: 'Edit',
    completeText: 'Complete',
    saveText: 'Save',
    cancelText: 'Cancel',
    editClass: 'btn-edit',
    completeClass: 'btn-complete',
    saveClass: 'btn-save',
    cancelClass: 'btn-cancel',
    liCompletedClass: 'complete',
    liEditingClass: 'editing'

});
