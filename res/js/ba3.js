// ======================================================= //
// Bob's Adventures: Episode 3 - Caves of Xon
//
// Author: brendan@slayweb.com
// Web: http://www.slayweb.com
// Last Updated: 2016-07-21
// Github: https://github.com/slayster/ba3
//
// ======================================================= //

// ======================================================= //
// GLOBAL VARIABLES
// ======================================================= //
var level = [];
var pos_x_current;
var pos_y_current;
var pos_x_start;
var pos_y_start;
var pos_x_end;
var pos_y_end;
var tiles = [];
var fromdir = 0;
var bob;

var compass_back;
var compass_arrow_up_on;
var compass_arrow_down_on;
var compass_arrow_left_on;
var compass_arrow_right_on;
var compass_arrow_up_off;
var compass_arrow_down_off;
var compass_arrow_left_off;
var compass_arrow_right_off;
var compass_n_butt;
var compass_s_butt;
var compass_w_butt;
var compass_e_butt;
var compass_n_off;
var compass_s_off;
var compass_w_off;
var compass_e_off;


// ======================================================= //
// OBJECTS
// ======================================================= //

function ba3MazeTile(tiletypeid,xp,yp) {

    function check_n(typeid) {
        if ((typeid==1)||(typeid==2)||(typeid==5)||(typeid==6)||(typeid==10)||(typeid==12)||(typeid==13)||(typeid==14)) {
            return true;
        } else {
            return false;
        }
    }
    function check_s(typeid) {
        if ((typeid==0)||(typeid==3)||(typeid==5)||(typeid==6)||(typeid==8)||(typeid==11)||(typeid==12)||(typeid==14)||(typeid==15)) {
            return true;
        } else {
            return false;
        }
    }
    function check_e(typeid) {
        if ((typeid==0)||(typeid==1)||(typeid==4)||(typeid==6)||(typeid==9)||(typeid==11)||(typeid==13)||(typeid==14)||(typeid==16)) {
            return true;
        } else {
            return false;
        }
    }
    function check_w(typeid) {
        if ((typeid==2)||(typeid==3)||(typeid==4)||(typeid==6)||(typeid==7)||(typeid==11)||(typeid==12)||(typeid==13)) {
            return true;
        } else {
            return false;
        }
    }

    this.tiletype = tiletypeid;
    this.noofvisits = 0;
    this.dirnorth = check_n(this.tiletype);
    this.dirsouth = check_s(this.tiletype);
    this.direast  = check_e(this.tiletype);
    this.dirwest  = check_w(this.tiletype);
    this.coordx = xp;
    this.coordy = yp;

}

// ======================================================= //
// HELPER FUNCTIONS
// ======================================================= //
function storyScroll() {
    if (this.getY()>=-550) {
        this.setY(this.getY()-1);
    }
}

function moveBobInNorth() {
    if (this.getY()<238) {
        this.setY(this.getY()+1);
    } else {
        movecontroller.remove(bob);
    }
}

function moveBobInSouth() {
    if (this.getY()>=238) {
        this.setY(this.getY()-1);
    } else {
        movecontroller.remove(bob);
    }
}

function moveBobInEast() {
    if (this.getX()>=345) {
        this.setX(this.getX()-1);
    } else {
        movecontroller.remove(bob);
    }
}

function moveBobInWest() {
    if (this.getX()<345) {
        this.setX(this.getX()+1);
    } else {
        movecontroller.remove(bob);
    }
}


// ======================================================= //
// MAIN GAME LOGIC
// ======================================================= //

function showCurrentTile() {
    bob5ClearAll();    

    tile = level[pos_y_current][pos_x_current];
    renderer.add(tiles[tile.tiletype]);
    
    renderer.add(bob);
    
    switch (fromdir) {
        case 0:
            bob.move = moveBobInNorth;
            break;
        case 1:
            bob.move = moveBobInSouth;
            break;
        case 2:
            bob.move = moveBobInEast;
            break;
        case 3:
            bob.move = moveBobInWest;
            break;
    }
    movecontroller.add(bob);    
    
    
}

function moveBobOut() {

}

