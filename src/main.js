var last_typed_object;
var auto_type_innerTexts = [];
let auto_type_speed = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function type_text(htmlObject, text, delay=auto_type_speed, multiline=false, force=false)
{
    if (!htmlObject)
        return ;
    if (last_typed_object)
        last_typed_object.classList.remove("after-cursor");
    if (!document.cookie || document.cookie[0] != "$" || force)
    {
        let content = [];
        htmlObject.classList.add("after-cursor");
        for (let i = 0; i < text.length; i++)
        {
            content[i] = text[i];
            if (multiline)
                htmlObject.innerText = content.join("");
            else
                htmlObject.innerHTML = `<span class="after-cursor">${content.join("")}</span>`;
            await sleep(delay);
        }
    }
    htmlObject.innerText = text;
    last_typed_object = htmlObject;
}

function save_object_dimensions(htmlObject)
{
    let width, height;

    width = htmlObject.clientWidth;
    height = htmlObject.clientHeight;
    htmlObject.style.width = `${width}px`;
    htmlObject.style.height = `${height}px`;
}

function init_auto_type()
{
    let objects = document.getElementsByClassName("auto-type");

    for (let i = 0; i < objects.length; i++)
    {
        save_object_dimensions(objects[i]);
        auto_type_innerTexts.push(objects[i].innerText);
        objects[i].innerText = "";
    }
}

async function auto_type()
{
    let objects = document.getElementsByClassName("auto-type");

    for (let i = 0; i < objects.length; i++)
    {
        await type_text(objects[i], auto_type_innerTexts[i]);
    }
}

function reset_type_animations()
{
    document.cookie = "@";
    location.reload();
}

let presentationText = "hello there, this is my portfolio\nwhere I showcase my projects\n\nthank you for the visit";

window.addEventListener('load', async function(){
    init_auto_type();
    await type_text(document.getElementById("main-presentation"), presentationText, 25, multiline=true);
    await auto_type();
    document.cookie = "$";
})