$(document).ready(function(){
    
    $('body').click(function(e){
         $('#btn-play').focus();
    });
    
    $('#btn-play').focus();
    $('#btn-play').keydown(function(e){
        switch (e.keyCode) {
            case 65:// 'a' key
                var character_y = 	$('#j').attr('data-position-y');
                var character_x = $('#j').attr('data-position-x');
                var move_to = $('#j').attr('data-moving-to');
                fire(1, character_x, character_y, move_to);
                break;
            case 37: // left key
                run_left(1, document.getElementById('j').offsetLeft);
    			break;
    		case 38: // up key
    		    if ($('#j').attr('data-jumping') == 'false') 
    		        jump(true, document.getElementById('j').offsetTop);
    			break;
    		case 39: // right key
    		    run_right(1, document.getElementById('j').offsetLeft);
    			break;
    		case 40: // down key
    		    stop_running();
    			break;
    		default:
    		    break;
        }
    });
    
    var play_status = 'stopped';
    
    $('#btn-play').click(function(e){
        e.preventDefault();
        $('#stage').slideToggle();
        
        if(play_status == 'stopped'){
            $(this).removeClass('btn-success').addClass('btn-danger');
            $(this).val('Close Game');    
            play_status = 'playing';
            launch_bullet(1);
            generate_coins();
            //console.log(play_status);
        }
        else{
            $(this).removeClass('btn-danger').addClass('btn-success');
            $(this).val('Play');    
            play_status = 'stopped';
            //console.log(play_status);
        }
    });
    
    $('#reset-character').click(function(e){
      reset_character();
    });
    
    $('#message').click(function(e){
        e.preventDefault();
        play_status = 'playing';
        launch_bullet(1);
        reset_character();
        $(this).fadeOut();
        //Generate Coins
        generate_coins();
    });
    
    function reset_character(){
        $('#j').slideToggle();
        $('#j').attr('data-alive', 'true');
        $('#j').attr('data-position-x', '-');
        $('#j').attr('data-position-y', '333');
        $('#j').attr('data-jumping', 'false');
        $('#title').css('color', 'white');
        $('.character').css({'left':'50%','top':'333px'});
        $("#reset-character").fadeOut();
    }
    
    function generate_coins(){
        for (var i=0; i<5; i++)
            create_coin(i);
    }
    
});

 function collapse_objects(obj1_name, obj2_name){
    var obj1 = document.getElementById( obj1_name );
    var obj2 = document.getElementById( obj2_name );
    
    var j_top = parseInt(obj1.style.top);
    var j_left = parseInt(obj1.style.left);
    var j_width = parseInt(obj1.offsetWidth);
    var j_height = parseInt(obj1.offsetHeight);
    var j_total_h = j_top + j_height;
    var j_total_w = parseInt(j_left) + parseInt(j_width);
    
    var b_top = parseInt(obj2.style.top);
    var b_height = parseInt(obj2.offsetHeight);
    var b_total_h = b_top + b_height;
    var b_left = parseInt(obj2.style.left);
    var b_width = parseInt(obj2.offsetWidth);
    var b_total_w = parseInt(b_left) + parseInt(b_width);
    
    if( ( ( j_top < b_top) && ( j_total_h >= b_top && j_total_h <= b_total_h ) ) || ( ( j_top > b_top) && ( j_top >= b_top && j_top <= b_total_h ) ) ){
        if ( ( ( j_left < b_left ) && ( j_total_w >= b_left && j_total_w <= b_total_w ) ) || ( ( j_left > b_left ) && ( j_left >= b_left && j_left <= b_total_w ) ) ){
            obj1.style.display = 'none';
            obj2.style.display = 'none';
            stop_bullet();
            return true;
            
        }
    }
   
}