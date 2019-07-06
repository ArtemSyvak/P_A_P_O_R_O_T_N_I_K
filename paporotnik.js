const first_triangle_priority = 70;
let canvas;
let mode = 1;
let fps = 1000;
let x = 0, y = 0;
let pause = false;
let triangles = []

const coodrinates = {
    x: 0,
    y: 0,
}

const reading_value = [
    {
        name: 'number_one',
        value: 0
    },
    {
        name: 'number_two',
        value: 0
    }
]



const triangle = [
    {
        name:'a',
        dice_reading_value:JSON.parse(JSON.stringify( reading_value )),
        coodrinates: {...coodrinates}
    },
    {
        name:'b',
        dice_reading_value:JSON.parse(JSON.stringify( reading_value )),
        coodrinates: {...coodrinates}
    },
    {   
        name:'c',
        dice_reading_value:JSON.parse(JSON.stringify( reading_value )),
        coodrinates: {...coodrinates}
    }
]

const start_target = {   
    name:'target',
    coodrinates: {...coodrinates}
}

const dice = () => Math.floor(Math.random() * 6) + 1;

const create_triangles = (amount) => {
    let triangles = [];

    for(var i = 0; i < amount; i++) {
        triangles.push(JSON.parse(JSON.stringify( triangle )));
    }

    return triangles;
}

const create_dot = (vertex) => {
    let radius = 1;

    const canvas_context = canvas.getContext('2d');
    canvas_context.beginPath();
    canvas_context.fillStyle = 'green';
    canvas_context.arc(vertex.coodrinates.x, vertex.coodrinates.y, radius, 0, 2 * Math.PI, true);
    canvas_context.fill();        
}

const set_dice_reading_values = (triangle) => {
    for(let i = 0, j= 0; i<6; j === 0 ? j++: j--){

        if(i %2 === 0){
            triangle[Math.trunc(i / 2)].coodrinates.x = Math.floor(Math.random() * canvas.width);
            triangle[Math.trunc(i / 2)].coodrinates.y = Math.floor(Math.random() * canvas.height);
        }
       
        triangle[Math.trunc(i / 2)].dice_reading_value[j].value = ++i;
        
    }
}

const draw_triangles = (triangles) => {
    for(let triangle of triangles){
        set_dice_reading_values(triangle);
        for(let vertex of triangle){
            create_dot(vertex);
        }
    }
}

const draw_start_target = (start_target) => {
    start_target.coodrinates.x = Math.floor(Math.random() * canvas.width);
    start_target.coodrinates.y = Math.floor(Math.random() * canvas.height)
    create_dot(start_target);
}
 
