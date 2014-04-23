var hadouken_timer;
var hadouken_speed = 1;
var hadouken_step = 4;
var hadouken_spots = 0;

function fire(side, character_x, character_y, move_to){
    if(character_x != '-'){
        $('#hadouken').show();
        $('#hadouken').attr('data-position-x', character_x);
        $('#hadouken').attr('data-position-y', character_y);
        $('#hadouken').css({'left':character_x+'px', 'top': character_y+'px'});
        if (move_to == 'right' && (side + hadouken_step) < (500)){
            //document.getElementById('hadouken').style.backgroundImage = "url('https://dl.dropboxusercontent.com/u/57935247/hadouken.png')";
            side += hadouken_step;
            hadouken_spots += 1;
            var move = (parseInt(character_x) + parseInt(side));
            document.getElementById('hadouken').style.left = move+"px";
            hadouken_timer = setTimeout(function(){fire(side, character_x, character_y, move_to);}, hadouken_speed);
            this_position = side;
            if(collapse_objects('hadouken', 'bullet')){
                stop_hadouken();
                stop_bullet();
                //launch_bullet(1);
            }
        }
        else if (move_to == 'left' && (side + hadouken_step) < (500)){
            //document.getElementById('hadouken').style.backgroundImage = "url('https://dl.dropboxusercontent.com/u/57935247/hadouken-left.png')";
            side -= hadouken_step;
            hadouken_spots += 1;
            var move = (parseInt(character_x) + parseInt(side));
            document.getElementById('hadouken').style.left = move+"px";
            hadouken_timer = setTimeout(function(){fire(side, character_x, character_y, move_to);}, hadouken_speed);
            this_position = side;
            collapse_objects('hadouken', 'bullet');
        }
        if (hadouken_spots > 100 ) {
            hadouken_spots = 0;
            stop_hadouken();
        }
        
    }
}

function stop_hadouken(){
		clearTimeout(hadouken_timer);
		$('#hadouken').hide();
}