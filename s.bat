REM start npm run build
REM set RootFolderPath=E:\ncManage
REM set SourceFolder=%RootFolderPath%\src\Presentation\NCManageUI
REM @echo off

set RootFolderPath=E:\other\test
set SourceFolder=%RootFolderPath%\test
cd %SourceFolder%
call npm run build
xcopy %SourceFolder%\dist \\10.10.0.123\D\test /s/e/y
REM mstsc /v: 10.10.0.123 /console
REM net use \\10.10.0.123\ipc$ Nc@test /user:Administrator

REM start net use \\10.10.0.123\ipc$ /delete