Bullet.max = 5;

Bullet.all = {};

Bullet.speed = 0.022;

Bullet.count = 0;
Bullet.active_count = 0;

Bullet.life = 35;

function Bullet() {
    if (Bullet.active_count < Bullet.max) {
        Sounds.play('laser');
        Bullet.count++;
        Bullet.active_count++;

        this.id = Bullet.count.toString();
        Bullet.all[this.id] = this;

        this.life = 0;
        this.a = Game.ship.a;

        this.x = Game.ship.points[0].x;
        this.y = Game.ship.points[0].y;
    }
}
Bullet.draw = function () {
    for (let b in Bullet.all) {
        for (let r in Rock.all) {
            if (Rock.all[r].hitTest(Bullet.all[b].x, Bullet.all[b].y)) {
                Bullet.all[b].life += Bullet.life;
                Rock.all[r].remove();
                break;
            }
        }
        if (Bullet.all[b].life < Bullet.life) {

            Bullet.all[b].life++;
            Bullet.all[b].x += Math.sin(Math.PI / 180 * Bullet.all[b].a) * Bullet.speed * VAR.d;
            Bullet.all[b].y -= Math.cos(Math.PI / 180 * Bullet.all[b].a) * Bullet.speed * VAR.d;

            if (Bullet.all[b].x < 0) {
                Bullet.all[b].x += VAR.W;
            } else if (Bullet.all[b].x > VAR.W) {
                Bullet.all[b].x -= VAR.W;
            }

            if (Bullet.all[b].y < 0) {
                Bullet.all[b].y += VAR.H;
            } else if (Bullet.all[b].y > VAR.H) {
                Bullet.all[b].y -= VAR.H;
            }
            Game.ctx.beginPath();
            Game.ctx.arc(Bullet.all[b].x, Bullet.all[b].y, 3, 0, Math.PI / 180 * 360);
            Game.ctx.closePath();
            Game.ctx.fill();
        } else {
            Bullet.active_count--;
            delete Bullet.all[b];
        }
    }
};