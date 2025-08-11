import { exec } from "node:child_process";

exec("go run main.go ./resources/", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error:\n${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr:\n${stderr}`);
  }
  console.log(`stdout:\n${stdout}`);
})