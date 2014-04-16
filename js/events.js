$(document).ready(function(){
    
    $('body').click(function(e){
         $('#btn-play').focus();
    });
    
    $('#btn-play').focus();
    $('#btn-play').keydown(function(e){
        switch (e.keyCode) {
            case 37: // left key
                //console.log('Left');
                run_left(1, document.getElementById('j').offsetLeft);
    			break;
    		case 38: // up key
    		    //console.log('Up');
    		    if ($('#j').attr('data-jumping') == 'false') 
    		        jump(true, document.getElementById('j').offsetTop);
    			break;
    		case 39: // right key
    		    //console.log('Right');
    		    run_right(1, document.getElementById('j').offsetLeft);
    			break;
    		case 40: // down key
    		    //console.log('Down');
    		    stop_running();
    			break;
    		default:
    		    //console.log('Any');
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