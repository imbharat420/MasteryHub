
##Commit and push on github on autosave of vscode

To make Visual Studio Code (VS Code) automatically create commits and push to GitHub on autosave, you can use the `Auto Save` extension. This extension automatically saves changes to files in your workspace, and you can configure it to create a commit and push the changes to a specified branch in a remote repository whenever it saves a file.

Here's how you can use the `Auto Save` extension in VS Code to make autosave commits and pushes to GitHub:

1.  Open VS Code and click the extensions icon in the left sidebar.
    
2.  Search for the `Auto Save` extension and click the `Install` button to install it.
    
3.  After installing the extension, open the VS Code settings by going to `File > Preferences > Settings` or by pressing `Ctrl + ,` on Windows or `Command + ,` on macOS.
    
4.  In the settings editor, search for the `auto save` setting and click the `Edit in settings.json` link.
    
5.  In the `settings.json` file, add the following configuration to enable auto save and specify the remote repository and branch that you want to push to:
    

Copy code
```
`"auto-save.enable": true,
"auto-save.saveOnFocusChange": true,
"auto-save.saveOnWindowChange": true,
"auto-save.saveOnSuspend": true,
"auto-save.commit": true,
"auto-save.remote": "origin",
"auto-save.branch": "master"` 
```
6.  Save the `settings.json` file and close it.

With this configuration, the `Auto Save` extension will automatically save changes to files in your workspace, create a commit, and push the changes to the `master` branch of the `origin` repository whenever it saves a file.

Note: The `Auto Save` extension requires that you have already set up a Git repository and added the remote repository to your local repository. If you have not done this, you will need to do so before using the extension. You can find more information on how to set up a Git repository and add a remote in the [Git documentation](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).