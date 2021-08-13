class Gallery {
    constructor(placement, id) {
        //gallery it self
        this.id = id;
        var words = (placement.id).split('_');

        this.length = words[0];
        this.file = words[1];
        this.dirc = words[2];
        this.ntexts = words[3];

        this.count = 1;
        this.panel = document.createElement("div");
        this.panel.className = 'panel';
        this.buttonL = document.createElement("input");
        this.buttonL.setAttribute("type", "image");
        this.buttonL.setAttribute("src", "images/arrl.png");
        this.buttonR = document.createElement("input");
        this.buttonR.setAttribute("type", "image");
        this.buttonR.setAttribute("src", "images/arrr.png");

        this.buttonL.className = 'arrL';
        this.buttonR.className = 'arrR';
        this.panel.appendChild(this.buttonR);
        this.panel.appendChild(this.buttonL);


        this.buttonM = document.createElement("button");
        this.buttonM.className = 'frame'
        this.picture = document.createElement("img");
        this.picture.className = 'pic';
        this.picture.setAttribute("src", this.source(this.count));
        this.buttonM.appendChild(this.picture)
        placement.appendChild(this.buttonM);
        placement.appendChild(this.panel);

        this.buttonL.setAttribute("onclick", "left(" + this.id + ")");
        this.buttonR.setAttribute("onclick", "right(" + this.id + ")");
        this.buttonM.setAttribute("onclick", "right(" + this.id + ")");

        //the text
        this.texts = document.getElementsByClassName("op");
        this.indexes = [];
        for (let i = 0; i < this.ntexts; i++) {
            var id = this.texts[i].id;
            this.indexes.push(parseInt(id));
        }
        console.log(this.indexes)
        this.tindex = 0;
    }
    move(delta) {
        var nr = this.count + delta;
        nr = parseInt(nr);
        var le = parseInt(this.length);
        while (nr > le) {
            nr = nr - le;
        }
        while (nr < 1) {
            nr = nr + le;
        }
        this.count = nr;
        this.update(delta);
    }
    update(delta) {
        (this.picture).src = this.source(this.count);
        if (this.count > this.indexes[this.tindex] && delta > 0) {
            this.tindex += 1;
            this.texts[this.tindex - 1].classList.add("hide");
            this.texts[this.tindex].classList.remove("hide");
        }
        if (this.count == 1 && delta > 0) {
            this.tindex = 0;
            this.texts[this.texts.length - 1].classList.add("hide");
            this.texts[0].classList.remove("hide");
        }
        if (this.count <= this.indexes[this.tindex + delta] && delta < 0) {
            this.tindex -= 1;
            this.texts[this.tindex + 1].classList.add("hide");
            this.texts[this.tindex].classList.remove("hide");
        }
        if (this.tindex + delta < 0 && delta < 0) {
            this.tindex = this.texts.length-1;
            this.texts[0].classList.add("hide");
            this.texts[this.tindex].classList.remove("hide");
        }
    }
    Id() {
        return this.id;
    }
    source(nr) {

        return ("projects_images/" + this.dirc + "/ (" + nr + ")." + this.file);
    }
}
var instances = [];
function find(id) {
    for (var i = 0; i < instances.length; i++) {
        if (instances[i].Id() == id) {
            return instances[i];
        }
    }
    return null;
}

var p_menu = 0;
var x;
function right(id) {
    var x = find(id);
    x.move(1);
}
function left(id) {
    var x = find(id);
    x.move(-1);
}




var place = document.getElementsByClassName("gallery");
for (var p of place) {
    instances.push(new Gallery(p, instances.length));
}