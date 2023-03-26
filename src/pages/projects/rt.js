function rtPage(pixScreen, pageRouter) {
  let page = new Page("project-rt");

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Text("PROJECTS - RT", 267, 25, "#ffffff"));

  let pos = { x: 135, y: 330 };
  let rect = { w: 200, h: 25 };
  let maxStack = 2;

  let params = [
    {
      label: "ambiant",
      options: [0, 0.5, 1],
      callBack: (value) => {
        // console.log("ambiant", value);
      },
    },
    {
      label: "transparency",
      options: [0, 0.5, 1],
      callBack: (value) => {
        // console.log("ambiant", value);
      },
    },
    {
      label: "reflection",
      options: [0, 0.5, 1],
      callBack: (value) => {
        // console.log("ambiant", value);
      },
    },
    {
      label: "refraction",
      options: [0, 0.5, 1],
      callBack: (value) => {
        // console.log("ambiant", value);
      },
    },
  ];

  params.forEach((param, index) => {
    page.pushComponent(
      new Selector(
        pos.x + 80 + rect.w * Math.floor(index / maxStack),
        pos.y + rect.h * (index % maxStack),
        50,
        9,
        param.options,
        param.callBack
      )
    );
    page.pushComponent(
      new Text(
        param.label,
        pos.x + rect.w * Math.floor(index / maxStack),
        pos.y + rect.h * (index % maxStack) + 2,
        "#ffffff"
      )
    );
  });
  return page;
}
