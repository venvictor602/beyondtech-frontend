import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOCAL_ASSETS = path.join(ROOT, "assets/brand");
const PUBLIC = path.join(ROOT, "public/brand");
const APP = path.join(ROOT, "src/app");

const SOURCES = {
  stackedLight: "logo-stacked-light.png",
  mark: "logo-mark.png",
  stackedDark: "logo-stacked-dark.png",
  horizontal: "logo-horizontal.png",
};

function floodClear(data, width, height, channels, match) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    const i = y * width + x;
    if (visited[i]) return;
    const o = i * channels;
    if (!match(data[o], data[o + 1], data[o + 2], data[o + 3])) return;
    visited[i] = 1;
    queue.push(i);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const i = queue.pop();
    const o = i * channels;
    data[o] = 0;
    data[o + 1] = 0;
    data[o + 2] = 0;
    data[o + 3] = 0;

    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }
}

async function knockOutBackground(input, mode) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const match =
    mode === "black"
      ? (r, g, b, a) => a > 0 && r <= 22 && g <= 22 && b <= 22
      : (r, g, b, a) => a > 0 && r >= 248 && g >= 248 && b >= 248;

  floodClear(data, info.width, info.height, info.channels, match);

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .trim({ threshold: 8 })
    .toBuffer({ resolveWithObject: true });
}

async function writePng(filePath, buffer) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, buffer);
}

async function main() {
  fs.mkdirSync(PUBLIC, { recursive: true });

  const sourcePaths = Object.fromEntries(
    Object.entries(SOURCES).map(([key, file]) => [
      key,
      path.join(LOCAL_ASSETS, file),
    ]),
  );

  for (const [key, file] of Object.entries(sourcePaths)) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing ${key} logo at ${file}`);
    }
  }

  const horizontal = await knockOutBackground(sourcePaths.horizontal, "white");
  const stackedLight = await knockOutBackground(
    sourcePaths.stackedLight,
    "white",
  );
  const stackedDark = await knockOutBackground(
    sourcePaths.stackedDark,
    "black",
  );
  const mark = await knockOutBackground(sourcePaths.mark, "white");

  await writePng(path.join(PUBLIC, "logo.png"), horizontal.data);
  await writePng(path.join(PUBLIC, "logo-on-dark.png"), stackedDark.data);
  await writePng(path.join(PUBLIC, "logo-on-white.png"), stackedLight.data);
  await writePng(path.join(PUBLIC, "icon.png"), mark.data);

  const favicon32 = await sharp(mark.data)
    .resize(32, 32, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const favicon180 = await sharp(mark.data)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const favicon512 = await sharp(mark.data)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await writePng(path.join(PUBLIC, "favicon-32.png"), favicon32);
  await writePng(path.join(PUBLIC, "apple-icon.png"), favicon180);
  await writePng(path.join(PUBLIC, "icon-512.png"), favicon512);
  await writePng(path.join(APP, "icon.png"), favicon32);
  await writePng(path.join(APP, "apple-icon.png"), favicon180);

  console.log(
    JSON.stringify(
      {
        logo: horizontal.info,
        onDark: stackedDark.info,
        onWhite: stackedLight.info,
        icon: mark.info,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
