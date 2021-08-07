let values = [
    [0, 0.5, 1],
    [1],
    [1],
    [0, 1, 5, 10, 50],
    [0, 1, 5, 10]
];
let scene_names = ["bench"];
let current_scene_index = 0;

function get_scene_name()
{
    let ambiant = document.getElementById("ambiant_range").value;
    let aa = document.getElementById("AA_range").value;
    let light_samples = document.getElementById("light_samples_range").value;
    let reflection = document.getElementById("reflection_range").value;
    let refraction = document.getElementById("refraction_range").value;

    ambiant = values[0][ambiant];
    aa = values[1][aa];
    light_samples = values[2][light_samples];
    reflection = values[3][reflection];
    refraction = values[4][refraction];

    filename = `${scene_names[current_scene_index]}-${ambiant}-${aa}-${light_samples}-${reflection}-${refraction}.jpg`;
    document.getElementById("scene_title").innerText = scene_names[current_scene_index];
    document.getElementById("render_view").src = `/projects/rt/${filename}`;
}

window.addEventListener('load', async function(){
    get_scene_name();
})