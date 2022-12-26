
How to make autosave commits and push in github

To make automatic commits and push to GitHub, you can use a tool called `git-autocommit`. This is a command-line utility that allows you to specify a local directory, and it will automatically create a new commit and push it to a specified branch in a remote repository whenever it detects changes in the local directory.

Here's how you can use `git-autocommit`:

1.  Install `git-autocommit` by running the following command:

Copy code

`pip install git-autocommit` 

2.  Navigate to the local directory that you want to track for changes using the `cd` command.
    
3.  Run the following command to start `git-autocommit`:
    

Copy code

`git-autocommit` 

4.  When prompted, enter the name of the remote repository and the branch that you want to push to.
    
5.  `git-autocommit` will now start tracking changes in the local directory and automatically creating commits and pushing them to the specified branch whenever it detects changes.
    

Note: `git-autocommit` is not an official tool provided by GitHub. It is a third-party tool that has been developed by the open-source community.