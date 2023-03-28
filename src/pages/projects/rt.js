var rtParams = {
  'ambiant': 0,
  'anti_aliasing': 0,
  'depth_of_field': 0,
  'light_samples': 0,
  'refraction_depth': 0,
  'reflection_depth': 0
}

function getParamIndex(params, key, value) {
  let param = params.find((entry) => (entry.label == key));
  return param.options.indexOf(value)
}

function getImageUrl() {
  let values = Object.values(rtParams);
  return `assets/rt/render-${values[0]}-${values[1]}-${values[2]}-${values[3]}-${values[4]}-${values[5]}.bmp`
}

function updateImageUrl(img) {
  img.src = getImageUrl();
}

function rtPage(pixScreen, pageRouter) {
  let page = new Page("project-rt");

  page.pushComponent(new DebugBar(pixScreen));
  page.pushComponent(new Text("PROJECTS - RT", 261, 25, "#ffffff"));

  let canvas = new NativeImage(getImageUrl(), 100, 70, 400, 225);
  page.pushComponent(canvas);

  let pos = { x: 135, y: 330 };
  let rect = { w: 200, h: 25 };
  let maxStack = 2;

  let params = [
    {
      label: "ambiant",
      options: [0.5, 1],
      callBack: (value) => {
        rtParams['ambiant'] = getParamIndex(params, 'ambiant', value);
        updateImageUrl(canvas.img);
      },
    },
    // {
    //   label: "light samples",
    //   options: [1],
    //   callBack: (value) => {
    //     rtParams['light_samples'] = getParamIndex(params, 'light samples', value);
    //     updateImageUrl(canvas.img);
    //   },
    // },
    {
      label: "AA",
      options: [1, 2, 4],
      callBack: (value) => {
        rtParams['anti_aliasing'] = getParamIndex(params, 'AA', value);
        updateImageUrl(canvas.img);
      },
    },
    {
      label: "reflection",
      options: [0, 2, 5],
      callBack: (value) => {
        rtParams['reflection_depth'] = getParamIndex(params, 'reflection', value);
        updateImageUrl(canvas.img);
      },
    },
    {
      label: "refraction",
      options: [0, 2, 5],
      callBack: (value) => {
        rtParams['refraction_depth'] = getParamIndex(params, 'refraction', value);
        updateImageUrl(canvas.img);
      },
    },
  ];

  params.forEach((param, index) => {
    page.pushComponent(
      new Selector(
        pos.x + 90 + rect.w * Math.floor(index / maxStack),
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