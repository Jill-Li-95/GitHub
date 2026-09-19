# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔的介面協助使用者管理日常待辦事項，並示範如何結合 GitHub Copilot 的開發能力與工具整合，完成從功能實作、文件查詢到問題修正的完整流程。

## 線上展示

![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

GitHub Pages：[https://jill-li-95.github.io/GitHub/](https://jill-li-95.github.io/GitHub/)

## 功能

- 新增待辦事項。
- 忽略空白內容，不建立空白待辦事項。
- 勾選待辦事項並以刪除線與淡化樣式標示完成狀態。
- 刪除待辦事項。
- 顯示全部待辦中的未完成項目數量。
- 清單為空時顯示提示文字。
- 使用 `localStorage` 保存待辦資料，重新整理後仍可保留。
- 支援淺色與深色模式切換，並顯示對應圖示與文字。
- 保存使用者的主題偏好，重新整理後維持選擇。
- 使用者尚未手動選擇主題時，跟隨作業系統的 `prefers-color-scheme` 設定。
- 提供「全部」、「未完成」與「已完成」篩選。
- 篩選結果為空時顯示對應的提示文字。
- 篩選清單時，底部未完成數量仍統計全部待辦事項。
- 支援手機螢幕與響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架或第三方套件。
- 不引用外部 CDN，可直接離線開啟。
- 使用 CSS 變數集中管理介面色彩，並以媒體查詢支援深色模式。
- 使用 `localStorage` 保存待辦資料、主題偏好與篩選條件。
- 使用原生 DOM API 建立與更新待辦清單內容。

## 開發方式

- 使用 GitHub Copilot Agent Mode，從需求開始建立待辦清單的 HTML、CSS 與 JavaScript 結構。
- 使用 Microsoft Learn MCP 查詢 `prefers-color-scheme` 與深色模式色彩對比的官方文件，並檢視介面配色的可及性風險。
- 使用 GitHub MCP 讀取 repository 的 issues，並依照 issue 內容進行問題分析與修正。
- 使用 `.github/prompts/fix-issue.prompt.md` 建立 agentic workflow，規範從讀取 issue、等待確認、建立分支、修改、驗證、提交推送到建立 Pull Request 的步驟。
- 透過 Git 分支與 Pull Request 管理 issue 修正，讓每次變更都有清楚的修改範圍與驗證紀錄。

## 我學到什麼

- 如何使用原生 JavaScript 管理表單事件、DOM 更新與 `localStorage` 資料同步。
- 如何用 CSS 變數與 `prefers-color-scheme` 建立可切換且可維護的主題系統。
- 如何設計篩選邏輯，讓畫面顯示狀態與整體待辦統計彼此獨立。
- 如何透過 Microsoft Learn MCP 與 GitHub MCP 查詢官方文件、讀取 issue 並協助問題修正。
- 如何使用 prompt 與 GitHub workflow，將 issue 修正流程拆成可重複執行的步驟。
