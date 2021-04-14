#!/usr/bin/env node

const { program } = require("commander");
// 下载Git仓库内容
const downloadGit = require("download-git-repo");
// 交互式命令
const inquirer = require("inquirer");
// 模板解析
const handlebars = require("handlebars");
const templates = require("./templates");

program.version("0.1.0");

program
  .command("create <name>")
  .description("创建项目")
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "template",
          message: "请选择模板",
          choices: ["pc-front", "pc-admin", "mobile"],
        },
      ])
      .then((answers) => {
        const templateInfo = templates[answers.template];
        console.log("answers", templateInfo, projectName);

        downloadGit(templateInfo.git, projectName, { clone: true }, (err) => {
          if (err) {
            console.log("下载失败", err);
          } else {
            console.log("下载成功");
          }
        });
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

program
  .command("list")
  .description("查看所有模板")
  .action(() => {
    console.log(`
    当前模板：
    pc-front
    pc-admin
    mobile
    `);
  });

program.parse(process.argv);
