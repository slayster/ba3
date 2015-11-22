// ======================================================= //
// Bob's Adventures: Episode 3 - Caves of Xon
//
// Author: brendan@slayweb.com
// Web: http://www.slayweb.com
// Last Updated: 2015-11-21
//
// ======================================================= //

var level;

function storyScroll() {
    if (this.getY()>=-550) {
        this.setY(this.getY()-1);
    }
}

function loadLevel() {
    level[0] = [ 0,11, 4,11, 4,11, 4, 4, 7, 0, 3, 8, 0, 3];
    level[1] = [10, 5, 9, 2, 8, 5, 0, 4, 4,12,10, 1,13,12];
    level[2] = [16,13,11, 4, 2,10, 1, 7, 0,13,11, 4, 3, 5];
    level[3] = [ 0, 3, 5, 0, 4, 3, 8, 9,12, 8, 1, 3,14, 2];
    level[4] = [ 5, 1,12, 1, 3, 1,12, 0,12, 5, 9, 2, 1, 3];
    level[5] = [ 5, 0, 2, 0,13, 4, 2, 5, 1,13, 7, 0,11, 2];
    level[6] = [ 5,14, 4,13, 7, 9, 4,13, 3, 8, 0, 2, 5, 8];
    level[7] = [ 5,14, 4, 4, 3, 0, 7, 0, 2, 5, 5, 8,14, 2];
    level[8] = [10, 5, 9, 3,10, 5, 8, 5, 0,13,12, 1, 2, 8];
    level[9] = [ 0,13, 3, 1, 4, 6, 2, 5,10, 0,13,11, 7, 5];
    level[10]= [ 1, 3, 1,11, 4, 6, 4, 2, 8,10,15, 5, 0,12];
    level[11]= [ 9, 6, 4, 2, 8, 5, 0, 4,12, 0,13, 6,13,12];
    level[12]= [ 0, 2, 0, 3, 5, 5, 1, 3, 1, 6, 7,14, 7, 5];
    level[13]= [ 1, 4,13, 2, 1,13, 7, 1, 4,13, 4,13, 4, 2];
}

function runGame() {
    bob5Debug("Running Game...");

    bob5ClearAll();    

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