const draw_new_dot = (triangle, start_target) => {

    if (mode === 1) {
        const dice_value = dice();
        const vertex_to_move = triangle[Math.trunc((dice_value - 1) / 2)];
        start_target.coodrinates.x = Math.floor((vertex_to_move.coodrinates.x + start_target.coodrinates.x) / 2);
        start_target.coodrinates.y = Math.floor((vertex_to_move.coodrinates.y + start_target.coodrinates.y) / 2);
    } else {
        var new_x, new_y;
        let which_part_to_draw  =  Math.random();
        var koefy = [
            [[], [], [], []], 
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []]
        ];

        if (mode === 2) {
            koefy[0][0] = .0;
            koefy[0][1] = .85;
            koefy[0][2] = .2;
            koefy[0][3] = -.15;
            koefy[1][0] = .0;
            koefy[1][1] = .04;
            koefy[1][2] = -.26;
            koefy[1][3] = .28;
            koefy[2][0] = .0;
            koefy[2][1] = -.04;
            koefy[2][2] = .23;
            koefy[2][3] = .26;
            koefy[3][0] = .16;
            koefy[3][1] = .85;
            koefy[3][2] = .22;
            koefy[3][3] = .24;
            koefy[4][0] = .0;
            koefy[4][1] = .0;
            koefy[4][2] = .0;
            koefy[4][3] = .0;
            koefy[5][0] = .0;
            koefy[5][1] = 1.6;
            koefy[5][2] = 1.6;
            koefy[5][3] = .44;
            koefy[6][0] = .01;
            koefy[6][1] = .85;
            koefy[6][2] = .07;
            koefy[6][3] = .07;
        }
        else if (mode === 3) {
            koefy[0][0] = 0;
            koefy[0][1] = .95;
            koefy[0][2] = 0.035;
            koefy[0][3] = -.04;
            koefy[1][0] = 0;
            koefy[1][1] = .005;
            koefy[1][2] = -.2;
            koefy[1][3] = .2;
            koefy[2][0] = 0;
            koefy[2][1] = -.005;
            koefy[2][2] = .16;
            koefy[2][3] = .16;
            koefy[3][0] = .25;
            koefy[3][1] = .93;
            koefy[3][2] = .04;
            koefy[3][3] = .04;
            koefy[4][0] = 0;
            koefy[4][1] = -.002;
            koefy[4][2] = -.09;
            koefy[4][3] = .083;
            koefy[5][0] = -.4;
            koefy[5][1] = .5;
            koefy[5][2] = .02;
            koefy[5][3] = .12;
            koefy[6][0] = .02;
            koefy[6][1] = .84;
            koefy[6][2] = .07;
            koefy[6][3] = .07;
        }
        else {
            koefy[0][0] = .0;
            koefy[0][1] = .95;
            koefy[0][2] = .035;
            koefy[0][3] = -.04;
            koefy[1][0] = .0;
            koefy[1][1] = .002;
            koefy[1][2] = -.11;
            koefy[1][3] = .11;
            koefy[2][0] = .0;
            koefy[2][1] = -.002;
            koefy[2][2] = .27;
            koefy[2][3] = .27;
            koefy[3][0] = .25;
            koefy[3][1] = .93;
            koefy[3][2] = .01;
            koefy[3][3] = .01;
            koefy[4][0] = .0;
            koefy[4][1] = -.002;
            koefy[4][2] = -.05;
            koefy[4][3] = .047;
            koefy[5][0] = -.4;
            koefy[5][1] = .5;
            koefy[5][2] = .005;
            koefy[5][3] = .06;
            koefy[6][0] = .02;
            koefy[6][1] = .84;
            koefy[6][2] = .07;
            koefy[6][3] = .07;
        }
        let index_of_koef = 0;
        if (which_part_to_draw <  koefy[6][0]) {
            index_of_koef = 0;
        }
        else if (which_part_to_draw < koefy[6][0] + koefy[6][1]) { 
            index_of_koef = 1;
        }
        else if ( which_part_to_draw <  koefy[6][0] + koefy[6][1] + koefy[6][2])  { 
            index_of_koef = 2;
        }  
        else  { 
            index_of_koef = 3;
        } 

        new_x  = koefy[0][index_of_koef] * x + koefy[1][index_of_koef] * y + koefy[4][index_of_koef]; 
        new_y  = koefy[2][index_of_koef] * x + koefy[3][index_of_koef] * y + koefy[5][index_of_koef];

        let plot_x = canvas.width * (x + 3) / 6;
        let plot_y = canvas.height - canvas.height * ((y + 2) / 14);

        start_target.coodrinates.x  =  plot_x; 
        start_target.coodrinates.y  =  plot_y;

        x = new_x;
        y = new_y;
    }
    create_dot(start_target);
}

const get_triangle_to_move = (triangles) => {
    if (mode === 1) {
        return triangles[0];
    }else {
        const priority = Math.floor(Math.random()*100);
        const triangle_to_move = priority < first_triangle_priority ? triangles[0]: triangles[1];
        return triangle_to_move;
    }
}

const start_game = () => {
    clear_game();
    if (mode === 1) {
        triangles = create_triangles(mode);
        draw_triangles(triangles);
        draw_start_target(start_target);
    }
    else {
        x = 0;
        y = 0;
    }
}

const toggle_game = (e) => {
    if(e.code === 'Space'){
        pause = !pause;
    }else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        pause = false;
        mode = parseInt(e.key);
        start_game();
    }
}

const clear_game = () => {
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const canvas_context = canvas.getContext('2d');
    canvas_context.fillStyle = 'black';
    canvas_context.fillRect(0, 0, canvas.width, canvas.height);
}

const main = ()  => {
    document.addEventListener('keypress', toggle_game);
    start_game();

    setInterval(() => {
        for (let i = 0; i < 30; i++){
            if(!pause){
                const triangle_to_move = mode === 1 ? get_triangle_to_move(triangles) : null;
                draw_new_dot(triangle_to_move, start_target);
            }
        }
    }, 1000 / fps);
}

main();
