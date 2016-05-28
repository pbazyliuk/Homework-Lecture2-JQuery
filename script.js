$(function() {



    //INPUT TEXT FIELD VALIDATION SECTION
    var textInput = $("#new-text");

    $("span").hide();

    function isPasswordValid() {
        return textInput.val().length > 5;
    }

    function passwordEvent() {
        if (isPasswordValid()) {
            textInput.next().hide();
        } 
        else {
            textInput.next().show();
        }
    }    

    textInput.focus(passwordEvent).keyup(passwordEvent);



    //ADD TODO LIST ITEM FUNCTION
    function addListItem() {
        if ( ($('#new-text').val() === '') || ($('#new-text').val().length < 6)) {return;}
        else {
        var text = $('#new-text').val();
        $("#todo-list").append('<li ><input type="checkbox" class="toggle"/ ><span class="text">' 
        + text + ' </span><button class="destroy"></button></li>');
        $("#new-text").val('');
        }
    }



    //CLEAR ALL COMPLETED ITEMS FUNCTION
    function clearCompleted() {
        $("#todo-list .toggle:checked").parent().remove();

        $('#toggle-all').removeAttr( "checked" );
    }



    //DELETE TODO LIST ITEM FUNCTION
    function deleteItem() {
        $(this).parent().remove();
    }



    //COMPLETE TODO LIST ITEM FUNCTION
    function completed() {

      if($(this).parent().hasClass("completed") || $(this).next().hasClass("completed")) {
            $(this).parent().removeClass("completed");
            $(this).next().removeClass("completed");
        }
        
        else {
            $(this).parent().addClass("completed");
            $(this).next().removeClass("completed");
        }
    }


    //COMPLETE ALL TODO LIST ITEMS FUNCTION
    function completeAll() {

        $('input:checkbox').not(this).prop('checked', this.checked);
            if(!$('li span').hasClass("completed")) { 
                $('li span').addClass("completed");
                $('li').removeClass("completed");
             }

            else {                     
                $('li span').removeClass("completed");
                $('li').removeClass("completed");
            }
    };   

    

    //EVENT ADD TODO LIST ITEM 
    $('#new-text').keyup(function(e) {

        if (e.keyCode === 13)  {
            addListItem();
        }
    });



    //EVENT DELETE TODO LIST ITEM
    $(document).on('click', '.destroy', deleteItem);



    //EVENT COMPLETE ALL TODO LIST ITEMS
    $(document).on('change', '#toggle-all', completeAll);
    


    //EVENT TOGGLE TODO LIST ITEM
    $(document).on('change', '.toggle', completed);



    //EVENT DELETE ALL TODO LIST ITEMS
    $("#clearcompleted").click(clearCompleted);



    //EVENT EDIT TODO LIST ITEM
    $('#todo-list').on('dblclick', 'span', function() {

            var thisData = this.innerHTML,
            $el = $('<input type="text" class="in-edit-text"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
          
        });



        //EVENT FINISH EDITING TODO LIST ITEM
        $('#todo-list').on('keyup', '.in-edit-text', (function(e) {
 
            if (e.keyCode === 13) {
                text = '';
                text = $(this).val();
                $(this).replaceWith($('<span class="text">' + $(this).val() + '</span>'));
            }

            if (e.keyCode === 27) {
                $(this).replaceWith($('<span class="text">' + text + '</span>'));
            }
        }));

});