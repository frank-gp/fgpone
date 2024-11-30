const fs = require("fs"); // Importar el módulo fs

// Original data
const data = {
  app: {
    longUrl: "https://frankgp.com/app/",
    visits: 0,
  },
  "app-convert-to-webp": {
    longUrl: "https://youtu.be/fWJxz-WXNlo",
    visits: 1,
  },
  cloud: {
    longUrl: "https://drive.google.com/drive/folders/1EyI9gp3lq88-1Yi6rYAJcgcPILXFnGAz",
    visits: 0,
  },
  cloudflare: {
    longUrl: "https://youtu.be/D1kzsWq1br4",
    visits: 2,
  },
  color: {
    longUrl: "https://frankgp.com/app/color/",
    visits: 0,
  },
  contact: {
    longUrl: "https://frankgp.com/contact/",
    visits: 0,
  },
  debug: {
    longUrl: "https://developers.facebook.com/tools/debug/",
    visits: 0,
  },
  example: {
    longUrl: "https://example.com/",
    visits: 0,
  },
  facebook: {
    longUrl: "https://fb.com/fgp555",
    visits: 0,
  },
  fiverr: {
    longUrl: "https://www.fiverr.com/s/4dmmjx",
    visits: 0,
  },
  icon: {
    longUrl: "https://frankgp.com/icon/",
    visits: 0,
  },
  "icon.css": {
    longUrl: "https://frank-gp.github.io/icon/icomoon.css",
    visits: 0,
  },
  icomoon: {
    longUrl: "https://icomoon.io/app/#/select",
    visits: 0,
  },
  illustrator: {
    longUrl: "https://enyeinnovation.github.io/illustrator/",
    visits: 1,
  },
  info: {
    longUrl: "https://frank-gp.github.io/app/info",
    visits: 0,
  },
  instagram: {
    longUrl: "https://instagram.com/fgp555/",
    visits: 1,
  },
  krisp: {
    longUrl: "https://discord.gg/NbERhY7yGu",
    visits: 0,
  },
  laragon: {
    longUrl: "https://github.com/leokhoa/laragon/releases/download/6.0.0/laragon.exe",
    visits: 0,
  },
  "localhost-as-cloud": {
    longUrl: "https://youtu.be/D1kzsWq1br4",
    visits: 1,
  },
  mega: {
    longUrl: "https://mega.nz/folder/rPIRxbjJ#b2LbcriqBfiRnXTpDz5Qpg",
    visits: 0,
  },
  phpmyadmin: {
    longUrl: "https://demo.phpmyadmin.net/STABLE/",
    visits: 0,
  },
  qr: {
    longUrl: "https://frankgp.com/app/qr/scanner.html",
    visits: 0,
  },
  release: {
    longUrl: "https://mega.nz/folder/LCZVFCzZ#2ZNgEigER1g-6y8Ovx55mQ",
    visits: 3,
  },
  sharedown: {
    longUrl: "https://fgp555.github.io/Microsoft-Stream/",
    visits: 1,
  },
  supremo: {
    longUrl: "https://www.nanosystems.it/public/download/Supremo.exe",
    visits: 0,
  },
  teamviewer: {
    longUrl: "https://download.teamviewer.com/download/TeamViewerQS_x64.exe",
    visits: 0,
  },
  thumbnail: {
    longUrl: "https://frankgp.com/app/thumbnail/",
    visits: 0,
  },
  vk: {
    longUrl: "https://vk.com/video606230824_456239024",
    visits: 0,
  },
  wub: {
    longUrl: "https://www.sordum.org/downloads/?st-windows-update-blocker",
    visits: 6,
  },
  yt: {
    longUrl: "https://youtu.be/FUsbgeOOfwE",
    visits: 0,
  },
  google: {
    longUrl: "https://google.com/",
    visits: 0,
  },
  doc: {
    longUrl: "https://github.com/frank-gp/doc",
    visits: 1,
  },
  learn: {
    longUrl: "https://github.com/frank-gp/doc",
    visits: 0,
  },
  "android-studio": {
    longUrl: "https://www.youtube.com/results?search_query=android+studio+frank+gp",
    visits: 1,
  },
  "learn-kotlin": {
    longUrl: "https://github.com/frank-gp/doc/tree/main/mobile/kotlin",
    visits: 0,
  },
  "install-ffmpeg": {
    longUrl: "https://mega.nz/folder/jOJEGbDA#sei6HGaKlinzJaevAKzFWw",
    visits: 2,
  },
  scripts: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/desktop",
    visits: 5,
  },
  feed: {
    longUrl: "https://codepen.io/frank-gp/pen/LYMwrqa",
    visits: 0,
  },
  autohotkey: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/desktop/autohotkey",
    visits: 0,
  },
  "vscode-shortcut": {
    longUrl: "https://frankgp.com/doc/tools/vscode/shortcut.html",
    visits: 0,
  },
  ad1: {
    longUrl: "https://fgp555.github.io/Microsoft-Stream/",
    visits: 0,
  },
  "ffmpeg-scripts": {
    longUrl: "https://github.com/frank-gp/doc/tree/main/desktop/ffmpeg",
    visits: 1,
  },
  emailjs: {
    longUrl: "https://codepen.io/frank-gp/pen/JjZRGjj",
    visits: 3,
  },
  "favicon.webp": {
    longUrl: "https://frankgp.com/favicon.ico",
    visits: 5,
  },
  "fb-cover.webp": {
    longUrl: "https://fgp.one/img/fb-cover.webp",
    visits: 2,
  },
  git: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/tools/git",
    visits: 1,
  },
  winrar: {
    longUrl: "https://mega.nz/folder/rPIRxbjJ#b2LbcriqBfiRnXTpDz5Qpg/file/6a5BCa7S",
    visits: 0,
  },
  apk: {
    longUrl: "https://mega.nz/folder/qTJmjQIa#KXmiFONz4OxG-OWHyik4-g",
    visits: 0,
  },
  fa: {
    longUrl: "https://fontawesome.com/search",
    visits: 1,
  },
  discord: {
    longUrl: "https://discord.gg/bSSsy5wfxG",
    visits: 0,
  },
  "btn.css": {
    longUrl: "https://frankgp.com/lib/btn.css",
    visits: 0,
  },
  flex: {
    longUrl: "https://the-echoplex.net/flexyboxes/",
    visits: 0,
  },
  "flex.css": {
    longUrl: "https://codepen.io/fgp555/pen/abXWwea",
    visits: 0,
  },
  "flexbox.css": {
    longUrl: "https://codepen.io/fgp555/pen/abXWwea",
    visits: 0,
  },
  "favicon.ico": {
    longUrl: "https://frankgp.com/favicon.ico",
    visits: 5,
  },
  unsplash: {
    longUrl: "https://source.unsplash.com/301x301?fruit,banana",
    visits: 0,
  },
  "illustrator.js": {
    longUrl: "https://enyeinnovation.github.io/illustrator/web.js",
    visits: 0,
  },
  liveshare: {
    longUrl: "https://prod.liveshare.vsengsaas.visualstudio.com/join?CDBB048647BCC2166DEDB42735B55F9259E0",
    visits: 0,
  },
  diff: {
    longUrl: "https://frankgp.com/app/diff/",
    visits: 0,
  },
  jasmine: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/testing/jasmine/command.sh",
    visits: 0,
  },
  whatsapp: {
    longUrl: "http://wa.me/51918221790?text=Hello,%20Frank%20GP%20",
    visits: 0,
  },
  latest: {
    longUrl: "http://frankgp.com/soyhenry/m2/hw/04",
    visits: 0,
  },
  testing: {
    longUrl: "https://github.com/frank-gp/soyhenry/blob/main/m2/hw/05/challenge-testing/tests/CarritoCompra.test.js",
    visits: 1,
  },
  matchers: {
    longUrl: "https://github.com/frank-gp/soyhenry/blob/main/m2/hw/05/challenge-testing/tests/CarritoCompra.test.js",
    visits: 0,
  },
  yape: {
    longUrl: "https://www.youtube.com/shorts/_WFOfaDwuGo?feature=share",
    visits: 1,
  },
  "vscode-snippet": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/vscode/fgp.json.code-snippets",
    visits: 1,
  },
  "kotlin-course": {
    longUrl: "https://www.youtube.com/playlist?list=PLKS2lx6kjJ64CJhzxznOVvJWTPYvZ8uLa",
    visits: 5,
  },
  compose: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/mobile/compose/README.md",
    visits: 0,
  },
  "rest-client": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/api/rest-api-command/rest_client.http",
    visits: 0,
  },
  "mini-postman-code": {
    longUrl: "https://github.com/frank-gp/soyhenry/blob/main/m2/challenge/mini-postman/public/index.html",
    visits: 0,
  },
  "mini-postman-demo": {
    longUrl: "https://frankgp.com/soyhenry/m2/challenge/mini-postman/public/",
    visits: 0,
  },
  "pico.css": {
    longUrl: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css",
    visits: 0,
  },
  "mini-postman": {
    longUrl: "https://frankgp.com/app/mini-postman/",
    visits: 0,
  },
  "movies-doc": {
    longUrl: "https://github.com/frank-gp/soyhenry/blob/main/m2/pair-programming/M2-L07-express/movies-doc.md",
    visits: 0,
  },
  "nodejs-snippets": {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/nodejs/snippets",
    visits: 0,
  },
  meet: {
    longUrl: "https://meet.google.com/yhw-efjy-smq",
    visits: 0,
  },
  mongodb: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/mongodb/mongodb_doc.md",
    visits: 1,
  },
  "mongodb.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/mongodb/mongodb_doc.md",
    visits: 0,
  },
  mongosh: {
    longUrl: "https://www.mongodb.com/try/download/shell",
    visits: 1,
  },
  "app-windows": {
    longUrl: "https://fgp555.github.io/app/",
    visits: 0,
  },
  typescript: {
    longUrl: "https://github.com/frank-gp/soyhenry/blob/main/m3/03-express_typescript/resume/doc_homework3.md",
    visits: 0,
  },
  sql: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/sql/01-basic.sql",
    visits: 0,
  },
  js: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/frontend/javascript/snippets",
    visits: 2,
  },
  "postgresql.md": {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/postgres",
    visits: 0,
  },
  snagit: {
    longUrl: "https://mega.nz/folder/rPIRxbjJ#b2LbcriqBfiRnXTpDz5Qpg/file/mOZm0D7b",
    visits: 0,
  },
  discord_henry: {
    longUrl: "https://discord.gg/PjEDmHShpV",
    visits: 0,
  },
  codereview: {
    longUrl: "https://us02web.zoom.us/j/85329845616",
    visits: 0,
  },
  "bash.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/command/bash.md",
    visits: 0,
  },
  "rubrica_back.html": {
    longUrl: "https://enyeinnovation.github.io/assets/rubrica_back.html",
    visits: 0,
  },
  react: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/frontend/react",
    visits: 0,
  },
  "nodemailer.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/nodejs/nodemailer/nodemailer.md",
    visits: 5,
  },
  "typescript.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/typescript/typescript.md",
    visits: 0,
  },
  "resend.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/nodejs/typescript/resend/resend.md",
    visits: 0,
  },
  "turn-initial-code.zip": {
    longUrl: "https://frankgp.web.app/download/turn-initial-code.zip",
    visits: 0,
  },
  "m4.zip": {
    longUrl: "https://www.mediafire.com/file/gcohxzif1wwfhq6/modulo_4.zip/file",
    visits: 0,
  },
  "adminer.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/db/adminer.md",
    visits: 1,
  },
  delete_facebook: {
    longUrl: "https://www.facebook.com/deactivate_delete_account",
    visits: 0,
  },
  "discord-19b": {
    longUrl: "https://discord.gg/ZA3Q2rAHQd",
    visits: 0,
  },
  "m4-resumenes": {
    longUrl: "https://www.youtube.com/playlist?list=PL3YxD430E0w1L_49g9JnwiMKCuCt10Vem",
    visits: 0,
  },
  "nestjs.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/nestjs/doc_nestjs.md",
    visits: 3,
  },
  linkedin: {
    longUrl: "https://www.linkedin.com/in/fgp555/",
    visits: 0,
  },
  "docker.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/docker/doc.md",
    visits: 0,
  },
  miro: {
    longUrl: "https://miro.com/app/board/uXjVKor3OjE=/",
    visits: 0,
  },
  "miro-pf": {
    longUrl: "https://miro.com/app/board/uXjVKqIjgg0=/",
    visits: 0,
  },
  "zoom-quality": {
    longUrl: "https://us06web.zoom.us/j/89264469827?pwd=DR2Q6zQ95M3Gh3zbAwGbqOv3tWe7LQ.1",
    visits: 0,
  },
  "zoom-pf": {
    longUrl: "https://us06web.zoom.us/j/88213146238?pwd=SYXSFsdyYvQz8xjVjb0pNBdYXvZdG6.1",
    visits: 0,
  },
  zoom: {
    longUrl: "https://us06web.zoom.us/j/83831356011",
    visits: 0,
  },
  "miro-gio": {
    longUrl: "https://miro.com/app/board/uXjVKvakt4o=/",
    visits: 0,
  },
  "git-flow.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/git/git-flow.md",
    visits: 0,
  },
  jira: {
    longUrl: "https://henry-bpventures.atlassian.net/jira/software/projects/BPV/boards/1/backlog",
    visits: 0,
  },
  "meet-mentor": {
    longUrl: "http://meet.google.com/ecz-qaqx-cza",
    visits: 0,
  },
  "nextjs.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/frontend/nextjs/nextjs.md",
    visits: 0,
  },
  print: {
    longUrl: "https://art-skool.web.app/doc/trabajo-en-lima.pdf",
    visits: 0,
  },
  "miro-nere": {
    longUrl: "https://miro.com/app/board/uXjVLYbwj2g=/",
    visits: 0,
  },
  nextjs: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/frontend/nextjs",
    visits: 0,
  },
  support: {
    longUrl: "https://frankgp.com/support",
    visits: 0,
  },
  "compose-playlist": {
    longUrl: "https://www.youtube.com/playlist?list=PLKS2lx6kjJ65lu5uH7BkX3GmqyOfxZzT3",
    visits: 0,
  },
  cv: {
    longUrl: "https://docs.google.com/document/d/1BNcmtMnkNNY--GbI9g10oK6URP9_xBesQ2eM7lPP8Tk/edit?usp=sharing",
    visits: 0,
  },
  github: {
    longUrl: "https://github.com/fgp555",
    visits: 0,
  },
  ssh: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/ssh/",
    visits: 0,
  },
  "ssh.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/ssh/ssh-basic.md",
    visits: 2,
  },
  typeorm: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/typeorm",
    visits: 0,
  },
  "typeorm.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/typeorm/typeorm.md",
    visits: 0,
  },
  "typeorm-exception.md": {
    longUrl: "https://github.com/frank-gp/doc/blob/main/backend/typeorm/exception.md",
    visits: 0,
  },
  nestjs: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/nestjs",
    visits: 0,
  },
  kafdrop: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/tools/kafdrop",
    visits: 0,
  },
  kafka: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/kafka",
    visits: 0,
  },
  "profile.png": {
    longUrl: "https://github.com/frank-gp.png",
    visits: 0,
  },
  docker: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/tools/docker/",
    visits: 0,
  },
  vite: {
    longUrl: "https://github.com/frank-gp/doc/blob/main/frontend/react/vite-react.md",
    visits: 0,
  },
  keyboard: {
    longUrl: "https://keyboard-test.space/",
    visits: 0,
  },
  snippets: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/tools/vscode/snippets",
    visits: 0,
  },
  "vscode-snippets": {
    longUrl: "https://marketplace.visualstudio.com/items?itemName=frankgp.frankgp",
    visits: 1,
  },
  npm: {
    longUrl: "https://www.npmjs.com/package/frankgp",
    visits: 1,
  },
  htaccess: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/apache",
    visits: 1,
  },
  apache: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/apache",
    visits: 1,
  },
  postgres: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/backend/postgres",
    visits: 1,
  },
  ip: {
    longUrl: "https://www.whatismyip.com/",
    visits: 1,
  },
  snippet: {
    longUrl: "https://frankgp.com/app/snippet/",
    visits: 1,
  },
  angular: {
    longUrl: "https://github.com/frank-gp/doc/tree/main/frontend/angular",
    visits: 2,
  },
  atlas: {
    longUrl: "https://cloud.mongodb.com/v2/660e93ad90957955ac44f390#/metrics/replicaSet/6614c15df11de11cf6fcc400/explorer/fgpone/notes/find",
    visits: 1,
  },
};

// Function to transform data with a starting _id
function transformData(inputData) {
  let idCounter = 230000000001; // Starting _id value
  const transformedArray = Object.keys(inputData).map((key) => {
    const item = inputData[key];
    return {
      _id: (idCounter++).toString(), // Increment the _id for each item
      originalUrl: item.longUrl,
      shortUrl: key, // Short URL derived from the key
      visitCount: item.visits,
      createdAt: new Date().toISOString(), // Current timestamp in ISO format
      __v: 0, // Version field
    };
  });

  return transformedArray;
}

// Call the function and get the transformed data
const transformedData = transformData(data);

// Write the transformed data to a file
fs.writeFile("output.json", JSON.stringify(transformedData, null, 2), (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("File saved as output.json");
  }
});