function showCompass() {
    renderer.add(compass_back);

    tile = level[pos_y_current][pos_x_current];
    if (tile.dirnorth) {
        renderer.add(compass_arrow_up_on);
        renderer.add(compass_n_butt);
        hoverMonitor.add(compass_n_butt);
        mouseDownMonitor.add(compass_n_butt);
        mouseUpMonitor.add(compass_n_butt);
        mouseClickMonitor.add(compass_n_butt);
        compass_n_butt.onMouseClick = moveBobOut;
    } else {
        renderer.add(compass_arrow_up_off);
        renderer.add(compass_n_off);
    }    
    if (tile.dirsouth) {
        renderer.add(compass_arrow_down_on);
        renderer.add(compass_s_butt);
        hoverMonitor.add(compass_s_butt);
        mouseDownMonitor.add(compass_s_butt);
        mouseUpMonitor.add(compass_s_butt);
        mouseClickMonitor.add(compass_s_butt);
        compass_s_butt.onMouseClick = moveBobOut;
    } else {
        renderer.add(compass_arrow_down_off);
        renderer.add(compass_s_off);
    }    
    if (tile.dirwest) {
        renderer.add(compass_arrow_left_on);
        renderer.add(compass_w_butt);
        hoverMonitor.add(compass_w_butt);
        mouseDownMonitor.add(compass_w_butt);
        mouseUpMonitor.add(compass_w_butt);
        mouseClickMonitor.add(compass_w_butt);
        compass_w_butt.onMouseClick = moveBobOut;
    } else {
        renderer.add(compass_arrow_left_off);
        renderer.add(compass_w_off);
    }    
    if (tile.direast) {
        renderer.add(compass_arrow_right_on);
        renderer.add(compass_e_butt);
        hoverMonitor.add(compass_e_butt);
        mouseDownMonitor.add(compass_e_butt);
        mouseUpMonitor.add(compass_e_butt);
        mouseClickMonitor.add(compass_e_butt);
        compass_e_butt.onMouseClick = moveBobOut;
    } else {
        renderer.add(compass_arrow_right_off);
        renderer.add(compass_e_off);
    }    
}

