function projectsPage(pixScreen, pageRouter) {
  let page = new Page("projects", projectsPage);
  page.pushComponent(new Text("Work In Progress", 0, 0, "#ff00ff"));
  let projects = [
    {
      title: "RT",
      description: "A raytracing program built from scratch in C language",
      page: "projects/rt",
    },
    {
      title: "KSICARDOOM",
      description:
        "A DOOM and Duke Nukem 3D style game with ray-casting,\n\nfeaturing a level editor and multiplayer from scratch in C",
      page: "projects/doom",
    },
    {
      title: "COREWAR",
      description: "Virtual Machine game using custom assembly instructions\n\n(WORK IN PROGRESS)",
    },
    // { title: "FDF", description: "not a project but something else" },
  ];

  page.pushComponent(new DebugBar(pixScreen));

  let rect = { w: 100, h: 25 };
  let margin = { x: 0, y: 50 };
  let globalHeight =
    projects.length * rect.h + (projects.length - 1) * margin.y;
  let offset = {
    x: 60,
    y: Math.floor(pixScreen.height / 2 - globalHeight / 2),
  };
  projects.forEach((project, index) => {
    let x = offset.x + margin.x * index;
    let y = offset.y + (rect.h + margin.y) * index;
    page.pushComponent(
      new Button(x, y, rect.w, rect.h, project.title, () => {
        pageRouter.navigate(project.page);
      })
    );
    page.pushComponent(
      new Text(project.description, x + rect.w + 10, y + 5, "#ffffff")
    );
  });
  page.pushComponent(new Text("PROJECTS", 276, 25, "#ffffff"));
  return page;
}
