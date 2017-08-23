var pt_array = new Array(0);
var level = 50;
var point_size = 10;


var clickedID;
var lineDrawing = false;

function setup() {
    //createCanvas(600, 600);
    var cnv = createCanvas(600, 600);
    var cnvX = (windowWidth - width) / 2;
    var cnvY = (windowHeight - height) / 2;
    cnv.position(cnvX, cnvY);

    background(color('#003965'));

    var randX, randY, valid;

    for (var i = 0; i < level; i++) {

        valid = true;
        randX = random(point_size / 2, this.width - point_size / 2);
        randY = random(point_size / 2, this.height - point_size / 2);

        for (var j = 0; j < pt_array.length; j++) {
            if (!(abs(randX - pt_array[j].x) > point_size / 2 && abs(randY - pt_array[j].y) > point_size / 2)) {
                valid = false;
                j = pt_array.length;
                i--;
            }
        }

        if (valid) {
            pt_array.push(new Point(randX, randY));
            print("point created");
        }

    }


    fill(0);
    for (var i = 0; i < pt_array.length; i++) {
        stroke(color(pt_array[i].stroke_color));
        ellipse(pt_array[i].x, pt_array[i].y, point_size, point_size);
    }

}

function draw() {

    background(color('#003965'));

    fill(0);
    for (var i = 0; i < pt_array.length; i++) {
        stroke(color(pt_array[i].stroke_color));
        ellipse(pt_array[i].x, pt_array[i].y, point_size, point_size);
    }

    if (lineDrawing) {

        stroke('#ff0000');
        line(pt_array[clickedID].x, pt_array[clickedID].y, mouseX, mouseY);
    }
}


function mousePressed() {

    var dist;
    var changeColor = false;
    var point_clicked = false;

    for (var i = 0; i < pt_array.length; i++) {
        dist = sqrt(sq(pt_array[i].x - mouseX) + sq(pt_array[i].y - mouseY));
        if (dist <= point_size / 2) {

            if (clickedID == i) {
                point_clicked = true;
                break;
            } else {
                if (clickedID != null)
                    pt_array[clickedID].old_color = pt_array[clickedID].stroke_color;
                clickedID = i;
                point_clicked = true;
                pt_array[clickedID].stroke_color = '#ff0000';
                lineDrawing = !lineDrawing;
                if (!lineDrawing) {
                    pt_array[clickedID].old_color = pt_array[clickedID].stroke_color;
                    clickedID = null;
                }
            }
            break;
        }
    }

    if (!point_clicked && clickedID != null) {
        lineDrawing = false;
        pt_array[clickedID].stroke_color = pt_array[clickedID].old_color;
        clickedID = null;
    }
}