function loadLevel() {
    // raw level data
    raw_level = new Array(14);
    raw_level[0] = [ 0,11, 4,11, 4,11, 4, 4, 7, 0, 3, 8, 0, 3];
    raw_level[1] = [10, 5, 9, 2, 8, 5, 0, 4, 4,12,10, 1,13,12];
    raw_level[2] = [16,13,11, 4, 2,10, 1, 7, 0,13,11, 4, 3, 5];
    raw_level[3] = [ 0, 3, 5, 0, 4, 3, 8, 9,12, 8, 1, 3,14, 2];
    raw_level[4] = [ 5, 1,12, 1, 3, 1,12, 0,12, 5, 9, 2, 1, 3];
    raw_level[5] = [ 5, 0, 2, 0,13, 4, 2, 5, 1,13, 7, 0,11, 2];
    raw_level[6] = [ 5,14, 4,13, 7, 9, 4,13, 3, 8, 0, 2, 5, 8];
    raw_level[7] = [ 5,14, 4, 4, 3, 0, 7, 0, 2, 5, 5, 8,14, 2];
    raw_level[8] = [10, 5, 9, 3,10, 5, 8, 5, 0,13,12, 1, 2, 8];
    raw_level[9] = [ 0,13, 3, 1, 4, 6, 2, 5,10, 0,13,11, 7, 5];
    raw_level[10]= [ 1, 3, 1,11, 4, 6, 4, 2, 8,10,15, 5, 0,12];
    raw_level[11]= [ 9, 6, 4, 2, 8, 5, 0, 4,12, 0,13, 6,13,12];
    raw_level[12]= [ 0, 2, 0, 3, 5, 5, 1, 3, 1, 6, 7,14, 7, 5];
    raw_level[13]= [ 1, 4,13, 2, 1,13, 7, 1, 4,13, 4,13, 4, 2];
    
    // turn data into objects
    for (y=0; y<14; y++) {
        level[y] = [];
        for (x=0; x<14; x++) {
            level[y][x] = new ba3MazeTile(raw_level[y][x],x,y);
            if (raw_level[y][x]==15) {
                pos_x_start = x;
                pos_y_start = y;
            }
            if (raw_level[y][x]==16) {
                pos_x_end = x;
                pos_y_end = y;
            }
        
        }    
    }
    
    pos_x_current = pos_x_start;
    pos_y_current = pos_y_start;
    
    // load graphics
    
    // load maze tiles
    for (i=0; i<17; i++) {
        tiles[i] = new b5roSprite("./res/img/maze-"+i+".jpg",0,0,800,600);
    } 
    // load bob (109x125)
    bob = new b5roSprite("./res/img/bob1.png",345,0,109,125);
    
    // Load Compass (178x177)
    compass_back = new b5roSprite("./res/img/compass-back.png",620,420,178,177);
    compass_arrow_up_on = new b5roSprite("./res/img/compass-arrow-up-on.png",696,452,20,57);
    compass_arrow_down_on = new b5roSprite("./res/img/compass-arrow-down-on.png",696,509,20,56);
    compass_arrow_left_on = new b5roSprite("./res/img/compass-arrow-left-on.png",653,496,50,20);
    compass_arrow_right_on = new b5roSprite("./res/img/compass-arrow-right-on.png",709,496,57,20);
    compass_arrow_up_off = new b5roSprite("./res/img/compass-arrow-up-off.png",696,452,20,57);
    compass_arrow_down_off = new b5roSprite("./res/img/compass-arrow-down-off.png",696,509,20,56);
    compass_arrow_left_off = new b5roSprite("./res/img/compass-arrow-left-off.png",653,496,50,20);
    compass_arrow_right_off = new b5roSprite("./res/img/compass-arrow-right-off.png",709,496,57,20);
    
    compass_n_butt = new b5roButton("./res/img/compass-n-on.png", "./res/img/compass-n-hov.png", "./res/img/compass-n-off.png", "./res/img/compass-n-off.png", 690, 430, 33, 53);
    compass_s_butt = new b5roButton("./res/img/compass-s-on.png", "./res/img/compass-s-hov.png", "./res/img/compass-s-off.png", "./res/img/compass-s-off.png", 690, 528, 33, 53);
    compass_w_butt = new b5roButton("./res/img/compass-w-on.png", "./res/img/compass-w-hov.png", "./res/img/compass-w-off.png", "./res/img/compass-w-off.png", 636, 489, 53, 35);
    compass_e_butt = new b5roButton("./res/img/compass-e-on.png", "./res/img/compass-e-hov.png", "./res/img/compass-e-off.png", "./res/img/compass-e-off.png", 728, 489, 53, 35);
    compass_n_off = new b5roSprite("./res/img/compass-n-off.png", 690, 430, 33, 53);
    compass_s_off = new b5roSprite("./res/img/compass-s-off.png", 690, 528, 33, 53);
    compass_w_off = new b5roSprite("./res/img/compass-w-off.png", 636, 489, 53, 35);
    compass_e_off = new b5roSprite("./res/img/compass-e-off.png", 728, 489, 53, 35);
}


function runGame() {
    bob5Debug("Running Game...");
    
    loadLevel();

    showCurrentTile();
    
    showCompass();

}

function runIntro() {
    bob5Debug("Running Intro...");

    bob5ClearAll();    
    
    bg = new b5roBackground(0,0,0);
    renderer.add(bg);
    
    story = new b5roSprite("./res/img/story.jpg",0,0,800,1163);
    renderer.add(story);
    story.move = storyScroll;
    movecontroller.add(story);
    
    mouseClickMonitor.add(story);
    story.onMouseClick = runGame;
    
}


function runMainMenu() {
    bob5Debug("Running Main Menu...");

    bob5ClearAll();    

    // load background image
    bg = new b5roBackgroundImage(0, 0, 0, "./res/img/titlescreen.jpg");
    renderer.add(bg);
    
    // add start button
    btnStart = new b5roButton("./res/img/btn-start-on.png", "./res/img/btn-start-hover.png", "./res/img/btn-start-click.png", "./res/img/btn-start-off.png", 260, 370, 276, 49);
    renderer.add(btnStart);
    hoverMonitor.add(btnStart);
    mouseDownMonitor.add(btnStart);
    mouseUpMonitor.add(btnStart);
    mouseClickMonitor.add(btnStart);
    btnStart.onMouseClick = runIntro;
}

function runProgram() {

    bob5CanvasInit("bob5Display");
    
    updateShowFPS(true);
    
    bob5ReplaceCursor("./res/img/cursor.png",22,23);
    
    runMainMenu();
    
}
