// ======================================================= //
// Bob's Adventures: Episode 3 - Caves of Xon
//
// Author: brendan@slayweb.com
// Web: http://www.slayweb.com
// Last Updated: 2015-11-21
//
// ======================================================= //

function storyScroll() {
    if (this.getY()>=-550) {
        this.setY(this.getY()-1);
    }
}

function runGame() {
    bob5Debug("Starting Game...");
    
    renderer.clear();
    hoverMonitor.clear();
    mouseDownMonitor.clear();
    mouseUpMonitor.clear();
    mouseClickMonitor.clear();
    
    bg = new b5roBackground(0,0,0);
    renderer.add(bg);
    
    story = new b5roSprite("./res/img/story.jpg",0,0,800,1163);
    renderer.add(story);
    story.move = storyScroll;
    movecontroller.add(story);
    
}

function runProgram() {
    bob5CanvasInit("bob5Display");
    
    updateShowFPS(true);
    
    bob5ReplaceCursor("./res/img/cursor.png",22,23);
    
    bg = new b5roBackgroundImage(0, 0, 0, "./res/img/titlescreen.jpg");
    renderer.add(bg);
    
    btnStart = new b5roButton("./res/img/btn-start-on.png", "./res/img/btn-start-hover.png", "./res/img/btn-start-click.png", "./res/img/btn-start-off.png", 260, 370, 276, 49);
    renderer.add(btnStart);
    hoverMonitor.add(btnStart);
    mouseDownMonitor.add(btnStart);
    mouseUpMonitor.add(btnStart);
    mouseClickMonitor.add(btnStart);
    btnStart.onMouseClick = runGame;
}
